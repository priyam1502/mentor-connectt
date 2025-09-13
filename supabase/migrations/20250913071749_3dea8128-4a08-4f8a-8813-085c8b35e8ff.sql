-- SECURITY FIX: Remove public access to user data (Handle existing policies)
-- This fixes the critical vulnerability where emails and personal data are exposed

-- 1. Drop ALL existing problematic policies first
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles; 
DROP POLICY IF EXISTS "Public can view basic mentor info" ON public.profiles;
DROP POLICY IF EXISTS "Everyone can view mentors" ON public.mentors;
DROP POLICY IF EXISTS "Authenticated users can view mentors" ON public.mentors;

-- 2. Create secure policies for profiles table
-- Users can only view their own complete profile
CREATE POLICY "Users can view own profile only" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- 3. Create secure policies for mentors table  
-- Only authenticated users can view mentor data
CREATE POLICY "Auth users can view mentors" 
ON public.mentors 
FOR SELECT 
TO authenticated
USING (true);

-- 4. Update mentor UPDATE policy to require authentication
DROP POLICY IF EXISTS "Users can update their own mentor profile" ON public.mentors;
DROP POLICY IF EXISTS "Authenticated users can update their own mentor profile" ON public.mentors;

CREATE POLICY "Auth users can update own mentor profile" 
ON public.mentors 
FOR UPDATE 
TO authenticated
USING (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = mentors.profile_id) AND (profiles.user_id = auth.uid()))));

-- 5. Update profiles UPDATE policy to require authentication
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Authenticated users can update their own profile" ON public.profiles;

CREATE POLICY "Auth users can update own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- Comments for documentation
COMMENT ON POLICY "Users can view own profile only" ON public.profiles IS 'SECURITY: Users can only access their own profile data - no public access to emails/personal info';
COMMENT ON POLICY "Auth users can view mentors" ON public.mentors IS 'SECURITY: Requires authentication to view mentor data';
COMMENT ON POLICY "Auth users can update own mentor profile" ON public.mentors IS 'SECURITY: Requires authentication and ownership';
COMMENT ON POLICY "Auth users can update own profile" ON public.profiles IS 'SECURITY: Requires authentication and ownership';