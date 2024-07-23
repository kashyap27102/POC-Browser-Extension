import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./options.css";
import {
  LocalStorageOptions,
  getStoredOptions,
  setStoredOptions,
} from "../utils/storage";

const App: React.FC = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [status, setStatus] = useState<string>("inactive");

  useEffect(() => {
    getStoredOptions()
      .then((storedOptions) => {
        setOptions(storedOptions);
        setStatus(storedOptions.displayStatus || "inactive");
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCityChange = (newCity: string) => {
    if (options) {
      setOptions({
        ...options,
        homeCity: newCity,
      });
    }
  };

  const handleActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.checked ? "active" : "inactive";
    if (options) {
      setOptions({
        ...options,
        displayStatus: newStatus,
      });
    }
    setStatus(newStatus);
  };

  const saveButtonClick = () => {
    if (options) {
      console.log(options);
      setStoredOptions(options);
    }
  };

  if (!options) {
    return null;
  }

  return (
    <div className="max-w-[800px] min-w-[400px] h-[600px] rounded-md bg-white p-4">
      <h4 className="text-2xl font-bold">Weather Extension</h4>
      <hr className="divide-y-2 divide-gray-400 my-2" />
      <div className="flex flex-col gap-2">
        <label htmlFor="home-city" className="text-base ">
          Home City :
        </label>
        <input
          id="home-city"
          type="text"
          value={options.homeCity}
          onChange={(e) => handleCityChange(e.target.value)}
          placeholder="Enter Name of Home City"
          className="focus:outline-none border-2 border-blue-500 p-2 rounded-md"
        />
        <div className="">
          <p className="text-base">Display Card on Page</p>
          <label htmlFor="display-status" className="flex items-center gap-2">
            <input
              type="checkbox"
              id="display-status"
              checked={status === "active"}
              onChange={handleActiveChange}
            />
            <span>{status === "active" ? "Active" : "Not Active"}</span>
          </label>
        </div>
        <button
          onClick={saveButtonClick}
          className="bg-blue-500 text-white p-2 px-4 rounded-sm w-fit"
        >
          Save
        </button>
      </div>
    </div>
  );
};

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
