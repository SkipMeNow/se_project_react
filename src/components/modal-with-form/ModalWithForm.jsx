import { useEffect, useState } from "react";
import styles from "./ModalWithForm.module.css";

export default function ModalWithForm({
  children,
  buttonText,
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleInputBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, formData[name]);
  };

  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;
      case "imageUrl":
        if (!value.trim()) {
          error = "Image URL is required";
        } else if (!isValidUrl(value)) {
          error = "Please enter a valid URL";
        }
        break;
      case "weather":
        if (!value) {
          error = "Please select a weather type";
        }
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));

    return !error;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim().length >= 2 &&
      isValidUrl(formData.imageUrl) &&
      formData.weather !== ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const nameValid = validateField("name", formData.name);
    const imageUrlValid = validateField("imageUrl", formData.imageUrl);
    const weatherValid = validateField("weather", formData.weather);

    // Mark all fields as touched
    setTouched({
      name: true,
      imageUrl: true,
      weather: true,
    });

    if (nameValid && imageUrlValid && weatherValid) {
      onSubmit(e);
      // Reset form after successful submission
      setFormData({ name: "", imageUrl: "", weather: "" });
      setErrors({});
      setTouched({});
    }
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: "", imageUrl: "", weather: "" });
      setErrors({});
      setTouched({});
    }
  }, [isOpen]);

  return (
    <div
      className={`${styles.modal} ${isOpen ? styles.modal_opened : ""}`}
      onClick={handleOverlayClick}
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
          {name === "add-garment" && (
            <>
              <label htmlFor="name" className={styles.modal__label}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className={`${styles.modal__input} ${touched.name && errors.name ? styles.modal__input_error : ""}`}
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                required
              />
              {touched.name && errors.name && (
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
                className={`${styles.modal__input} ${touched.imageUrl && errors.imageUrl ? styles.modal__input_error : ""}`}
                value={formData.imageUrl}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                required
              />
              {touched.imageUrl && errors.imageUrl && (
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
                      checked={formData.weather === "hot"}
                      onChange={handleInputChange}
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
                      checked={formData.weather === "warm"}
                      onChange={handleInputChange}
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
                      checked={formData.weather === "cold"}
                      onChange={handleInputChange}
                      required
                    />
                    <span className={styles.modal__radioText}>Cold</span>
                  </label>
                </div>
                {touched.weather && errors.weather && (
                  <span className={styles.modal__error}>{errors.weather}</span>
                )}
              </fieldset>
            </>
          )}
          {children}
          <button
            type="submit"
            className={styles.modal__submit}
            disabled={name === "add-garment" ? !isFormValid() : false}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
