import styles from "./WeatherCard.module.css";
import { getWeatherBackground } from "../../utils/weatherBackgrounds";

export default function WeatherCard({ weatherData }) {
  const backgroundImage = getWeatherBackground(weatherData.condition);

  return (
    <section className={styles.weatherCard}>
      <p className={styles.temperature}>{weatherData.temperature}°F</p>
      <img src={backgroundImage} alt="" className={styles.weatherImage} />
    </section>
  );
}
