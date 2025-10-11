import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.Header}>
      <div>
        <img src="/src/assets/wtwrLogo.svg" alt="wtwr logo" />
        <p className={styles.DateLocation}>date and location</p>
      </div>

      <div>
        <a href="#">+ Add clothes</a>
        <p>Terrence Tegegne</p>
        <img src="/src/assets/avatar.svg" alt="avatar" />
      </div>
    </header>
  );
}
