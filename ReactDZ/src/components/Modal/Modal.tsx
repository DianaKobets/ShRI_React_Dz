import { createPortal } from "react-dom";
import close from "../../assets/close.svg";
import type { ModalProps } from "../../types/types";
import Highlight from "../../components/Highlights/Highlight";
import style from "./Modal.module.css";

export function Modal({ isOpen, onClose, results }: ModalProps) {
  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const modalContent = (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.wrapper}>
        <button className={style.closeButton} onClick={handleClose}>
          <img src={close} alt="закрыть" />
        </button>
        <div
          className={style.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          {results && results.length > 0 ? (
            <Highlight results={results} columns={1} />
          ) : (
            <span className={style.noResults}>Нет доступных результатов</span>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
