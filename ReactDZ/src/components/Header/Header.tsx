import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import upload from "../../assets/upload.svg";
import create from "../../assets/create-multi-metric.svg";
import history from "../../assets/history.svg";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
        <h1>Межгалактическая аналитика</h1>
      </div>
      <nav className={styles.nav}>
        <Link to="/upload" className={styles.link}>
          <img src={upload} alt="icon" className={styles.icon} />
          <span>CSV Аналитик</span>
        </Link>
        <Link to="/generator" className={styles.link}>
          <img src={create} alt="icon" className={styles.icon} />
          <span>CSV Генератор</span>
        </Link>
        <Link to="/history" className={styles.link}>
          <img src={history} alt="icon" className={styles.icon} />
          <span>История</span>
        </Link>
      </nav>
    </header>
  );
}
