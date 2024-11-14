import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { rulesData } from '../data/rulesData';
import QuickStart from '../components/RulesComponents/QuickStart';
import FullRules from '../components/RulesComponents/FullRules';
import DeckBuilding from '../components/RulesComponents/DeckBuilding';
import CardTypes from '../components/RulesComponents/CardTypes';
import Gameplay from '../components/RulesComponents/Gameplay';
import Combat from '../components/RulesComponents/Combat';
import FAQ from '../components/RulesComponents/FAQ';
import TournamentRules from '../components/RulesComponents/TournamentRules';
import Elements from '../components/RulesComponents/Elements';

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
          <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
          <TabsTrigger value="fullrules">Full Rules</TabsTrigger>
          <TabsTrigger value="deckbuilding">Deck Building</TabsTrigger>
          <TabsTrigger value="cardtypes">Card Types</TabsTrigger>
          <TabsTrigger value="gameplay">Gameplay</TabsTrigger>
          <TabsTrigger value="combat">Combat</TabsTrigger>
          <TabsTrigger value="elements">Elements</TabsTrigger>
          <TabsTrigger value="tournament">Tournament Rules</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="quickstart">
          <QuickStart data={rulesData.quickStart} />
        </TabsContent>
        <TabsContent value="fullrules">
          <FullRules data={rulesData.fullRules} />
        </TabsContent>
        <TabsContent value="deckbuilding">
          <DeckBuilding data={rulesData.deckBuilding} />
        </TabsContent>
        <TabsContent value="cardtypes">
          <CardTypes data={rulesData.cardTypes} />
        </TabsContent>
        <TabsContent value="gameplay">
          <Gameplay data={rulesData.gameplay} />
        </TabsContent>
        <TabsContent value="combat">
          <Combat data={rulesData.combat} />
        </TabsContent>
        <TabsContent value="elements">
          <Elements data={rulesData.elements} />
        </TabsContent>
        <TabsContent value="tournament">
          <TournamentRules data={rulesData.tournament} />
        </TabsContent>
        <TabsContent value="faq">
          <FAQ data={rulesData.faq} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default RulesPage;