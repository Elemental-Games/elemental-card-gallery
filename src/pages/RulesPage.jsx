import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';

const RulesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-6">Elemental Masters Rulebook</h1>
      
      <Button className="mb-6" onClick={() => window.open('/rulebook.pdf', '_blank')}>
        <Download className="mr-2 h-4 w-4" /> Download Rulebook PDF
      </Button>

      <Tabs defaultValue="quickstart" className="w-full">
        <TabsList className="mb-4 flex flex-wrap justify-start">
          <TabsTrigger value="quickstart" className="mb-2 mr-2">Quick Start</TabsTrigger>
          <TabsTrigger value="fullrules" className="mb-2 mr-2">Full Rules</TabsTrigger>
          <TabsTrigger value="deckbuilding" className="mb-2 mr-2">Deck Building</TabsTrigger>
          <TabsTrigger value="cardtypes" className="mb-2 mr-2">Card Types</TabsTrigger>
          <TabsTrigger value="gameplay" className="mb-2 mr-2">Gameplay</TabsTrigger>
          <TabsTrigger value="combat" className="mb-2 mr-2">Combat</TabsTrigger>
          <TabsTrigger value="faq" className="mb-2 mr-2">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="quickstart">
          <h2 className="text-2xl font-semibold mb-4">Quick Start Guide</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Build a deck of 40 cards.</li>
            <li>Place 3 shields (1 of each tier) face-down and draw 5 cards.</li>
            <li>Flip a coin to decide who goes first.</li>
            <li>On your turn, draw a card and generate essence from your creatures.</li>
            <li>Play creatures, runes, and counters using essence.</li>
            <li>Attack opponent's creatures or shields during the battle phase.</li>
            <li>Reduce opponent's health points to 0 or play "Ancient Sigil" to win!</li>
          </ol>
        </TabsContent>

        <TabsContent value="fullrules">
          <Accordion type="single" collapsible>
            <AccordionItem value="setup">
              <AccordionTrigger>Game Setup</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Each player starts with a deck of 40 cards.</li>
                  <li>Place 3 shields (1 of each tier) face-down in front of you.</li>
                  <li>Draw 5 cards to form your starting hand.</li>
                  <li>Flip a coin to determine who goes first.</li>
                  <li>The player going first cannot attack on their first turn.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="turn">
              <AccordionTrigger>Turn Structure</AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Draw Phase: Draw one card from your deck.</li>
                  <li>Essence Generation: Generate essence based on your creatures on the field.</li>
                  <li>Main Phase 1: Play creatures, runes, and counters. Activate abilities.</li>
                  <li>Battle Phase: Declare attacks with your creatures one at a time.</li>
                  <li>Main Phase 2: Play runes and counters, activate abilities (no new creatures).</li>
                  <li>End Phase: Pass the turn to your opponent.</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="winning">
              <AccordionTrigger>Winning the Game</AccordionTrigger>
              <AccordionContent>
                <p>There are two ways to win:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Reduce your opponent's health points to 0 (starting at 500).</li>
                  <li>Collect all 4 ancient elemental cards and play the "Ancient Sigil" rune.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="deckbuilding">
          <h2 className="text-2xl font-semibold mb-4">Deck Building Rules</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Your main deck must contain exactly 40 cards.</li>
            <li>You must have 3 shield cards (1 of each tier) separate from your main deck.</li>
            <li>For casual play, there are no restrictions on card quantities.</li>
            <li>For competitive play, refer to the restrictions section in the rulebook.</li>
          </ul>
        </TabsContent>

        <TabsContent value="cardtypes">
          <h2 className="text-2xl font-semibold mb-4">Card Types</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Creatures: Main battling units from 4 elements (Air, Water, Fire, Earth).</li>
            <li>Dragons: Special creatures of 6 combinational elements (Frost, Sand, Lava, Poison, Crystal, Lightning).</li>
            <li>Runes: Support cards similar to spell cards in other TCGs.</li>
            <li>Counters: Reactive cards that can be played during your opponent's turn.</li>
            <li>Shields: Defensive cards that protect your health points and provide powerful effects when broken.</li>
          </ul>
        </TabsContent>

        <TabsContent value="gameplay">
          <h2 className="text-2xl font-semibold mb-4">Gameplay Mechanics</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="resource">
              <AccordionTrigger>Resource System (Essence)</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Each creature generates essence of its element every turn.</li>
                  <li>Essence can be generated at any time via card effects and runes.</li>
                  <li>There is no limit to how much essence you can store.</li>
                  <li>Use essence to play cards and activate abilities.</li>
                  <li>Essence is treated as an in-game currency.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="special">
              <AccordionTrigger>Special Mechanics</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Elements do not have type advantages unlike other games.</li>
                  <li>Cards feature QR codes that can be scanned to reveal additional information.</li>
                  <li>QR codes provide access to card info, lore, synergies, best decks, and counters.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="combat">
          <h2 className="text-2xl font-semibold mb-4">Combat System</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Creatures attack individually, one at a time.</li>
            <li>Vertical orientation indicates a creature can attack, block, or dodge.</li>
            <li>Horizontal orientation means the creature is out of actions.</li>
            <li>Strength determines damage dealt and health.</li>
            <li>Agility determines speed for dodging or blocking.</li>
            <li>Shields have different health tiers: Tier 1 (150), Tier 2 (300), Tier 3 (450).</li>
            <li>When a shield breaks, its owner chooses one of two effects to activate.</li>
            <li>Players have 500 health points.</li>
            <li>You can only attack the opponent directly if they have no shields.</li>
          </ul>
        </TabsContent>

        <TabsContent value="faq">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="faq1">
              <AccordionTrigger>Can I attack on the first turn of the game?</AccordionTrigger>
              <AccordionContent>
                No, the player who goes first cannot attack on their very first turn.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq2">
              <AccordionTrigger>How many cards can I have in my hand?</AccordionTrigger>
              <AccordionContent>
                There is no maximum hand size unless specified by a card effect.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq3">
              <AccordionTrigger>Can I play multiple creatures in one turn?</AccordionTrigger>
              <AccordionContent>
                Yes, you can play multiple creatures as long as you have enough essence to summon them.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default RulesPage;