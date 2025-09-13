import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  email: string;
  avatar_url: string | null;
  bio: string | null;
  user_type: string; // Changed from 'mentor' | 'mentee' to string to match database
}

interface MentorProfile {
  id: string;
  profile_id: string;
  title: string;
  company: string | null;
  years_experience: number | null;
  hourly_rate: number | null;
  expertise_areas: string[] | null;
  languages: string[] | null;
  timezone: string | null;
  available: boolean;
}

export const useUserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [mentorProfile, setMentorProfile] = useState<MentorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError) throw profileError;
      
      setProfile(profileData);

      // If user is a mentor, fetch mentor profile
      if (profileData?.user_type === 'mentor') {
        const { data: mentorData, error: mentorError } = await supabase
          .from('mentors')
          .select('*')
          .eq('profile_id', profileData.id)
          .single();

        if (mentorError && mentorError.code !== 'PGRST116') {
          throw mentorError;
        }
        
        setMentorProfile(mentorData);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !profile) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      setProfile(data);
      return { data, error: null };
    } catch (err) {
      console.error('Error updating profile:', err);
      return { data: null, error: err };
    }
  };

  const updateMentorProfile = async (updates: Partial<MentorProfile>) => {
    if (!user || !profile || !mentorProfile) return;

    try {
      const { data, error } = await supabase
        .from('mentors')
        .update(updates)
        .eq('profile_id', profile.id)
        .select()
        .single();

      if (error) throw error;
      
      setMentorProfile(data);
      return { data, error: null };
    } catch (err) {
      console.error('Error updating mentor profile:', err);
      return { data: null, error: err };
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!user || !profile) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await updateProfile({ avatar_url: data.publicUrl });
      
      return { data: data.publicUrl, error: null };
    } catch (err) {
      console.error('Error uploading avatar:', err);
      return { data: null, error: err };
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    mentorProfile,
    loading,
    error,
    updateProfile,
    updateMentorProfile,
    uploadAvatar,
    refetch: fetchProfile,
    isMentor: profile?.user_type === 'mentor',
    isMentee: profile?.user_type === 'mentee'
  };
};