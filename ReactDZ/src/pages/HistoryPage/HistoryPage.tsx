import { useState, useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { History } from "../../components/History/History.tsx";
import style from "./HistoryPage.module.css";
import { ActionButton } from "../../components/ActionButton/ActionButton.tsx";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const storedHistory = JSON.parse(
      localStorage.getItem("fileHistory") || "[]"
    );
    setHistory(storedHistory);
  }, []);

  const handleClearAll = () => {
    localStorage.removeItem("fileHistory");
    setHistory([]);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      <div className={style.container}>
        <History history={history} setHistory={setHistory} />
        <div className={style.buttonContainer}>
          <a href="/generator" className={style.generateButton}>
            Сгенерировать больше
          </a>

          <ActionButton onClick={handleClearAll} className={style.clearButton}>
            Очистить все
          </ActionButton>
        </div>
      </div>
    </>
  );
}
