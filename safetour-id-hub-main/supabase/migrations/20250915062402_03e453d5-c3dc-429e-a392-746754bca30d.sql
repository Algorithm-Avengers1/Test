-- Fix the infinite recursion issue by creating a security definer function
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT 
LANGUAGE SQL 
SECURITY DEFINER 
STABLE 
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$;

-- Drop and recreate the problematic policies using the security definer function
DROP POLICY IF EXISTS "Authorities can view all tourist registrations" ON public.tourists;
DROP POLICY IF EXISTS "Authorities can manage alerts" ON public.safety_alerts;
DROP POLICY IF EXISTS "Authorities can manage emergency responses" ON public.emergency_responses;
DROP POLICY IF EXISTS "Authorities can view all tracking data" ON public.tourist_tracking;

-- Recreate policies using the security definer function
CREATE POLICY "Authorities can view all tourist registrations" ON public.tourists
  FOR SELECT USING (public.get_current_user_role() IN ('authority', 'admin'));

CREATE POLICY "Authorities can manage alerts" ON public.safety_alerts
  FOR ALL USING (public.get_current_user_role() IN ('authority', 'admin'));

CREATE POLICY "Authorities can manage emergency responses" ON public.emergency_responses
  FOR ALL USING (public.get_current_user_role() IN ('authority', 'admin'));

CREATE POLICY "Authorities can view all tracking data" ON public.tourist_tracking
  FOR SELECT USING (public.get_current_user_role() IN ('authority', 'admin'));