import { useEffect, useMemo } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../modal-with-form/ModalWithForm";
import styles from "./AddItemModal.module.css";

export default function AddItemModal({ isOpen, onAddItem, onCloseModal }) {
  const initialValues = useMemo(() => ({
    name: "",
    imageUrl: "",
    weather: "",
  }), []);

  const { values, handleChange, resetForm } = useForm(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values, resetForm);
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]); // Remove resetForm from dependencies

  const isFormValid = !!(values.name && values.imageUrl && values.weather);

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      name="add-item"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label htmlFor="name" className={styles.modal__label}>
        Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        className={styles.modal__input}
        value={values.name}
        onChange={handleChange}
        minLength={2}
        required
      />

      <label htmlFor="imageUrl" className={styles.modal__label}>
        Image
      </label>
      <input
        type="url"
        id="imageUrl"
        name="imageUrl"
        placeholder="Image URL"
        className={styles.modal__input}
        value={values.imageUrl}
        onChange={handleChange}
        required
      />

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
      </fieldset>
    </ModalWithForm>
  );
}