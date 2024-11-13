import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/PageTransition';

const EvermerePage = () => {
  return (
    <PageTransition type="evermere">
      <Helmet>
        <title>Evermere - The Central Kingdom | Elemental Masters TCG</title>
        <meta name="description" content="Discover Evermere, the central kingdom of Kinbrold where all elements converge. Learn about its rich history, notable landmarks, and role in the Elemental Masters universe." />
        <meta name="keywords" content="Evermere, Elemental Masters kingdom, central kingdom, TCG lore, fantasy world, trading card game" />
        <meta property="og:title" content="Evermere - The Central Kingdom | Elemental Masters TCG" />
        <meta property="og:description" content="Explore Evermere, where all elements unite in harmony. Uncover the mysteries of this pivotal kingdom in the Elemental Masters universe." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://elementalgames.gg/kinbrold/evermere" />
      </Helmet>
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Evermere</h1>
        <p className="text-lg mb-8">The central kingdom where all elemental forces converge.</p>
        <img src="/images/evermere.png" alt="Evermere" className="mx-auto mb-8" />
        <h2 className="text-2xl font-semibold mb-2">History</h2>
        <p className="mb-4">Evermere is known for its harmonious blend of all elemental powers. It serves as the heart of Kinbrold.</p>
        <h2 className="text-2xl font-semibold mb-2">Key Landmarks</h2>
        <ul className="list-disc list-inside mb-4">
          <li>The Crystal Spire</li>
          <li>Elemental Confluence</li>
          <li>The Great Grove</li>
        </ul>
        <p>Join us in exploring everything Evermere has to offer!</p>
      </div>
    </PageTransition>
  );
};

export default EvermerePage;
