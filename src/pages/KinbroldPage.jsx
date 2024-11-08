import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import KinbroldMap from '../components/KinbroldMap';
import KinbroldHistory from '../components/KinbroldHistory';

const KinbroldPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full">
      <section className="relative w-full h-[100vh] overflow-hidden">
        <KinbroldMap />
      </section>

      <KinbroldHistory />

      <section className="w-full bg-background/95 backdrop-blur-sm p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Explore the Kingdoms of Kinbrold</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
          {[
            { 
              name: 'Evermere',
              path: '/kinbrold/evermere',
              color: 'bg-purple-800 hover:bg-purple-900',
              description: 'The Central Kingdom'
            },
            { 
              name: 'Grivoss',
              path: '/kinbrold/grivoss',
              color: 'bg-green-500 hover:bg-green-600',
              description: 'The Earth Kingdom'
            },
            { 
              name: 'Scarto',
              path: '/kinbrold/scarto',
              color: 'bg-red-500 hover:bg-red-600',
              description: 'The Fire Kingdom'
            },
            { 
              name: 'Tsunareth',
              path: '/kinbrold/tsunareth',
              color: 'bg-blue-500 hover:bg-blue-600',
              description: 'The Water Kingdom'
            },
            { 
              name: 'Zalos',
              path: '/kinbrold/zalos',
              color: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
              description: 'The Air Kingdom'
            }
          ].map((kingdom) => (
            <Button
              key={kingdom.name}
              onClick={() => navigate(kingdom.path)}
              className={`${kingdom.color} w-full h-24 font-bold flex flex-col items-center justify-center transition-colors`}
            >
              <span className="text-lg">{kingdom.name}</span>
              <span className="text-sm opacity-80">{kingdom.description}</span>
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default KinbroldPage;