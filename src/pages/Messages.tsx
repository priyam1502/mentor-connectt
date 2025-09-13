import { useState } from 'react';
import { Search, Send, MoreVertical, Paperclip, Smile, Phone, Video, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import DashboardLayout from '@/components/DashboardLayout';
import { useChat } from '@/hooks/useChat';
import { useUserProfile } from '@/hooks/useUserProfile';
import { format } from 'date-fns';


export default function Messages() {
  const { profile } = useUserProfile();
  const { 
    conversations, 
    selectedConversation, 
    setSelectedConversation, 
    messages, 
    loading, 
    sendMessage 
  } = useChat();
  
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sending, setSending] = useState(false);

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedConversation && !sending) {
      setSending(true);
      try {
        await sendMessage(selectedConversation.id, newMessage.trim());
        setNewMessage("");
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setSending(false);
      }
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const otherUser = profile?.user_type === 'mentor' ? conv.mentee : conv.mentor;
    return otherUser && (
      otherUser.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (conv.mentor?.title && conv.mentor.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (conv.mentor?.company && conv.mentor.company.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p>Loading conversations...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!selectedConversation && conversations.length === 0) {
    return (
      <DashboardLayout>
        <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">No conversations yet</h3>
            <p className="text-muted-foreground">
              {profile?.user_type === 'mentee' 
                ? 'Start chatting with a mentor by booking a session first.' 
                : 'Mentees will be able to message you once they book sessions.'}
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)]">
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-1/3 border-r bg-muted/10">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="overflow-y-auto h-full">
              {filteredConversations.map((conversation) => {
                const otherUser = profile?.user_type === 'mentor' ? conversation.mentee : conversation.mentor;
                if (!otherUser) return null;
                
                return (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 border-b cursor-pointer hover:bg-muted/20 transition-colors ${
                      selectedConversation?.id === conversation.id ? 'bg-muted/30' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={otherUser.avatar_url || ''} />
                          <AvatarFallback>
                            {otherUser.full_name?.split(' ').map(n => n[0]).join('') || '?'}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-sm truncate">
                            {otherUser.full_name || 'Unknown User'}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-muted-foreground">
                              {conversation.last_message?.created_at 
                                ? format(new Date(conversation.last_message.created_at), 'MMM d')
                                : ''}
                            </span>
                            {(conversation.unread_count || 0) > 0 && (
                              <Badge className="bg-primary text-primary-foreground text-xs px-2 py-1">
                                {conversation.unread_count}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {profile?.user_type === 'mentor' ? 'Mentee' : 
                           `${conversation.mentor?.title || 'Mentor'} ${conversation.mentor?.company ? `at ${conversation.mentor.company}` : ''}`}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.last_message?.content || 'No messages yet'}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedConversation && (() => {
              const otherUser = profile?.user_type === 'mentor' ? selectedConversation.mentee : selectedConversation.mentor;
              return (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b bg-card">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={otherUser?.avatar_url || ''} />
                            <AvatarFallback>
                              {otherUser?.full_name?.split(' ').map(n => n[0]).join('') || '?'}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <h3 className="font-semibold">{otherUser?.full_name || 'Unknown User'}</h3>
                          <p className="text-sm text-muted-foreground">
                            {profile?.user_type === 'mentor' ? 'Mentee' : 
                             `${selectedConversation.mentor?.title || 'Mentor'} ${selectedConversation.mentor?.company ? `at ${selectedConversation.mentor.company}` : ''}`}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => {
                      const isMe = message.sender_id === profile?.id;
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-xs lg:max-w-md ${isMe ? 'order-1' : 'order-2'}`}>
                            <div
                              className={`px-4 py-2 rounded-lg ${
                                isMe
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 px-2">
                              {format(new Date(message.created_at), 'h:mm a')}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t bg-card">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <div className="flex-1">
                        <Input
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleSendMessage();
                            }
                          }}
                          disabled={sending}
                        />
                      </div>
                      <Button variant="ghost" size="sm">
                        <Smile className="w-4 h-4" />
                      </Button>
                      <Button 
                        onClick={handleSendMessage} 
                        size="sm" 
                        className="bg-primary hover:bg-primary/90"
                        disabled={sending || !newMessage.trim()}
                      >
                        {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}