import { PayPalForm } from "@/components/PayPal";
import { PayPalProvider } from "@/components/PayPal";
import { CoinbaseForm } from "@/components/Coinbase";
import { CoinbaseProvider } from "@/components/Coinbase";
import DonationLeaderboard from "@/components/DonationLeaderboard";
import DonationDisclaimer from "@/components/DonationDisclaimer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DonatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-yellow-400 mb-8">
        Support Elemental Masters
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Tabs defaultValue="paypal" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="paypal">PayPal</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
            </TabsList>
            <TabsContent value="paypal">
              <PayPalProvider>
                <PayPalForm />
              </PayPalProvider>
            </TabsContent>
            <TabsContent value="crypto">
              <CoinbaseProvider>
                <CoinbaseForm />
              </CoinbaseProvider>
            </TabsContent>
          </Tabs>
          <DonationDisclaimer />
        </div>
        
        <DonationLeaderboard />
      </div>
    </div>
  );
} 