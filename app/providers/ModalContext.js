"use client";
import GlobalModal from "@/components/modals/GlobalModal";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }) {
  const [modalState, setModalState] = useState({ isOpen: false, type: null, content: null });

  const openModal = ({ type, content }) => {
    setModalState({ isOpen: true, type, content });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, content: null });
  };

  const value = { modalState, openModal, closeModal };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <GlobalModal />
    </ModalContext.Provider>
  );
}
