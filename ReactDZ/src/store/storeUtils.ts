import { create } from "zustand";
import { persist, type PersistStorage } from "zustand/middleware";
import type { StateCreator } from "zustand";

const createLocalStorage = <T>(): PersistStorage<T> => ({
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: unknown) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name);
  },
});

const createStore = <T>(name: string, initialState: StateCreator<T>) =>
  create(
    persist(initialState, {
      name,
      storage: createLocalStorage<T>(),
    })
  );

export { createStore, createLocalStorage };
