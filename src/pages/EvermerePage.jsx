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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-6">Welcome to Evermere</h1>
            <p className="text-lg mb-4">
              Evermere stands as the central kingdom of Kinbrold, where all elemental forces converge in perfect harmony. 
              As the seat of balance and unity, it serves as a meeting ground for elementalists from all corners of the realm.
            </p>
          </div>
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <img 
              src="/kingdoms/evermere_art.png" 
              alt="Evermere Kingdom"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="relative h-[250px] rounded-lg overflow-hidden">
            <img 
              src="/kingdoms/evermere_heart.png" 
              alt="The Heart of Evermere"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
              <h3 className="text-white text-xl font-bold">The Heart</h3>
              <p className="text-white/90">Where all elements unite in harmony</p>
            </div>
          </div>
          <div className="relative h-[250px] rounded-lg overflow-hidden">
            <img 
              src="/kingdoms/evermere_innovation.png" 
              alt="Innovation in Evermere"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
              <h3 className="text-white text-xl font-bold">Innovation</h3>
              <p className="text-white/90">Center of magical advancement</p>
            </div>
          </div>
          <div className="relative h-[250px] rounded-lg overflow-hidden">
            <img 
              src="/kingdoms/evermere_wisdom.png" 
              alt="Wisdom of Evermere"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
              <h3 className="text-white text-xl font-bold">Wisdom</h3>
              <p className="text-white/90">Repository of ancient knowledge</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <img 
              src="/kingdoms/evermere_training.png" 
              alt="Training Grounds"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
              <h3 className="text-white text-2xl font-bold">Training Grounds</h3>
              <p className="text-white/90">Where elementalists master their craft</p>
            </div>
          </div>
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <img 
              src="/kingdoms/evermere_life.png" 
              alt="Daily Life"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
              <h3 className="text-white text-2xl font-bold">Daily Life</h3>
              <p className="text-white/90">The bustling heart of civilization</p>
            </div>
          </div>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-3xl font-bold mb-4">The Path to Evermere</h2>
          <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
            <img 
              src="/path/evermere_path.png" 
              alt="Path to Evermere"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <p className="text-lg mb-4">
            The journey to Evermere is one of discovery and wonder. As travelers approach the central kingdom, 
            they witness the convergence of all elemental energies, creating spectacular displays of natural harmony.
          </p>
        </div>
      </div>
    </>
  );
};

export default EvermerePage;