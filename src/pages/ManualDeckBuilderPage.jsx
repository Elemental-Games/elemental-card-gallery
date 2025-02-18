import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import DeckEditor from '@/components/DeckBuilder/DeckEditor';
import CardGallery from '@/components/DeckBuilder/CardGallery';
import DeckStats from '@/components/DeckBuilder/DeckStats';

const ManualDeckBuilderPage = () => {
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const user = useUser();
  const [mainDeck, setMainDeck] = useState([]);
  const [sideDeck, setSideDeck] = useState([]);
  const [deckName, setDeckName] = useState('');
  const [deckDescription, setDeckDescription] = useState('');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const { data, error } = await supabase
          .from('cards')
          .select('*')
          .order('id');

        if (error) throw error;
        setCards(data);
      } catch (error) {
        console.error('Error fetching cards:', error);
        toast.error('Failed to load cards');
      }
    };

    fetchCards();
  }, [supabase]);

  const canAddCard = (card) => {
    const totalMainDeckCards = mainDeck.reduce((sum, c) => sum + (c.quantity || 1), 0);
    const cardInDeck = mainDeck.find(c => c.id === card.id);
    const currentQuantity = cardInDeck ? cardInDeck.quantity || 1 : 0;

    // Check if it's a shield card
    if (card.type === 'Shield') {
      const totalShields = sideDeck.reduce((sum, c) => sum + (c.quantity || 1), 0);
      const shieldInDeck = sideDeck.find(c => c.id === card.id);
      const currentShieldQuantity = shieldInDeck ? shieldInDeck.quantity || 1 : 0;
      return totalShields < 3 && currentShieldQuantity < 1;
    }

    // Check if it's a limited card (Ancient cards)
    if (card.name.startsWith('Ancient')) {
      return currentQuantity < 1;
    }

    // Regular cards
    return totalMainDeckCards < 40 && currentQuantity < 3;
  };

  const handleCardSelect = (card) => {
    if (card.type === 'Shield') {
      const existingCard = sideDeck.find(c => c.id === card.id);
      if (existingCard) {
        if (existingCard.quantity < 1) {
          setSideDeck(prev => prev.map(c => 
            c.id === card.id ? { ...c, quantity: (c.quantity || 1) + 1 } : c
          ));
        }
      } else {
        setSideDeck(prev => [...prev, { ...card, quantity: 1 }]);
      }
    } else {
      const existingCard = mainDeck.find(c => c.id === card.id);
      if (existingCard) {
        if (existingCard.quantity < (card.name.startsWith('Ancient') ? 1 : 3)) {
          setMainDeck(prev => prev.map(c => 
            c.id === card.id ? { ...c, quantity: (c.quantity || 1) + 1 } : c
          ));
        }
      } else {
        setMainDeck(prev => [...prev, { ...card, quantity: 1 }]);
      }
    }
  };

  const saveDeck = async () => {
    if (!deckName) {
      toast.error('Please enter a deck name');
      return;
    }

    if (mainDeck.length === 0) {
      toast.error('Your deck is empty');
      return;
    }

    const totalMainDeckCards = mainDeck.reduce((sum, c) => sum + (c.quantity || 1), 0);
    if (totalMainDeckCards < 40) {
      toast.error('Your main deck must have exactly 40 cards');
      return;
    }

    const totalShields = sideDeck.reduce((sum, c) => sum + (c.quantity || 1), 0);
    if (totalShields !== 3) {
      toast.error('You must have exactly 3 shield cards');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from('decks')
        .insert([{
          user_id: user.id,
          name: deckName,
          description: deckDescription,
          main_deck: mainDeck,
          side_deck: sideDeck
        }]);

      if (error) throw error;
      toast.success('Deck saved successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error saving deck:', error);
      toast.error('Failed to save deck');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Manual Deck Builder - Create Your Elemental Masters TCG Deck</title>
        <meta name="description" content="Build and customize your Elemental Masters TCG deck manually. Choose your cards, combine elements, and create winning strategies." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Label htmlFor="deckName">Deck Name</Label>
              <Input
                id="deckName"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
                placeholder="Enter deck name..."
                className="mb-4"
              />
              <Label htmlFor="deckDescription">Description</Label>
              <Input
                id="deckDescription"
                value={deckDescription}
                onChange={(e) => setDeckDescription(e.target.value)}
                placeholder="Describe your deck strategy..."
              />
            </div>
            <div className="flex items-end justify-end">
              <Button
                onClick={saveDeck}
                disabled={loading}
                className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold"
              >
                {loading ? 'Saving...' : 'Save Deck'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <DeckEditor
                mainDeck={mainDeck}
                sideDeck={sideDeck}
                setMainDeck={setMainDeck}
                setSideDeck={setSideDeck}
                canAddCard={canAddCard}
              />
              <DeckStats mainDeck={mainDeck} sideDeck={sideDeck} />
            </div>
            <div>
              <CardGallery
                cards={cards}
                onCardSelect={handleCardSelect}
                deck={{ mainDeck, sideDeck }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ManualDeckBuilderPage; 