import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Calendar, Unlock, Lock } from 'lucide-react';
import { getCampaignStatus, getAnalyticsData } from '../utils/analytics';

const KinbroldDevControls = ({ onRefresh }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(getCampaignStatus());
  const analytics = getAnalyticsData();

  // Only show in development
  if (!import.meta.env.DEV) {
    return null;
  }

  const refreshStatus = () => {
    const newStatus = getCampaignStatus();
    setStatus(newStatus);
    onRefresh?.(newStatus);
  };

  const simulateWeek = (week) => {
    // This would need to temporarily override the analytics utility
    // For now, just show what would happen
    console.log(`Simulating week ${week}`);
    alert(`To test week ${week}, update DEV_OVERRIDES.FORCE_WEEK = ${week} in analytics.js`);
  };

  const testUnlockAll = () => {
    alert('To test all unlocked, set DEV_OVERRIDES.UNLOCK_ALL = true in analytics.js');
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 bg-purple-600 hover:bg-purple-700"
        size="sm"
      >
        <Settings className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 left-4 z-50 w-80 bg-black/90 text-white border-purple-500">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Dev Controls
          </span>
          <Button
            onClick={() => setIsOpen(false)}
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0"
          >
            ×
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Status */}
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Campaign Status
          </h4>
          <div className="space-y-1 text-sm">
            <div>Week: {status.week}/6</div>
            <div>Active: {status.isActive ? '✅' : '❌'}</div>
            <div>Complete: {status.isComplete ? '✅' : '❌'}</div>
            <div>Unlocked: {status.unlockedKingdoms.length}/5</div>
          </div>
        </div>

        {/* Unlocked Kingdoms */}
        <div>
          <h4 className="font-semibold mb-2">Kingdoms</h4>
          <div className="flex flex-wrap gap-1">
            {['grivoss', 'zalos', 'evermere', 'scarto', 'tsunareth'].map(kingdom => (
              <Badge
                key={kingdom}
                variant={status.unlockedKingdoms.includes(kingdom) ? 'default' : 'secondary'}
                className="text-xs"
              >
                {status.unlockedKingdoms.includes(kingdom) ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                {kingdom}
              </Badge>
            ))}
          </div>
        </div>

        {/* Test Controls */}
        <div>
          <h4 className="font-semibold mb-2">Test Controls</h4>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-1">
              {[1, 2, 3, 4, 5, 6].map(week => (
                <Button
                  key={week}
                  onClick={() => simulateWeek(week)}
                  size="sm"
                  variant={status.week === week ? 'default' : 'outline'}
                  className="text-xs h-8"
                >
                  W{week}
                </Button>
              ))}
            </div>
            <Button
              onClick={testUnlockAll}
              size="sm"
              variant="outline"
              className="w-full text-xs"
            >
              Unlock All
            </Button>
            <Button
              onClick={refreshStatus}
              size="sm"
              variant="outline"
              className="w-full text-xs"
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Analytics Preview */}
        <div>
          <h4 className="font-semibold mb-2">Analytics</h4>
          <div className="text-xs space-y-1">
            <div>Progress: {analytics.progressPercentage.toFixed(0)}%</div>
            {analytics.nextUnlockDate && (
              <div>Next: {analytics.nextUnlockDate.toLocaleDateString()}</div>
            )}
          </div>
        </div>

        <div className="text-xs text-gray-400 border-t border-gray-600 pt-2">
          💡 Edit DEV_OVERRIDES in analytics.js to test different states
        </div>
      </CardContent>
    </Card>
  );
};

export default KinbroldDevControls; 