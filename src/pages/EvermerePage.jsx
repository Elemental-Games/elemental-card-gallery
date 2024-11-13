import React from 'react';
import { Helmet } from 'react-helmet-async';

const EvermerePage = () => {
  return (
    <>
      <Helmet>
        <title>Evermere - The Central Kingdom | Elemental Masters TCG</title>
        <meta name="description" content="Discover Evermere, the central kingdom of Kinbrold where all elements converge. Learn about its rich history, notable landmarks, and role in the Elemental Masters universe." />
        <meta name="keywords" content="Evermere, Elemental Masters kingdom, central kingdom, TCG lore, fantasy world, trading card game" />
        <meta property="og:title" content="Evermere - The Central Kingdom | Elemental Masters TCG" />
        <meta property="og:description" content="Explore Evermere, where all elements unite in harmony. Uncover the mysteries of this pivotal kingdom in the Elemental Masters universe." />
        <meta property="og:type" content="article" />
        <link rel="canonical" href="https://elementalgames.gg/kinbrold/evermere" />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Welcome to Evermere</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">The Heart of Kinbrold</h2>
          <p className="mb-4">
            Evermere stands as the central kingdom of Kinbrold, where all elemental forces converge in perfect harmony. 
            As the seat of balance and unity, it serves as a meeting ground for elementalists from all corners of the realm.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Notable Landmarks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-medium mb-2">The Crystal Spire</h3>
              <p>A towering structure of pure crystal that channels and amplifies elemental energies.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">The Great Grove</h3>
              <p>A sacred garden where all elements coexist, creating unique hybrid flora.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">Elemental Confluence</h3>
              <p>The central plaza where the energies of all kingdoms meet and mix.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">The Academy</h3>
              <p>Where young elementalists learn to master their powers and understand the balance of all elements.</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Culture & Society</h2>
          <p className="mb-4">
            Evermere's society is built on principles of harmony and balance. Its citizens celebrate the unity of elements 
            through various festivals and ceremonies throughout the year. The kingdom serves as a neutral ground for 
            diplomatic relations between all other realms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Role in Elemental Masters</h2>
          <p>
            As the central kingdom, Evermere plays a crucial role in maintaining peace and balance among all elemental 
            kingdoms. It's here where the most powerful combinations of elemental magic are studied and mastered, 
            making it a key location in the world of Elemental Masters.
          </p>
        </section>
      </div>
    </>
  );
};

export default EvermerePage;