import {create} from 'zustand'

interface SearchDialogState {
  isOpen: boolean
  setOpen: (open: boolean) => void
  open: () => void
  close: () => void
}

export const useSearchDialogStore = create<SearchDialogState>(set => ({
  isOpen: false,
  setOpen: (open: boolean) => set({isOpen: open}),
  open: () => set({isOpen: true}),
  close: () => set({isOpen: false}),
}))
