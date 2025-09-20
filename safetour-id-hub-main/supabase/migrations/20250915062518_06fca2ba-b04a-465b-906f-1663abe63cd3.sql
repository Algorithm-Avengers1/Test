-- Add basic RLS policy for the kv_store table that was missing policies
CREATE POLICY "Allow authenticated users to manage kv_store" ON public.kv_store_45c5bd6c
  FOR ALL USING (auth.uid() IS NOT NULL);