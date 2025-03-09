

"use client";

import React, { useEffect, useState } from "react";
import { useUserStore } from "../../../../../../store/useUserStore";
import { useAccommodationStore } from "../../../../../../store/useAccommodationStore";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../../components/ui/accordion";

export default function AddAccommodation() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const { selectedAccommodation, setSelectedAccommodation } = useAccommodationStore();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Remplir le formulaire avec les infos de l'hôtel sélectionné
  useEffect(() => {
    setName(selectedAccommodation?.name || "");
  }, [selectedAccommodation]);

  // Fonction pour créer ou mettre à jour un hôtel
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!user) {
      setError("Vous devez être connecté pour effectuer cette action");
      setLoading(false);
      return;
    }

    try {
      const method = selectedAccommodation ? "PUT" : "POST";
      const payload = {
        id: selectedAccommodation?.id,
        name,
        userId: user.id,
      };

      const response = await fetch("/api/hotel", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erreur lors de l'enregistrement de l'hôtel");

      setSuccess(selectedAccommodation ? "Hôtel mis à jour avec succès" : "Nouvel hôtel créé avec succès");
      setSelectedAccommodation(null);
      setName("");
      router.push("/"); 
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour supprimer un hôtel
  const handleDelete = async () => {
    if (!selectedAccommodation) return;
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet hôtel ?")) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/hotel", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedAccommodation.id }),
      });

      if (!response.ok) throw new Error("Erreur lors de la suppression de l'hôtel");

      setSelectedAccommodation(null);
      setName("");
      setSuccess("Hôtel supprimé avec succès");
      router.push("/"); 
    } catch (err: any) {
      setError(err.message || "Une erreur s'est produite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Accordion type="single" collapsible className="p-4 border rounded-lg ">
      <AccordionItem value="accommodation-info">
        <AccordionTrigger className="text-xl font-bold py-4 px-2 hover:bg-gray-50 rounded-t-lg">
          {selectedAccommodation ? "Modifier l'hôtel" : "Ajouter un nouvel hôtel"}
        </AccordionTrigger>
        <AccordionContent className="px-4 py-6 bg-white rounded-b-lg border border-t-0 border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nom de l'hôtel*
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom de l'hôtel"
                required
                className="w-full"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {selectedAccommodation ? "Mettre à jour" : "Créer l'hôtel"}
              </Button>

              {selectedAccommodation && (
                <Button type="button" disabled={loading} onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Supprimer l'hôtel
                </Button>
              )}

              {selectedAccommodation && (
                <Button
                  type="button"
                  onClick={() => {
                    setSelectedAccommodation(null);
                    setName("");
                  }}
                  className="text-blue-600 border-blue-600"
                >
                  Créer un nouvel hôtel
                </Button>
              )}
            </div>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}