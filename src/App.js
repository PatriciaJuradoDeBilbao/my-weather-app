
import React, { useState } from "react";
import keys from "./keys";
import './App.css';

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
  icon_base: keys.ICON_BASE_URL
};

function App() {
  const dateBuild = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  };

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
          console.log(result);
        });
    }
  };

  return (
    
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 18
            ? "App hot"
            : "App cold"
          : "App"
      }
    >
      <main>

      {typeof weather.main === "undefined" ? (
        <article>
            <h1 className="title"> My Weather App</h1>
            <h3 className="text">What's the weather in...?</h3>
        </article>
        ) : (
          ''
        )}

        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>


       

        {typeof weather.main != "undefined" ? (

          <div>

            <div className="location-container">
              <div className="date"> 
                Today, {dateBuild(new Date())}
              </div>

              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
            </div>

            <div className="weather-container">
              <div className="weather"> 
                <img src={`${api.icon_base}${weather.weather[0].icon}@4x.png`} alt={`${weather.weather[0].main}`} />
              </div>

              <div className="temperature">
                {Math.round(weather.main.temp)}°
              </div>

              <div className="weather-type">
                {weather.weather[0].description}
              </div>

            <div>
              <div className="weather-feels">
                Feels like {Math.round(weather.main.feels_like)}º
              </div>

              <div className="humidity">
                  Humidity {weather.main.humidity}%
              </div>
            </div>

            </div>

          </div>

        ) : (
          ''
        )}
      </main>
    </div>
  );
}

export default App;