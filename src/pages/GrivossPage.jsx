import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

const GrivossPage = () => {
  return (
    <PageTransition type="grivoss">
      <Helmet>
        <title>Grivoss - The Earth Kingdom | Elemental Masters TCG</title>
        <meta name="description" content="Explore Grivoss, the mighty Earth Kingdom of Kinbrold. Discover its mountains, caves, and the powerful earth elementals that call this realm home." />
        <meta name="keywords" content="Grivoss, Earth Kingdom, Elemental Masters, earth elementals, TCG lore, fantasy kingdom" />
        <meta property="og:title" content="Grivoss - The Earth Kingdom | Elemental Masters TCG" />
        <meta property="og:description" content="Journey through Grivoss, where earth elementals shape the very mountains. Experience the might of the Earth Kingdom in Elemental Masters." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://elementalgames.gg/kinbrold/grivoss" />
      </Helmet>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Grivoss</h1>
        <p className="mb-4">
          Grivoss is the Earth Kingdom of Kinbrold, a land of towering mountains and deep caves. It is home to the powerful earth elementals who thrive in this rugged terrain. Journey through Grivoss to discover its rich lore and the elementals that inhabit it.
        </p>
        <h2 className="text-2xl font-semibold mt-8">Key Locations</h2>
        <ul className="list-disc list-inside">
          <li>The Great Stone Fortress</li>
          <li>Emerald Caves</li>
          <li>Geyser Fields</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8">Elemental Masters</h2>
        <p>
          In Grivoss, the Earth Elementals are masters of defense and resilience. They protect their kingdom with unwavering strength, making it a challenging place for intruders.
        </p>
      </div>
    </PageTransition>
  );
};

export default GrivossPage;
