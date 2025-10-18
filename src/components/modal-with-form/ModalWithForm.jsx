import useModalClose from "../../hooks/useModalClose";
import styles from "./ModalWithForm.module.css";

export default function ModalWithForm({
  children,
  buttonText,
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  isFormValid,
}) {
  // Use custom hook for escape and overlay handling
  useModalClose(isOpen, onClose);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div
      className={`modal ${styles.modal} ${isOpen ? styles.modal_opened : ""}`}
    >
      <div
        className={`${styles.modal__container} ${styles[`modal_type_${name}`]}`}
      >
        <button type="button" className={styles.modal__close} onClick={onClose}>
          ×
        </button>
        <h3 className={styles.modal__title}>{title}</h3>
        <form
          className={styles.modal__form}
          name={name}
          onSubmit={handleSubmit}
        >
          {children}
          <button
            type="submit"
            className={styles.modal__submit}
            disabled={!isFormValid} // isFormValid will be passed into the props as a boolean
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
