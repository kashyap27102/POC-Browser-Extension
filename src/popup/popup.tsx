import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./popup.css";
import WeatherCard from "../components/WeatherCard";
import WeatherInput from "../components/WeatherInput";
import {
  getStoredCities,
  setStoredCities,
  getStoredOptions,
  setStoredOptions,
  LocalStorageOptions,
} from "../utils/storage";

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [curCity, setCurCity] = useState<string>("");
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStoredCities()
      .then((cities) => setCities(cities))
      .catch((error) => console.log(error));
    getStoredOptions()
      .then((options) => setOptions(options))
      .catch((error) => console.log(error));
  }, []);

  const inputHandler = (city: string) => {
    setCurCity(city);
  };
  const addCity = (city: string) => {
    if (curCity === "") {
      return;
    }
    const updatedCities = [...cities, city];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCurCity("");
    });
  };
  const removeCity = (index: number) => {
    console.log(index);
    cities.splice(index, 1);
    const updatedCities = [...cities];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
    });
  };

  const handleTempScaleButtonClick = () => {
    const updatedOption: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === "metric" ? "imperial" : "metric",
    };
    setStoredOptions(updatedOption).then(() => {
      setOptions(updatedOption);
    });
  };

  if (!options) {
    return null;
  }

  return (
    <div>
      <div className=" m-2 flex gap-1">
        <WeatherInput curCity={curCity} onChange={inputHandler} />
        <button
          onClick={() => addCity(curCity)}
          className="rounded-md bg-blue-500 px-2 text-xl text-white"
        >
          {"\u002B"}
        </button>
        <button
          className="rounded-md bg-orange-500 px-2 text-xl text-white"
          onClick={handleTempScaleButtonClick}
        >
          {options.tempScale === "metric" ? "\u2103" : "\u2109"}
        </button>
      </div>
      {options.homeCity !== "" && (
        <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
      )}
      {cities.map((city, index) => {
        return (
          <WeatherCard
            key={index}
            city={city}
            tempScale={options.tempScale}
            deleteHandler={() => removeCity(index)}
          />
        );
      })}
    </div>
  );
};

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
