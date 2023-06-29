import React, { useState } from "react";
import "./App.css";

const api = {
  key: "10ccfded508042d75768fcda987ecc13",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState(""); //useState for the search field
  const [weather, setWeather] = useState({}); //useState for the weather
  const [isCelsius, setIsCelsius] = useState(true); // useState for converting temperature

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  const convertTemp = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  const toggleTempUnit = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* {HEADER} */}
        <h1>The Weather App</h1>

        {/* {SEARCH BOX} */}
        <div className="search-section">
          <input
            type="text"
            placeholder="Enter city or town..."
            className="search-box"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-button" onClick={searchPressed}>
            Search
          </button>
        </div>
        {/* {If weather is not defined} */}
        {typeof weather.main !== "undefined" ? (
          <div className="search-results">
            <p>{weather.name}</p>
            {isCelsius ? (
              <p>{weather.main.temp}°C</p>
            ) : (
              <p>{convertTemp(weather.main.temp)}°F</p>
            )}
            <p>{weather.weather[0].main}</p>
            <p>{weather.weather[0].description}</p>
          </div>
        ) : (
          ""
        )}

        <button className="button-switching-temp" onClick={toggleTempUnit}>
          {isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius "}
        </button>
      </header>
    </div>
  );
}

export default App;
