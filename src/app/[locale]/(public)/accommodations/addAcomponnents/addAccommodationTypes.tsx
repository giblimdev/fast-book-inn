//src/app/[locale]/(public)/accommodations/addAcomponnents/addAccommodationTypes.tsx
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
import { getAccommodationTypes } from "../../../../../..//utils/getAccommodationTypes"; // Import de la fonction getAccommodationTypes
import { useAccommodationStore } from "../../../../../../store/useAccommodationStore"; // Import du store pour récupérer l'hôtel sélectionné
import { Loader2 } from "lucide-react";

function AddAccommodationTypes() {
  const { selectedAccommodation, setSelectedAccommodation } = useAccommodationStore();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [accommodationTypes, setAccommodationTypes] = useState<{ id: string; name: string }[]>([]); // État pour stocker les types d'hébergement
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les types d'hébergement au montage du composant
  useEffect(() => {
    const fetchAccommodationTypes = async () => {
      try {
        const data = await getAccommodationTypes(); // Récupérer les types d'hébergement depuis l'API
        setAccommodationTypes(data);
      } catch (err) {
        setError("Failed to fetch accommodation types");
        console.error(err);
      }
    };

    fetchAccommodationTypes();
  }, []);

  // Charger les types d'hébergement existants de l'hôtel sélectionné
  useEffect(() => {
    if (selectedAccommodation?.accommodationTypes) {
      setSelectedTypes(selectedAccommodation.accommodationTypes.map((type) => type.id));
    }
  }, [selectedAccommodation]);

  // Gestion de la sélection/désélection des types
  const handleSelection = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId) ? prev.filter((item) => item !== typeId) : [...prev, typeId]
    );
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!selectedAccommodation) {
      setError("No accommodation selected.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/hotel/accommodationTypes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hotelId: selectedAccommodation.id,
          typeIds: selectedTypes, // Envoyer les IDs des types sélectionnés
        }),
      });

      if (!response.ok) throw new Error("Failed to save accommodation types");

      const data = await response.json();

      // Mettre à jour le store avec les nouveaux types d'hébergement
      const updatedAccommodation = {
        ...selectedAccommodation,
        accommodationTypes: data,
      };
      setSelectedAccommodation(updatedAccommodation);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Accordion type="single" collapsible className="p-4 border rounded-lg ">
      <AccordionItem value="accommodationTypes">
        <AccordionTrigger className="text-xl font-bold py-4 px-2 hover:bg-gray-50 rounded-t-lg">
          Accommodation Types
        </AccordionTrigger>
        <AccordionContent className="px-4 py-6 bg-white rounded-b-lg border border-t-0 border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              {accommodationTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type.id}`}
                    checked={selectedTypes.includes(type.id)}
                    onCheckedChange={() => handleSelection(type.id)}
                  />
                  <label htmlFor={`type-${type.id}`} className="text-sm">
                    {type.name}
                  </label>
                </div>
              ))}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Save
            </Button>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default AddAccommodationTypes;