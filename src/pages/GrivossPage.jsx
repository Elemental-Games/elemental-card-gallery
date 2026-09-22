import React from 'react';
import { Card } from "@/components/ui/card";
import { MMO_IMAGES } from '@/config/site';

const GrivossPage = () => {
  const art = MMO_IMAGES.grivoss;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800/10 to-green-800/30">
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src={art}
          alt="Vast Kingdom of Grivoss"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-heading text-white mb-2">Grivoss: Realm of Natural Bounty</h1>
          <p className="text-xl md:text-2xl font-heading text-white italic">Where Earth Breathes Life</p>
        </div>
      </section>

      <div className="container mx-auto py-8 text-center">
        <h2 className="text-xl text-green-200">
          <span className="font-bold">Welcome to Grivoss,</span> where the very land breathes with ancient power. Under the guidance of Balon the Earth Elementalist, 
          our kingdom has flourished into a realm of endless diversity, from our deepest caverns to our highest forest canopies.
        </h2>
      </div>

      <div className="container mx-auto py-8 space-y-8">
        <Card className="p-6 border border-green-300/50 bg-green-800/10 text-green-100">
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Our Enduring Heritage</h2>
          <p className="text-lg">
            When Balon chose this region, they recognized the power in its diversity. Through mastery of earth magic, 
            we&apos;ve become stewards of every terrain - the verdant forests, life-giving rivers, mysterious caverns, and 
            even the challenging badlands. Our cities blend seamlessly with nature, built both among the treetops and 
            within the earth itself.
          </p>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border border-green-300/50 bg-green-800/10 text-green-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Life Among Nature&apos;s Glory</h2>
            <p className="text-lg">
              Life in Grivoss flows with the rhythm of nature itself. Our forest cities rise organically from the earth, 
              connected by bridges both above and below ground. The Stone Guardians patrol every terrain, from the 
              mushroom-lit caverns to the windswept badlands.
            </p>
          </Card>
          <img src={art} alt="Grivoss in Kinbrold" className="w-full h-full min-h-[240px] object-cover rounded-lg shadow-xl" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <img src={art} alt="The Way of Earth in Grivoss" className="w-full h-full min-h-[240px] object-cover rounded-lg shadow-xl" />
          <Card className="p-6 border border-green-300/50 bg-green-800/10 text-green-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">The Way of Earth</h2>
            <p className="text-lg">
              In Grivoss, we believe that true strength comes from understanding all aspects of our element. Our philosophy 
              teaches that like the earth itself, we must be as adaptable as forest soil yet as enduring as mountain stone.
            </p>
          </Card>
        </div>

        <Card className="p-6 border border-green-300/50 bg-green-800/10 text-green-100">
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Wisdom of the Earth</h2>
          <img src={art} alt="Grivoss kingdom" className="w-full h-64 object-cover object-center rounded-lg shadow-xl mb-4" />
          <blockquote className="text-lg italic">
            &quot;Like the earth itself, we embrace both nurturing abundance and steadfast strength. In Grivoss, we don&apos;t just master earth – we become one with every aspect of its nature.&quot;
          </blockquote>
          <p className="text-right mt-2 font-heading text-yellow-400">- Balon, First Earth Elementalist</p>
        </Card>
      </div>
    </div>
  );
};

export default GrivossPage;
