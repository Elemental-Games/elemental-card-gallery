import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const ReleaseSchedule = () => {
  const schedule = [
    {
      week: 1,
      date: "January 10th - January 16th",
      details: [
        { type: "Basic Creatures", count: 16, note: "4 per element" },
        { type: "Rune Cards", count: 4, note: "Normal Runes" },
        { type: "Counter Cards", count: 4, note: "Normal Counters" },
        { type: "Dragon", count: 1, note: "First Dragon Revealed", isSpecial: true }
      ],
      featured: "If we hit $500 in donations this week, we will give one random donor a free A COMPLETE SET post-launch!"
    },
    {
      week: 2,
      date: "January 17th - January 23rd",
      details: [
        { type: "Basic Creatures", count: 20, note: "5 per element" },
        { type: "Rune Cards", count: 4, note: "Normal Runes" },
        { type: "Tier I Shields", count: 5, note: "Basic protection" },
        { type: "Dragon", count: 1, note: "Second dragon emerges", isSpecial: true }
      ],
      featured: "The top 3 Donors of the Week will each receive 5 free packs of their choice post-launch!"
    },
    {
      week: 3,
      date: "January 24th - January 30th",
      details: [
        { type: "Basic Creatures", count: 20, note: "5 per element" },
        { type: "Rune Cards", count: 5, note: "Normal Runes" },
        { type: "Counter Cards", count: 8, note: "Normal Counters" },
        { type: "Tier I Shields", count: 5, note: "Enhanced protection" },
        { type: "Dragon", count: 1, note: "Third dragon rises", isSpecial: true }
      ],
      featured: "The Top Donor of the Week will receive a custom game mat designed by our artist using the card of their choice!"
    },
    {
      week: 4,
      date: "January 31st - February 6th",
      details: [
        { type: "Basic Creatures", count: 16, note: "4 per element" },
        { type: "Rune Cards", count: 4, note: "Normal Runes" },
        { type: "Counter Cards", count: 8, note: "Normal Counters" },
        { type: "Tier II Shields", count: 5, note: "Advanced shields" },
        { type: "Dragon", count: 1, note: "Fourth dragon is awoken", isSpecial: true }
      ],
      featured: "The top 3 Donors of the Week will each receive an exclusive Deck Box, Game Mat, and Essence Tokens!"
    },
    {
      week: 5,
      date: "February 7th - February 13th",
      details: [
        { type: "Basic Creatures", count: 16, note: "4 per element" },
        { type: "Rune Cards", count: 4, note: "Normal Runes" },
        { type: "Tier II Shields", count: 5, note: "Power shields" },
        { type: "Tier III Shields", count: 2, note: "First legendary shields" },
        { type: "Dragon", count: 1, note: "Fifth dragon unleashed!", isSpecial: true }
      ],
      featured: "The Top 5 Donors of the Week will each receive 2 starter decks (of their choice) and respective deck boxes, game mats, and essence tokens with each deck!"
    },
    {
      final: true,
      date: "February 14th - February 21st",
      details: [
        { type: "Final Dragon", count: 1, note: "The ultimate dragon revealed!", isSpecial: true },
        { type: "Elementalists", count: 4, note: "The masters unleashed!", isSpecial: true },
        { type: "Tier III Shields", count: 3, note: "Final legendary shields", isSpecial: true },
        { type: "Secret Cards", count: 4, note: "Special reveal!", isSpecial: true }
      ],
      featured: "Top Overall Donor will receive a 1/1 alternate art card of their choice! The top 3 Overall Top Donors will receive a custom deck (40-60 cards) using cards of their choice. Each card in the deckwill be in a special limited edition design!"
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
            We'll be giving away prizes, packs, and more to random followers on our social media accounts every week!
          </p>
          <p className="text-center text-purple-200 mt-4">
            Set 1: Champions of Kinbrold includes 169 cards including 88 Basic Creatures, 21 Runes, 20 Counters, 30 Shields (15 Tier I, 10 Tier II, 5 Tier III), 6 Dragons, and 4 Elementalists
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
            Stay updated! Follow us on{' '}
            <a 
              href="https://x.com/elemental_tcg" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              X
            </a>
            {' '}and join our{' '}
            <a 
              href="https://discord.gg/PVrgZBmcMq" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              Discord
            </a>
            {' '}community for daily card reveals and discussions.
            Check out our Cards of the Week features every Monday!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReleaseSchedule; 