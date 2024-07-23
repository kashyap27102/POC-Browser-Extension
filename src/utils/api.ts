import { OpenWeatherData, OpenWeatherTempScale } from "./types";

const OPEN_WEATHER_API_KEY = "bab85abc11bd01d1774d70ad7ca8c9ec";
const OPEN_WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function fetchOpenWeatherData(
  city: string,
  tempScale: OpenWeatherTempScale
): Promise<OpenWeatherData> {
  const res = await fetch(
    `${OPEN_WEATHER_API_URL}?q=${city}&units=${tempScale}&appid=${OPEN_WEATHER_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("City not found");
  }

  const data = await res.json();
  return data;
}
