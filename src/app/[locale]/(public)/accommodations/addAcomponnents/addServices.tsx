"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../../components/ui/accordion";
import { Checkbox } from "../../../../../components/ui/checkbox";
import { Button } from "../../../../../components/ui/button";
import { services } from "../../../../../../lib/registatHotelItem";

function AddServices() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleSelection = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((item) => item !== service) : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Selected Services:", selectedServices);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
      <Accordion type="single" collapsible>
        <AccordionItem value="services">
          <AccordionTrigger className="text-xl font-bold py-4 px-2 hover:bg-gray-50 rounded-t-lg">Services</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {services.map((service, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`service-${index}`}
                    checked={selectedServices.includes(service)}
                    onCheckedChange={() => handleSelection(service)}
                  />
                  <label htmlFor={`service-${index}`} className="text-sm">
                    {service}
                  </label>
                </div>
              ))}
            </div>
            <Button type="submit" className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg">
              Submit
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </form>
  );
}

export default AddServices;