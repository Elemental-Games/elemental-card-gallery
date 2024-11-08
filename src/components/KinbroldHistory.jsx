import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { dragonInfo } from '../data/dragonInfo';

const KinbroldHistory = () => {
  return (
    <section className="w-full bg-background/95 backdrop-blur-sm p-8 mt-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-heading text-center mb-12">The History of Kinbrold</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollArea className="h-[600px] rounded-md border p-6">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-heading mb-4">The Dawn of Kinbrold</h3>
                <p className="text-muted-foreground leading-relaxed">
                  In the beginning, Kinbrold was a realm untamed, where ancient dragons soared freely across unified lands. These weren't mere beasts, but manifestations of elemental power in their purest form. The skies thundered with the wings of Air dragons, the seas churned with Water wyrms, the mountains trembled with Earth drakes, and valleys blazed with Fire serpents.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-heading mb-3">The Legendary Dragons</h4>
                <div className="space-y-2">
                  {Object.values(dragonInfo).map((dragon) => (
                    <div key={dragon.name} className="p-4 rounded-lg border-2 border-yellow-500/50 bg-purple-900/10">
                      <h5 className="font-heading text-lg text-purple-100">{dragon.name}</h5>
                      <p className="text-sm text-purple-200">{dragon.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>

          <ScrollArea className="h-[600px] rounded-md border p-6">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-heading mb-4">The Rise of Civilization</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Among the dragons dwelled humans, some born with remarkable gifts—the ability to harness elemental powers. These first Elementals built Evermere, a sanctuary where all could gather regardless of their elemental affinity. It was here that a discovery would change Kinbrold forever.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-heading mb-4">The Birth of Elemental Masters</h3>
                <p className="text-muted-foreground leading-relaxed">
                  When creatures fell in battle, they left behind not just their physical forms, but the very essence of their elemental power. The craftsmen of Evermere discovered they could combine these remains with elemental essence to forge powerful cards, birthing the game of Elemental Masters.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  What began as a means of training and competition soon became the foundation of Kinbrold's society. The game grew beyond sport, becoming currency, status, and a way of life.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-heading mb-4">The Age of Kingdoms</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Four great Elementalists arose, each mastering their respective elements:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border-2 border-yellow-500/50 bg-purple-900/10">
                      <h5 className="font-heading text-purple-100">Galea of the Air</h5>
                      <p className="text-sm text-purple-200">Founding Zalos in the windswept heights</p>
                    </div>
                    <div className="p-4 rounded-lg border-2 border-yellow-500/50 bg-purple-900/10">
                      <h5 className="font-heading text-purple-100">Mek of the Water</h5>
                      <p className="text-sm text-purple-200">Establishing Tsunareth by the eternal tides</p>
                    </div>
                    <div className="p-4 rounded-lg border-2 border-yellow-500/50 bg-purple-900/10">
                      <h5 className="font-heading text-purple-100">Osao of the Fire</h5>
                      <p className="text-sm text-purple-200">Raising Scarto from volcanic depths</p>
                    </div>
                    <div className="p-4 rounded-lg border-2 border-yellow-500/50 bg-purple-900/10">
                      <h5 className="font-heading text-purple-100">Balon of the Earth</h5>
                      <p className="text-sm text-purple-200">Growing Grivoss from the fertile soil</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};

export default KinbroldHistory;