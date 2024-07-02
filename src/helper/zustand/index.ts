import { create } from "zustand";
import { Toggler } from "@/types";

export const useToggler = create<Toggler>()((set) => ({
  toggle: false,
  toggler: () => set((state) => ({ toggle: !state.toggle })),
}));
