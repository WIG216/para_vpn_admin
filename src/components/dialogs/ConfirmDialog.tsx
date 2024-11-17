/* eslint-disable react-refresh/only-export-components */
import {
  Dialog as ShadDialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useDialogStore } from "@/store/use-dialog-store";
import { Button } from "../ui/button";

export function Dialog() {
  const {
    open,
    title,
    desc,
    hideCancel,
    hideOk,
    cancelText,
    okText,
    loading,
    data,
    closeDialog,
    onClose,
    onCancel,
    onOk,
  } = useDialogStore((state) => state);

  return (
    <ShadDialog open={open} modal>
      <DialogContent onClose={onClose}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {desc && <DialogDescription>{desc}</DialogDescription>}
        </DialogHeader>
        <DialogFooter>
          {!hideCancel && (
            <Button
              variant="outline"
              onClick={() => {
                if (onCancel) {
                  onCancel(data);
                } else {
                  onClose();
                }
              }}
            >
              {cancelText}
            </Button>
          )}
          {!hideOk && (
            <Button
              onClick={() => {
                if (onOk) {
                  onOk(data || {});
                } else {
                  closeDialog();
                }
              }}
              disabled={loading}
              loading={loading}
            >
              { okText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </ShadDialog>
  );
}

export default function confirmDialog<T>(props: DialogProps<T>) {
  useDialogStore.getState().setDialogProps({
    ...props,
    onOk: props.onOk || (() => {}),
    onCancel: props.onCancel,
    loading: props.loading
  });
}

export  function closeConfirmDialog() {
  useDialogStore.getState().closeDialog();
}

export  function toggleDialogLoading() {
  useDialogStore.getState().toggleLoading();
}
