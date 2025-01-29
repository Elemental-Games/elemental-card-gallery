import { useState } from 'react';
import RulesTabs from '../components/rules/RulesTabs';
import QuickReference from '../components/rules/QuickReference';
import RulesContent from '../components/rules/RulesContent';
import HowtoPlayGallery from '../components/HowtoPlayGallery';

const HowToPlayPage = () => {
  const [activeTab, setActiveTab] = useState('setup');

  return (
    <div className="min-h-screen bg-[#1A103C] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Image Gallery Section */}
        <section className="mb-12">
          <HowtoPlayGallery />
        </section>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">How to Play</h1>
          <a 
            href="/data/TCG Rulebook.pdf"
            download
            className="flex items-center gap-2 px-6 py-3 bg-purple-700 hover:bg-purple-600 
              rounded-lg transition-colors shadow-lg border border-purple-500/30"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>Download Rulebook PDF</span>
          </a>
        </div>
        
        {/* Tabs Section */}
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="min-w-full">
            <RulesTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-2/3">
            <RulesContent activeTab={activeTab} />
          </div>
          
          {/* Quick Reference Sidebar */}
          <div className="md:w-1/3">
            <QuickReference setActiveTab={setActiveTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlayPage;
