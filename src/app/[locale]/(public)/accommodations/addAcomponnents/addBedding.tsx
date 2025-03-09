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
import { getBeddingConfigurations } from "../../../../../../utils/getBeddingConfiguration"; // Importez la fonction

function AddBeddingConfiguration() {
  const [selectedBedding, setSelectedBedding] = useState<string[]>([]);
  const [beddingConfigurations, setBeddingConfigurations] = useState<{ id: string; name: string }[]>([]); // État pour stocker les configurations de literie

  // Charger les configurations de literie au montage du composant
  useEffect(() => {
    const fetchBeddingConfigurations = async () => {
      const data = await getBeddingConfigurations();
      setBeddingConfigurations(data);
    };

    fetchBeddingConfigurations();
  }, []);

  const handleSelection = (beddingId: string) => {
    setSelectedBedding((prev) =>
      prev.includes(beddingId) ? prev.filter((item) => item !== beddingId) : [...prev, beddingId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Selected Bedding Configurations:", selectedBedding);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
      <Accordion type="single" collapsible>
        <AccordionItem value="beddingConfiguration">
          <AccordionTrigger className="text-xl font-bold py-4 px-2 hover:bg-gray-50 rounded-t-lg">Bedding Configuration</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {beddingConfigurations.map((bedding) => (
                <div key={bedding.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`bedding-${bedding.id}`}
                    checked={selectedBedding.includes(bedding.id)}
                    onCheckedChange={() => handleSelection(bedding.id)}
                  />
                  <label htmlFor={`bedding-${bedding.id}`} className="text-sm">
                    {bedding.name}
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

export default AddBeddingConfiguration;