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
        ? "Day"
        : "Night"
      : getTimeOfDay() === "day"
        ? "Day"
        : "Night";

  // Normalize condition to lowercase for comparison
  const normalizedCondition = condition?.toLowerCase() || "";

  // Map weather conditions to your existing PNG files
  if (
    normalizedCondition.includes("sunny") ||
    normalizedCondition.includes("clear")
  ) {
    return `/src/assets/${timeOfDay}-Sunny.png`;
  }

  if (
    normalizedCondition.includes("cloudy") ||
    normalizedCondition.includes("overcast") ||
    normalizedCondition.includes("partly")
  ) {
    return `/src/assets/${timeOfDay}-Cloudy.png`;
  }

  if (
    normalizedCondition.includes("rain") ||
    normalizedCondition.includes("drizzle")
  ) {
    return `/src/assets/${timeOfDay}-Rain.png`;
  }

  if (
    normalizedCondition.includes("snow") ||
    normalizedCondition.includes("snowy")
  ) {
    return `/src/assets/${timeOfDay}-Snow.png`;
  }

  if (
    normalizedCondition.includes("storm") ||
    normalizedCondition.includes("thunder")
  ) {
    return `/src/assets/${timeOfDay}-Storm.png`;
  }

  if (
    normalizedCondition.includes("fog") ||
    normalizedCondition.includes("mist")
  ) {
    return `/src/assets/${timeOfDay}-Fog.png`;
  }

  // Default fallback
  return `/src/assets/${timeOfDay}-Cloudy.png`;
};
