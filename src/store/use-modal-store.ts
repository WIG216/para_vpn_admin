import { create } from "zustand"

export type ModalType = "createServer" | "updateServer" 

interface ModalStore {
    type: ModalType | null;
    data: Server | null;
    isOpen: boolean;
    onOpen: ({type, data}:{type: ModalType, data?: Server}) => void
    onClose: () => void
}

export const useModal = create<ModalStore>(set => ({
    type: null,
    isOpen: false,
    data: null,
    onOpen: ({type, data}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false, data: null })
}))