-- Ensure wheel_spins has shopify_order_id to support numeric Shopify order ids
ALTER TABLE public.wheel_spins
ADD COLUMN IF NOT EXISTS shopify_order_id text;

CREATE UNIQUE INDEX IF NOT EXISTS wheel_spins_shopify_order_id_key
ON public.wheel_spins (shopify_order_id); 