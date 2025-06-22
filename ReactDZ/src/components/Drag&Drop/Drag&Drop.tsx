import { useState } from "react";
import styles from "./Drag&Drop.module.css";
import type { DragAndDrop as DragAndDropProps } from "../../types/types";
import { Loader } from "../Loader/Loader";
import { ResetButton } from "../ResetButton/ResetButton";

export default function DragAndDrop({
  onFileSelect,
  isUploading,
  fileName,
  error: parentError,
  isProcessed,
}: DragAndDropProps & {
  isUploading: boolean;
  fileName: string | React.ReactNode;
  error?: string | null | undefined;
  isProcessed?: boolean;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    const fileName = file.name.toLowerCase();
    return file.type === "text/csv" || fileName.endsWith(".csv");
  };

  const handleFileProcessing = (selectedFile: File): void => {
    setFile(selectedFile);
    const isValid = validateFile(selectedFile);
    if (isValid) {
      setLocalError(null);
      onFileSelect(selectedFile);
    } else {
      setLocalError("упс, не то...");
      onFileSelect(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileProcessing(droppedFile);
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileProcessing(selectedFile);
    }
  };

  const resetFile = (): void => {
    setFile(null);
    setLocalError(null);
    onFileSelect(null);
  };

  const dropZoneClass = `${styles.dropZone} 
    ${isDragging ? styles.dragOver : ""} 
    ${file && !localError && !parentError ? styles.valid : ""}
    ${localError || parentError ? styles.invalid : ""}`;

  return (
    <div
      className={dropZoneClass}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
    >
      {isUploading ? (
        <Loader text="идет парсинг файла" />
      ) : file ? (
        <>
          <div className={styles.file}>
            <span
              className={`${styles.fileInfo} ${
                localError || parentError
                  ? styles.fileInfoInvalid
                  : isProcessed
                    ? styles.fileInfoProcessed
                    : ""
              }`}
            >
              {file.name}
            </span>
            <ResetButton onClick={resetFile} />
          </div>
          <span className={styles.helperText}>
            {localError ||
              parentError ||
              (isProcessed ? "готово!" : "файл загружен!")}
          </span>
        </>
      ) : (
        <>
          <label className={styles.label}>
            <input
              type="file"
              accept=".csv"
              onChange={handleSelect}
              className={styles.input}
            />
            <span className={styles.buttonText}>Загрузить файл</span>
          </label>
          <span className={styles.helperText}>
            {localError || parentError || "или перетащите сюда"}
          </span>
        </>
      )}
    </div>
  );
}
