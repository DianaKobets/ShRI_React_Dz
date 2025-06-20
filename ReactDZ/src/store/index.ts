import { create } from "zustand";

interface HistoryEntry {
  fileName: string;
  date: string;
  status: boolean;
  data?: string;
  error?: string;
}

interface AppState {
  progress: number;
  history: HistoryEntry[];
  setProgress: (progress: number) => void;
  addHistory: (entry: HistoryEntry) => void;
  cleanHistory: () => void;
}

export const useStore = create<AppState>((set) => ({
  progress: 0,
  history:
    JSON.parse(localStorage.getItem("app-storage") || "{}").state?.history ||
    [],
  setProgress: (progress) => set({ progress }),
  addHistory: (entry) =>
    set((state) => {
      const newHistory = [...state.history, entry];
      localStorage.setItem(
        "app-storage",
        JSON.stringify({ state: { history: newHistory } })
      );
      return { history: newHistory };
    }),
  removeHistory: (index: number) =>
    set((state) => {
      const newHistory = state.history.filter((_, i) => i !== index);
      localStorage.setItem(
        "app-storage",
        JSON.stringify({ state: newHistory })
      );
      return { history: newHistory };
    }),
  cleanHistory: () => {
    localStorage.removeItem("app-storage");
    set({ history: [] });
  },
}));
