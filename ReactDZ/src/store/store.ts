import { createStore } from "./storeUtils";
import type {
  HomePageState,
  GenerationPageState,
  HistoryPageState,
  FileHistory,
  ResultData,
} from "../types/types";

// Home Store
export const useHomeStore = createStore<HomePageState>(
  "home-storage",
  (set) => ({
    selectedFile: null,
    isUploading: false,
    progress: 0,
    results: [],
    error: null,
    setSelectedFile: (file: File | null) => set({ selectedFile: file }),
    setIsUploading: (value: boolean) => set({ isUploading: value }),
    setProgress: (value: number) => set({ progress: value }),
    setResults: (value: ResultData[]) => set({ results: value }),
    setError: (value: string | null) => set({ error: value }),
  })
);

// Generation Store
export const useGenerationStore = createStore<GenerationPageState>(
  "generation-storage",
  (set) => ({
    isGenerating: false,
    fileName: null,
    error: null,
    setIsGenerating: (value: boolean) => set({ isGenerating: value }),
    setFileName: (value: string | null) => set({ fileName: value }),
    setError: (value: string | null) => set({ error: value }),
  })
);

// History Store
export const useHistoryStore = createStore<HistoryPageState>(
  "history-storage",
  (set) => ({
    history: [], // Явно инициализируем как пустой массив
    setHistory: (history: FileHistory[]) => set({ history }),
    selectedFile: null,
    setSelectedFile: (file: FileHistory | null) => set({ selectedFile: file }),
    isModalOpen: false,
    setIsModalOpen: (value: boolean) => set({ isModalOpen: value }),
  })
);
