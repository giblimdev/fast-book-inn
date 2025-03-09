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
import { getBedTypes } from "../../../../../../utils/getBedTypes"; // Importez l'utilitaire

function AddBedTypes() {
  const [selectedBedTypes, setSelectedBedTypes] = useState<string[]>([]);
  const [bedTypes, setBedTypes] = useState<{ id: string; name: string }[]>([]); // État pour stocker les types de lits

  // Charger les types de lits au montage du composant
  useEffect(() => {
    const fetchBedTypes = async () => {
      const data = await getBedTypes();
      setBedTypes(data);
    };

    fetchBedTypes();
  }, []);

  const handleSelection = (bedTypeId: string) => {
    setSelectedBedTypes((prev) =>
      prev.includes(bedTypeId) ? prev.filter((item) => item !== bedTypeId) : [...prev, bedTypeId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Selected Bed Types:", selectedBedTypes);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
      <Accordion type="single" collapsible>
        <AccordionItem value="bedTypes">
          <AccordionTrigger className="text-xl font-bold py-4 px-2 hover:bg-gray-50 rounded-t-lg">Bed Types</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {bedTypes.map((bedType) => (
                <div key={bedType.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`bedType-${bedType.id}`}
                    checked={selectedBedTypes.includes(bedType.id)}
                    onCheckedChange={() => handleSelection(bedType.id)}
                  />
                  <label htmlFor={`bedType-${bedType.id}`} className="text-sm">
                    {bedType.name}
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

export default AddBedTypes;