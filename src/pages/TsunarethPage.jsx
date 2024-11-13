import React from 'react';
import PageTransition from '../components/PageTransition';

const TsunarethPage = () => {
  return (
    <PageTransition type="tsunareth">
      <div className="min-h-screen bg-gradient-to-b from-blue-800/10 to-blue-800/30">
        {/* Hero Section */}
        <section className="relative h-[50vh] overflow-hidden">
          <img 
            src="/kingdoms/tsunareth_frozen.png" 
            alt="Frozen Tsunareth" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-heading text-white mb-2">Tsunareth: The Water Kingdom</h1>
            <p className="text-xl md:text-2xl font-heading text-white italic">"Where Water Flows Eternal"</p>
          </div>
        </section>

        {/* Welcome Statement */}
        <div className="container mx-auto py-8 text-center">
          <h2 className="text-xl text-blue-200">
            <span className="font-bold">Welcome to Tsunareth,</span> the kingdom of sea and ice, governed by the wisdom of the Water Elementals. Under the guidance of Aqua the Water Elementalist, our realm is a sanctuary of tranquility and strength.
          </h2>
        </div>

        <div className="container mx-auto py-8 space-y-8">
          {/* The Ocean’s Embrace */}
          <div className="p-6 border border-blue-300/50 bg-blue-800/10 text-blue-100">
            <h2 className="text-2xl font-heading mb-4 text-teal-400">The Ocean’s Embrace</h2>
            <p className="text-lg">
              Tsunareth is enveloped by endless oceans, where the waves sing the melodies of the ancients. Our sea-faring traditions harness the power of water, fostering a deep connection between our people and the rivers and lakes that sustain us.
            </p>
          </div>

          {/* Life Beneath the Waves */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border border-blue-300/50 bg-blue-800/10 text-blue-100">
              <h2 className="text-2xl font-heading mb-4 text-teal-400">Life Beneath the Waves</h2>
              <p className="text-lg">
                Our aquatic culture thrives on the bounties of the oceans. The famous Tsunareth fishermen are known for their skill, mastering the tides and currents to catch the rarest fish that inhabit our waters.
              </p>
            </div>
            <img 
              src="/kingdoms/tsunareth_beneath.png" 
              alt="Life in Tsunareth" 
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>

          {/* The Way of Water */}
          <div className="grid md:grid-cols-2 gap-6">
            <img 
              src="/kingdoms/tsunareth_water_bending.png" 
              alt="Water Bending Training" 
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
            <div className="p-6 border border-blue-300/50 bg-blue-800/10 text-blue-100">
              <h2 className="text-2xl font-heading mb-4 text-teal-400">The Way of Water</h2>
              <p className="text-lg">
                Mastering water is about fluidity and adaptability. Our elementals study under the great masters, learning to bend and control water in all its forms, from gentle streams to fierce waves.
              </p>
            </div>
          </div>

          {/* Innovations of Tsunareth */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border border-blue-300/50 bg-blue-800/10 text-blue-100">
              <h2 className="text-2xl font-heading mb-4 text-teal-400">Innovations of Tsunareth</h2>
              <p className="text-lg">
                Our engineers have crafted advanced systems to harness the energy of flowing water. From hydroelectric plants to water purification technologies, Tsunareth stands at the forefront of sustainable innovation.
              </p>
            </div>
            <img 
              src="/kingdoms/tsunareth_innovation.png" 
              alt="Innovations in Tsunareth" 
              className="w-full h-full object-cover rounded-lg shadow-xl"
            />
          </div>

          {/* Relations with Other Kingdoms */}
          <div className="p-6 border border-blue-300/50 bg-blue-800/10 text-blue-100">
            <h2 className="text-2xl font-heading mb-4 text-teal-400">Relations with Other Kingdoms</h2>
            <p className="text-lg mb-6">
              Tsunareth maintains friendly relations with neighboring kingdoms, trading our unique water-crafted goods for resources that help sustain our people. We are the bridges connecting the realms of Kinbrold.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default TsunarethPage;
