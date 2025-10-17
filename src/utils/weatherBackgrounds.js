// Import all weather background images
import daySunny from "../assets/Day-Sunny.png";
import dayCloudy from "../assets/Day-Cloudy.png";
import dayRain from "../assets/Day-Rain.png";
import daySnow from "../assets/Day-Snow.png";
import dayStorm from "../assets/Day-Storm.png";
import dayFog from "../assets/Day-fog.png";
import nightSunny from "../assets/Night-Sunny.png";
import nightCloudy from "../assets/Night-Cloudy.png";
import nightRain from "../assets/Night-Rain.png";
import nightSnow from "../assets/Night-Snow.png";
import nightStorm from "../assets/Night-Storm.png";
import nightFog from "../assets/Night-Fog.png";

// Function to determine if it's day or night based on current time
export const getTimeOfDay = () => {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? "day" : "night";
};

// Function to get weather background based on condition and time
export const getWeatherBackground = (condition, isDay = null) => {
  const timeOfDay =
    isDay !== null
      ? isDay
        ? "day"
        : "night"
      : getTimeOfDay();

  // Normalize condition to lowercase for comparison
  const normalizedCondition = condition?.toLowerCase() || "";

  // Map weather conditions to imported images
  if (
    normalizedCondition.includes("sunny") ||
    normalizedCondition.includes("clear")
  ) {
    return timeOfDay === "day" ? daySunny : nightSunny;
  }

  if (
    normalizedCondition.includes("cloudy") ||
    normalizedCondition.includes("overcast") ||
    normalizedCondition.includes("partly")
  ) {
    return timeOfDay === "day" ? dayCloudy : nightCloudy;
  }

  if (
    normalizedCondition.includes("rain") ||
    normalizedCondition.includes("drizzle")
  ) {
    return timeOfDay === "day" ? dayRain : nightRain;
  }

  if (
    normalizedCondition.includes("snow") ||
    normalizedCondition.includes("snowy")
  ) {
    return timeOfDay === "day" ? daySnow : nightSnow;
  }

  if (
    normalizedCondition.includes("storm") ||
    normalizedCondition.includes("thunder")
  ) {
    return timeOfDay === "day" ? dayStorm : nightStorm;
  }

  if (
    normalizedCondition.includes("fog") ||
    normalizedCondition.includes("mist")
  ) {
    return timeOfDay === "day" ? dayFog : nightFog;
  }

  // Default fallback
  return timeOfDay === "day" ? dayCloudy : nightCloudy;
};
