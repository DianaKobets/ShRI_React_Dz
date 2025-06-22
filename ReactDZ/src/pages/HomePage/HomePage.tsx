import { useState } from "react";
import { Header } from "../../components/Header/Header";
import DragAndDrop from "../../components/Drag&Drop/Drag&Drop";
import Highlight from "../../components/Highlights/Highlight";
import type { ResultData } from "../../types/types";
import { Loader } from "../../components/Loader/Loader";
import style from "./HomePage.module.css";
import { ActionButton } from "../../components/ActionButton/ActionButton";

export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [results, setResults] = useState<ResultData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProcessed, setIsProcessed] = useState<boolean>(false);

  const handleFileSelect = (file: File | null): void => {
    setSelectedFile(file);
    setResults([]);
    setError(null);
    setIsProcessed(false);

    if (file) {
      checkFileContent(file)
        .then((isValid) => {
          if (!isValid) {
            setSelectedFile(null);
            setError("упс, не то...");
          }
        })
        .catch(() => {
          setSelectedFile(null);
          setError("упс, не то...");
        });
    }
  };

  const checkFileContent = async (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (
          !text ||
          !text.includes(",") ||
          text.trim().split("\n").length < 2
        ) {
          resolve(false);
        } else {
          resolve(true);
        }
      };
      reader.onerror = () => resolve(false);
      reader.readAsText(file);
    });
  };

  const handleUpload = async (): Promise<void> => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);

    try {
      const processedResults = await uploadFile(selectedFile);
      updateHistory(selectedFile, true, undefined, processedResults);
      setResults(processedResults);
      setIsProcessed(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Неизвестная ошибка при загрузке файла";
      setError("упс, не то...");
      console.error("Ошибка загрузки:", err);
      updateHistory(selectedFile, false, errorMessage, []);
    } finally {
      setIsUploading(false);
    }
  };

  const uploadFile = async (file: File): Promise<ResultData[]> => {
    const formData = new FormData();
    formData.append("file", file, file.name);

    const url = new URL("http://localhost:3000/aggregate");
    url.searchParams.append("rows", "10000");

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Ошибка сервера: ${response.status} - ${errorText || "Нет деталей"}`
      );
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error("Не удалось получить поток данных");

    const decoder = new TextDecoder();
    let buffer = "";
    const finalResults: ResultData[] = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.trim()) {
          try {
            const json = JSON.parse(line) as ResultData;
            finalResults.push(json);
            setResults((prev) => [...prev, json]); // Потоковое обновление
          } catch (e) {
            console.error("Ошибка парсинга JSON:", e, "Строка:", line);
            setError("упс, не то...");
            throw e;
          }
        }
      }
    }

    if (buffer.trim()) {
      try {
        const json = JSON.parse(buffer) as ResultData;
        finalResults.push(json);
        setResults((prev) => [...prev, json]); // Обновление для остатка
      } catch (e) {
        console.error("Ошибка парсинга остатка JSON:", e, "Остаток:", buffer);
        setError("упс, не то...");
        throw e;
      }
    }

    return finalResults;
  };

  const updateHistory = (
    file: File,
    success: boolean,
    error?: string,
    results?: ResultData[]
  ): void => {
    const newHistoryEntry = {
      id: Date.now(),
      name: file.name,
      status: success ? "success" : "failed",
      details: success
        ? `Обработан успешно в ${new Date().toLocaleTimeString()}`
        : error,
      timestamp: new Date().toLocaleString(),
      results: results || [],
    };
    console.log("Saving to history:", newHistoryEntry);
    const storedHistory = JSON.parse(
      localStorage.getItem("fileHistory") || "[]"
    );
    const updatedHistory = [...storedHistory, newHistoryEntry];
    localStorage.setItem("fileHistory", JSON.stringify(updatedHistory));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      <div className="container">
        <span>
          Загрузите <b>csv</b> файл и получите <b>полную информацию</b> о нём за
          сверхнизкое время
        </span>
        <DragAndDrop
          onFileSelect={handleFileSelect}
          isUploading={isUploading}
          fileName={
            isUploading ? (
              <Loader text="идет парсинг файла" />
            ) : (
              selectedFile?.name || ""
            )
          }
          error={error}
          isProcessed={isProcessed}
        />
        {isUploading || isProcessed ? (
          <></>
        ) : (
          <ActionButton
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className={style.button}
          >
            Отправить
          </ActionButton>
        )}
      </div>
      <Highlight results={results} />
    </>
  );
}
