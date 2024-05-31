import { create } from "zustand";

type Auth = {
  user: boolean;
  checkAuth: () => void;
  clearAuth: () => void;
};

export const useAuth = create<Auth>()((set) => ({
  user: false,
  checkAuth: () => set(() => ({ user: true })),
  clearAuth: () => set(() => ({ user: false })),
}));
