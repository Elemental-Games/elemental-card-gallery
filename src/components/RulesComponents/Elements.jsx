import React from 'react';
import { Card } from "@/components/ui/card";
import Image from 'next/image';

const Elements = ({ data }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Elements</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Main Elements */}
        <h3 className="text-xl font-semibold col-span-full">Main Elements</h3>
        {data.mainElements.map((element, index) => (
          <Card key={index} className="p-4">
            <div className="aspect-w-16 aspect-h-9 relative mb-4">
              <Image
                src={element.image || "https://images.unsplash.com/photo-1472396961693-142e6e269027"}
                alt={element.name}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <h4 className="text-lg font-semibold mb-2">{element.name}</h4>
            <p className="text-sm text-gray-600">{element.description}</p>
          </Card>
        ))}

        {/* Combinational Elements */}
        <h3 className="text-xl font-semibold col-span-full mt-8">Combinational Elements</h3>
        {data.combinationalElements.map((element, index) => (
          <Card key={index} className="p-4">
            <div className="aspect-w-16 aspect-h-9 relative mb-4">
              <Image
                src={element.image || "https://images.unsplash.com/photo-1472396961693-142e6e269027"}
                alt={element.name}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
            <h4 className="text-lg font-semibold mb-2">{element.name}</h4>
            <p className="text-sm text-gray-600">
              Combination of {element.components.join(" + ")}
            </p>
            <p className="text-sm text-gray-600 mt-2">{element.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Elements;