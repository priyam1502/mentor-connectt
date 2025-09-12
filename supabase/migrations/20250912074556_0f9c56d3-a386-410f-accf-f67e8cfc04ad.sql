-- Fix authentication-related DB issues: ensure profiles are created on signup with required fields and safe RLS bypass

-- 1) Make user_type default to 'mentee' to satisfy NOT NULL on automatic inserts
ALTER TABLE public.profiles
ALTER COLUMN user_type SET DEFAULT 'mentee';

-- 2) Update handle_new_user to include required columns and run as SECURITY DEFINER (bypass RLS)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    user_id,
    email,
    full_name,
    user_type,
    avatar_url
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'New User'),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'mentee'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

-- 3) Create trigger to automatically create a profile when a user signs up (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW
      EXECUTE FUNCTION public.handle_new_user();
  END IF;
END $$;