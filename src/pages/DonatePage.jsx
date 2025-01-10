import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const DonatePage = () => {
  const [selectedMethod, setSelectedMethod] = useState('usd');

  return (
    <>
      <Helmet>
        <title>Donate - Elemental Masters TCG</title>
        <meta name="description" content="Support Elemental Masters TCG development and earn exclusive rewards!" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-purple-100">Support Elemental Masters</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Donation Methods */}
            <div className="lg:col-span-2">
              <Card className="bg-purple-800/10 border border-purple-300/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-100">Choose Your Donation Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="usd" value={selectedMethod} onValueChange={setSelectedMethod}>
                    <TabsList className="grid grid-cols-4 gap-4">
                      <TabsTrigger value="usd">USD</TabsTrigger>
                      <TabsTrigger value="card">Card</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      <TabsTrigger value="crypto">Crypto</TabsTrigger>
                    </TabsList>
                    <TabsContent value="usd">USD donation form coming soon</TabsContent>
                    <TabsContent value="card">Card payment form coming soon</TabsContent>
                    <TabsContent value="paypal">PayPal integration coming soon</TabsContent>
                    <TabsContent value="crypto">Crypto payment options coming soon</TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Leaderboard */}
            <div>
              <Card className="bg-purple-800/10 border border-purple-300/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-purple-100">Week 1 Leaderboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-200 mb-4">Current Goal: $500</p>
                  {/* Progress bar and leaderboard will go here */}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonatePage; 