import { create } from "zustand";

interface Hotel {
  id: string;
  name: string;
  hostId: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface ListHotelState {
  hotels: Hotel[];
  setHotels: (hotels: Hotel[]) => void;
}

export const useListHotelStore = create<ListHotelState>((set) => ({
  hotels: [], // Liste des hôtels
  setHotels: (hotels) => set({ hotels }), // Fonction pour mettre à jour la liste des hôtels
}));