import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface TouristRegistration {
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  passportNumber: string;
  idNumber: string;
  phone: string;
  email: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  travelStartDate: string;
  travelEndDate: string;
}

export function useTourist() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const registerTourist = async (data: TouristRegistration) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in to register');

      // Generate QR code data
      const qrData = JSON.stringify({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: data.fullName,
        passport: data.passportNumber,
        emergency: data.emergencyContactPhone,
        valid_until: data.travelEndDate
      });

      const { data: tourist, error } = await supabase
        .from('tourists')
        .insert({
          user_id: user.id,
          full_name: data.fullName,
          date_of_birth: data.dateOfBirth,
          nationality: data.nationality,
          passport_number: data.passportNumber,
          id_number: data.idNumber,
          phone: data.phone,
          email: data.email,
          emergency_contact_name: data.emergencyContactName,
          emergency_contact_phone: data.emergencyContactPhone,
          travel_start_date: data.travelStartDate,
          travel_end_date: data.travelEndDate,
          qr_code: qrData,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Registration successful!",
        description: "Your digital tourist ID has been generated.",
      });

      return tourist;
    } catch (error: any) {
      console.error('Error registering tourist:', error);
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getTouristRegistration = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('tourists')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching tourist registration:', error);
      return null;
    }
  };

  return {
    registerTourist,
    getTouristRegistration,
    loading,
  };
}