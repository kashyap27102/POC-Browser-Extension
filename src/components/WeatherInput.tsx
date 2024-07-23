import React from "react";

const WeatherInput = ({
  curCity,
  onChange,
}: {
  curCity: string;
  onChange: (city: string) => void;
}) => {
  return (
    <input
      type="text"
      placeholder="Enter city name ..."
      className="p-2 rounded-md focus:outline-none border 0  text-base w-5/6"
      value={curCity}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default WeatherInput;
