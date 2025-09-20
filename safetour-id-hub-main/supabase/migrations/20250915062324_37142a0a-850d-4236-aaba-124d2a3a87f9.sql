-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  role TEXT DEFAULT 'tourist' CHECK (role IN ('tourist', 'authority', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tourists table for digital ID generation
CREATE TABLE public.tourists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  nationality TEXT NOT NULL,
  passport_number TEXT NOT NULL,
  id_number TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  emergency_contact_name TEXT NOT NULL,
  emergency_contact_phone TEXT NOT NULL,
  travel_start_date DATE NOT NULL,
  travel_end_date DATE NOT NULL,
  qr_code TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create safety_alerts table for tracking incidents and alerts
CREATE TABLE public.safety_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tourist_id UUID REFERENCES public.tourists(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('medical', 'security', 'natural_disaster', 'theft', 'accident', 'missing_person')),
  severity TEXT NOT NULL DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  location TEXT NOT NULL,
  latitude DECIMAL,
  longitude DECIMAL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'investigating', 'resolved', 'closed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  reported_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create emergency_responses table for emergency situations
CREATE TABLE public.emergency_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  alert_id UUID NOT NULL REFERENCES public.safety_alerts(id) ON DELETE CASCADE,
  response_type TEXT NOT NULL CHECK (response_type IN ('medical', 'police', 'fire', 'rescue', 'evacuation')),
  responder_name TEXT NOT NULL,
  response_time INTEGER, -- in minutes
  status TEXT DEFAULT 'dispatched' CHECK (status IN ('dispatched', 'en_route', 'on_scene', 'completed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tourist_tracking table for live tracking
CREATE TABLE public.tourist_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tourist_id UUID NOT NULL REFERENCES public.tourists(id) ON DELETE CASCADE,
  latitude DECIMAL NOT NULL,
  longitude DECIMAL NOT NULL,
  location_name TEXT,
  status TEXT DEFAULT 'safe' CHECK (status IN ('safe', 'alert', 'emergency', 'offline')),
  battery_level INTEGER CHECK (battery_level >= 0 AND battery_level <= 100),
  last_seen TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tourists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.safety_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tourist_tracking ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for tourists
CREATE POLICY "Users can view their own tourist registration" ON public.tourists
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tourist registration" ON public.tourists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tourist registration" ON public.tourists
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Authorities can view all tourist registrations" ON public.tourists
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('authority', 'admin')
    )
  );

-- Create RLS policies for safety_alerts
CREATE POLICY "Users can view alerts" ON public.safety_alerts
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create alerts" ON public.safety_alerts
  FOR INSERT WITH CHECK (auth.uid() = reported_by);

CREATE POLICY "Authorities can manage alerts" ON public.safety_alerts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('authority', 'admin')
    )
  );

-- Create RLS policies for emergency_responses
CREATE POLICY "Authorities can manage emergency responses" ON public.emergency_responses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('authority', 'admin')
    )
  );

CREATE POLICY "Users can view emergency responses" ON public.emergency_responses
  FOR SELECT USING (true);

-- Create RLS policies for tourist_tracking
CREATE POLICY "Users can view their own tracking data" ON public.tourist_tracking
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tourists 
      WHERE id = tourist_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own tracking data" ON public.tourist_tracking
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.tourists 
      WHERE id = tourist_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Authorities can view all tracking data" ON public.tourist_tracking
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('authority', 'admin')
    )
  );

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tourists_updated_at
  BEFORE UPDATE ON public.tourists
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_safety_alerts_updated_at
  BEFORE UPDATE ON public.safety_alerts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_emergency_responses_updated_at
  BEFORE UPDATE ON public.emergency_responses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();