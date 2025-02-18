import { create } from 'zustand';
import { loadCards, shuffleDeck, drawStartingHand } from './cardService';

export type Element = 'Air' | 'Water' | 'Fire' | 'Earth';
export type CardType = 'Creature' | 'Rune' | 'Counter' | 'Shield';
export type GamePhase = 'Draw' | 'Generation' | 'Main1' | 'Battle' | 'Main2' | 'End';

export interface Card {
  id: string;
  cardNumber: number;
  name: string;
  type: CardType;
  element?: Element;
  rarity: string;
  strength?: number;
  agility?: number;
  essenceCost?: number;
  essenceGeneration?: number;
  ability?: {
    name: string;
    description: string;
  };
  image: string;
}

export interface PlayerState {
  health: number;
  essence: {
    [key in Element]: number;
  };
  hand: Card[];
  field: {
    creatures: Card[];
    runes: Card[];
    counters: Card[];
    shields: Card[];
  };
  deck: Card[];
  discardPile: Card[];
}

export interface GameState {
  players: {
    player1: PlayerState;
    player2: PlayerState;
  };
  currentPhase: GamePhase;
  activePlayer: 'player1' | 'player2';
  turnCount: number;
  actionLog: string[];
  status: 'loading' | 'waiting' | 'active' | 'finished';
  error?: string;
}

const initialPlayerState: PlayerState = {
  health: 500,
  essence: {
    Air: 0,
    Water: 0,
    Fire: 0,
    Earth: 0
  },
  hand: [],
  field: {
    creatures: [],
    runes: [],
    counters: [],
    shields: []
  },
  deck: [],
  discardPile: []
};

const initialGameState: GameState = {
  players: {
    player1: { ...initialPlayerState },
    player2: { ...initialPlayerState }
  },
  currentPhase: 'Draw',
  activePlayer: 'player1',
  turnCount: 1,
  actionLog: [],
  status: 'loading'
};

export const useGameStore = create<{
  game: GameState;
  actions: {
    initializeGame: () => Promise<void>;
    startGame: () => void;
    drawCard: (playerId: 'player1' | 'player2') => void;
    playCard: (playerId: 'player1' | 'player2', cardId: string, zone: keyof PlayerState['field']) => void;
    generateEssence: (playerId: 'player1' | 'player2') => void;
    changePhase: (phase: GamePhase) => void;
    endTurn: () => void;
  };
}>((set) => ({
  game: initialGameState,
  actions: {
    initializeGame: async () => {
      try {
        // Load cards
        const cards = await loadCards();
        if (cards.length === 0) {
          throw new Error('No cards loaded');
        }

        // Create and shuffle decks
        const player1Deck = shuffleDeck([...cards]);
        const player2Deck = shuffleDeck([...cards]);

        // Draw starting hands
        const player1Start = drawStartingHand(player1Deck);
        const player2Start = drawStartingHand(player2Deck);

        set((state) => ({
          game: {
            ...initialGameState,
            status: 'waiting',
            players: {
              player1: {
                ...initialPlayerState,
                hand: player1Start.hand,
                deck: player1Start.remainingDeck
              },
              player2: {
                ...initialPlayerState,
                hand: player2Start.hand,
                deck: player2Start.remainingDeck
              }
            }
          }
        }));
      } catch (error) {
        set((state) => ({
          game: {
            ...state.game,
            status: 'waiting',
            error: error instanceof Error ? error.message : 'Failed to initialize game'
          }
        }));
      }
    },
    startGame: () => {
      set((state) => ({
        game: {
          ...state.game,
          status: 'active'
        }
      }));
    },
    drawCard: (playerId) => {
      set((state) => {
        const player = state.game.players[playerId];
        if (player.deck.length === 0) return state;
        
        const [drawnCard, ...remainingDeck] = player.deck;
        return {
          game: {
            ...state.game,
            players: {
              ...state.game.players,
              [playerId]: {
                ...player,
                hand: [...player.hand, drawnCard],
                deck: remainingDeck
              }
            },
            actionLog: [...state.game.actionLog, `${playerId} drew a card`]
          }
        };
      });
    },
    playCard: (playerId, cardId, zone) => {
      set((state) => {
        const player = state.game.players[playerId];
        const cardIndex = player.hand.findIndex(card => card.id === cardId);
        if (cardIndex === -1) return state;

        const card = player.hand[cardIndex];
        const newHand = [...player.hand.slice(0, cardIndex), ...player.hand.slice(cardIndex + 1)];
        
        return {
          game: {
            ...state.game,
            players: {
              ...state.game.players,
              [playerId]: {
                ...player,
                hand: newHand,
                field: {
                  ...player.field,
                  [zone]: [...player.field[zone], card]
                }
              }
            },
            actionLog: [...state.game.actionLog, `${playerId} played ${card.name}`]
          }
        };
      });
    },
    generateEssence: (playerId) => {
      set((state) => {
        const player = state.game.players[playerId];
        const newEssence = { ...player.essence };
        
        player.field.creatures.forEach(creature => {
          if (creature.element && creature.essenceGeneration) {
            newEssence[creature.element] += creature.essenceGeneration;
          }
        });

        return {
          game: {
            ...state.game,
            players: {
              ...state.game.players,
              [playerId]: {
                ...player,
                essence: newEssence
              }
            },
            actionLog: [...state.game.actionLog, `${playerId} generated essence`]
          }
        };
      });
    },
    changePhase: (phase) => {
      set((state) => ({
        game: {
          ...state.game,
          currentPhase: phase,
          actionLog: [...state.game.actionLog, `Phase changed to ${phase}`]
        }
      }));
    },
    endTurn: () => {
      set((state) => ({
        game: {
          ...state.game,
          activePlayer: state.game.activePlayer === 'player1' ? 'player2' : 'player1',
          currentPhase: 'Draw',
          turnCount: state.game.turnCount + 1,
          actionLog: [...state.game.actionLog, `Turn ended`]
        }
      }));
    }
  }
})); 