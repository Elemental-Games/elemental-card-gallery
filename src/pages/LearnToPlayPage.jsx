import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const LearnToPlayPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-6">Learn to Play</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tutorial Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="text-xl font-semibold mb-2">Basics of Elemental Masters</h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Basics of Elemental Masters"
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          </Card>
          <Card className="p-4">
            <h3 className="text-xl font-semibold mb-2">Advanced Strategies</h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Advanced Strategies"
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          </Card>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Strategy Articles</h2>
        <ul className="space-y-2">
          <li>
            <Link to="/articles/beginners-guide" className="text-blue-500 hover:underline">
              Beginner's Guide to Elemental Masters
            </Link>
          </li>
          <li>
            <Link to="/articles/deck-building-101" className="text-blue-500 hover:underline">
              Deck Building 101: Crafting Your First Deck
            </Link>
          </li>
          <li>
            <Link to="/articles/advanced-combos" className="text-blue-500 hover:underline">
              Advanced Combos and Synergies
            </Link>
          </li>
        </ul>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
        <div className="flex space-x-4">
          <Link to="/gameplay/rules">
            <Button variant="outline">Rules</Button>
          </Link>
          <Link to="/gameplay/rules#glossary">
            <Button variant="outline">Glossary of Terms</Button>
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default LearnToPlayPage;