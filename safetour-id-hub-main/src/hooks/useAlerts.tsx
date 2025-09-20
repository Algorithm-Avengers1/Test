import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SafetyAlert {
  id: string;
  type: string;
  severity: string;
  location: string;
  latitude?: number;
  longitude?: number;
  description: string;
  status: string;
  priority: string;
  tourist_id?: string;
  reported_by?: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

export function useAlerts() {
  const [alerts, setAlerts] = useState<SafetyAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('safety_alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setAlerts(data || []);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createAlert = async (alertData: Omit<SafetyAlert, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('You must be logged in to create alerts');

      const { error } = await supabase
        .from('safety_alerts')
        .insert({
          ...alertData,
          reported_by: user.id,
        });

      if (error) throw error;

      toast({
        title: "Alert created successfully",
        description: "The safety alert has been reported to authorities.",
      });

      await fetchAlerts(); // Refresh alerts list
    } catch (error: any) {
      console.error('Error creating alert:', error);
      toast({
        title: "Failed to create alert",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const triggerEmergencyAlert = async (location: string, description: string) => {
    await createAlert({
      type: 'security',
      severity: 'critical',
      location,
      description: `EMERGENCY: ${description}`,
      status: 'active',
      priority: 'urgent',
    });
  };

  useEffect(() => {
    fetchAlerts();

    // Set up real-time subscription for new alerts
    const subscription = supabase
      .channel('safety_alerts')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'safety_alerts'
      }, () => {
        fetchAlerts(); // Refresh when new alert is added
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return {
    alerts,
    loading,
    createAlert,
    triggerEmergencyAlert,
    fetchAlerts,
  };
}