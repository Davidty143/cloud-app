"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

// Type definitions for weather response
interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: { description: string; icon: string }[]; // Added icon to the weather object
  wind: { speed: number };
}

interface HourlyForecast {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: { description: string; icon: string }[]; // Added icon to the weather object
  rain?: { "3h": number }; // Added rain property for the next 3 hours
}

const formatTime = (dt_txt: string) => {
  const date = new Date(dt_txt);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getWeatherIcon = (iconCode: string) => {
  return `http://openweathermap.org/img/wn/${iconCode}@4x.png`; // Use @4x for better resolution
};

const getDayDateTime = () => {
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: "short" });
  const date = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }); // Get the full date
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }); // Get the time
  return { day, date, time };
};

// Function to calculate the rain chance (percentage)
const getRainChance = (forecastData: HourlyForecast[]) => {
  // If there is rain data in the forecast, use it to estimate the rain chance
  const rainData = forecastData.filter((item) => item.rain?.["3h"]);
  if (rainData.length > 0) {
    // For simplicity, if rain is detected in the forecast, show a 50% chance
    // Adjust this logic if you want to calculate a more detailed rain probability
    return `Rain Chance: 50%`;
  } else {
    return "Rain Chance: 0%"; // No rain forecasted
  }
};

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null); // Store the current weather data
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>([]); // Store the hourly forecast data
  const [city, setCity] = useState<string>("Baybay City"); // Default city
  const [error, setError] = useState<string>(""); // Error message

  const apiKey = "17a7fa1796634383aa9b5633005b1a37"; // Replace with your OpenWeather API key

  // Fetch current weather data from OpenWeather API
  const fetchWeather = () => {
    // Fetch current weather
    axios
      .get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
        setError("");
      })
      .catch((err) => {
        setWeather(null);
        setError("City not found.");
      });

    // Fetch hourly forecast (next 5 days, every 3 hours)
    axios
      .get<{ list: HourlyForecast[] }>(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        // Filter out the next 4 intervals (for the next few hours)
        const next4Hours = response.data.list.slice(0, 4);
        setHourlyForecast(next4Hours);
        setError("");
      })
      .catch((err) => {
        setHourlyForecast([]);
        setError("Unable to fetch forecast.");
      });
  };

  // Fetch weather data when the city changes
  useEffect(() => {
    fetchWeather();
  }, [city]);

  return (
    <div className="bg-white rounded-lg py-6 px-12 w-full h-full mx-auto">
      {/* Search Bar */}
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Update city on input change
          className=" py-2 px-4 border-2 rounded-md  w-full sm:w-3/4 xl:w-6/7 h-3/4"
          placeholder="Enter City"
        />
        <button
          onClick={fetchWeather}
          className="py-2 h-3/4 px-5 bg-black text-white rounded-md hover:bg-blue-600 hidden sm:inline-block"
        >
          Get Weather
        </button>
      </div>

      <div className="border-2 rounded-lg ">
        <h2 className="text-sm sm:text-md py-1 w-[100px] font-semibold m-2 text-center rounded-3xl text-white bg-black">
          Today
        </h2>

        {/* Error message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Weather Info */}
        {weather ? (
          <div className="text-center mb-5">
            <h3 className="text-3xl font-semibold">{weather.name}</h3>
            <img
              src={getWeatherIcon(weather.weather[0].icon)} // Use high-resolution icon
              alt={weather.weather[0].description}
              className="mx-auto"
              width={100} // Adjust size as per layout
              height={100} // Adjust size as per layout
            />
            <p className="text-lg text-gray-500">
              {weather.weather[0].description}
            </p>

            <p className="text-4xl p-2 font-bold">{weather.main.temp}°C</p>

            <div className=" flex mt-5 flex-row justify-center items-center w-full mx-auto p-2 rounded-2xl">
              {/* Wind Speed */}
              <div className="flex flex-col items-center mx-2">
                <img
                  src="https://openweathermap.org/img/wn/50d.png" // Wind icon (you can change this to another icon URL if needed)
                  alt="Wind Speed"
                  className="mb-2"
                  width={40}
                  height={40}
                />
                <p className="text-md">Wind Speed: {weather.wind.speed} m/s</p>
              </div>
              {/* Rain Chance */}
              <div className="flex flex-col items-center mx-2">
                <img
                  src="https://openweathermap.org/img/wn/10n.png" // Rain icon (you can change this to another icon URL if needed)
                  alt="Rain Chance"
                  className="mb-2"
                  width={40}
                  height={40}
                />
                <p className="text-md">{getRainChance(hourlyForecast)}</p>
              </div>

              {/* Humidity */}
              <div className="flex flex-col items-center mx-2">
                <img
                  src="https://openweathermap.org/img/wn/50d.png" // Humidity icon (you can change this to another icon URL if needed)
                  alt="Humidity"
                  className="mb-2"
                  width={40}
                  height={40}
                />
                <p className="text-md">Humidity: {weather.main.humidity}%</p>
              </div>
            </div>
            {/* Day, Date, and Time */}
            <div className="">
              <p className="text-md mt-4 text-gray-700">
                {getDayDateTime().day +
                  " " +
                  getDayDateTime().date +
                  " | " +
                  getDayDateTime().time}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">
            Loading weather data...
          </p>
        )}
      </div>

      {/* 12-hour Forecast for the Next Few Hours */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-start mb-2">
          Next 9 Hours Forecast
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row">
          {hourlyForecast.map((item, index) => (
            <div
              key={index}
              className="bg-gray-200 p-2 rounded-lg w-full text-center mb-2"
            >
              <p className="text-sm">{formatTime(item.dt_txt)}</p>{" "}
              {/* Display formatted time */}
              <img
                src={getWeatherIcon(item.weather[0].icon)} // Use high-resolution icon
                alt={item.weather[0].description}
                className="mx-auto my-2"
                width={70} // Adjust as per layout
                height={70} // Adjust as per layout
              />
              <p className="text-lg">{item.main.temp}°C</p>
              <p className="text-sm text-gray-500">
                {item.weather[0].description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
