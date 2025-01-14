import { PayPalButtons } from "@paypal/react-paypal-js";
import { useToast } from "@/components/ui/use-toast";

export function PayPalButton({ amount, metadata, onSuccess, isProcessing }) {
  const { toast } = useToast();

  const createOrder = (data, actions) => {
    const formattedAmount = Number(amount).toFixed(2);
    
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: formattedAmount,
          currency_code: "USD"
        },
        description: "Donation to Elemental Masters",
        custom_id: JSON.stringify(metadata)
      }],
      application_context: {
        shipping_preference: 'NO_SHIPPING'
      }
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture();
      await onSuccess(order);
      
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
    <div className="rounded-lg p-4 bg-white border-2 border-[rgb(14,8,20)]">
      <PayPalButtons
        style={{
          layout: "vertical",
          color: "gold",
          shape: "pill",
          height: 55,
          label: "donate",
          fundingicons: true,
          tagline: false
        }}
        createOrder={createOrder}
        onApprove={onApprove}
        disabled={isProcessing}
      />
    </div>
  );
} 