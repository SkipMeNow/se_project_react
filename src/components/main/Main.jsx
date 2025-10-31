import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "../weather-card/WeatherCard";
import ItemCard from "../item-card/ItemCard";
import { getItemId } from "../../utils/itemUtils";
import styles from "./Main.module.css";

export default function Main({ weatherData, clothingItems, onCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // Guard against undefined weatherData
  const temperature = weatherData.temperature?.[currentTemperatureUnit] ?? "Loading";
  const weatherType = weatherData.weather || "warm"; // Default to warm if undefined

  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherType
  );

  return (
    <main className={styles.main}>
      <WeatherCard weatherData={weatherData} />

      <section className={styles.clothingSection}>
        <p className={styles.sectionTitle}>
          Today is {currentDate} / {temperature}°{currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className={styles.clothingList}>
          {filteredItems.map((card) => (
            <ItemCard key={getItemId(card)} card={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}
