import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

const BattleLog = ({ logs }) => {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold mb-2">Battle Log</h3>
      <ScrollArea className="h-40 w-full rounded-md border p-4">
        <ul className="list-disc list-inside">
          {logs.map((log, index) => (
            <li key={index} className="text-sm">{log}</li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default BattleLog;