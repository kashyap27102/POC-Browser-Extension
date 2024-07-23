import React, { useEffect, useState } from "react";
import { fetchOpenWeatherData } from "../utils/api";
import { OpenWeatherData, OpenWeatherTempScale } from "../utils/types";

const WeatherCard = ({
  city,
  deleteHandler,
  tempScale,
}: {
  city: string;
  deleteHandler?: () => void;
  tempScale: OpenWeatherTempScale;
}) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData>(null);
  const [cardState, setCardState] = useState<"loading" | "error" | "active">(
    "loading"
  );

  useEffect(() => {
    const fetchData = async () => {
      setCardState("loading");
      await fetchOpenWeatherData(city, tempScale)
        .then((res) => {
          setWeatherData(res);
          setCardState("active");
        })
        .catch((err) => setCardState(err));
    };
    fetchData();
  }, [city, tempScale]);

  return (
    <div className="bg-white rounded-md m-2 p-2">
      {cardState === "active" ? (
        <>
          <h1 className="text-2xl">{city}</h1>
          <p className="text-base">
            <span className="text-gray-400">
              Temp ({tempScale === "metric" ? "\u2103" : "\u2109"}) :
            </span>
            {weatherData.main.temp}
          </p>
          <p className="text-base">
            <span className="text-gray-400">Feels like : </span>
            {weatherData.main.feels_like}
          </p>

          <button
            className="text-end  p-1 text-blue-500 rounded-sm"
            onClick={deleteHandler}
          >
            DELETE
          </button>
        </>
      ) : (
        <div>{cardState === "loading" ? "Loading..." : "City not found!"}</div>
      )}
    </div>
  );
};

export default WeatherCard;
