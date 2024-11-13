import React from 'react';
import { Card } from "@/components/ui/card";

const GrivossPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800/10 to-green-800/30">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1472396961693-142e6e269027"
          alt="Mountains of Grivoss" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-heading text-white mb-2">Grivoss: The Earth Kingdom</h1>
          <p className="text-xl md:text-2xl font-heading text-white italic">Where Stone Meets Spirit</p>
        </div>
      </section>

      {/* Welcome Statement */}
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-xl text-green-200">
          <span className="font-bold">Welcome to Grivoss,</span> where the very mountains pulse with ancient power. Under the guidance of Terra the Earth Elementalist, 
          our kingdom stands as an unshakeable testament to strength and resilience.
        </h2>
      </div>

      <div className="container mx-auto py-8 space-y-8">
        {/* Mountain Heritage */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border border-green-300/50 bg-green-800/10 text-green-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Our Mountain Heritage</h2>
            <p className="text-lg">
              When Terra first claimed these peaks, they were considered impenetrable. Through mastery of earth magic 
              and unwavering determination, we carved our civilization into the very heart of the mountains, creating 
              a kingdom as enduring as the stone itself.
            </p>
          </Card>
          <img 
            src="https://images.unsplash.com/photo-1493962853295-0fd70327578a"
            alt="Mountain Peaks of Grivoss" 
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
        </div>

        {/* Life in the Mountains */}
        <div className="grid md:grid-cols-2 gap-6">
          <img 
            src="https://images.unsplash.com/photo-1438565434616-3ef039228b15"
            alt="Daily Life in Grivoss" 
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
          <Card className="p-6 border border-green-300/50 bg-green-800/10 text-green-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Life in the Mountains</h2>
            <p className="text-lg">
              Our cities are marvels of engineering, with grand halls carved directly into the mountainsides. The famous 
              Crystal Caverns provide natural lighting throughout our underground networks, while our terraced gardens 
              demonstrate our mastery over stone and soil alike.
            </p>
          </Card>
        </div>

        {/* Training and Innovation */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 border border-green-300/50 bg-green-800/10 text-green-100">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Training the Next Generation</h2>
            <p className="text-lg">
              Young earth elementals begin their training in our sacred stone circles, learning to feel the pulse of the 
              earth beneath their feet. Only those who understand that true strength comes from unwavering patience and 
              dedication can master our element.
            </p>
          </Card>
          <img 
            src="https://images.unsplash.com/photo-1485833077593-4278bba3f11f"
            alt="Training Grounds" 
            className="w-full h-full object-cover rounded-lg shadow-xl"
          />
        </div>

        {/* Relations and Notable Locations */}
        <Card className="p-6 border border-green-300/50 bg-green-800/10 text-green-100">
          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Relations with Other Kingdoms</h2>
          <p className="text-lg mb-6">
            Our mastery of metallurgy and stone-crafting makes us invaluable to all of Kinbrold. Our trade in precious 
            gems and metals flows as steadily as the underground rivers that sustain our realm.
          </p>

          <h2 className="text-2xl font-heading mb-4 text-yellow-400">Notable Locations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="list-disc list-inside text-lg space-y-2">
              <li>The Stone Academy: Where earth elementals master their craft</li>
              <li>The Crystal Caverns: Our natural light source</li>
              <li>Terra's Peak: The seat of our kingdom's leadership</li>
              <li>The Mountain Forge: Where earth-aspected cards are crafted</li>
              <li>The Emerald Markets: Our renowned trading district</li>
            </ul>
            <img 
              src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d"
              alt="Notable Locations" 
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>

          <div className="mt-8 p-6 bg-green-800/20 rounded-lg border border-green-300/50">
            <h2 className="text-2xl font-heading mb-4 text-yellow-400">Wisdom of the Mountains</h2>
            <blockquote className="text-lg italic">
              "Like the mountains themselves, we stand unmoved by the storms of time. In Grivoss, we don't just master earth – we become one with its eternal strength."
            </blockquote>
            <p className="text-right mt-2 font-heading text-yellow-400">- Terra, First Earth Elementalist</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GrivossPage;