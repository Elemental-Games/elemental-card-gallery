import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { fetchRulesData } from '../utils/api';
import QuickStart from '../components/RulesComponents/QuickStart';
import FullRules from '../components/RulesComponents/FullRules';
import DeckBuilding from '../components/RulesComponents/DeckBuilding';
import CardTypes from '../components/RulesComponents/CardTypes';
import Gameplay from '../components/RulesComponents/Gameplay';
import Combat from '../components/RulesComponents/Combat';
import FAQ from '../components/RulesComponents/FAQ';

const RulesPage = () => {
  const { data: rulesData, isLoading, error } = useQuery({
    queryKey: ['rulesData'],
    queryFn: fetchRulesData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Add new rules to the existing rulesData
  const updatedRulesData = {
    ...rulesData,
    gameplay: [
      ...rulesData.gameplay,
      "You can have a maximum of 5 creatures on the field at one time.",
      "You can only normal summon once per turn, regardless of the creature's essence cost.",
      "For creatures that cost essence to summon, you may tribute one creature on your side of the field (send to the graveyard) and receive the essence it generates per turn in return for tributing it. This essence can be used to fund the tribute summon, but it's not required.",
      "A maximum of 5 rune/counter cards can be placed at one time.",
      "You can have a maximum of 7 cards in hand, unless explicitly stated otherwise by a card effect."
    ]
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

        <TabsContent value="quickstart"><QuickStart data={updatedRulesData.quickStart} /></TabsContent>
        <TabsContent value="fullrules"><FullRules data={updatedRulesData.fullRules} /></TabsContent>
        <TabsContent value="deckbuilding"><DeckBuilding data={updatedRulesData.deckBuilding} /></TabsContent>
        <TabsContent value="cardtypes"><CardTypes data={updatedRulesData.cardTypes} /></TabsContent>
        <TabsContent value="gameplay"><Gameplay data={updatedRulesData.gameplay} /></TabsContent>
        <TabsContent value="combat"><Combat data={updatedRulesData.combat} /></TabsContent>
        <TabsContent value="faq"><FAQ data={updatedRulesData.faq} /></TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default RulesPage;