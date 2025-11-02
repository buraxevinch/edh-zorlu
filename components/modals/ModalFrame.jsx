"use client";
import { Icon } from "../extentions/Icon";
import * as Dialog from "@radix-ui/react-dialog";

const ModalFrame = ({ closeModal, modalState }) => {
  return (
    <Dialog.Root open={modalState.isOpen} onOpenChange={closeModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="p-6 max-w-md w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-50">
          <Dialog.Title className="mb-2 text-lg font-normal">{modalState.content.title}</Dialog.Title>
          {modalState.content.Component}
          {/* <Dialog.Description className="dialog-description">{modalState.content.Component}</Dialog.Description> */}
          <Dialog.Close asChild>
            <button className="p-1 absolute top-0 right-0 bg-red-500 hover:bg-red-700 rounded-bl" aria-label="Close">
              <Icon icon="close" color="white" size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalFrame;
