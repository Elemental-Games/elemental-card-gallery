import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DonationLeaderboard = () => {
  const [currentWeek] = useState(1); // This would be dynamic based on release schedule

  // Example data - this would come from your backend
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
    <Card className="bg-purple-900/90 border border-yellow-400/50">
      <CardHeader>
        <CardTitle className="text-2xl text-yellow-400 text-center">Donation Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-yellow-900/20">
            <TabsTrigger 
              value="weekly" 
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-purple-900 text-yellow-400"
            >
              Week {currentWeek}
            </TabsTrigger>
            <TabsTrigger 
              value="overall" 
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-purple-900 text-yellow-400"
            >
              Overall
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">
            <div className="space-y-4">
              {weeklyDonations.map((donation, index) => (
                <div 
                  key={donation.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-yellow-900/20 border border-yellow-400/30"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-yellow-400 font-bold text-lg">#{index + 1}</span>
                    <span className="text-yellow-200 font-medium">{donation.name}</span>
                  </div>
                  <span className="text-yellow-400 font-bold">${donation.amount}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="overall">
            <div className="space-y-4">
              {overallDonations.map((donation, index) => (
                <div 
                  key={donation.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-yellow-900/20 border border-yellow-400/30"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-yellow-400 font-bold text-lg">#{index + 1}</span>
                    <span className="text-yellow-200 font-medium">{donation.name}</span>
                  </div>
                  <span className="text-yellow-400 font-bold">${donation.amount}</span>
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