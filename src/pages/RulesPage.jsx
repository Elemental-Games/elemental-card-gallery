import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Download, FileText } from 'lucide-react';

const RulesPage = () => {
  const [battleScenario, setBattleScenario] = useState({
    playerCards: ['Fire Elemental', 'Water Sprite'],
    opponentCards: ['Earth Golem', 'Air Wisp'],
    currentTurn: 'player',
  });

  const handlePlayCard = (card) => {
    alert(`You played ${card}! In a real game, this would affect the battle state.`);
  };

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

      <Tabs defaultValue="quickstart">
        <TabsList className="mb-4">
          <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
          <TabsTrigger value="fullrules">Full Rules</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="interactive">Interactive</TabsTrigger>
          <TabsTrigger value="glossary">Glossary</TabsTrigger>
        </TabsList>

        <TabsContent value="quickstart">
          <h2 className="text-2xl font-semibold mb-4">Quick Start Guide</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Shuffle your deck and draw 5 cards.</li>
            <li>Decide who goes first (flip a coin or roll a die).</li>
            <li>On your turn, you can play one element card and one action card.</li>
            <li>Attack your opponent's cards or directly if they have no cards.</li>
            <li>First player to reduce their opponent's life to 0 wins!</li>
          </ol>
        </TabsContent>

        <TabsContent value="fullrules">
          <Accordion type="single" collapsible>
            <AccordionItem value="setup">
              <AccordionTrigger>Game Setup</AccordionTrigger>
              <AccordionContent>
                <p>Each player starts with a deck of 40 cards, consisting of element cards and action cards. Shuffle your deck and draw 5 cards to form your starting hand. Place your deck face-down in your play area.</p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="turn">
              <AccordionTrigger>Turn Structure</AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal list-inside">
                  <li>Draw Phase: Draw one card from your deck.</li>
                  <li>Main Phase: Play element cards and action cards.</li>
                  <li>Battle Phase: Attack with your element cards.</li>
                  <li>End Phase: Discard down to 7 cards if necessary.</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="cardtypes">
              <AccordionTrigger>Card Types</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside">
                  <li>Element Cards: Represent creatures or characters with attack and defense values.</li>
                  <li>Action Cards: One-time effects that can be played during your main phase.</li>
                  <li>Reaction Cards: Can be played in response to your opponent's actions.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="faq">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="faq1">
              <AccordionTrigger>Can I play more than one element card per turn?</AccordionTrigger>
              <AccordionContent>
                No, you can only play one element card per turn unless a card effect allows otherwise.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq2">
              <AccordionTrigger>What happens if I run out of cards in my deck?</AccordionTrigger>
              <AccordionContent>
                If you need to draw a card and your deck is empty, you lose the game.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>

        <TabsContent value="interactive">
          <h2 className="text-2xl font-semibold mb-4">Interactive Battle Scenario</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="mb-2">Current Turn: {battleScenario.currentTurn}</p>
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">Your Cards:</h3>
                {battleScenario.playerCards.map((card, index) => (
                  <Button key={index} onClick={() => handlePlayCard(card)} className="mr-2 mb-2">
                    Play {card}
                  </Button>
                ))}
              </div>
              <div>
                <h3 className="font-semibold">Opponent's Cards:</h3>
                <ul>
                  {battleScenario.opponentCards.map((card, index) => (
                    <li key={index}>{card}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="glossary">
          <h2 className="text-2xl font-semibold mb-4">Glossary of Terms</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="element">
              <AccordionTrigger>Element</AccordionTrigger>
              <AccordionContent>
                The primary type of a card, representing one of the four basic elements: Air, Water, Earth, or Fire.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="essence">
              <AccordionTrigger>Essence</AccordionTrigger>
              <AccordionContent>
                The resource used to play cards and activate abilities. Each element has its own type of essence.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="fusion">
              <AccordionTrigger>Fusion</AccordionTrigger>
              <AccordionContent>
                A mechanic that allows you to combine two or more element cards to create a more powerful card.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Version History</h2>
        <ul className="list-disc list-inside">
          <li>v1.2 (Current): Added new 'Fusion' mechanic for combining elemental cards.</li>
          <li>v1.1: Balanced Water element cards to improve gameplay.</li>
          <li>v1.0: Initial release of Elemental Masters ruleset.</li>
        </ul>
      </section>
    </motion.div>
  );
};

export default RulesPage;