import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import WeatherCard from "../components/WeatherCard";
import "./contentScript.css";
import {
  LocalStorageOptions,
  getStoredOptions,
  setStoredOptions,
} from "../utils/storage";

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
    });
  }, []);

  if (!options) {
    return null;
  }
  // console.log(options);
  return options.displayStatus === "active" ? (
    <div id="overlay-card">
      <WeatherCard
        city={options.homeCity}
        tempScale={options.tempScale}
        deleteHandler={() => {
          setOptions({
            ...options,
            displayStatus: "inactive",
          });
          setStoredOptions(options);
        }}
      />
    </div>
  ) : null;
};

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
