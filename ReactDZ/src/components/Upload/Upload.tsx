import { useState } from "react";
import { useStore } from "../../store";
import styles from "./Upload.module.css";
export default function Upload() {
  return (
    <>
      <span>
        Загрузите <b>csv</b> файл и получите <b>полную информацию</b> о нём
        за сверхнизкое время
      </span>
      {/*тут будет drag & drop <div></div>*/}
      <button>Отправить</button>
      <p>Здесь появятся хайлайты</p>
    </>
  );
}
