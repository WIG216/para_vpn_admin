/* eslint-disable @typescript-eslint/no-explicit-any */
import {create} from 'zustand';

export const useDialogStore = create<DialogState>((set) => ({
  open: false,
  title: '',
  desc: '',
  hideCancel: false,
  hideOk: false,
  cancelText: 'No',
  okText: 'Yes',
  loading: false,
  onClose: () => {
    set({ open: false, data: {} });
  },
  setDialogProps: (props) => {
    set({ ...props, open: true });
  },
  toggleLoading: () => {
    set((state) => ({ loading: !state.loading }));
  },
  closeDialog: () => {
    set({ open: false, onOk: undefined, onCancel: undefined });
  },
  onCancel: () => {
    set({ open: false, onOk: undefined, onCancel: undefined });
  },

}));
