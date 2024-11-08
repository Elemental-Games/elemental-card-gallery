import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

const ZalosPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-800/10 to-purple-800/30 text-foreground">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <img 
          src="/kingdoms/zalos_citadels.png" 
          alt="Zalos Citadels" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-heading mb-4">Zalos: Where Wind Meets Wisdom</h1>
          </div>
        </div>
      </section>

      <ScrollArea className="h-[calc(100vh-50vh)] container mx-auto py-8">
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Introduction */}
          <Card className="p-6 bg-white/90 backdrop-blur">
            <p className="text-lg">
              Welcome to Zalos, jewel of the skies and home of the Air Elementals. Under the guidance of Galea the Air Elementalist, 
              our kingdom has soared to unprecedented heights – quite literally!
            </p>
          </Card>

          {/* Noble Heritage */}
          <Card className="p-6 bg-white/90 backdrop-blur">
            <h2 className="text-2xl font-heading mb-4">Our Noble Heritage</h2>
            <p className="text-lg">
              When Galea first established our kingdom, she chose the highest peaks of Kinbrold to build our home. 
              Through mastery of air magic, our ancestors learned to lift entire islands into the sky, creating the 
              floating archipelago we call home today.
            </p>
          </Card>

          {/* Life Among the Clouds */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white/90 backdrop-blur">
              <h2 className="text-2xl font-heading mb-4">Life Among the Clouds</h2>
              <p className="text-lg">
                Life in Zalos embraces our element in every way. Our cities float on massive islands held aloft by 
                ancient air magic, connected by bridges woven from concentrated wind. The legendary Sky Knights patrol 
                our domain on wind gliders, maintaining peace and order throughout our aerial realm.
              </p>
              <p className="text-lg mt-4">
                Our architecture reflects our philosophy: open, free, and ever-reaching upward. Crystal spires pierce 
                the clouds, while wind-powered elevators carry citizens between levels. Every building features meditation 
                platforms where one can commune with the winds and practice the art of air manipulation.
              </p>
            </Card>
            <img 
              src="/kingdoms/zalos_floating.png" 
              alt="Floating Cities of Zalos" 
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>

          {/* The Way of Air */}
          <div className="grid md:grid-cols-2 gap-6">
            <img 
              src="/kingdoms/zalos_dance.png" 
              alt="Wind Dancing in Zalos" 
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
            <Card className="p-6 bg-white/90 backdrop-blur">
              <h2 className="text-2xl font-heading mb-4">The Way of Air</h2>
              <p className="text-lg">
                In Zalos, we believe that to master air is to master oneself. Young elementals train in our open-air 
                academies, where learning to fly is considered as essential as learning to walk. Our annual Wind Dancing 
                festivals showcase the grace and power of air magic, as performers create spectacular aerial displays 
                that draw visitors from across Kinbrold.
              </p>
            </Card>
          </div>

          {/* Training and Innovation */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white/90 backdrop-blur">
              <h2 className="text-2xl font-heading mb-4">Training the Next Generation</h2>
              <p className="text-lg">
                The path to becoming an air elemental master involves rigorous training at our skyborne academies. 
                Students learn not just to manipulate air, but to understand its very nature. Only those who grasp 
                that air is not just about power, but about freedom and wisdom, truly master our element.
              </p>
              <h2 className="text-2xl font-heading mb-4 mt-6">Innovation and Progress</h2>
              <p className="text-lg">
                Our engineers have developed sophisticated wind turbine systems that power our cities, while our 
                wind tube transportation network offers rapid transit throughout the kingdom. These innovations 
                represent our commitment to harmonizing technology with our elemental powers.
              </p>
            </Card>
            <img 
              src="/kingdoms/zalos_zen.png" 
              alt="Meditation in Zalos" 
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>

          {/* Relations and Notable Locations */}
          <Card className="p-6 bg-white/90 backdrop-blur">
            <h2 className="text-2xl font-heading mb-4">Relations with Other Kingdoms</h2>
            <p className="text-lg mb-6">
              As masters of air travel, we serve as vital trade links between all kingdoms of Kinbrold. Our proximity 
              to Evermere's card crafters ensures we stay at the forefront of new card developments, while our natural 
              affinity for mobility makes us excellent diplomats and messengers.
            </p>

            <h2 className="text-2xl font-heading mb-4">Notable Locations</h2>
            <ul className="list-disc list-inside text-lg space-y-2 mb-6">
              <li>The Floating Academy: Where young air elementals learn their craft</li>
              <li>Wind Dancer's Plaza: Center of our cultural celebrations</li>
              <li>Galea's Spire: The seat of our kingdom's leadership</li>
              <li>The Cloudforge: Where air-aspected cards are crafted</li>
              <li>Skybridge Network: Our famous transportation system</li>
            </ul>

            <div className="mt-8 p-6 bg-purple-800/10 rounded-lg">
              <h2 className="text-2xl font-heading mb-4">Wisdom of the Winds</h2>
              <blockquote className="text-lg italic">
                "Like the wind itself, we remain free but purposeful, powerful yet gentle. In Zalos, we don't just 
                control the air – we become one with it."
              </blockquote>
              <p className="text-right mt-2 font-heading">- Galea, First Air Elementalist</p>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ZalosPage;