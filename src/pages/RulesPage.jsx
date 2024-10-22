import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import QuickStart from '../components/RulesComponents/QuickStart';
import FullRules from '../components/RulesComponents/FullRules';
import DeckBuilding from '../components/RulesComponents/DeckBuilding';
import CardTypes from '../components/RulesComponents/CardTypes';
import Gameplay from '../components/RulesComponents/Gameplay';
import Combat from '../components/RulesComponents/Combat';
import FAQ from '../components/RulesComponents/FAQ';
import { rulesData } from '../data/rulesData';

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

        <TabsContent value="quickstart"><QuickStart data={rulesData.quickStart} /></TabsContent>
        <TabsContent value="fullrules"><FullRules data={rulesData.fullRules} /></TabsContent>
        <TabsContent value="deckbuilding"><DeckBuilding data={rulesData.deckBuilding} /></TabsContent>
        <TabsContent value="cardtypes"><CardTypes data={rulesData.cardTypes} /></TabsContent>
        <TabsContent value="gameplay"><Gameplay data={rulesData.gameplay} /></TabsContent>
        <TabsContent value="combat"><Combat data={rulesData.combat} /></TabsContent>
        <TabsContent value="faq"><FAQ data={rulesData.faq} /></TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default RulesPage;