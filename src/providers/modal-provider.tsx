import { Dialog } from "../components/dialogs/ConfirmDialog";
import CreateServerModal from "../components/dialogs/CreateServerModal";

export const ModalProvider = () => {
  return (
    <>
      <Dialog  />
      <CreateServerModal />
    </>
  );
};
