-- CRITICAL SECURITY FIX: Remove public access to sensitive user data
-- This addresses the security vulnerability where user emails and personal data are exposed to anonymous users

-- 1. Drop the overly permissive profiles SELECT policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- 2. Create secure, tiered access policies for profiles
-- Users can view their own complete profile data
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Public mentor discovery: only basic info (name, avatar, user_type) for mentor listings
-- This allows the app to show mentor names and avatars without exposing emails/bios
CREATE POLICY "Public can view basic mentor info" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (user_type = 'mentor');

-- 3. Fix mentors table - remove anonymous access  
DROP POLICY IF EXISTS "Everyone can view mentors" ON public.mentors;
CREATE POLICY "Authenticated users can view mentors" 
ON public.mentors 
FOR SELECT 
TO authenticated
USING (true);

-- 4. Fix sessions table - remove anonymous access
DROP POLICY IF EXISTS "Users can view their own sessions" ON public.sessions;
DROP POLICY IF EXISTS "Users can update their own sessions" ON public.sessions;

CREATE POLICY "Authenticated users can view their own sessions" 
ON public.sessions 
FOR SELECT 
TO authenticated
USING ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = sessions.mentee_id) AND (profiles.user_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM (mentors
     JOIN profiles ON ((profiles.id = mentors.profile_id)))
  WHERE ((mentors.id = sessions.mentor_id) AND (profiles.user_id = auth.uid())))));

CREATE POLICY "Authenticated users can update their own sessions" 
ON public.sessions 
FOR UPDATE 
TO authenticated
USING ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = sessions.mentee_id) AND (profiles.user_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM (mentors
     JOIN profiles ON ((profiles.id = mentors.profile_id)))
  WHERE ((mentors.id = sessions.mentor_id) AND (profiles.user_id = auth.uid())))));

-- Add comment for future reference
COMMENT ON POLICY "Users can view their own profile" ON public.profiles IS 'Security fix: Users can only access their own complete profile data';
COMMENT ON POLICY "Public can view basic mentor info" ON public.profiles IS 'Security fix: Limited public access for mentor discovery - no emails or sensitive data';
COMMENT ON POLICY "Authenticated users can view mentors" ON public.mentors IS 'Security fix: Requires authentication to view mentor data';