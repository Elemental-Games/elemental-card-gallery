import React from 'react';
import BurnRateCalculator from '../components/BurnRateCalculator';

const InvestorPitchPage = () => {
  const sections = [
    { 
      title: 'The Problem', 
      content: 'The Trading Card Game (TCG) market is a multi-billion dollar industry, but it is dominated by a few major players. This has led to gameplay stagnation and a lack of innovation, leaving players hungry for new worlds, deeper strategies, and more engaging combat systems.' 
    },
    { 
      title: 'Our Solution', 
      content: 'Elekin: Masters of Kinbrold is a new TCG that revolutionizes gameplay by combining the best elements of genre giants like Magic: The Gathering and Yu-Gi-Oh! Our secret sauce is a unique Strength/Agility combat system paired with an intuitive Essence (resource) management system, creating a dynamic and defensible gameplay experience.' 
    },
    { 
      title: 'The Team', 
      content: "The company is led by founder Mark, a solo developer with 5 years of experience creating Elemental Games. Mark recently left his 5-year career as a Software Engineer at the Federal Aviation Administration (FAA), where he developed mission-critical code for Air Traffic Control towers, to dedicate himself full-time to Elekin. His discipline and technical expertise are complemented by guidance from his brother, a founder at a San Francisco-based startup." 
    },
    { 
      title: 'Traction: Proven Market Demand', 
      content: 'With zero marketing spend, we attended a single local store for one month. The result was $531 in organic sales of starter decks, booster packs, and game mats. This early success demonstrates strong, inherent product-market fit. Furthermore, we have secured verbal commitments from 4 additional local game stores who are ready to purchase inventory as soon as it becomes available in November.' 
    },
    { 
      title: 'The Ask', 
      content: 'We are seeking $250,000 for an 11.9% equity stake, based on a $1.85M pre-money valuation. This funding will provide 12+ months of runway to execute a second, larger manufacturing run, launch an aggressive marketing campaign to capitalize on our proven demand, and secure essential trademarks for our brand.' 
    },
  ];

  const navLinks = sections.map(s => s.title).concat('Financials');

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="flex">
          <aside className="hidden md:block w-64 pr-8">
            <div className="sticky top-20">
              <h3 className="text-xl font-bold mb-4">Deck Sections</h3>
              <nav className="flex flex-col space-y-2">
                {navLinks.map(link => {
                  const href = `#${link.replace(/\s+/g, '-').toLowerCase()}`;
                  return <a key={link} href={href} className="text-gray-400 hover:text-white transition-colors duration-200">{link}</a>;
                })}
              </nav>
            </div>
          </aside>

          <main className="flex-1">
            <header className="text-center mb-12">
              <h1 className="text-5xl font-extrabold tracking-tight">Investor Pitch Deck</h1>
              <p className="text-xl text-gray-400 mt-2">Elemental Card Gallery: The Next Generation of TCGs</p>
            </header>

            <div className="space-y-12">
              {sections.map((section, index) => (
                <div key={index} id={section.title.replace(/\s+/g, '-').toLowerCase()} className="p-8 border border-gray-700 rounded-lg bg-gray-800 shadow-lg scroll-mt-20">
                  <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
                  <p className="text-lg text-gray-300 whitespace-pre-line">{section.content}</p>
                </div>
              ))}
              <BurnRateCalculator />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default InvestorPitchPage;
