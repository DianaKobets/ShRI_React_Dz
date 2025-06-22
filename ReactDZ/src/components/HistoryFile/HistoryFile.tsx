import { useState } from "react";
import trash from "../../assets/trash.svg";
import type { HistoryFileProps } from "../../types/types";
import { Modal } from "../Modal/Modal";
import style from "./HistoryFile.module.css";
import fileIcon from "../../assets/file.svg";
import sad_smile from "../../assets/sad_smile.svg";
import smile from "../../assets/smile.svg";

export function HistoryFile({ file, onRemove }: HistoryFileProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.historyItem} onClick={handleFileClick}>
      <div className={style.fileInfo}>
        <div className={style.fileName}>
          <img src={fileIcon} alt="file-icon" />
          <span>{file.name}</span>
        </div>
        <span className={style.timestamp}>{file.timestamp}</span>
        <div className={style.statuses}>
          <div
            className={`${style.status} ${style.success} ${file.status === "success" ? style.active : ""}`}
          >
            <span>Обработан успешно</span>
            <img src={smile} alt="smile-icon" />
          </div>
          <div
            className={`${style.status} ${style.failed} ${file.status === "failed" ? style.active : ""}`}
          >
            <span>Не удалось обработать</span>
            <img src={sad_smile} alt="sad-smile-icon" />
          </div>
        </div>
      </div>
      <button className={style.removeButton} onClick={onRemove}>
        <img src={trash} alt="удалить" />
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} results={file.results} />
    </div>
  );
}
