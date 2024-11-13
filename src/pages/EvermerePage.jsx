import React from 'react';
import { Card } from "@/components/ui/card";

const EvermerePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-800/10 to-purple-800/30">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <img 
          src="/kingdoms/evermere_art.png" 
          alt="Evermere Kingdom" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-heading text-white mb-2">Evermere: The Central Kingdom</h1>
          <p className="text-xl md:text-2xl font-heading text-white italic">Where All Elements Unite</p>
        </div>
      </section>

      {/* Welcome Statement */}
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-xl text-purple-200">
          <span className="font-bold">Welcome to Evermere,</span> where all elemental forces converge in perfect harmony. 
          As the seat of balance and unity, it serves as a meeting ground for elementalists from all corners of the realm.
        </h2>
      </div>

      <div className="container mx-auto py-8 space-y-8">
        {/* Life in Evermere */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border border-purple-300/50 bg-purple-800/10 text-purple-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Life in Evermere</h2>
            <p className="text-lg">
              Daily life in Evermere is a vibrant tapestry of different cultures and practices. 
              The streets buzz with the energy of multiple elements, while citizens from all kingdoms 
              come together in celebration of their shared heritage.
            </p>
          </Card>
          <img 
            src="/kingdoms/evermere_life.png" 
            alt="Daily Life" 
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
        </div>

        {/* Innovation Hub */}
        <div className="grid md:grid-cols-2 gap-6">
          <img 
            src="/kingdoms/evermere_innovation.png" 
            alt="Innovation in Evermere" 
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
          <Card className="p-6 border border-purple-300/50 bg-purple-800/10 text-purple-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Innovation Hub</h2>
            <p className="text-lg">
              Evermere stands as the pinnacle of magical advancement, where scholars and practitioners 
              work together to push the boundaries of elemental mastery. The kingdom's innovative spirit 
              drives progress throughout all of Kinbrold.
            </p>
          </Card>
        </div>

        {/* Training and Wisdom */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border border-purple-300/50 bg-purple-800/10 text-purple-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Training Grounds</h2>
            <p className="text-lg">
              The training grounds of Evermere are where elementalists perfect their craft, learning to 
              harness the power of multiple elements in harmony. These sacred spaces have witnessed countless 
              breakthroughs in elemental mastery.
            </p>
          </Card>
          <img 
            src="/kingdoms/evermere_training.png" 
            alt="Training Grounds" 
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
        </div>

        {/* Notable Locations */}
        <Card className="p-6 border border-purple-300/50 bg-purple-800/10 text-purple-100">
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Notable Locations</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>The Convergence: Where all elemental energies meet</li>
              <li>The Grand Library: Repository of elemental knowledge</li>
              <li>The Unity Plaza: Center of diplomatic relations</li>
              <li>The Elemental Academy: Where masters train disciples</li>
              <li>The Harmony Gardens: A place of meditation and peace</li>
            </ul>
            <img 
              src="/kingdoms/evermere_wisdom.png" 
              alt="Wisdom of Evermere" 
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>

          <div className="mt-8 p-6 bg-purple-800/20 rounded-lg border border-purple-300/50">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Words of Unity</h2>
            <blockquote className="text-lg italic">
              "In Evermere, we don't just study elements – we learn to weave them together in harmony, 
              creating something greater than the sum of its parts."
            </blockquote>
            <p className="text-right mt-2 font-heading text-yellow-400">- The Council of Elements</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EvermerePage;