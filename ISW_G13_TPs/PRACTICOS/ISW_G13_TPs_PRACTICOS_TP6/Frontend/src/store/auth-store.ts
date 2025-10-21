import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    email: string | null;
    login: (email: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist((set) => ({
        email: null,
        login: (email: string) => set({ email }),
        logout: () => set({ email: null }),
    }), {
        name: "auth-storage",
    })
);
