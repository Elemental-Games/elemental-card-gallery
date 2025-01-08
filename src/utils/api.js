export const fetchRulesData = async () => {
  return {
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
      }
    }
  };
};

export const subscribeEmail = async (email) => {
  const API_URL = import.meta.env.DEV 
    ? 'http://localhost:3001'
    : 'https://www.elementalgames.gg';
  
  try {
    console.log('Making API call to:', `${API_URL}/api/subscribe`);
    const response = await fetch(`${API_URL}/api/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': window.location.origin
      },
      credentials: 'include',
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response:', data);
    return data;
  } catch (error) {
    console.error('Subscription error:', error);
    throw error;
  }
};
