import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';

const DonationLeaderboard = () => {
  const [currentWeek] = useState(1);
  const [weeklyDonations, setWeeklyDonations] = useState([]);
  const [overallDonations, setOverallDonations] = useState([]);

  useEffect(() => {
    // Initial fetch of donations
    const fetchDonations = async () => {
      try {
        // Fetch weekly donations
        const { data: weeklyData, error: weeklyError } = await supabase
          .from('donations')
          .select('*')
          .eq('week_number', currentWeek)
          .eq('payment_status', 'completed')
          .order('amount', { ascending: false })
          .limit(10);

        if (weeklyError) throw weeklyError;
        setWeeklyDonations(weeklyData || []);

        // Fetch overall donations
        const { data: overallData, error: overallError } = await supabase
          .from('donations')
          .select('*')
          .eq('payment_status', 'completed')
          .order('amount', { ascending: false })
          .limit(10);

        if (overallError) throw overallError;
        setOverallDonations(overallData || []);

      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();

    // Set up realtime subscription
    const subscription = supabase
      .channel('donations-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'donations',
          filter: 'payment_status=eq.completed'
        },
        (payload) => {
          // Update lists when new donation comes in
          if (payload.new.week_number === currentWeek) {
            setWeeklyDonations(prev => [...prev, payload.new].sort((a, b) => b.amount - a.amount).slice(0, 10));
          }
          setOverallDonations(prev => [...prev, payload.new].sort((a, b) => b.amount - a.amount).slice(0, 10));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [currentWeek]);

  return (
    <Card className="bg-purple-900/90">
      <CardHeader>
        <CardTitle className="text-yellow-400">Top Supporters</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="weekly"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-purple-900"
            >
              This Week
            </TabsTrigger>
            <TabsTrigger 
              value="overall"
              className="data-[state=active]:bg-yellow-400 data-[state=active]:text-purple-900"
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
                    <span className="text-yellow-200 font-medium">
                      {donation.is_anonymous ? 'Anonymous' : donation.display_name}
                    </span>
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