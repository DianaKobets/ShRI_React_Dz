import type { HighlightProps } from "../../types/types";
import style from "./Highlight.module.css";

const months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export default function Highlight({ results, columns = 2 }: HighlightProps) {
  if (results.length === 0) {
    return (
      <span className={style.highlight_preview}>Здесь появятся хайлайты</span>
    );
  }

  const finalResult = results[results.length - 1];

  const formatDayOfYear = (dayOfYear: number | string | undefined): string => {
    const dayNum =
      typeof dayOfYear === "string" ? parseInt(dayOfYear, 10) : dayOfYear;
    if (!dayNum || dayNum < 1 || dayNum > 366) return "N/A";
    const year = new Date().getFullYear();
    const date = new Date(year, 0);
    date.setDate(dayNum);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    return `${day} ${months[monthIndex]}`;
  };

  return (
    <div className={style.container}>
      <div
        className={style.stats}
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        <div className={style.stat}>
          <span className={style.value}>
            {finalResult.total_spend_galactic?.toFixed(0) ?? "N/A"}
          </span>
          <span className={style.label}>
            Общие расходы в галактических кредитах
          </span>
        </div>
        <div className={style.stat}>
          <span className={style.value}>
            {finalResult.rows_affected ?? "N/A"}
          </span>
          <span className={style.label}>Количество обработанных записей</span>
        </div>
        <div className={style.stat}>
          <span className={style.value}>
            {formatDayOfYear(finalResult.less_spent_at)}
          </span>
          <span className={style.label}>
            День года с минимальными расходами
          </span>
        </div>
        <div className={style.stat}>
          <span className={style.value}>
            {formatDayOfYear(finalResult.big_spent_at)}
          </span>
          <span className={style.label}>
            День года с максимальными расходами
          </span>
        </div>
        <div className={style.stat}>
          <span className={style.value}>
            {finalResult.big_spent_value?.toFixed(0) ?? "N/A"}
          </span>
          <span className={style.label}>
            Максимальная сумма расходов за день
          </span>
        </div>
        <div className={style.stat}>
          <span className={style.value}>
            {finalResult.average_spend_galactic?.toFixed(0) ?? "N/A"}
          </span>
          <span className={style.label}>
            Средние расходы в галактических кредитах
          </span>
        </div>
        <div className={style.stat}>
          <span className={style.value}>
            {finalResult.big_spent_civ ?? "N/A"}
          </span>
          <span className={style.label}>
            Цивилизация с максимальными расходами
          </span>
        </div>
        <div className={style.stat}>
          <span className={style.value}>
            {finalResult.less_spent_civ ?? "N/A"}
          </span>
          <span className={style.label}>
            Цивилизация с минимальными расходами
          </span>
        </div>
      </div>
    </div>
  );
}
