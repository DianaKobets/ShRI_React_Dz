import React from "react";
import closeIcon from "../../assets/close.svg";
import styles from "./ResetButton.module.css";

interface ResetButtonProps {
  onClick: () => void;
  ariaLabel?: string;
}

export const ResetButton: React.FC<ResetButtonProps> = ({
  onClick,
  ariaLabel = "Удалить файл",
}) => {
  return (
    <button
      onClick={onClick}
      className={styles.resetButton}
      aria-label={ariaLabel}
    >
      <img src={closeIcon} alt="удалить" />
    </button>
  );
};
