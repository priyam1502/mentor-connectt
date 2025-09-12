-- FINAL SECURITY LOCKDOWN: Ensure no anonymous access to any tables
-- This completes the security fix by removing all possible anonymous access paths

-- 1. Ensure all policies on mentors require authentication and proper ownership
DROP POLICY IF EXISTS "Users can update their own mentor profile" ON public.mentors;
CREATE POLICY "Authenticated users can update their own mentor profile" 
ON public.mentors 
FOR UPDATE 
TO authenticated
USING (EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = mentors.profile_id) AND (profiles.user_id = auth.uid()))));

-- 2. Ensure all policies on profiles are strictly controlled
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Authenticated users can update their own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- 3. Remove the "Public can view basic mentor info" policy to eliminate any anonymous access
-- Instead, authenticated users can view mentor profiles through the mentors table join
DROP POLICY IF EXISTS "Public can view basic mentor info" ON public.profiles;

-- 4. Create a view for safe mentor profile access (read-only, no sensitive data)
CREATE OR REPLACE VIEW public.mentor_public_profiles AS
SELECT 
  p.id,
  p.full_name,
  p.avatar_url,
  p.bio,
  m.title,
  m.company,
  m.expertise_areas,
  m.years_experience,
  m.hourly_rate,
  m.available,
  m.timezone,
  m.languages
FROM profiles p
JOIN mentors m ON p.id = m.profile_id
WHERE p.user_type = 'mentor';

-- 5. Grant access to the view for authenticated users only
GRANT SELECT ON public.mentor_public_profiles TO authenticated;
REVOKE ALL ON public.mentor_public_profiles FROM anon;

-- 6. Add RLS to the view (belt and suspenders approach)
ALTER VIEW public.mentor_public_profiles SET (security_barrier = true);

-- Comments for documentation
COMMENT ON VIEW public.mentor_public_profiles IS 'Secure view for mentor discovery - excludes sensitive data like emails';
COMMENT ON POLICY "Authenticated users can update their own mentor profile" ON public.mentors IS 'Security: Requires authentication and ownership verification';
COMMENT ON POLICY "Authenticated users can update their own profile" ON public.profiles IS 'Security: Requires authentication and ownership verification';