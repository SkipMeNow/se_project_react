import { useState } from "react";
import styles from "./Header.module.css";
import wtwrLogo from "../../assets/wtwrLogo.svg";
import avatar from "../../assets/Avatar.svg";

export default function Header({ onAddItemClick, weatherData }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <img src={wtwrLogo} alt="WTWR logo" className={styles.logo} />
        <p className={styles.dateLocation}>
          {currentDate}, {weatherData.location || "Loading location..."}
        </p>
      </div>

      {/* Desktop Navigation */}
      <div className={styles.headerRight}>
        <button
          type="button"
          className={styles.addButton}
          onClick={onAddItemClick}
        >
          + Add clothes
        </button>
        <p className={styles.username}>Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className={styles.avatar} />
      </div>

      {/* Mobile Menu Button */}
      <button
        className={styles.mobileMenuButton}
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpened ? "Close menu" : "Open menu"}
      >
        {!isMobileMenuOpened ? (
          // Hamburger Icon
          <svg className={styles.hamburgerIcon} viewBox="0 0 24 24" fill="none">
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          // Close Icon
          <svg className={styles.closeIcon} viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {/* Mobile Navigation Menu */}
      <nav
        className={`${styles.mobileNav} ${isMobileMenuOpened ? styles.mobileNav_opened : ""}`}
      >
        <button
          type="button"
          className={styles.mobileAddButton}
          onClick={() => {
            onAddItemClick();
            toggleMobileMenu();
          }}
        >
          + Add clothes
        </button>
        <div className={styles.mobileUserInfo}>
          <p className={styles.mobileUsername}>Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className={styles.mobileAvatar} />
        </div>
      </nav>
    </header>
  );
}
