import WeatherCard from "../weather-card/WeatherCard";
import ItemCard from "../item-card/ItemCard";
import styles from "./Main.module.css";

export default function Main({ weatherData, clothingItems, onCardClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherData.weather
  );

  return (
    <main className={styles.main}>
      <WeatherCard weatherData={weatherData} />

      <section className={styles.clothingSection}>
        <p className={styles.sectionTitle}>
          Today is {currentDate} / {weatherData.temperature}°F / You may want to
          wear:
        </p>
        <ul className={styles.clothingList}>
          {filteredItems.map((card) => (
            <ItemCard key={card._id} card={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}
