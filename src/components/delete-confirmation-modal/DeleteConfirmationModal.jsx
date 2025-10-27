import useModalClose from "../../hooks/useModalClose";
import styles from "./DeleteConfirmationModal.module.css";

export default function DeleteConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirmDelete, 
  itemName 
}) {
  useModalClose(isOpen, onClose);

  const handleConfirmDelete = () => {
    onConfirmDelete();
  };

  return (
    <div
      className={`modal ${styles.modal} ${isOpen ? styles.modal_opened : ""}`}
    >
      <div className={styles.modal__container}>
        <button type="button" className={styles.modal__close} onClick={onClose}>
          ×
        </button>
        <div className={styles.modal__content}>
          <h3 className={styles.modal__title}>
            Are you sure you want to delete this item?
          </h3>
          <p className={styles.modal__subtitle}>
            This action is irreversible.
          </p>
          <div className={styles.modal__buttons}>
            <button 
              type="button" 
              className={styles.modal__confirmButton}
              onClick={handleConfirmDelete}
            >
              Yes, delete item
            </button>
            <button 
              type="button" 
              className={styles.modal__cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}