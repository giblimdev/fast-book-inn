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
import { getRoomFeatures } from "../../../../../../utils/getRoomFfeatures"; 

function AddRoomFeatures() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [roomFeatures, setRoomFeatures] = useState<{ id: string; name: string }[]>([]); // État pour stocker les fonctionnalités de chambre

  // Charger les fonctionnalités de chambre au montage du composant
  useEffect(() => {
    const fetchRoomFeatures = async () => {
      const data = await getRoomFeatures();
      setRoomFeatures(data);
    };

    fetchRoomFeatures();
  }, []);

  const handleSelection = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId) ? prev.filter((item) => item !== featureId) : [...prev, featureId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Selected Room Features:", selectedFeatures);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
      <Accordion type="single" collapsible>
        <AccordionItem value="roomFeatures">
          <AccordionTrigger className="text-xl font-bold py-4 px-2 hover:bg-gray-50 rounded-t-lg">Room Features</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {roomFeatures.map((feature) => (
                <div key={feature.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`feature-${feature.id}`}
                    checked={selectedFeatures.includes(feature.id)}
                    onCheckedChange={() => handleSelection(feature.id)}
                  />
                  <label htmlFor={`feature-${feature.id}`} className="text-sm">
                    {feature.name}
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

export default AddRoomFeatures;