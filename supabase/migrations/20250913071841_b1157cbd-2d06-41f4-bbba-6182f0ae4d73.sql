-- Clean up remaining security issues from previous migration attempts

-- 1. Remove the security definer view that's causing the ERROR warning
DROP VIEW IF EXISTS public.mentor_public_profiles;

-- 2. Fix sessions policies to explicitly block anonymous users (addressing false positive warnings)
DROP POLICY IF EXISTS "Authenticated users can view their own sessions" ON public.sessions;
DROP POLICY IF EXISTS "Authenticated users can update their own sessions" ON public.sessions;

CREATE POLICY "Auth users view own sessions only" 
ON public.sessions 
FOR SELECT 
TO authenticated
USING ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = sessions.mentee_id) AND (profiles.user_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM (mentors
     JOIN profiles ON ((profiles.id = mentors.profile_id)))
  WHERE ((mentors.id = sessions.mentor_id) AND (profiles.user_id = auth.uid())))));

CREATE POLICY "Auth users update own sessions only" 
ON public.sessions 
FOR UPDATE 
TO authenticated
USING ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = sessions.mentee_id) AND (profiles.user_id = auth.uid())))) OR (EXISTS ( SELECT 1
   FROM (mentors
     JOIN profiles ON ((profiles.id = mentors.profile_id)))
  WHERE ((mentors.id = sessions.mentor_id) AND (profiles.user_id = auth.uid())))));

-- 3. Ensure no anonymous role has any access to our tables
REVOKE ALL ON public.profiles FROM anon;
REVOKE ALL ON public.mentors FROM anon;  
REVOKE ALL ON public.sessions FROM anon;

-- Grant only necessary permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.mentors TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.sessions TO authenticated;

-- Comments
COMMENT ON POLICY "Auth users view own sessions only" ON public.sessions IS 'SECURITY: Authenticated users can only view their own sessions';
COMMENT ON POLICY "Auth users update own sessions only" ON public.sessions IS 'SECURITY: Authenticated users can only update their own sessions';