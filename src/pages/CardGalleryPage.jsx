import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import CardGrid from '../components/organisms/CardGrid';
import FilterOptions from '../components/organisms/FilterOptions';

const allowedCardIds = [
  'mek', 'osao', 'galea', 'balon', 'diamoria', 'veton', 'aridus', 'noxilus', 
  'zoryn', 'ancient-sigil', 'ancient-winds', 'ancient-tide', 'ancient-flame', 
  'ancient-roots', 'terra', 'torrent', 'ignus', 'nimbus', 'dumoles', 'malletin', 
  'tuskhammer', 'lavrok', 'glint', 'ivy-mantis', 'manasee', 'blazorn', 
  'rapid-recovery', 'revival-rain', 'essence-exchange', 'lifebound-armour', 
  'aeris', 'archen', 'binding-coils', 'brumaul', 'crag', 'direct-assault', 
  'draconic-adaptability', 'driplets', 'essence-amplifier', 'essence-generation', 
  'fire-bugs', 'khorn', 'night-vox', 'passive-aggressive', 'piddip', 
  'power-surge', 'pyro-mites', 'skerodact', 'stawid', 'twill', 'unbreakable'
];

const CardGalleryPage = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    searchQuery: '',
    element: 'all',
    type: 'all',
    sort: 'asc',
  });

  const nonElementalTypes = ['Rune', 'Counter', 'Shield'];
  const isElementFilterDisabled = nonElementalTypes.includes(filters.type);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('/data/new_cards.json');
        const data = await response.json();
        const publiclyVisibleCards = data.cards.filter(card => allowedCardIds.includes(card.id));
        setCards(publiclyVisibleCards);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  useEffect(() => {
    let filtered = cards;

    if (filters.searchQuery) {
      filtered = filtered.filter(card =>
        card.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    if (filters.element !== 'all') {
      filtered = filtered.filter(card => card.element === filters.element);
    }

    if (filters.type !== 'all') {
      filtered = filtered.filter(card => card.type === filters.type);
    }
      
    const sorted = [...filtered].sort((a, b) => {
      if (filters.sort === 'asc') {
        return a.cardNumber - b.cardNumber;
      } else {
        return b.cardNumber - a.cardNumber;
      }
    });

    setFilteredCards(sorted);
  }, [filters, cards]);

  const handleFilterChange = (newFilters) => {
    let updatedFilters = { ...newFilters };
    if (nonElementalTypes.includes(updatedFilters.type)) {
      updatedFilters.element = 'all';
    }
    setFilters(updatedFilters);
  };

  const handleReset = () => {
    setFilters({
      searchQuery: '',
      element: 'all',
      type: 'all',
      sort: 'asc',
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Card Gallery - Elekin TCG</title>
        <meta name="description" content="Browse the complete collection of Elekin TCG cards. Filter by element, rarity, and more." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">Card Gallery</h1>
        <FilterOptions 
          filters={filters}
          onFilterChange={handleFilterChange} 
          isElementFilterDisabled={isElementFilterDisabled} 
          onReset={handleReset} 
        />
        <CardGrid cards={filteredCards} isLoading={loading} />
      </div>
    </>
  );
};

export default CardGalleryPage;