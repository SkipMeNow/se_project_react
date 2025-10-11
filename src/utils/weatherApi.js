import { APIkey, latitude, longitude, baseUrl } from "./constants";

export const getWeatherCondition = (temperature) => {
  if (temperature >= 86) return "hot";
  if (temperature >= 66) return "warm";
  return "cold";
};

const parseWeatherData = (data) => {
  const tempF = Math.round(data.current.temp_f);
  return {
    temperature: tempF,
    location: data.location.name,
    weather: getWeatherCondition(tempF),
    condition: data.current.condition.text.toLowerCase(),
    isDay: data.current.is_day === 1,
  };
};

const getMockWeatherData = () => ({
  temperature: 75,
  location: "New York",
  weather: "warm",
  condition: "clear",
  isDay: true,
});

export const getWeatherData = async () => {
  const url = `${baseUrl}?key=${APIkey}&q=${latitude},${longitude}&aqi=no`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }
    const data = await response.json();
    return parseWeatherData(data);
  } catch (error) {
    console.error("Weather API failed, using fallback:", error.message);
    return getMockWeatherData();
  }
};