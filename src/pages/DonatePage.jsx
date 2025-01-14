import { PayPalForm } from "@/components/PayPal";
import { PayPalProvider } from "@/components/PayPal";
import { CoinbaseForm } from "@/components/Coinbase";
import { CoinbaseProvider } from "@/components/Coinbase";
import DonationLeaderboard from "@/components/DonationLeaderboard";
import DonationDisclaimer from "@/components/DonationDisclaimer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function DonatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Alert variant="destructive" className="mb-6 bg-yellow-500/10 border-yellow-500 text-yellow-500">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Donations Temporarily Disabled</AlertTitle>
        <AlertDescription>
          We're currently setting up our donation system. Please check back soon! We appreciate your support and patience.
        </AlertDescription>
      </Alert>

      <h1 className="text-4xl font-bold text-center text-yellow-400 mb-8">
        Support Elemental Masters
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Tabs defaultValue="paypal" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="paypal" disabled>PayPal</TabsTrigger>
              <TabsTrigger value="crypto" disabled>Crypto</TabsTrigger>
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