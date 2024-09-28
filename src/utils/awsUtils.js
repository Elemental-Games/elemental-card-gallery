const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const fetchCardsFromS3 = async () => {
  try {
    const response = await fetch(`${API_URL}/api/cards`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
};

export const fetchCardByName = async (cardName) => {
  try {
    const allCards = await fetchCardsFromS3();
    return allCards.find(c => c.name.toLowerCase() === cardName.toLowerCase()) || null;
  } catch (error) {
    console.error("Error fetching card by name:", error);
    throw error;
  }
};