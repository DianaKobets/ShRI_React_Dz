import { HistoryFile } from "../HistoryFile/HistoryFile.tsx";
import type { HistoryProps } from "../../types/types";
import style from "./History.module.css";

export function History({ history, setHistory }: HistoryProps) {
  const handleRemoveFile = (id: number) => {
    const updatedHistory = history.filter((item) => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem("fileHistory", JSON.stringify(updatedHistory));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className={style.historyContainer}>
      {history.length === 0 ? (
        <span className={style.noHistory}>История пуста</span>
      ) : (
        history.map((item) => (
          <HistoryFile
            key={item.id}
            file={item}
            onRemove={() => handleRemoveFile(item.id)}
          />
        ))
      )}
    </div>
  );
}
