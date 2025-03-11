// src/pages/index.tsx
import WeatherWidget from "@/components/WeatherWidget";
import ForecastWidget from "@/components/ForecastWidget"; // Import ForecastWidget

export default function Home() {
  return (
    <main>
      {/* Main Wrapper */}
      <div className="min-h-screen flex justify-center">
        {/* Focus Content */}
        <div className="2xl:w-[80%] flex flex-col w-full border-20">
          {/* Main Body */}
          <div className=" w-full min-h-screen flex flex-col md:flex-row border-2">
            {/* Content Body */}
            <div className=" w-full flex items-center justify-center">
              <WeatherWidget />{" "}
            </div>
            {/* Sidebar Body */}
            <ForecastWidget city="Baybay City" />{" "}
            {/* Sidebar for 5-day forecast */}
          </div>
          {/* Footer */}
          {/* <div className="border-gray-300 border-2 w-full h-[5vh] text-gray-800 text-center flex items-center justify-center text-md">
            By: David Ty
          </div> */}
        </div>
      </div>
    </main>
  );
}
