import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CoinbaseButton } from './CoinbaseButton';

export function CoinbaseForm() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [subscribeToUpdates, setSubscribeToUpdates] = useState(false);
  const [displayName, setDisplayName] = useState('');

  return (
    <Card className="w-full">
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name (optional)</Label>
            <Input
              id="displayName"
              disabled={isAnonymous}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="How should we display your name?"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={(checked) => {
                setIsAnonymous(checked);
                if (checked) setDisplayName('');
              }}
            />
            <Label htmlFor="anonymous">Make my donation anonymous</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="subscribe"
              checked={subscribeToUpdates}
              onCheckedChange={setSubscribeToUpdates}
            />
            <Label htmlFor="subscribe">Subscribe to project updates</Label>
          </div>
        </div>

        <CoinbaseButton
          metadata={{
            displayName: isAnonymous ? 'Anonymous' : displayName,
            isAnonymous,
            subscribeToUpdates
          }}
        />
      </CardContent>
    </Card>
  );
} 