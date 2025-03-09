//src/store/useUserStore.ts
import { create } from "zustand";

// Interface User basée sur le modèle Prisma
interface User {
  id: string;
  name: string | null;
  email: string;
  password: string; // Ajout du champ password
  phone: string | null;
  lang: string;
  image: string | null;
  role: "USER" | "HOST" | "ADMIN"; // Correction de "HOSTE" à "HOST"
  emailVerified: boolean | null;
  phoneVerified: boolean | null;
  createdAt: Date; // Ajout du champ createdAt
  updatedAt: Date; // Ajout du champ updatedAt
  hotels?: any[]; // Optionnel : relation avec les hôtels
}

interface UserStore {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  clearUser: () => set({ user: null, token: null }),
}));