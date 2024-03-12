import { FC, useEffect, useRef } from "react";
import "./Dialog.css";

const Dialog: FC<{
  open: boolean;
  onClose?: () => void;
  data: { title: string; content: string; tel: string; representante: string };
}> = ({ open, data, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (open) {
        dialogRef.current.showModal();
      }
    }
  }, [open]);
  const closeModal = () => {
    if (typeof onClose === "function") onClose();
    if (dialogRef.current) dialogRef.current.close();
  };
  return (
    <dialog
      ref={dialogRef}
      className="relative overflow-visible rounded-lg bg-black p-10 text-white"
    >
      <h1>Nombre: {data.title}</h1>
      <p>Direccion: {data.content}</p>
      <p>Telefono: {data.tel}</p>
      <p>Representante: {data.representante}</p>
      <button
        className="absolute -right-2 -top-5 z-40 w-10 rounded-full bg-red-700 p-2 text-center text-white"
        onClick={closeModal}
        aria-label="cerrar"
      >
        X
      </button>
    </dialog>
  );
};

export default Dialog;
