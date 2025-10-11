import styles from "./Header.module.css";

export default function Header({ onAddItemClick, weatherData }) {
  const currentDate = new Date().toLocaleString('default', { 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <img 
          src="/src/assets/wtwrLogo.svg" 
          alt="WTWR logo" 
          className={styles.logo}
        />
        <p className={styles.dateLocation}>
          {currentDate}, {weatherData.location || "Loading location..."}
        </p>
      </div>

      <div className={styles.headerRight}>
        <button 
          type="button"
          className={styles.addButton}
          onClick={onAddItemClick}
        >
          + Add clothes
        </button>
        <p className={styles.username}>Terrence Tegegne</p>
        <img 
          src="/src/assets/Avatar.svg" 
          alt="Terrence Tegegne" 
          className={styles.avatar}
        />
      </div>
    </header>
  );
}
