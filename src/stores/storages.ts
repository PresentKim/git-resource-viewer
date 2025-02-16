import type {StateStorage} from 'zustand/middleware'
import {get, set, del} from 'idb-keyval'

export const indexedDBStorage: StateStorage = {
  getItem: async (k: string) => (await get(k)) ?? null,
  setItem: async (k: string, v: string) => await set(k, v),
  removeItem: async (k: string) => await del(k),
}

export const compactedStorage =
  typeof indexedDB === 'undefined' ? localStorage : indexedDBStorage

export interface SmartStorage<T> {
  getItem: (key: string) => Promise<T | null>
  setItem: (key: string, value: T) => Promise<unknown>
  removeItem: (key: string) => Promise<unknown>
}

export function createSmartStorage<T>(
  storage: StateStorage = compactedStorage,
): SmartStorage<T> {
  return {
    getItem: async (key: string) => {
      const json = await storage.getItem(key)
      return json ? JSON.parse(json) : null
    },
    setItem: async (key: string, value: T) =>
      await storage.setItem(key, JSON.stringify(value)),
    removeItem: async (k: string) => await storage.removeItem(k),
  }
}
