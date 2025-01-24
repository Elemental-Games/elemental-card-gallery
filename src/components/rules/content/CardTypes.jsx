import ImageModal from '@/components/ui/ImageModal';

const CardTypes = () => {
  const cardExamples = [
    {
      id: 'creature',
      type: "Creature",
      mainDescription: "Main battling units with Strength and Agility stats",
      image: "/images/cards/aqua-dart.webp",
      alt: "Aqua Dart - Creature Example",
      details: [
        "Come in four main elements: Air, Water, Fire, and Earth",
        "Some creatures cost essence to summon, others are free",
        "Free creatures with no abilities generate 1 essence per turn",
        "Free creatures with abilities generate 2 essence per turn",
        "Essence cost creatures may generate essence through effects",
        "Stronger creatures typically require more essence to summon",
        "Special creatures include Dragons (dual elements) and Elementalists (powerful single element)"
      ]
    },
    {
      id: 'rune',
      type: "Rune",
      mainDescription: "Support cards that can be activated immediately",
      image: "/images/cards/ancient-wisdom.webp",
      alt: "Ancient Wisdom - Rune Example",
      details: [
        "Three types: Normal, Instant, and Equipment",
        "Normal Runes: Played during your main phases from the field",
        "Instant Runes: Can be played from hand or field at any time",
        "Equipment Runes: Attach to creatures (limit 1 per creature)",
        "Placed in the Rune/Counter zone (max 5 cards)",
        "Help generate essence, boost creatures, or search deck"
      ]
    },
    {
      id: 'counter',
      type: "Counter",
      mainDescription: "Reaction cards that can be used during either player's turn",
      image: "/images/cards/reflective-barrier.webp",
      alt: "Reflective Barrier - Counter Example",
      details: [
        "Must be placed face-down during your main phase",
        "Can only be activated when their trigger condition is met",
        "Trigger conditions include opponent's actions like:",
        "- Drawing cards",
        "- Generating essence",
        "- Summoning creatures",
        "- Declaring attacks",
        "Placed in Rune/Counter zone (shared 5-card limit with Runes)",
        "Negate opponent's actions and provide additional effects"
      ]
    },
    {
      id: 'shield',
      type: "Shield",
      mainDescription: "Defensive cards that protect your health points and provide effects when broken",
      image: "/images/cards/woodland-wall.webp",
      alt: "Woodland Wall - Shield Example",
      details: [
        "Three tiers with different health points:",
        "- Tier I: 150 HP",
        "- Tier II: 300 HP",
        "- Tier III: 450 HP",
        "Health resets to next highest tier threshold at turn end",
        "Each shield has two effects when broken:",
        "- Primary Effect: Generally applicable",
        "- Secondary Effect: Situational power",
        "Player chooses which effect to activate when shield breaks"
      ]
    },
    {
      id: 'essence-exchange',
      type: "Essence Exchange",
      mainDescription: "Special cards that allow you to convert essence between elements",
      image: "/images/cards/essence-exchange.webp",
      alt: "Essence Exchange Example",
      details: [
        "Convert essence from one element to another",
        "Useful for decks combining multiple elements",
        "Essential for summoning Dragon creatures",
        "Helps manage essence economy",
        "Can be used to adapt strategy mid-game"
      ]
    }
  ];

  return (
    <div className="bg-purple-950/70 rounded-lg p-6 border border-purple-500/30">
      <div className="space-y-12">
        {cardExamples.map((card) => (
          <div key={card.id} id={card.id} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-48 flex-shrink-0">
                <ImageModal src={card.image} alt={card.alt} />
              </div>
              <div className="space-y-4 flex-1">
                <h3 className="text-2xl text-yellow-500">{card.type}</h3>
                <p className="text-lg">{card.mainDescription}</p>
                <div className="bg-purple-900/30 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-2">
                    {card.details.map((detail, idx) => (
                      <li key={idx} className={detail.startsWith('-') ? 'ml-6' : ''}>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {card.id !== 'essence-exchange' && (
              <div className="border-b border-purple-500/30 pt-4" />
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center text-sm text-purple-300">
        <p>👆 Click any card image to view an enlarged version</p>
      </div>
    </div>
  );
};

export default CardTypes;