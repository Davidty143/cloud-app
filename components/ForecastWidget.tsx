"use client";
import { useState, useEffect } from "react";
import axios from "axios";

interface Forecast {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: { description: string; icon: string }[]; // Include the weather icon
}

interface ForecastWidgetProps {
  city: string;
}

const ForecastWidget: React.FC<ForecastWidgetProps> = ({ city }) => {
  const [forecast, setForecast] = useState<Forecast[]>([]);

  const apiKey = "17a7fa1796634383aa9b5633005b1a37"; // Replace with your OpenWeather API key

  // Fetch the forecast from OpenWeather API
  const fetchForecast = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setForecast(response.data.list);
      })
      .catch((err) => {
        console.error("Error fetching forecast:", err);
      });
  };

  useEffect(() => {
    fetchForecast();
  }, [city]);

  // Function to extract the day of the week from a date string
  const getDayOfWeek = (dt_txt: string) => {
    const date = new Date(dt_txt);
    return date.toLocaleDateString("en-US", { weekday: "long" }); // Get the full day name (e.g., "Monday")
  };

  // Function to get the icon for the weather
  const getWeatherIcon = (iconCode: string) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`; // Use @2x for better resolution
  };

  // Function to filter forecast for the next 5 days
  const filterForecastForNextDays = (forecastData: Forecast[]) => {
    const uniqueDays = new Set(); // To avoid duplicate days in the forecast

    return forecastData
      .filter((item) => {
        const day = getDayOfWeek(item.dt_txt);
        if (!uniqueDays.has(day)) {
          uniqueDays.add(day);
          return true;
        }
        return false;
      })
      .slice(0, 5); // Limit to the next 5 days
  };

  return (
    <div className=" w-flex-shrink-0 border-2 border-t-0 border-r-0 border-b-0 p-5">
      <h2 className="text-2xl font-semibold mb-4">5-Day Forecast</h2>
      <div className="space-y-4">
        {/* Forecast for the next 5 days */}
        {filterForecastForNextDays(forecast).map((item, index) => (
          <div key={index} className="bg-gray-200 px-7 py-2 rounded-lg ">
            {/* Display the day of the week */}
            <p className="text-sm">{getDayOfWeek(item.dt_txt)}</p>

            {/* Display temperature and icon next to each other */}
            <div className="flex items-end justify-start pr-10">
              {/* Temperature */}
              <p className="text-lg mt-3 font-semibold">{item.main.temp}°C</p>

              {/* Weather icon */}
              <img
                src={getWeatherIcon(item.weather[0].icon)} // Use high-resolution icon
                alt={item.weather[0].description}
                className=" -my-5 ml-10"
                width={60} // Icon size for the day
                height={60}
              />
            </div>

            {/* Weather description */}
            <p className="text-sm text-gray-500">
              {item.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastWidget;
