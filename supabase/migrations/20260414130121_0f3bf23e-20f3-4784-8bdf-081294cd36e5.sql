-- profiles: add INSERT policy for own profile
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- profiles: block deletion
CREATE POLICY "Prevent profile deletion"
ON public.profiles
FOR DELETE
TO authenticated
USING (false);

-- Restrict contact_leads INSERT to service_role only
DROP POLICY "Service role can insert contact leads" ON public.contact_leads;
CREATE POLICY "Service role can insert contact leads"
ON public.contact_leads
FOR INSERT
TO service_role
WITH CHECK (true);

-- Restrict reseller_leads INSERT to service_role only
DROP POLICY "Service role can insert reseller leads" ON public.reseller_leads;
CREATE POLICY "Service role can insert reseller leads"
ON public.reseller_leads
FOR INSERT
TO service_role
WITH CHECK (true);

-- Block non-admin INSERT on user_roles
CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Block non-admin DELETE on user_roles
CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Block non-admin UPDATE on user_roles
CREATE POLICY "Only admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));