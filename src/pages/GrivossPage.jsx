import React from 'react';
import { Helmet } from 'react-helmet-async';

const GrivossPage = () => {
  return (
    <>
      <Helmet>
        <title>Grivoss - The Earth Kingdom | Elemental Masters TCG</title>
        <meta name="description" content="Explore Grivoss, the mighty Earth Kingdom of Kinbrold. Discover its mountains, caves, and the powerful earth elementals that call this realm home." />
        <meta name="keywords" content="Grivoss, Earth Kingdom, Elemental Masters, earth elementals, TCG lore, fantasy kingdom" />
        <meta property="og:title" content="Grivoss - The Earth Kingdom | Elemental Masters TCG" />
        <meta property="og:description" content="Journey through Grivoss, where earth elementals shape the very mountains. Experience the might of the Earth Kingdom in Elemental Masters." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://elementalgames.gg/kinbrold/grivoss" />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Welcome to Grivoss</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">The Mountain's Heart</h2>
          <p className="mb-4">
            Grivoss, the Earth Kingdom of Kinbrold, stands as a testament to strength and endurance. Its towering 
            mountains and deep caverns are home to the most powerful earth elementals, who shape the very land 
            itself with their ancient magic.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-medium mb-2">The Great Stone Fortress</h3>
              <p>An impenetrable stronghold carved directly into the mountain face.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Emerald Caves</h3>
              <p>A vast network of crystalline caverns that glow with natural earth energy.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">The Training Grounds</h3>
              <p>Where earth elementalists hone their powers and learn to command the very mountains.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Geyser Fields</h3>
              <p>Natural hot springs that provide healing and rejuvenation to the kingdom's inhabitants.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Culture & Traditions</h2>
          <p className="mb-4">
            The people of Grivoss value strength, resilience, and tradition above all else. Their architecture 
            reflects their connection to the earth, with buildings carved directly into the mountainsides. The 
            kingdom's warriors are known throughout Kinbrold for their unwavering determination and powerful 
            earth-based abilities.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Earth Elementals</h2>
          <p>
            In Grivoss, the Earth Elementals are masters of defense and resilience. They protect their kingdom 
            with unwavering strength, making it one of the most secure realms in all of Kinbrold. Their connection 
            to the earth allows them to perform incredible feats of power, from raising mountains to creating 
            impenetrable barriers of stone.
          </p>
        </section>
      </div>
    </>
  );
};

export default GrivossPage;