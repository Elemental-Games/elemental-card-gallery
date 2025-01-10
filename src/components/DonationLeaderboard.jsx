import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const DonationLeaderboard = () => {
  const [currentWeek] = useState(1); // This would be dynamic based on release schedule
  const weeklyGoal = 500;
  const overallGoal = 2500;

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

  const calculateProgress = (donations, goal) => {
    const total = donations.reduce((sum, donation) => sum + donation.amount, 0);
    return Math.min((total / goal) * 100, 100);
  };

  return (
    <Card className="bg-purple-800/10 border border-purple-300/50">
      <CardHeader>
        <CardTitle className="text-2xl text-purple-100">Donation Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="weekly">Week {currentWeek}</TabsTrigger>
            <TabsTrigger value="overall">Overall</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-purple-200">Weekly Goal: ${weeklyGoal}</span>
                <span className="text-purple-200">
                  ${weeklyDonations.reduce((sum, d) => sum + d.amount, 0)} raised
                </span>
              </div>
              <Progress value={calculateProgress(weeklyDonations, weeklyGoal)} className="h-2" />
            </div>
            <div className="space-y-4">
              {weeklyDonations.map((donation, index) => (
                <div key={donation.id} className="flex items-center justify-between p-2 rounded-lg bg-purple-800/20">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400 font-bold">#{index + 1}</span>
                    <span className="text-purple-100">{donation.name}</span>
                  </div>
                  <span className="text-purple-200">${donation.amount}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="overall">
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-purple-200">Overall Goal: ${overallGoal}</span>
                <span className="text-purple-200">
                  ${overallDonations.reduce((sum, d) => sum + d.amount, 0)} raised
                </span>
              </div>
              <Progress value={calculateProgress(overallDonations, overallGoal)} className="h-2" />
            </div>
            <div className="space-y-4">
              {overallDonations.map((donation, index) => (
                <div key={donation.id} className="flex items-center justify-between p-2 rounded-lg bg-purple-800/20">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400 font-bold">#{index + 1}</span>
                    <span className="text-purple-100">{donation.name}</span>
                  </div>
                  <span className="text-purple-200">${donation.amount}</span>
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