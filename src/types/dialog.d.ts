/* eslint-disable @typescript-eslint/no-explicit-any */
type DialogControls<T> = {
    onOk?: (data?: T) => void;
    onCancel?: (data?: T) => void;
    okText?: string;
    cancelText?: string;
    onClose?: any;
    hideCancel?: boolean;
    hideOk?: boolean;
    loading?: boolean;
    open?: boolean;
    title?: string;
};

type DialogProps<T> = DialogControls & {
    desc?: string;
    data?: T;
};

type DialogState<T = any> ={
    open: boolean;
    title: string;
    desc: string;
    hideCancel: boolean;
    hideOk: boolean;
    cancelText: string;
    okText: string;
    loading: boolean;
    data?: T;
    onClose: any;
    onOk?: (data?: T) => void;
    onCancel?: (data?: T) => void;
    setDialogProps: (props: DialogState<T>) => void;
    toggleLoading: () => void;
    closeDialog: () => void;
  }
  