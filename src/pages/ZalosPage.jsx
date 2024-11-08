import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

const ZalosPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading mb-4">Zalos - Kingdom of Air</h1>
          <p className="text-xl text-muted-foreground">Where Innovation Takes Flight</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <img 
              src="/kingdoms/zalos_citadels.png" 
              alt="Floating citadels of Zalos" 
              className="w-full h-[300px] object-cover rounded-lg shadow-xl"
            />
            <p className="mt-4 text-center text-sm text-muted-foreground">The floating citadels of Zalos</p>
          </div>
          <div>
            <img 
              src="/kingdoms/zalos_dojo.png" 
              alt="Air element training dojo" 
              className="w-full h-[300px] object-cover rounded-lg shadow-xl"
            />
            <p className="mt-4 text-center text-sm text-muted-foreground">Our prestigious air element training dojo</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Innovation & Progress</h2>
            <p className="text-lg leading-relaxed mb-6">
              Zalos stands as a testament to human ingenuity and the mastery of air magic. Our floating cities and advanced 
              technology showcase what's possible when tradition meets innovation. We're proud to be the source of many 
              breakthrough discoveries in elemental mastery.
            </p>
          </div>
          <div>
            <img 
              src="/kingdoms/zalos_innovation.png" 
              alt="Innovation in Zalos" 
              className="w-full h-[300px] object-cover rounded-lg shadow-xl"
            />
            <p className="mt-4 text-center text-sm text-muted-foreground">Innovation drives our kingdom forward</p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-purple-800/20 rounded-lg border border-purple-300/50">
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Relations</h2>
          <p className="text-lg leading-relaxed">
            As the Kingdom of Air, we maintain strong diplomatic ties with all other kingdoms, particularly through our 
            extensive trade networks and cultural exchanges. Our relationship with Evermere is especially close, as we 
            share many philosophical and technological interests.
          </p>
        </div>

        <div className="mt-8 p-6 bg-purple-800/20 rounded-lg border border-purple-300/50">
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Notable Locations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="list-disc list-inside text-lg space-y-2 mb-6">
              <li>The Floating Academy: Where young air elementals learn their craft</li>
              <li>Wind Dancer's Plaza: Center of our cultural celebrations</li>
              <li>Galea's Spire: The seat of our kingdom's leadership</li>
              <li>The Cloudforge: Where air-aspected cards are crafted</li>
              <li>Skybridge Network: Our famous transportation system</li>
            </ul>
            <img 
              src="/kingdoms/zalos_zen.png" 
              alt="Meditation in Zalos" 
              className="w-full h-full object-cover rounded-lg shadow-xl self-end"
            />
          </div>
        </div>

        <div className="mt-8 p-6 bg-purple-800/20 rounded-lg border border-purple-300/50">
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Wisdom of the Winds</h2>
          <ScrollArea className="h-[200px] rounded-md border p-4">
            <p className="text-lg leading-relaxed">
              In Zalos, we believe that true wisdom comes from understanding the ever-changing nature of the winds. 
              Just as the air flows freely around obstacles, we too must learn to adapt and find new paths forward. 
              This philosophy guides not only our magical practices but our approach to governance, innovation, and 
              daily life.
            </p>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ZalosPage;