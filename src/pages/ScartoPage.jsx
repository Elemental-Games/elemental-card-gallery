import React from 'react';
import { Card } from "@/components/ui/card";

const ScartoPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-800/10 to-red-800/30">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <img 
          src="/images/kingdom-headers/scarto-header.webp" 
          alt="Volcanic Scarto" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-heading text-white mb-2">Scarto: The Fire Kingdom</h1>
          <p className="text-xl md:text-2xl font-heading text-white italic">Where Fire Forges Destiny</p>
        </div>
      </section>

      {/* Welcome Statement */}
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-xl text-red-200">
          <span className="font-bold">Welcome to Scarto,</span> where passion burns eternal and the very earth blazes with power. Under the guidance of Osao the Fire Elementalist, 
          our kingdom has risen from the volcanic depths to become a beacon of strength and determination.
        </h2>
      </div>

      <div className="container mx-auto py-8 space-y-8">
        {/* Burning Heritage */}
        <Card className="p-6 border border-red-300/50 bg-red-800/10 text-red-100">
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Our Burning Heritage</h2>
          <p className="text-lg">
            When Osao claimed this volcanic realm, many thought it uninhabitable. Through mastery of fire magic and sheer will, 
            we transformed these molten peaks into a thriving civilization. Our cities rise from the heat, protected by advanced 
            cooling systems and powered by the endless energy of the earth's core.
          </p>
          <p className="text-xs text-gray-400 italic mt-4">
            The below images are AI generated solely for story-reference purposes, and will be professionally illustrated post-launch.
          </p>
        </Card>

        {/* Life Amid the Flames */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border border-red-300/50 bg-red-800/10 text-red-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Life Amid the Flames</h2>
            <p className="text-lg">
              Life in Scarto pulses with energy. Our famous blacksmiths craft the finest weapons and tools in all of Kinbrold, 
              their forges fed by volcanic heat. The Flame Trials, held regularly in our grand arenas, showcase the power and 
              control of our fire elementals, while our thermal energy systems power everything from homes to workshops.
            </p>
          </Card>
          <img 
            src="/kingdoms/scarto_daily.png" 
            alt="Daily Life in Scarto" 
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
        </div>

        {/* The Way of Fire */}
        <div className="grid md:grid-cols-2 gap-6">
          <img 
            src="/kingdoms/scarto_flame.png" 
            alt="Fire Training" 
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
          <Card className="p-6 border border-red-300/50 bg-red-800/10 text-red-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">The Way of Fire</h2>
            <p className="text-lg">
              In Scarto, we believe that mastering fire means mastering oneself. Our philosophy teaches that true power comes 
              not from the ability to create flames, but from the wisdom to control them. Every citizen learns that fire can 
              either forge or destroy – the choice lies in the wielder's heart.
            </p>
          </Card>
        </div>

        {/* Training and Innovation */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border border-red-300/50 bg-red-800/10 text-red-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Training the Next Generation</h2>
            <p className="text-lg">
              Our training emphasizes discipline above all. Young fire elementals begin with candle exercises, learning to 
              maintain and control the smallest flames before advancing to more powerful techniques. The path is challenging, 
              but it forges the strongest spirits in all of Kinbrold.
            </p>
            <h2 className="text-2xl font-heading mb-4 mt-6 text-yellow-400">Innovation and Progress</h2>
            <p className="text-lg">
              Our engineers have revolutionized thermal energy use, creating sustainable power systems that harness volcanic heat. 
              The infamous Scarto Cooling Systems allow us to live comfortably amid the blazing temperatures, while our forges 
              produce the finest metalwork in the realm.
            </p>
          </Card>
          <img 
            src="/kingdoms/scarto_young.png" 
            alt="Young Fire Elementals" 
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
        </div>

        {/* Relations and Notable Locations */}
        <Card className="p-6 border border-red-300/50 bg-red-800/10 text-red-100">
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Relations with Other Kingdoms</h2>
          <p className="text-lg mb-6">
            While our volatile environment keeps some at a distance, our mastery of metallurgy and energy production makes us 
            invaluable to all of Kinbrold. Our trade in forged goods and heat-resistant materials flows as steadily as our lava rivers.
          </p>

          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Notable Locations</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>The Blazing Academy: Where young fire elementals are tempered</li>
              <li>The Grand Forges: Center of our crafting excellence</li>
              <li>Osao's Spire: The seat of our kingdom's leadership</li>
              <li>The Flameheart: Where fire-aspected cards are crafted</li>
              <li>The Obsidian Markets: Our renowned trading district</li>
            </ul>
            <img 
              src="/kingdoms/scarto_grand.png" 
              alt="Grand Architecture of Scarto" 
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>

          <div className="mt-8 p-6 bg-red-800/20 rounded-lg border border-red-300/50">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Wisdom of the Flame</h2>
            <img 
              src="/kingdoms/scarto_meditate.png" 
              alt="Meditation in Scarto" 
              className="w-full h-64 object-cover object-center rounded-lg shadow-xl mb-4"
            />
            <blockquote className="text-lg italic">
              "Like fire itself, we burn with purpose and illuminate the path forward. In Scarto, we don't just master fire – we embody its transformative power."
            </blockquote>
            <p className="text-right mt-2 font-heading text-yellow-400">- Osao, First Fire Elementalist</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ScartoPage;
