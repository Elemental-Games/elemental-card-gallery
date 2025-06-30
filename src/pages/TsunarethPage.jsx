import React from 'react';
import { Card } from "@/components/ui/card";

const TsunarethPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800/10 to-blue-800/30">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <img 
          src="/images/kingdom-headers/tsunareth-header.webp" 
          alt="Tsunareth Crystal City" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-heading text-white mb-2">Tsunareth: The Water Kingdom</h1>
          <p className="text-xl md:text-2xl font-heading text-white italic">Depths of Wisdom</p>
        </div>
      </section>

      {/* Welcome Statement */}
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-xl text-blue-200">
          <span className="font-bold">Welcome to Tsunareth,</span> where the eternal tides shape our lives and wisdom flows like the currents. Under the guidance of Mek the Water Elementalist, 
          our kingdom has evolved into a harmonious blend of surface and submarine societies.
        </h2>
      </div>

      <div className="container mx-auto py-8 space-y-8">
        {/* Fluid Heritage */}
        <Card className="p-6 border border-blue-300/50 bg-blue-800/10 text-blue-100">
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Our Fluid Heritage</h2>
          <p className="text-lg">
            When Mek founded our kingdom, they recognized the power in adaptability. Our civilization spans three tiers - surface harbors for commerce, 
            mid-level coral cities for daily life, and the sacred depths where our most ancient secrets dwell.
          </p>
          <p className="text-xs text-gray-400 italic mt-4">
            The below images are AI generated solely for story-reference purposes, and will be professionally illustrated post-launch.
          </p>
        </Card>

        {/* Life Beneath the Waves */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border border-blue-300/50 bg-blue-800/10 text-blue-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Life Beneath the Waves</h2>
            <p className="text-lg">
              Life in Tsunareth flows like water itself - always moving, always changing. Our cities feature crystal-powered water purification systems, 
              while tidal energy powers our civilization. Special breathing apparatus allows visitors from other kingdoms to explore our underwater realms, 
              while our famous pressure chambers help young water elementals develop their powers.
            </p>
          </Card>
          <img 
            src="/kingdoms/tsunareth_tiered.png" 
            alt="Life in Tsunareth" 
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
        </div>

        {/* The Way of Water */}
        <div className="grid md:grid-cols-2 gap-6">
          <img 
            src="/kingdoms/tsunareth_training.png" 
            alt="Water Training" 
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
          <Card className="p-6 border border-blue-300/50 bg-blue-800/10 text-blue-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">The Way of Water</h2>
            <p className="text-lg">
              In Tsunareth, we believe that true strength lies in adaptability. Our training focuses not just on manipulating water, 
              but understanding its nature - sometimes gentle, sometimes overwhelming, but always essential. Our famous Pearl Divers Guild 
              combines this philosophy with practical skill, producing the finest aquatic harvesters in all of Kinbrold.
            </p>
          </Card>
        </div>

        {/* Training and Innovation */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border border-blue-300/50 bg-blue-800/10 text-blue-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Training the Next Generation</h2>
            <p className="text-lg">
              The path to mastering water requires understanding both its gentle and powerful natures. Our students train in specialized 
              pressure chambers, learning to manipulate water in all its forms - liquid, ice, and vapor. Only those who grasp water's 
              dual nature of nurturing and overwhelming force can truly master our element.
            </p>
            <h2 className="text-2xl font-heading mb-4 mt-6 text-yellow-400">Innovation and Progress</h2>
            <p className="text-lg">
              Our engineers have mastered the art of crystal-powered water purification and tidal energy harvesting. These technologies 
              not only sustain our underwater cities but also provide clean water to all of Kinbrold, making us vital to the world's prosperity.
            </p>
          </Card>
          <img 
            src="/kingdoms/tsunareth_young.png" 
            alt="Young Water Elementals" 
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
        </div>

        {/* Relations and Notable Locations */}
        <Card className="p-6 border border-blue-300/50 bg-blue-800/10 text-blue-100">
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Relations with Other Kingdoms</h2>
          <p className="text-lg mb-6">
            As masters of water purification and tidal energy, we maintain strong trade relationships with all kingdoms. 
            Our underwater trade routes are the safest in Kinbrold, protected by our elite Tide Guardians.
          </p>

          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Notable Locations</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>The Tidal Academy: Where young water elementals master their craft</li>
              <li>The Pearl Spires: Our famous surface-level diplomatic centers</li>
              <li>Mek's Grotto: The seat of our kingdom's leadership</li>
              <li>The Abyssal Forge: Where water-aspected cards are crafted</li>
              <li>The Coral Markets: Our renowned underwater trading centers</li>
            </ul>
            <img 
              src="/kingdoms/tsunareth_ancient.png" 
              alt="Sacred Depths of Tsunareth" 
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>

          <div className="mt-8 p-6 bg-blue-800/20 rounded-lg border border-blue-300/50">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Wisdom of the Tides</h2>
            <blockquote className="text-lg italic">
              "Like water itself, we adapt, we flow, we persist. In Tsunareth, we don't simply master water – we become one with its eternal dance."
            </blockquote>
            <p className="text-right mt-2 font-heading text-yellow-400">- Mek, First Water Elementalist</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TsunarethPage;