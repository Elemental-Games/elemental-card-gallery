export const rulesData = {
  quickStart: [
    "Build a deck of 40 cards.",
    "Place 3 shields (1 of each tier) face-down and draw 5 cards.",
    "Flip a coin to decide who goes first.",
    "On your turn, draw a card and generate essence from your creatures.",
    "Play creatures, runes, and counters using essence.",
    "Attack opponent's creatures or shields during the battle phase.",
    "Reduce opponent's health points to 0 or play \"Ancient Sigil\" to win!"
  ],
  fullRules: {
    setup: {
      title: "Game Setup",
      content: [
        "Each player starts with a deck of 40 cards.",
        "Place 3 shields (1 of each tier) face-down in front of you.",
        "Draw 5 cards to form your starting hand.",
        "Flip a coin to determine who goes first.",
        "The player going first cannot attack on their first turn."
      ]
    },
    // Add more sections as needed
  },
  deckBuilding: [
    "Your deck must contain exactly 40 cards.",
    "You can have up to 3 copies of any card in your deck, except for cards marked as 'Unique' which are limited to 1 copy.",
    "Your deck must include at least 1 shield of each tier (1, 2, and 3).",
    "There are no restrictions on the number of elements or card types in your deck."
  ],
  cardTypes: [
    "Creatures: Main battling units with Strength and Agility stats.",
    "Runes: Support cards that can be activated immediately.",
    "Counters: Reaction cards that can be used during either player's turn.",
    "Shields: Defensive cards that protect your health points and provide effects when broken."
  ],
  gameplay: [
    "Draw one card at the beginning of your turn.",
    "Generate essence from your creatures on the field.",
    "You can have a maximum of 5 creatures on the field at one time.",
    "You can only normal summon once per turn, regardless of the creature's essence cost.",
    "For creatures that cost essence to summon, you may tribute one creature on your side of the field (send to the graveyard) and receive the essence it generates per turn in return for tributing it. This essence can be used to fund the tribute summon, but it's not required.",
    "A maximum of 5 rune/counter cards can be placed at one time.",
    "You can have a maximum of 7 cards in hand, unless explicitly stated otherwise by a card effect.",
    "End your turn after you've finished your actions."
  ],
  combat: [
    "Declare which of your creatures will attack.",
    "Your opponent can choose to block with their creatures.",
    "Compare Strength and Agility stats to determine the outcome of battles.",
    "Unblocked attacks damage your opponent's shields or health points.",
    "When a shield is broken, its effects are activated."
  ],
  faq: [
    {
      question: "What happens if I run out of cards in my deck?",
      answer: "If you need to draw a card and your deck is empty, you lose the game."
    },
    {
      question: "Can I attack my opponent directly if they have no creatures?",
      answer: "Yes, if your opponent has no creatures, you can attack their shields or health points directly."
    },
    // Add more FAQ items as needed
  ]
};