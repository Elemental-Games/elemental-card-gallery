const QuickReference = ({ setActiveTab }) => {
  const references = [
    {
      title: 'Setup',
      tabId: 'setup',
      items: [
        { label: 'Deck Building', anchor: 'deck-building' },
        { label: 'Initial Setup', anchor: 'initial-setup' }
      ]
    },
    {
      title: 'Card Types',
      tabId: 'card-types',
      items: [
        { label: 'Creature', anchor: 'creature' },
        { label: 'Rune', anchor: 'rune' },
        { label: 'Counter', anchor: 'counter' },
        { label: 'Shield', anchor: 'shield' }
      ]
    },
    {
      title: 'Turn Structure',
      tabId: 'turn-structure',
      items: []
    },
    {
      title: 'Battle',
      tabId: 'battle',
      items: [
        { label: 'Creature Actions', anchor: 'creature-actions' },
        { label: 'Combat Stats', anchor: 'combat-stats' },
        { label: 'Battle Resolution', anchor: 'battle-resolution' },
        { label: 'Battle Example', anchor: 'battle-example' }
      ]
    },
    {
      title: 'Shields',
      tabId: 'shields',
      items: [
        { label: 'Tiers', anchor: 'shield-tiers' },
        { label: 'Mechanics', anchor: 'shield-mechanics' },
        { label: 'Breaking Example', anchor: 'shield-breaking' }
      ]
    },
    {
      title: 'Elements',
      tabId: 'elements',
      items: [
        { label: 'Element Overview', anchor: 'element-overview' },
        { label: 'Essence System', anchor: 'essence-system' },
        { label: 'Elemental Dragons', anchor: 'elemental-dragons' }
      ]
    },
    {
      title: 'Keywords',
      tabId: 'keywords',
      items: [
        { label: 'Freeze', anchor: 'freeze' },
        { label: 'Pierce', anchor: 'pierce' },
        { label: 'Double Strike', anchor: 'double-strike' },
        { label: 'Exhaust', anchor: 'exhaust' }
      ]
    }
  ];

  const handleClick = (tabId, anchor) => {
    setActiveTab(tabId);
    if (anchor) {
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          const headerOffset = 123; // Increased offset for more natural positioning
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  // Split references into two columns
  const midpoint = Math.ceil(references.length / 2);
  const leftColumn = references.slice(0, midpoint);
  const rightColumn = references.slice(midpoint);

  return (
    <div className="sticky" style={{ top: '1rem' }}>
      <div className="bg-purple-950/70 p-4 rounded-lg 
        shadow-[0_0_15px_rgba(168,85,247,0.4)] border border-purple-500/30">
        <h2 className="text-2xl font-bold mb-4 text-white">Quick Reference</h2>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {leftColumn.map((section, idx) => (
              <div key={idx} className="space-y-1">
                <h3 
                  className="text-lg font-semibold text-purple-300 cursor-pointer 
                    hover:text-yellow-500 transition-colors"
                  onClick={() => handleClick(section.tabId)}
                >
                  {section.title}
                </h3>
                {section.items.length > 0 && (
                  <ul className="space-y-0.5">
                    {section.items.map((item, index) => (
                      <li 
                        key={index} 
                        className="text-white/90 text-sm hover:text-yellow-400 
                          p-1 rounded hover:bg-purple-900/50 transition-colors cursor-pointer"
                        onClick={() => handleClick(section.tabId, item.anchor)}
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {rightColumn.map((section, idx) => (
              <div key={idx} className="space-y-1">
                <h3 
                  className="text-lg font-semibold text-purple-300 cursor-pointer 
                    hover:text-yellow-500 transition-colors"
                  onClick={() => handleClick(section.tabId)}
                >
                  {section.title}
                </h3>
                {section.items.length > 0 && (
                  <ul className="space-y-0.5">
                    {section.items.map((item, index) => (
                      <li 
                        key={index} 
                        className="text-white/90 text-sm hover:text-yellow-400 
                          p-1 rounded hover:bg-purple-900/50 transition-colors cursor-pointer"
                        onClick={() => handleClick(section.tabId, item.anchor)}
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-purple-500/30">
          <a 
            href="/data/TCG Rulebook.pdf"
            download
            className="flex items-center justify-center gap-2 px-4 py-2.5 
              bg-purple-900/50 hover:bg-purple-900/70 
              rounded-lg transition-colors w-full
              border border-purple-500/30 hover:border-purple-500/50"
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
      </div>
    </div>
  );
};

export default QuickReference; 