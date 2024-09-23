import sun from "./assets/sun.jpg";
import snow from "./assets/snow.jpg";
import cloud from "./assets/cloud.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [city, setCity] = useState("Paris");
  const [bg, setBg] = useState("sun");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getFormattedWeatherData(city, units);
        setWeather(data);
        setError(false);
      } catch (err) {
        setError(true);
      }
    };
    fetchWeatherData();
  }, [units, city]);

  useEffect(() => {
    if (weather) {
      if (weather.description.includes("clouds")) {
        setBg(cloud);
      } else if (weather.description.includes("clear")) {
        setBg(sun);
      } else if (weather.description.includes("snow")) {
        setBg(snow);
      } else {
        setBg(cloud);
      }
    }
  }, [weather]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      //13 is the code number returned by the Enter key
      setCity(e.currentTarget.value);
      e.currentTarget.blur(); //This is used to loose focus on the input
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section_inputs">
              <div id="error_message">
                {error ? <p>Failed to Load</p> : null}
                <input
                  onKeyDown={enterKeyPressed}
                  type="text"
                  name="city"
                  placeholder="Enter Location"
                ></input>
              </div>
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>
            <div className="section section_temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon"></img>
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
