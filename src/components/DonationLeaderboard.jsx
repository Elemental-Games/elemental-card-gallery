import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DonationLeaderboard = () => {
  const [currentWeek] = useState(1);

  const weeklyDonations = [
    { id: 1, name: "Alex S.", amount: 100, message: "Let's make this happen!" },
    { id: 2, name: "Maria R.", amount: 75, message: "Love the concept!" },
    { id: 3, name: "Anonymous", amount: 50 },
    { id: 4, name: "Chris P.", amount: 25, message: "Can't wait to play!" },
  ];

  const overallDonations = [
    { id: 1, name: "Alex S.", amount: 250 },
    { id: 2, name: "Maria R.", amount: 200 },
    { id: 3, name: "Chris P.", amount: 175 },
    { id: 4, name: "Anonymous", amount: 150 },
    { id: 5, name: "Sam T.", amount: 125 },
  ];

  return (
    <Card className="bg-purple-900/90">
      <CardHeader>
        <CardTitle className="text-2xl text-yellow-400 text-center">Donation Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-purple-800">
            <TabsTrigger 
              value="weekly" 
              className="px-8 py-3 data-[state=active]:bg-yellow-400 data-[state=active]:text-purple-900 text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              Week {currentWeek}
            </TabsTrigger>
            <TabsTrigger 
              value="overall" 
              className="px-8 py-3 data-[state=active]:bg-yellow-400 data-[state=active]:text-purple-900 text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              Overall
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">
            <div className="space-y-3">
              {weeklyDonations.map((donation, index) => (
                <div 
                  key={donation.id} 
                  className="flex items-center justify-between p-4 rounded-lg bg-purple-800/50 border border-yellow-400/20 hover:border-yellow-400/40 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-yellow-400 font-bold text-xl">#{index + 1}</span>
                    <span className="text-yellow-200 font-medium">{donation.name}</span>
                  </div>
                  <span className="text-yellow-400 font-bold text-lg">${donation.amount}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="overall">
            <div className="space-y-3">
              {overallDonations.map((donation, index) => (
                <div 
                  key={donation.id} 
                  className="flex items-center justify-between p-4 rounded-lg bg-purple-800/50 border border-yellow-400/20 hover:border-yellow-400/40 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-yellow-400 font-bold text-xl">#{index + 1}</span>
                    <span className="text-yellow-200 font-medium">{donation.name}</span>
                  </div>
                  <span className="text-yellow-400 font-bold text-lg">${donation.amount}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DonationLeaderboard; 