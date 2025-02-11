import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export const useDeckManager = () => {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveDeck = async (deckData) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('decks')
        .insert([{
          name: deckData.name,
          description: deckData.description,
          deck_cards: deckData.cards,
          shield_loadout: deckData.shields
        }])
        .select();

      if (error) throw error;
      return data;

    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const loadDeck = async (deckId) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('decks')
        .select('*')
        .eq('id', deckId)
        .single();

      if (error) throw error;
      return data;

    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveDeck,
    loadDeck,
    loading,
    error
  };
}; 