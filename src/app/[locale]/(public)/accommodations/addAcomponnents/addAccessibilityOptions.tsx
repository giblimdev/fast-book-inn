"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../../components/ui/accordion";
import { Checkbox } from "../../../../../components/ui/checkbox";
import { Button } from "../../../../../components/ui/button";
import { useAccommodationStore } from "../../../../../../store/useAccommodationStore";
import { Loader2 } from "lucide-react";
import { getAccessibilityOptions } from "../../../../../../utils/getAccessibilityOptions";

function AddAccessibilityOptions() {
  const { selectedAccommodation, setSelectedAccommodation } = useAccommodationStore();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [accessibilityOptions, setAccessibilityOptions] = useState<{ id: string; name: string }[]>([]); // État pour stocker les options d'accessibilité
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Charger les options d'accessibilité au montage du composant
  useEffect(() => {
    const fetchAccessibilityOptions = async () => {
      try {
        const data = await getAccessibilityOptions(); // Récupérer les options d'accessibilité depuis l'API
        setAccessibilityOptions(data);
      } catch (err) {
        setError("Failed to fetch accessibility options");
        console.error(err);
      }
    };

    fetchAccessibilityOptions();
  }, []);

  // Charger les options d'accessibilité existantes de l'hôtel sélectionné
  useEffect(() => {
    if (selectedAccommodation?.accessibilityOptions) {
      setSelectedOptions(selectedAccommodation.accessibilityOptions.map((opt) => opt.id));
    }
  }, [selectedAccommodation]);

  // Gestion de la sélection/désélection des options
  const handleSelection = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId) ? prev.filter((item) => item !== optionId) : [...prev, optionId]
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
      const response = await fetch(`/api/hotel/accessibilityOptions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hotelId: selectedAccommodation.id,
          optionIds: selectedOptions, // Envoyer les IDs des options sélectionnées
        }),
      });

      if (!response.ok) throw new Error("Failed to save accessibility options");

      const data = await response.json();

      // Mettre à jour le store avec les nouvelles options d'accessibilité
      const updatedAccommodation = {
        ...selectedAccommodation,
        accessibilityOptions: data,
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
      <AccordionItem value="accessibilityOptions">
        <AccordionTrigger className="text-xl font-bold py-4 px-2 hover:bg-gray-50 rounded-t-lg">
          Accessibility Options
        </AccordionTrigger>
        <AccordionContent className="px-4 py-6 bg-white rounded-b-lg border border-t-0 border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              {accessibilityOptions.map((option) => (
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

export default AddAccessibilityOptions;