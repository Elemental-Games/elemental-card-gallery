import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LearnToPlayPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-6">Learn to Play Elemental Masters</h1>

      <Tabs defaultValue="basics" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="basics">Basics</TabsTrigger>
          <TabsTrigger value="mechanics">Game Mechanics</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="basics">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <iframe
                className="w-full h-[400px] rounded-lg"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Basic Tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <ScrollArea className="h-[200px] rounded-md border p-4">
              <ul className="list-disc list-inside space-y-2">
                <li>Build a deck of 40 cards</li>
                <li>Place 3 shields (1 of each tier) face-down</li>
                <li>Draw 5 cards for your starting hand</li>
                <li>Generate essence from your creatures</li>
                <li>Play creatures, runes, and counters using essence</li>
                <li>Attack opponent's creatures or shields</li>
                <li>Reduce opponent's health points to 0 to win!</li>
              </ul>
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="mechanics">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Core Game Mechanics</h2>
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <iframe
                className="w-full h-[400px] rounded-lg"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Game Mechanics"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <ScrollArea className="h-[200px] rounded-md border p-4">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Key Elements</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Creatures:</strong> Main battling units from 4 elements</li>
                  <li><strong>Runes:</strong> Support cards with immediate effects</li>
                  <li><strong>Counters:</strong> Reaction cards for strategic plays</li>
                  <li><strong>Shields:</strong> Defensive cards with powerful effects</li>
                  <li><strong>Essence:</strong> Resource for playing cards</li>
                </ul>
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="strategies">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Basic Strategies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Aggressive Strategy</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Focus on low-cost, high-damage creatures</li>
                  <li>Use Fire and Air elements for quick attacks</li>
                  <li>Minimize defensive cards</li>
                  <li>Target opponent's shields early</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Defensive Strategy</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Prioritize Earth and Water elements</li>
                  <li>Use counter cards effectively</li>
                  <li>Build strong defensive positions</li>
                  <li>Focus on resource management</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Control Strategy</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Use effect-heavy creatures</li>
                  <li>Control the battlefield with runes</li>
                  <li>Disrupt opponent's plays</li>
                  <li>Build card advantage</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Combo Strategy</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Focus on card synergies</li>
                  <li>Build towards powerful combinations</li>
                  <li>Use Ancient Elements effectively</li>
                  <li>Protect key combo pieces</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Advanced Techniques</h2>
            <div className="aspect-w-16 aspect-h-9 mb-6">
              <iframe
                className="w-full h-[400px] rounded-lg"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Advanced Strategies"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <ScrollArea className="h-[200px] rounded-md border p-4">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Pro Tips</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Timing your counter cards effectively</li>
                  <li>Managing essence economy</li>
                  <li>Reading opponent's strategies</li>
                  <li>Shield placement tactics</li>
                  <li>Element combination strategies</li>
                </ul>
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default LearnToPlayPage;