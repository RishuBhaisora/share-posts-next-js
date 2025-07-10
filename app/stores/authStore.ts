// app/stores/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  username: string;
  name: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;

  // Actions
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    password: string,
    name?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      login: async (username: string, password: string) => {
        set({ loading: true, error: null });

        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Login failed");
          }

          set({ user: data.user, loading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Login failed",
            loading: false,
          });
          throw error;
        }
      },

      register: async (username: string, password: string, name?: string) => {
        set({ loading: true, error: null });

        try {
          const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, name }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Registration failed");
          }

          set({ user: data.user, loading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error ? error.message : "Registration failed",
            loading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          await fetch("/api/auth/logout", {
            method: "POST",
          });
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({ user: null, error: null });
        }
      },

      checkAuth: async () => {
        set({ loading: true });
        try {
          const response = await fetch("/api/auth/me", {
            method: "GET",
          });
          
          if (response.ok) {
            const data = await response.json();
            set({ user: data.user, loading: false });
          } else {
            set({ user: null, loading: false });
          }
        } catch (error) {
          console.error("Auth check error:", error);
          set({ user: null, loading: false });
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
