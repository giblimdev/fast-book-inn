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
import { getDestinations } from "../../../../../../utils/getDestination"; // Importez la fonction getDestinations

function AddDestinations() {
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]); // État pour stocker les destinations récupérées
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [error, setError] = useState<string | null>(null); // État pour gérer les erreurs

  // Récupérer les destinations au montage du composant
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const data = await getDestinations(); // Appel à la fonction getDestinations
        // Transformez les données en un tableau de noms de destinations
        const destinationNames = data.map((destination) => destination.name);
        setDestinations(destinationNames);
      } catch (err) {
        setError("Failed to fetch destinations");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleSelection = (destination: string) => {
    setSelectedDestinations((prev) =>
      prev.includes(destination)
        ? prev.filter((item) => item !== destination)
        : [...prev, destination]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Selected Destinations:", selectedDestinations);
  };

  if (loading) {
    return <div>Loading destinations...</div>; // Affichez un message de chargement
  }

  if (error) {
    return <div>{error}</div>; // Affichez un message d'erreur
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
      <Accordion type="single" collapsible>
        <AccordionItem value="destinations">
          <AccordionTrigger className="text-xl font-bold py-4 px-2 hover:bg-gray-50 rounded-t-lg">Destinations</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {destinations.map((destination, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`destination-${index}`}
                    checked={selectedDestinations.includes(destination)}
                    onCheckedChange={() => handleSelection(destination)}
                  />
                  <label htmlFor={`destination-${index}`} className="text-sm">
                    {destination} 
                  </label>
                </div>
              ))}
            </div>
            <Button
              type="submit"
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Submit
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </form>
  );
}

export default AddDestinations;