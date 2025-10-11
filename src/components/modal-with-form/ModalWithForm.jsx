import { useEffect } from "react";
import styles from "./ModalWithForm.module.css";

export default function ModalWithForm({ 
  children, 
  buttonText, 
  title, 
  name, 
  isOpen, 
  onClose 
}) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className={`${styles.modal} ${isOpen ? styles.modal_opened : ''}`}
      onClick={handleOverlayClick}
    >
      <div className={`${styles.modal__container} ${styles[`modal_type_${name}`]}`}>
        <button 
          type="button"
          className={styles.modal__close}
          onClick={onClose}
        >
          ×
        </button>
        <h3 className={styles.modal__title}>{title}</h3>
        <form className={styles.modal__form} name={name}>
          {children}
          <button 
            type="submit"
            className={styles.modal__submit}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}