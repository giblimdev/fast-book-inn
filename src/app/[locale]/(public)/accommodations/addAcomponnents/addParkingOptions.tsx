"use client";

import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../../components/ui/accordion";
import { Checkbox } from "../../../../../components/ui/checkbox";
import { Button } from "../../../../../components/ui/button";
import { getParkingOptions } from "../../../../../../utils/getParkingOptions"; // Importez l'utilitaire

function AddParkingOptions() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [parkingOptions, setParkingOptions] = useState<{ id: string; name: string }[]>([]); // État pour stocker les options de parking

  // Charger les options de parking au montage du composant
  useEffect(() => {
    const fetchParkingOptions = async () => {
      const data = await getParkingOptions();
      setParkingOptions(data);
    };

    fetchParkingOptions();
  }, []);

  const handleSelection = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId) ? prev.filter((item) => item !== optionId) : [...prev, optionId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Selected Parking Options:", selectedOptions);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
      <Accordion type="single" collapsible>
        <AccordionItem value="parkingOptions">
          <AccordionTrigger className="text-xl font-bold py-4 px-2 hover:bg-gray-50 rounded-t-lg">Parking Options</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {parkingOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`option-${option.id}`}
                    checked={selectedOptions.includes(option.id)}
                    onCheckedChange={() => handleSelection(option.id)}
                  />
                  <label htmlFor={`option-${option.id}`} className="text-sm">
                    {option.name}
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

export default AddParkingOptions;