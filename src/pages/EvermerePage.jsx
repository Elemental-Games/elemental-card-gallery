import React from 'react';
import { Card } from "@/components/ui/card";

const EvermerePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-800/10 to-purple-800/30">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <img 
          src="/kingdoms/evermere_evermere.png" 
          alt="Evermere" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-heading text-white mb-2">Evermere: The Central Kingdom</h1>
          <p className="text-xl md:text-2xl font-heading text-white italic">Crossroads of Elements</p>
        </div>
      </section>

      {/* Welcome Statement */}
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-xl text-purple-200">
          <span className="font-bold">Welcome to Evermere,</span> the beating heart of Kinbrold where all elements converge. Neither dominated by any single element nor lacking in power, our kingdom stands as testament to unity and innovation, home to the legendary Card Crafters' Guild.
        </h2>
      </div>

      <div className="container mx-auto py-8 space-y-8">
        {/* Unifying Heritage */}
        <Card className="p-6 border border-purple-300/50 bg-purple-800/10 text-purple-100">
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Our Unifying Heritage</h2>
          <p className="text-lg">
            Before the elemental kingdoms rose, Evermere stood as humanity's first great city. It was here that the art of card crafting was born, where the first elementals learned to harness creature essences and forge them into powerful tools.
          </p>
        </Card>

        {/* Life at the Crossroads */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border border-purple-300/50 bg-purple-800/10 text-purple-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Life at the Crossroads</h2>
            <p className="text-lg">
              Life in Evermere pulses with the energy of all elements. Our streets bustle with visitors from every kingdom, while the Card Crafters' Guild works tirelessly to create new cards. The sound of commerce mingles with the hum of elemental energy as traders, crafters, and seekers of knowledge come together.
            </p>
          </Card>
          <img 
            src="/kingdoms/evermere_life.png" 
            alt="Life in Evermere" 
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
        </div>

        {/* The Art of Card Crafting */}
        <div className="grid md:grid-cols-2 gap-6">
          <img 
            src="/kingdoms/evermere_art.png" 
            alt="Card Crafting" 
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
          <Card className="p-6 border border-purple-300/50 bg-purple-800/10 text-purple-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">The Art of Card Crafting</h2>
            <p className="text-lg">
              In Evermere, we believe that true power lies in understanding and harmony. The Card Crafters' Guild maintains the ancient art of transforming creature essences into cards, a process that requires both technical precision and artistic finesse. Each card represents a perfect balance of power and control.
            </p>
          </Card>
        </div>

        {/* Training the Next Generation */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border border-purple-300/50 bg-purple-800/10 text-purple-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Training the Next Generation</h2>
            <p className="text-lg">
              The path to becoming a master card crafter requires understanding all elements. Our academy welcomes students regardless of their elemental affinity - or lack thereof. Here, technical skill meets artistic vision as apprentices learn to capture and preserve creature essences.
            </p>
          </Card>
          <img 
            src="/kingdoms/evermere_training.png" 
            alt="Training in Evermere" 
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
        </div>

        {/* Innovation and Progress */}
        <div className="grid md:grid-cols-2 gap-6">
          <img 
            src="/kingdoms/evermere_innovation.png" 
            alt="Innovation in Evermere" 
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
          <Card className="p-6 border border-purple-300/50 bg-purple-800/10 text-purple-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Innovation and Progress</h2>
            <p className="text-lg">
              Our researchers continuously push the boundaries of card crafting technology. The Grand Archives house the accumulated knowledge of generations, while our testing grounds allow for safe experimentation with new card designs.
            </p>
          </Card>
        </div>

        {/* The Heart of Trade */}
        <div className="mt-8 p-6 bg-purple-800/20 rounded-lg border border-purple-300/50">
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">The Heart of Trade</h2>
          <img 
            src="/kingdoms/evermere_heart.png" 
            alt="Heart of Trade" 
            className="w-full h-64 object-cover rounded-lg shadow-xl mb-4 object-[center_65%]"
          />
          <p className="text-lg text-purple-100">
            Our markets never sleep, our crafters never rest, and our doors never close. In Evermere, all are welcome to trade, learn, and grow. Here, the future of Kinbrold is forged one card at a time.
          </p>
        </div>

        {/* Relations and Notable Locations */}
        <Card className="p-6 border border-purple-300/50 bg-purple-800/10 text-purple-100">
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Relations with Other Kingdoms</h2>
          <p className="text-lg mb-6">
            As the neutral heart of Kinbrold, we maintain perfect diplomatic balance. Our markets serve as the primary trading hub for all kingdoms, while our crafting facilities provide essential services to elementals and non-elementals alike.
          </p>

          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Notable Locations</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>The Card Crafters' Guild Hall: Center of card creation</li>
              <li>The Grand Archives: Repository of all crafting knowledge</li>
              <li>The Neutral Council Chamber: Where kingdoms meet in peace</li>
              <li>The Testing Grounds: Where new cards are evaluated</li>
              <li>The Great Market: The largest trading center in Kinbrold</li>
            </ul>
            <img 
              src="/kingdoms/evermere_notable.png" 
              alt="Notable Locations" 
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>

          <div className="mt-8 p-6 bg-purple-800/20 rounded-lg border border-purple-300/50">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Wisdom of Unity</h2>
            <img 
              src="/kingdoms/evermere_wisdom.png" 
              alt="Wisdom of Unity" 
              className="w-full h-64 object-cover rounded-lg shadow-xl mb-4 object-[center_65%]"
            />
            <blockquote className="text-lg italic">
              "Through understanding comes unity, through unity comes strength. In Evermere, we don't master elements – we master the art of bringing them together."
            </blockquote>
            <p className="text-right mt-2 font-heading text-yellow-400">- First Grand Crafter of Evermere</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EvermerePage;