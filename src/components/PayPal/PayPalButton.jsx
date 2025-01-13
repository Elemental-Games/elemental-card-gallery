import { PayPalButtons } from "@paypal/react-paypal-js";
import { useToast } from "@/components/ui/use-toast";

export function PayPalButton({ amount, onSuccess, isProcessing, metadata = {} }) {
  const { toast } = useToast();

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
            currency_code: "USD"
          },
          description: "Donation to Elemental Master",
          custom_id: JSON.stringify(metadata)
        }
      ],
      application_context: {
        return_url: `${import.meta.env.VITE_SITE_URL}/donation-success`,
        cancel_url: `${import.meta.env.VITE_SITE_URL}/donate`,
        shipping_preference: 'NO_SHIPPING'
      }
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture();
      onSuccess?.(order);
      
      toast({
        title: "Thank you!",
        description: "Your donation has been received.",
      });
    } catch (error) {
      console.error('PayPal error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem processing your donation.",
      });
    }
  };

  return (
    <PayPalButtons
      style={{ layout: "vertical" }}
      createOrder={createOrder}
      onApprove={onApprove}
      disabled={isProcessing}
    />
  );
} 