import React from 'react';
import { Card } from "@/components/ui/card";

const GrivossPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800/10 to-green-800/30">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <img 
          src="/kingdoms/grivoss_realm.png" 
          alt="Realm of Grivoss" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-heading text-white mb-2">Grivoss: The Earth Kingdom</h1>
          <p className="text-xl md:text-2xl font-heading text-white italic">Realm of Natural Bounty</p>
        </div>
      </section>

      {/* Welcome Statement */}
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-xl text-green-200">
          <span className="font-bold">Welcome to Grivoss,</span> where the very land breathes with ancient power. Under the guidance of Balon the Earth Elementalist, 
          our kingdom has flourished into a realm of endless diversity, from our deepest caverns to our highest forest canopies.
        </h2>
      </div>

      <div className="container mx-auto py-8 space-y-8">
        {/* Enduring Heritage */}
        <Card className="p-6 border border-green-300/50 bg-green-800/10 text-green-100">
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Our Enduring Heritage</h2>
          <p className="text-lg">
            When Balon chose this region, they recognized the power in its diversity. Through mastery of earth magic, 
            we've become stewards of every terrain - the verdant forests, life-giving rivers, mysterious caverns, and 
            even the challenging badlands. Our cities blend seamlessly with nature, built both among the treetops and 
            within the earth itself.
          </p>
        </Card>

        {/* Life Among Nature's Glory */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border border-green-300/50 bg-green-800/10 text-green-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Life Among Nature's Glory</h2>
            <p className="text-lg">
              Life in Grivoss flows with the rhythm of nature itself. Our forest cities rise organically from the earth, 
              connected by bridges both above and below ground. The Stone Guardians patrol every terrain, from the 
              mushroom-lit caverns to the windswept badlands. In the ancient ruins, scholars study the wisdom of past 
              civilizations, while in our fertile valleys, earth elementals help cultivate the richest harvests in all of Kinbrold.
            </p>
          </Card>
          <img 
            src="/kingdoms/grivoss_life.png" 
            alt="Life in Grivoss" 
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
        </div>

        {/* The Way of Earth */}
        <div className="grid md:grid-cols-2 gap-6">
          <img 
            src="/kingdoms/grivoss_way.png" 
            alt="The Way of Earth" 
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
          <Card className="p-6 border border-green-300/50 bg-green-800/10 text-green-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">The Way of Earth</h2>
            <p className="text-lg">
              In Grivoss, we believe that true strength comes from understanding all aspects of our element. Our philosophy 
              teaches that like the earth itself, we must be as adaptable as forest soil yet as enduring as mountain stone. 
              Our seasonal festivals celebrate this unity, gathering people from every corner of our diverse realm.
            </p>
          </Card>
        </div>

        {/* Training and Innovation */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border border-green-300/50 bg-green-800/10 text-green-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Training the Next Generation</h2>
            <p className="text-lg">
              Young earth elementals learn to connect with every aspect of their element. They train in the dense forests 
              to understand growth, in rivers to learn flexibility, in caverns to master darkness, and in the badlands to 
              appreciate endurance. Only by mastering each aspect can they truly understand the whole.
            </p>
            <h2 className="text-2xl font-heading mb-4 mt-6 text-yellow-400">Innovation and Progress</h2>
            <p className="text-lg">
              Our engineers work in harmony with nature, creating sustainable solutions that serve both the people and the land. 
              Crystal energy systems power our cities while enhanced farming techniques feed our people. Our famous terraced 
              gardens are considered wonders of the world.
            </p>
          </Card>
          <img 
            src="/kingdoms/grivoss_training.png" 
            alt="Training in Grivoss" 
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
        </div>

        {/* Relations and Notable Locations */}
        <Card className="p-6 border border-green-300/50 bg-green-800/10 text-green-100">
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Relations with Other Kingdoms</h2>
          <p className="text-lg mb-6">
            As masters of cultivation and natural resources, we supply unique materials to all kingdoms. Our trade routes 
            wind through every terrain, from underground tunnels to forest paths, while our diplomatic centers welcome 
            visitors to experience every facet of earth's bounty.
          </p>

          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Notable Locations</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>The Living Academy: Where young earth elementals master their craft</li>
              <li>The Ancient Ruins: Sites of historical study and meditation</li>
              <li>Balon's Grove: The seat of our kingdom's leadership</li>
              <li>The Earth Forge: Where earth-aspected cards are crafted</li>
              <li>The Forest Markets: Our renowned trading centers spread 
                  throughout the canopy</li>
              <li>The Crystal Caverns: Our sacred meditation spaces</li>
              <li>The Badland Trials: Where earth elementals test their endurance</li>
            </ul>
            <img 
              src="/kingdoms/grivoss_notable.png" 
              alt="Notable Locations" 
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>

          <div className="mt-8 p-6 bg-green-800/20 rounded-lg border border-green-300/50">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Wisdom of the Earth</h2>
            <img 
              src="/kingdoms/grivoss_wisdom.png" 
              alt="Wisdom of the Earth" 
              className="w-full h-64 object-cover rounded-lg shadow-xl mb-4"
            />
            <blockquote className="text-lg italic">
              "Like the earth itself, we embrace both nurturing abundance and steadfast strength. In Grivoss, we don't just 
              master earth – we become one with every aspect of its nature."
            </blockquote>
            <p className="text-right mt-2 font-heading text-yellow-400">- Balon, First Earth Elementalist</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GrivossPage;