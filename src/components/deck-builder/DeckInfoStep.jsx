import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const DeckInfoStep = ({ deckData, setDeckData }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Deck Name</Label>
        <Input
          id="name"
          value={deckData.name}
          onChange={(e) => setDeckData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter deck name..."
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={deckData.description}
          onChange={(e) => setDeckData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe your deck strategy..."
        />
      </div>
    </div>
  );
};

export default DeckInfoStep; 