import React from 'react';
import { Card } from "@/components/ui/card";

const GrivossPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800/10 to-green-800/30">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <img 
          src="/kingdoms/grivoss_realm.png"
          alt="Mountains of Grivoss" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-heading text-white mb-2">Grivoss: The Earth Kingdom</h1>
          <p className="text-xl md:text-2xl font-heading text-white italic">Where Stone Meets Spirit</p>
        </div>
      </section>

      {/* Content Grid */}
      <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Daily Life */}
        <Card className="p-6 border border-green-300/50 bg-green-800/10 text-green-100">
          <img 
            src="/kingdoms/grivoss_life.png"
            alt="Daily Life in Grivoss" 
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Daily Life</h2>
          <p className="text-lg">
            Life in Grivoss revolves around the mighty mountains and deep caverns. Our people have mastered the art of living in harmony with the stone, creating magnificent underground cities and terraced gardens that cascade down mountainsides.
          </p>
        </Card>

        {/* Training */}
        <Card className="p-6 border border-green-300/50 bg-green-800/10 text-green-100">
          <img 
            src="/kingdoms/grivoss_training.png"
            alt="Training Grounds" 
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Training</h2>
          <p className="text-lg">
            Young earth elementals begin their journey in the sacred stone circles, learning to feel the pulse of the earth beneath their feet. Only through unwavering patience and dedication can they master our element.
          </p>
        </Card>

        {/* Notable Locations */}
        <Card className="p-6 border border-green-300/50 bg-green-800/10 text-green-100">
          <img 
            src="/kingdoms/grivoss_notable.png"
            alt="Notable Locations" 
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Notable Locations</h2>
          <p className="text-lg">
            From the grand halls of Terra's Peak to the mystical Crystal Caverns, Grivoss is home to many wonders. The Mountain Forge stands as a testament to our mastery over earth and metal.
          </p>
        </Card>

        {/* Way of Life */}
        <Card className="p-6 border border-green-300/50 bg-green-800/10 text-green-100">
          <img 
            src="/kingdoms/grivoss_way.png"
            alt="Way of Life" 
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Way of Life</h2>
          <p className="text-lg">
            The people of Grivoss value strength, stability, and perseverance. Our connection to the earth runs deep, influencing everything from our architecture to our daily customs.
          </p>
        </Card>

        {/* Wisdom */}
        <Card className="p-6 border border-green-300/50 bg-green-800/10 text-green-100">
          <img 
            src="/kingdoms/grivoss_wisdom.png"
            alt="Ancient Wisdom" 
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Ancient Wisdom</h2>
          <p className="text-lg">
            "Like the mountains themselves, we stand unmoved by the storms of time. In Grivoss, we don't just master earth – we become one with its eternal strength." - Terra, First Earth Elementalist
          </p>
        </Card>
      </div>
    </div>
  );
};

export default GrivossPage;