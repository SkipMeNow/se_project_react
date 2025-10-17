import styles from "./WeatherCard.module.css";
import { getWeatherBackground } from "../../utils/weatherBackgrounds";

export default function WeatherCard({ weatherData }) {
  const backgroundImage = getWeatherBackground(
    weatherData.condition,
    weatherData.isDay
  );

  // Create meaningful alt text based on weather condition and time of day
  const timeOfDay = weatherData.isDay ? "day" : "night";
  const condition = weatherData.condition || "clear";
  const altText = `${condition} weather during ${timeOfDay}time`;

  return (
    <section className={styles.weatherCard}>
      <p className={styles.temperature}>
        {weatherData.temperature ?? "Loading"}°F
      </p>
      <img
        src={backgroundImage}
        alt={altText}
        className={styles.weatherImage}
      />
    </section>
  );
}
