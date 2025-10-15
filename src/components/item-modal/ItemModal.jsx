import styles from "./ItemModal.module.css";

export default function ItemModal({ card, isOpen, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`${styles.modal} ${isOpen ? styles.modal_opened : ""}`}
      onClick={handleOverlayClick}
    >
      <div className={styles.modal__container}>
        <button type="button" className={styles.modal__close} onClick={onClose}>
          ×
        </button>
        <img src={card.link} alt={card.name} className={styles.modal__image} />
        <div className={styles.modal__info}>
          <h3 className={styles.modal__title}>{card.name}</h3>
          <p className={styles.modal__weather}>Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}
