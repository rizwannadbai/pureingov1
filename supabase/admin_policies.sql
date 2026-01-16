-- Admin Role and Policies for Pureingo
-- Run this in your Supabase SQL Editor

-- 1. Add role column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- 2. Create admin policies for orders (admins can view and update all orders)
CREATE POLICY "Admins can view all orders"
ON public.orders
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
);

CREATE POLICY "Admins can update all orders"
ON public.orders
FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
);

-- 3. Create admin policies for order_items (admins can view all)
CREATE POLICY "Admins can view all order items"
ON public.order_items
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
);

-- 4. Create admin policies for profiles (admins can view all profiles)
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (
    id = auth.uid() OR
    EXISTS (
        SELECT 1 FROM public.profiles AS p
        WHERE p.id = auth.uid()
        AND p.role = 'admin'
    )
);

-- 5. Create admin policies for addresses (admins can view all)
CREATE POLICY "Admins can view all addresses"
ON public.addresses
FOR SELECT
USING (
    user_id = auth.uid() OR
    EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
);

-- 6. Make yourself an admin (replace YOUR_USER_ID with your actual user ID)
-- You can find your user ID in Supabase Auth > Users
-- UPDATE public.profiles SET role = 'admin' WHERE id = 'YOUR_USER_ID';
