import React from 'react';
import { Card } from "@/components/ui/card";

const Elements = ({ data }) => {
  if (!data || !data.mainElements || !data.combinationalElements) {
    return <div>Loading elements data...</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Elements</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Main Elements */}
        <h3 className="text-xl font-semibold col-span-full">Main Elements</h3>
        {data.mainElements.map((element, index) => (
          <Card key={index} className="p-4">
            <div className="aspect-w-16 aspect-h-9 relative mb-4">
              <img
                src={element.image || "/placeholder.svg"}
                alt={element.name}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <h4 className="text-lg font-semibold mb-2">{element.name}</h4>
            <p className="text-sm text-muted-foreground">{element.description}</p>
          </Card>
        ))}

        {/* Combinational Elements */}
        <h3 className="text-xl font-semibold col-span-full mt-8">Combinational Elements</h3>
        {data.combinationalElements.map((element, index) => (
          <Card key={index} className="p-4">
            <div className="aspect-w-16 aspect-h-9 relative mb-4">
              <img
                src={element.image || "/placeholder.svg"}
                alt={element.name}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <h4 className="text-lg font-semibold mb-2">{element.name}</h4>
            <p className="text-sm text-muted-foreground">
              Combination of {element.components.join(" + ")}
            </p>
            <p className="text-sm text-muted-foreground mt-2">{element.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Elements;