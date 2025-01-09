import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const ReleaseSchedule = () => {
  const schedule = [
    {
      week: 1,
      date: "January 1st - January 7th",
      details: [
        { type: "Basic Creatures", count: 20, note: "5 per element" },
        { type: "Rune Cards", count: 4, note: "1 per element" },
        { type: "Counter Cards", count: 4, note: "Basic counters" },
        { type: "Tier I Shields", count: 5, note: "Basic protection" },
        { type: "Dragon", count: 1, note: "First dragon reveal!", isSpecial: true }
      ],
      featured: "Featured: 4 Cards of the Week"
    },
    {
      week: 2,
      date: "January 8th - January 14th",
      details: [
        { type: "Basic Creatures", count: 24, note: "6 per element" },
        { type: "Rune Cards", count: 5, note: "Advanced runes" },
        { type: "Counter Cards", count: 5, note: "Tactical counters" },
        { type: "Tier I Shields", count: 5, note: "Enhanced protection" },
        { type: "Tier II Shields", count: 3, note: "Advanced shields" },
        { type: "Dragon", count: 1, note: "Second dragon appears!", isSpecial: true }
      ],
      featured: "Featured: 4 Cards of the Week"
    },
    {
      week: 3,
      date: "January 15th - January 21st",
      details: [
        { type: "Basic Creatures", count: 24, note: "6 per element" },
        { type: "Rune Cards", count: 6, note: "Power runes" },
        { type: "Counter Cards", count: 6, note: "Strategic counters" },
        { type: "Tier I Shields", count: 5, note: "Final Tier I" },
        { type: "Tier II Shields", count: 4, note: "Power shields" },
        { type: "Dragon", count: 1, note: "Third dragon emerges!", isSpecial: true }
      ],
      featured: "Featured: 4 Cards of the Week"
    },
    {
      week: 4,
      date: "January 22nd - January 28th",
      details: [
        { type: "Basic Creatures", count: 20, note: "5 per element" },
        { type: "Rune Cards", count: 6, note: "Ultimate runes" },
        { type: "Counter Cards", count: 5, note: "Elite counters" },
        { type: "Tier II Shields", count: 3, note: "Final Tier II" },
        { type: "Tier III Shields", count: 2, note: "First legendary shields" },
        { type: "Dragon", count: 1, note: "Fourth dragon rises!", isSpecial: true }
      ],
      featured: "Featured: 4 Cards of the Week"
    },
    {
      final: true,
      date: "January 29th - February 7th",
      details: [
        { type: "Dragons", count: 2, note: "Final dragons revealed!", isSpecial: true },
        { type: "Elementalists", count: 4, note: "All elementalists unleashed!", isSpecial: true },
        { type: "Tier III Shields", count: 3, note: "Final legendary shields!", isSpecial: true }
      ],
      featured: "Grand Finale Showcase"
    }
  ];

  return (
    <div className="w-full">
      <Card className="bg-purple-800/10 border border-purple-300/50 mb-8">
        <CardHeader className="border-b border-purple-300/50">
          <CardTitle className="text-2xl font-bold text-center text-purple-100">Card Release Schedule</CardTitle>
          <div className="flex items-center justify-center gap-2 mt-2 p-2 bg-yellow-900/20 rounded-lg border border-yellow-400/50">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <p className="text-yellow-200 text-sm">
              Beta Version: All cards shown are subject to final balance adjustments from ongoing play-testing
            </p>
          </div>
          <p className="text-center text-purple-200 mt-4">
            Journey through 169 cards including 88 Basic Creatures, 21 Runes, 20 Counters, 30 Shields (15 Tier I, 10 Tier II, 5 Tier III), 6 Dragons, and 4 Elementalists
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schedule.map((week, index) => (
          <Card 
            key={index} 
            className={`${
              week.final 
                ? 'bg-yellow-900/20 border-2 border-yellow-400 text-purple-100' 
                : 'bg-purple-800/10 border border-purple-300/50 text-purple-100'
            }`}
          >
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">
                {week.final ? "Final Release" : `Week ${index + 1}`}
              </h3>
              <p className={`mb-4 ${week.final ? 'text-yellow-200' : 'text-purple-200'}`}>
                {week.date}
              </p>
              <div className="space-y-2">
                {week.details.map((detail, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className={
                      detail.isSpecial 
                        ? 'text-yellow-400 font-bold'
                        : week.final ? 'text-purple-100' : 'text-purple-100'
                    }>
                      {detail.type}
                    </span>
                    <span className={week.final ? 'text-yellow-200' : 'text-purple-200'}>
                      {detail.count} {detail.note && `(${detail.note})`}
                    </span>
                  </div>
                ))}
                <div className={`mt-3 pt-3 text-center ${
                  week.final 
                    ? 'border-t border-yellow-400/50 text-yellow-400' 
                    : 'border-t border-purple-300/50 text-yellow-400'
                }`}>
                  {week.featured}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 bg-purple-800/10 border border-purple-300/50">
        <CardContent className="p-4 text-center">
          <p className="text-purple-200">
            Stay updated! Follow us on X and join our Discord community for daily card reveals and discussions.
            Check out our Cards of the Week features every Monday!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReleaseSchedule; 