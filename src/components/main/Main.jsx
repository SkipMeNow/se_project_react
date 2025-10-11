import WeatherCard from "../weather-card/WeatherCard";
import ItemCard from "../item-card/ItemCard";
import styles from "./Main.module.css";

export default function Main({ weatherData, clothingItems, onCardClick }) {
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherData.weather
  );

  return (
    <main className={styles.main}>
      <WeatherCard weatherData={weatherData} />
      
      <section className={styles.clothingSection}>
        <p className={styles.sectionTitle}>
          Today is {weatherData.temperature}°F / You may want to wear:
        </p>
        <ul className={styles.clothingList}>
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}