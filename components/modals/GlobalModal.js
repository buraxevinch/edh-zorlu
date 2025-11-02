"use client";
import dynamic from "next/dynamic";
import { useModal } from "@/app/providers/ModalContext";
const extModalMap = { lightbox: dynamic(() => import("./LightboxFrame"), { ssr: false }), custom: dynamic(() => import("./ModalFrame"), { ssr: false }) };

const GlobalModal = () => {
  const { modalState, closeModal } = useModal();
  if (!modalState.isOpen || !modalState.type) return null;
  const ModalComponent = extModalMap[modalState.type];
  if (!ModalComponent) return null;
  return <ModalComponent closeModal={closeModal} modalState={modalState} />;
};

export default GlobalModal;
