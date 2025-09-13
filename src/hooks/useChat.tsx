import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from './useUserProfile';
import { toast } from '@/components/ui/use-toast';

interface Conversation {
  id: string;
  mentor_id: string;
  mentee_id: string;
  created_at: string;
  updated_at: string;
  last_message_at: string;
  mentor?: {
    id: string;
    full_name: string;
    avatar_url: string;
    user_type: string;
    title?: string;
    company?: string;
  };
  mentee?: {
    id: string;
    full_name: string;
    avatar_url: string;
    user_type: string;
  };
  last_message?: {
    content: string;
    created_at: string;
    sender_id: string;
  };
  unread_count?: number;
}

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: string;
  read_by_recipient: boolean;
  created_at: string;
  updated_at: string;
  sender?: {
    id: string;
    full_name: string;
    avatar_url: string;
  };
}

export const useChat = () => {
  const { user } = useAuth();
  const { profile } = useUserProfile();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch conversations
  const fetchConversations = useCallback(async () => {
    if (!user || !profile) return;

    try {
      setLoading(true);
      
      const { data: conversationsData, error: conversationsError } = await supabase
        .from('conversations')
        .select('*')
        .order('last_message_at', { ascending: false });

      if (conversationsError) throw conversationsError;

      // Get additional data for each conversation
      const conversationsWithData = await Promise.all(
        (conversationsData || []).map(async (conv) => {
          // Get mentor profile
          const { data: mentorProfile } = await supabase
            .from('profiles')
            .select('id, full_name, avatar_url, user_type')
            .eq('id', conv.mentor_id)
            .single();

          // Get mentee profile  
          const { data: menteeProfile } = await supabase
            .from('profiles')
            .select('id, full_name, avatar_url, user_type')
            .eq('id', conv.mentee_id)
            .single();

          // Get mentor details if available
          let mentorDetails = null;
          if (mentorProfile) {
            const { data: mentorData } = await supabase
              .from('mentors')
              .select('title, company')
              .eq('profile_id', mentorProfile.id)
              .single();
            
            mentorDetails = {
              ...mentorProfile,
              title: mentorData?.title,
              company: mentorData?.company
            };
          }

          // Get last message
          const { data: lastMessage } = await supabase
            .from('messages')
            .select('content, created_at, sender_id')
            .eq('conversation_id', conv.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          // Get unread count
          const { count: unreadCount } = await supabase
            .from('messages')
            .select('*', { count: 'exact', head: true })
            .eq('conversation_id', conv.id)
            .eq('read_by_recipient', false)
            .neq('sender_id', profile.id);

          return {
            ...conv,
            mentor: mentorDetails,
            mentee: menteeProfile,
            last_message: lastMessage,
            unread_count: unreadCount || 0
          };
        })
      );

      setConversations(conversationsWithData);
    } catch (err) {
      console.error('Error fetching conversations:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      toast({
        title: "Error",
        description: "Failed to load conversations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, profile]);

  // Fetch messages for a conversation
  const fetchMessages = useCallback(async (conversationId: string) => {
    if (!conversationId) return;

    try {
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (messagesError) throw messagesError;

      // Get sender profiles for each message
      const messagesWithSenders = await Promise.all(
        (messagesData || []).map(async (message) => {
          const { data: senderProfile } = await supabase
            .from('profiles')
            .select('id, full_name, avatar_url')
            .eq('id', message.sender_id)
            .single();

          return {
            ...message,
            sender: senderProfile
          };
        })
      );

      setMessages(messagesWithSenders);

      // Mark messages as read
      if (profile) {
        await supabase
          .from('messages')
          .update({ read_by_recipient: true })
          .eq('conversation_id', conversationId)
          .neq('sender_id', profile.id);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    }
  }, [profile]);

  // Send a message
  const sendMessage = useCallback(async (conversationId: string, content: string) => {
    if (!profile || !content.trim()) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: profile.id,
          content: content.trim(),
          message_type: 'text'
        });

      if (error) throw error;

      toast({
        title: "Message sent",
        description: "Your message has been delivered",
      });
    } catch (err) {
      console.error('Error sending message:', err);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  }, [profile]);

  // Create a new conversation
  const createConversation = useCallback(async (mentorId: string) => {
    if (!profile || profile.user_type !== 'mentee') return;

    try {
      // Check if conversation already exists
      const { data: existingConv } = await supabase
        .from('conversations')
        .select('id')
        .eq('mentor_id', mentorId)
        .eq('mentee_id', profile.id)
        .single();

      if (existingConv) {
        // Conversation exists, select it
        const conv = conversations.find(c => c.id === existingConv.id);
        if (conv) setSelectedConversation(conv);
        return existingConv.id;
      }

      // Create new conversation
      const { data: newConv, error } = await supabase
        .from('conversations')
        .insert({
          mentor_id: mentorId,
          mentee_id: profile.id
        })
        .select()
        .single();

      if (error) throw error;

      // Refresh conversations
      await fetchConversations();
      
      return newConv.id;
    } catch (err) {
      console.error('Error creating conversation:', err);
      toast({
        title: "Error",
        description: "Failed to create conversation",
        variant: "destructive",
      });
    }
  }, [profile, conversations, fetchConversations]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user || !profile) return;

    const channel = supabase
      .channel('chat-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          console.log('New message:', payload);
          
          // If the message is for the selected conversation, add it to messages
          if (selectedConversation && payload.new.conversation_id === selectedConversation.id) {
            // Fetch the complete message with sender info
            supabase
              .from('messages')
              .select('*')
              .eq('id', payload.new.id)
              .single()
              .then(async ({ data: messageData }) => {
                if (messageData) {
                  // Get sender profile
                  const { data: senderProfile } = await supabase
                    .from('profiles')
                    .select('id, full_name, avatar_url')
                    .eq('id', messageData.sender_id)
                    .single();

                  const messageWithSender = {
                    ...messageData,
                    sender: senderProfile
                  };

                  setMessages(prev => [...prev, messageWithSender]);
                }
              });
          }
          
          // Refresh conversations to update last message and timestamps
          fetchConversations();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'conversations'
        },
        () => {
          console.log('New conversation created');
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, profile, selectedConversation, fetchConversations]);

  // Initial data fetch
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // Fetch messages when conversation changes
  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
    }
  }, [selectedConversation, fetchMessages]);

  return {
    conversations,
    selectedConversation,
    setSelectedConversation,
    messages,
    loading,
    error,
    sendMessage,
    createConversation,
    refetch: fetchConversations
  };
};