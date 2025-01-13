import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import USDDonationForm from "@/components/DonationForms/USDDonationForm"
import DonationLeaderboard from "@/components/DonationLeaderboard"
import DonationTerms from "@/components/DonationTerms"

const DonatePage = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-8">
          Support Elemental Masters
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donation Forms Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-6">
              Choose Your Donation Method
            </h2>
            
            <Tabs defaultValue="usd" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger 
                  value="usd"
                  className="data-[state=active]:bg-yellow-400 data-[state=active]:text-purple-900"
                >
                  Card/USD
                </TabsTrigger>
                <TabsTrigger 
                  value="paypal"
                  className="data-[state=active]:bg-yellow-400 data-[state=active]:text-purple-900"
                  disabled
                >
                  PayPal
                </TabsTrigger>
                <TabsTrigger 
                  value="crypto"
                  className="data-[state=active]:bg-yellow-400 data-[state=active]:text-purple-900"
                  disabled
                >
                  Crypto
                </TabsTrigger>
              </TabsList>

              <TabsContent value="usd">
                <USDDonationForm />
              </TabsContent>

              <TabsContent value="paypal">
                <div className="text-center text-yellow-200 p-8">
                  PayPal donations coming soon!
                </div>
              </TabsContent>

              <TabsContent value="crypto">
                <div className="text-center text-yellow-200 p-8">
                  Crypto donations coming soon!
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <DonationTerms />
            </div>
          </div>

          {/* Leaderboard Section */}
          <div>
            <DonationLeaderboard />
          </div>
        </div>
      </div>
    </>
  );
}

export default DonatePage; 