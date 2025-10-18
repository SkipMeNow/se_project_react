import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import ModalWithForm from "../modal-with-form/ModalWithForm";
import styles from "./AddGarmentModal.module.css";

export default function AddGarmentModal({ isOpen, onClose, onSubmit }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(values);
      resetForm();
    }
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      name="add-garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isValid}
    >
      <label htmlFor="name" className={styles.modal__label}>
        Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        className={`${styles.modal__input} ${errors.name ? styles.modal__input_error : ""}`}
        value={values.name || ""}
        onChange={handleChange}
        minLength={2}
        required
      />
      {errors.name && (
        <span className={styles.modal__error}>{errors.name}</span>
      )}

      <label htmlFor="imageUrl" className={styles.modal__label}>
        Image
      </label>
      <input
        type="url"
        id="imageUrl"
        name="imageUrl"
        placeholder="Image URL"
        className={`${styles.modal__input} ${errors.imageUrl ? styles.modal__input_error : ""}`}
        value={values.imageUrl || ""}
        onChange={handleChange}
        required
      />
      {errors.imageUrl && (
        <span className={styles.modal__error}>{errors.imageUrl}</span>
      )}

      <fieldset className={styles.modal__fieldset}>
        <legend className={styles.modal__legend}>
          Select the weather type:
        </legend>
        <div className={styles.modal__radioGroup}>
          <label className={styles.modal__radioLabel}>
            <input
              type="radio"
              name="weather"
              value="hot"
              className={styles.modal__radio}
              checked={values.weather === "hot"}
              onChange={handleChange}
              required
            />
            <span className={styles.modal__radioText}>Hot</span>
          </label>

          <label className={styles.modal__radioLabel}>
            <input
              type="radio"
              name="weather"
              value="warm"
              className={styles.modal__radio}
              checked={values.weather === "warm"}
              onChange={handleChange}
              required
            />
            <span className={styles.modal__radioText}>Warm</span>
          </label>

          <label className={styles.modal__radioLabel}>
            <input
              type="radio"
              name="weather"
              value="cold"
              className={styles.modal__radio}
              checked={values.weather === "cold"}
              onChange={handleChange}
              required
            />
            <span className={styles.modal__radioText}>Cold</span>
          </label>
        </div>
        {errors.weather && (
          <span className={styles.modal__error}>{errors.weather}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
}