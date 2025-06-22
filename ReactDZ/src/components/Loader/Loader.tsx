import styles from "./Loader.module.css";
import loader from "../../assets/loading.svg";
import style from "./Loader.module.css";

interface LoaderProps {
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <>
      <div className={style.loader_container}>
        <img src={loader} alt="loader-icon" className={style.spinner} />
      </div>
      <span className={style.loader_text}>{text}</span>
    </>
  );
};
