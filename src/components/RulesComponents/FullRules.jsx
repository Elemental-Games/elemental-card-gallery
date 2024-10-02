import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FullRules = ({ data }) => {
  return (
    <Accordion type="single" collapsible>
      {Object.entries(data).map(([key, value]) => (
        <AccordionItem key={key} value={key}>
          <AccordionTrigger>{value.title}</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2">
              {value.content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FullRules;