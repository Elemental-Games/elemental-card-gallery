import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { dragonInfo } from '../data/dragonInfo';

const KinbroldHistory = ({ setSelectedDragon, setSelectedElementalist }) => {
  return (
    <section className="w-full bg-background/95 backdrop-blur-sm p-8">
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
                    <div 
                      key={dragon.name} 
                      className="p-4 rounded-lg border-2 border-accent bg-purple-100 dark:bg-purple-900/30 cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-800/30 transition-colors"
                      onClick={() => setSelectedDragon(dragon)}
                    >
                      <h5 className="font-heading text-lg text-purple-900 dark:text-purple-100">{dragon.name}</h5>
                      <p className="text-sm text-purple-800 dark:text-purple-200">{dragon.description}</p>
                      <p className="text-xs text-purple-600 dark:text-purple-300 mt-2 italic">Click to see the dragon</p>
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
                    {[
                      { name: 'Galea', description: 'of the Air, founding Zalos in the windswept heights' },
                      { name: 'Mek', description: 'of the Water, establishing Tsunareth by the eternal tides' },
                      { name: 'Osao', description: 'of the Fire, raising Scarto from volcanic depths' },
                      { name: 'Balon', description: 'of the Earth, growing Grivoss from the fertile soil' }
                    ].map((elementalist) => (
                      <div 
                        key={elementalist.name}
                        onClick={() => setSelectedElementalist({ 
                          name: elementalist.name, 
                          image: `/tour/${elementalist.name.toLowerCase()}1.png` 
                        })}
                        className="p-4 rounded-lg border-2 border-accent bg-purple-100 dark:bg-purple-900/30 cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-800/30 transition-colors"
                      >
                        <h5 className="font-heading text-purple-900 dark:text-purple-100">{elementalist.name}</h5>
                        <p className="text-sm text-purple-800 dark:text-purple-200">{elementalist.description}</p>
                        <p className="text-xs text-purple-600 dark:text-purple-300 mt-2 italic">Click to see the Elementalist</p>
                      </div>
                    ))}
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