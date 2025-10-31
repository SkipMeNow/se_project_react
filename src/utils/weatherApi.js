import { apiKey, latitude, longitude, baseUrl } from "./constants";
import { request } from "./api";

export const getWeatherCondition = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};

const parseWeatherData = (data) => {
  const tempF = Math.round(data.current.temp_f);
  const tempC = Math.round(data.current.temp_c);
  return {
    temperature: {
      F: tempF,
      C: tempC,
    },
    location: data.location.name,
    weather: getWeatherCondition(tempF),
    condition: data.current.condition.text.toLowerCase(),
    isDay: data.current.is_day === 1,
  };
};

const getMockWeatherData = () => ({
  temperature: {
    F: 75,
    C: 24,
  },
  location: "New York",
  weather: "warm",
  condition: "clear",
  isDay: true,
});

export const getWeatherData = async () => {
  const url = `${baseUrl}?key=${apiKey}&q=${latitude},${longitude}&aqi=no`;

  try {
    const data = await request(url);
    return parseWeatherData(data);
  } catch (error) {
    console.error("Weather API failed, using fallback:", error.message);
    return getMockWeatherData();
  }
};
