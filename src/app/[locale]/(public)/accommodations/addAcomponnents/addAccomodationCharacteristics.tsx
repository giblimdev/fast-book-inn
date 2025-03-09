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
import { getAccommodationCharacteristics } from "../../../../../../utils/getAccomodationCharacteristics"; // Import de la fonction getAccommodationCharacteristics
import { useAccommodationStore } from "../../../../../../store/useAccommodationStore"; // Import du store pour récupérer l'hôtel sélectionné
import { Loader2 } from "lucide-react";

function AddAccomodationCharacteristics() {
  const { selectedAccommodation, setSelectedAccommodation } = useAccommodationStore();
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<string[]>([]);
  const [accommodationCharacteristics, setAccommodationCharacteristics] = useState<{ id: string; name: string }[]>([]); // État pour stocker les caractéristiques d'hébergement
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les caractéristiques d'hébergement au montage du composant
  useEffect(() => {
    const fetchAccommodationCharacteristics = async () => {
      try {
        const data = await getAccommodationCharacteristics(); // Récupérer les caractéristiques d'hébergement depuis l'API
        setAccommodationCharacteristics(data);
      } catch (err) {
        setError("Failed to fetch accommodation characteristics");
        console.error(err);
      }
    };

    fetchAccommodationCharacteristics();
  }, []);

  // Charger les caractéristiques d'hébergement existantes de l'hôtel sélectionné
  useEffect(() => {
    if (selectedAccommodation?.accommodationCharacteristics) {
      setSelectedCharacteristics(selectedAccommodation.accommodationCharacteristics.map((char) => char.id));
    }
  }, [selectedAccommodation]);

  // Gestion de la sélection/désélection des caractéristiques
  const handleSelection = (characteristicId: string) => {
    setSelectedCharacteristics((prev) =>
      prev.includes(characteristicId) ? prev.filter((item) => item !== characteristicId) : [...prev, characteristicId]
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
      const response = await fetch(`/api/hotel/accommodationCharacteristics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hotelId: selectedAccommodation.id,
          characteristicIds: selectedCharacteristics, // Envoyer les IDs des caractéristiques sélectionnées
        }),
      });

      if (!response.ok) throw new Error("Failed to save accommodation characteristics");

      const data = await response.json();

      // Mettre à jour le store avec les nouvelles caractéristiques d'hébergement
      const updatedAccommodation = {
        ...selectedAccommodation,
        accommodationCharacteristics: data,
      };
      setSelectedAccommodation(updatedAccommodation);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Accordion type="single" collapsible className="p-4 border rounded-lg">
      <AccordionItem value="accomodationCharacteristics">
        <AccordionTrigger className="text-xl font-bold py-4 px-2 hover:bg-gray-50 rounded-t-lg">
          Accommodation Characteristics
        </AccordionTrigger>
        <AccordionContent className="px-4 py-6 bg-white rounded-b-lg border border-t-0 border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              {accommodationCharacteristics.map((characteristic) => (
                <div key={characteristic.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`characteristic-${characteristic.id}`}
                    checked={selectedCharacteristics.includes(characteristic.id)}
                    onCheckedChange={() => handleSelection(characteristic.id)}
                  />
                  <label htmlFor={`characteristic-${characteristic.id}`} className="text-sm">
                    {characteristic.name}
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

export default AddAccomodationCharacteristics;