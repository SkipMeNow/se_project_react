import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import styles from "./ToggleSwitch.module.css";

export default function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(CurrentTemperatureUnitContext);

  return (
    <label className={styles.switch}>
      <input
        className={styles.switch__input}
        type="checkbox"
        onChange={handleToggleSwitchChange}
        checked={currentTemperatureUnit === "C"}
      />
      <span className={styles.switch__slider}>
        <span className={styles.switch__temp_f}>F</span>
        <span className={styles.switch__temp_c}>C</span>
      </span>
    </label>
  );
}