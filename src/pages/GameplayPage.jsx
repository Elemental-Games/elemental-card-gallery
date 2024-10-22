import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import BattleSimulation from './GameplayPage/BattleSimulation';

const GameplayPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Gameplay Overview</h1>
      <p className="mb-4">
        Elemental Masters is an exciting 2-player trading card game where you harness the power of the elements to defeat your opponents. An average game lasts 20-25 minutes.
      </p>
      <div className="mb-6 flex flex-wrap gap-4">
        <Link to="/rules">
          <Button>View Full Rules</Button>
        </Link>
        <Button onClick={() => window.open('/rulebook.pdf', '_blank')}>
          <Download className="mr-2 h-4 w-4" /> Download Rulebook PDF
        </Button>
        <Link to="/learn-to-play">
          <Button>Learn More</Button>
        </Link>
        <Link to="/gameplay/battle-simulation">
          <Button>Try Battle Simulation</Button>
        </Link>
      </div>
      <h2 className="text-2xl font-bold mb-4">Quick Overview</h2>
      <p className="mb-4">
        In Elemental Masters, players take turns summoning creatures, casting spells, and using strategic abilities to outmaneuver their opponents.
      </p>
      <h2 className="text-2xl font-bold mb-4">Key Game Elements</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Elemental Affinities: Each creature belongs to one of the four elements: Air, Water, Fire, or Earth.</li>
        <li>Essence Management: Players must manage their essence to summon creatures and cast spells.</li>
        <li>Strategic Combat: Players can attack directly or target opposing creatures to gain the upper hand.</li>
      </ul>
      <h2 className="text-2xl font-bold mb-4">Gameplay Modes</h2>
      <p className="mb-4">
        Elemental Masters offers various gameplay modes, including casual matches, ranked play, and special events.
      </p>
    </div>
  );
};

export default GameplayPage;
