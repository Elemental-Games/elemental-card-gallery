import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { rulesData } from '../data/rulesData';
import QuickStart from '../components/RulesComponents/QuickStart';
import FullRules from '../components/RulesComponents/FullRules';
import DeckBuilding from '../components/RulesComponents/DeckBuilding';
import CardTypes from '../components/RulesComponents/CardTypes';
import Gameplay from '../components/RulesComponents/Gameplay';
import Combat from '../components/RulesComponents/Combat';
import FAQ from '../components/RulesComponents/FAQ';
import Elements from '../components/RulesComponents/Elements';

const RulesPage = () => {
  const [activeTab, setActiveTab] = React.useState("quickstart");
  const sections = [
    { value: "quickstart", label: "Quick Start" },
    { value: "fullrules", label: "Full Rules" },
    { value: "deckbuilding", label: "Deck Building" },
    { value: "cardtypes", label: "Card Types" },
    { value: "gameplay", label: "Gameplay" },
    { value: "combat", label: "Combat" },
    { value: "elements", label: "Elements" },
    { value: "faq", label: "FAQ" },
  ];

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

      {/* Mobile Dropdown */}
      <div className="md:hidden w-full mb-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {sections.find(s => s.value === activeTab)?.label}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            <DropdownMenuGroup>
              {sections.map((section) => (
                <DropdownMenuItem 
                  key={section.value}
                  onClick={() => setActiveTab(section.value)}
                >
                  {section.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop Tabs */}
      <Tabs 
        defaultValue="quickstart" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="hidden md:block">
          <TabsList className="mb-8 flex flex-wrap gap-2 justify-start">
            {sections.map((section) => (
              <TabsTrigger key={section.value} value={section.value}>
                {section.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="mt-8">
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
          <TabsContent value="faq">
            <FAQ data={rulesData.faq} />
          </TabsContent>
        </div>
      </Tabs>
    </motion.div>
  );
};

export default RulesPage;