"use client";

import React from "react";
import {
  Accordion,
  AccordionContent, 
  AccordionItem,
  AccordionTrigger,
} from "../../../../../components/ui/accordion";
import {languagesSpoken} from "../../../../../../lib/registatHotelItem";

function addLanguagesSpoken() {
  return (
    <Accordion type="single" collapsible className="p-4 border rounded-lg">
      <AccordionItem value="contactDetails">
        <AccordionTrigger className="text-xl font-bold py-4 px-2 hover:bg-gray-50 rounded-t-lg">Contact Details</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc pl-4">
            {  languagesSpoken.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default addLanguagesSpoken;
