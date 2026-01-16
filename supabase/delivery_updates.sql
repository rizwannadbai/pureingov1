-- Add driver_id to orders
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS driver_id UUID REFERENCES public.profiles(id);

-- Add policy for drivers to view their assigned orders
CREATE POLICY "Drivers can view assigned orders"
ON public.orders
FOR SELECT
USING (
    driver_id = auth.uid()
);

-- Note: We are reusing the 'role' column in profiles. 
-- Drivers will have role = 'driver'.
