import { fetchOpenWeatherData } from "../utils/api";
import {
  getStoredCities,
  getStoredOptions,
  setStoredCities,
  setStoredOptions,
} from "../utils/storage";

chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([]);
  setStoredOptions({
    tempScale: "metric",
    homeCity: "",
    displayStatus: "inactive",
  });

  chrome.contextMenus.create({
    id: "wheather-extension",
    title: "Add City",
    contexts: ["selection"],
  });

  chrome.alarms.create({
    periodInMinutes: 1 / 6,
  });
});

chrome.alarms.onAlarm.addListener(() => {
  getStoredOptions().then((options) => {
    if (options.homeCity === "") {
      return;
    }
    fetchOpenWeatherData(options.homeCity, options.tempScale).then((data) => {
      console.log(data);
      const temp = data.main.temp;
      const symbol = options.tempScale === "metric" ? "\u2103" : "\u2109";
      chrome.action.setBadgeText({
        text: `${temp + symbol}`,
      });
    });
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "wheather-extension") {
    getStoredCities().then((cities) => {
      const newCity = info.selectionText;
      setStoredCities([...cities, newCity]);
    });
  }
});
