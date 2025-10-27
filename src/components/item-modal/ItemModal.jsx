import useModalClose from "../../hooks/useModalClose";
import styles from "./ItemModal.module.css";

export default function ItemModal({ card, isOpen, onClose, onDeleteItem }) {
  // Use custom hook for escape and overlay handling
  useModalClose(isOpen, onClose);

  const handleDeleteClick = () => {
    onDeleteItem(card);
  };

  return (
    <div
      className={`modal ${styles.modal} ${isOpen ? styles.modal_opened : ""}`}
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
        <button 
          type="button" 
          className={styles.modal__deleteButton}
          onClick={handleDeleteClick}
        >
          Delete item
        </button>
      </div>
    </div>
  );
}
