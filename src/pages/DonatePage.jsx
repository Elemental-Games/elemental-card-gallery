import { PayPalForm } from "@/components/PayPal";
import { PayPalProvider } from "@/components/PayPal";
import DonationLeaderboard from "@/components/DonationLeaderboard";
import DonationDisclaimer from "@/components/DonationDisclaimer";

export default function DonatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-yellow-400 mb-8">
        Support Elemental Masters
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <PayPalProvider>
            <PayPalForm />
          </PayPalProvider>
          <DonationDisclaimer />
        </div>
        
        <DonationLeaderboard />
      </div>
    </div>
  );
} 