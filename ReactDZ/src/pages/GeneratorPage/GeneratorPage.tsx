import { useGenerationStore } from "../../store/store";
import { Loader } from "../../components/Loader/Loader";
import style from "./GeneratorPage.module.css";
import { ResetButton } from "../../components/ResetButton/ResetButton";
import { ActionButton } from "../../components/ActionButton/ActionButton";

export default function GeneratorPage() {
  const {
    isGenerating,
    fileName,
    error,
    setIsGenerating,
    setFileName,
    setError,
  } = useGenerationStore();

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:3000/report?size=0.1&withErrors=on&maxSpend=1000",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Сбой запроса: ${response.status} - ${errorText || "Нет дополнительной информации"}`
        );
      }

      const blob = await response.blob();
      const generatedFileName = "generated_file.csv";

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = generatedFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setFileName(generatedFileName);
    } catch (err) {
      setError("упс не то");
      setFileName(null);
      console.error("Ошибка генерации:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setFileName(null);
    setError(null);
  };

  return (
    <div className={style.container}>
      <h1 className={style.h1}>
        Сгенерируйте готовый csv-файл нажатием одной кнопки
      </h1>
      <div className={style.content}>
        {isGenerating ? (
          <Loader text="идёт процесс генерации" />
        ) : fileName ? (
          <>
            <div className={style.generated_file_container}>
              <span className={style.generated_file}>Done!</span>
              <ResetButton onClick={handleReset} />
            </div>
            <span className={style.statusText}>файл сгенерирован</span>
          </>
        ) : error ? (
          <>
            <div className={style.generated_file_container}>
              <span className={style.generated_file}>ошибка</span>
              <ResetButton onClick={handleReset} />
            </div>
            <span className={style.statusText}>{error}</span>
          </>
        ) : (
          <ActionButton
            onClick={handleGenerate}
            className={style.generateButton}
          >
            Начать генерацию
          </ActionButton>
        )}
      </div>
    </div>
  );
}
