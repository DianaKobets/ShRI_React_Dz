import type { ActionButtonProps } from "../../types/types";
import style from "./ActionButton.module.css";

export const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  disabled = false,
  children,
  className = "",
}) => {
  return (
    <button
      className={`${style.customButton} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
