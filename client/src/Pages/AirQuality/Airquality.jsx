import { useState } from "react";
import Navbar from "../../components/Navbar";
import "./AirQuality.css";
import Bargraph from "./Bargraph";
import { data } from "./data";
//https://api.waqi.info/feed/bangalore/?token=04df8fe323c68d9dfed184277c75c13cb8052f3d

function Airquality() {
  // Define state variables to store the values of each input
  const [avg_temp, setAverageTemperature] = useState(0);
  const [max_temp, setMaxTemperature] = useState(0);
  const [min_temp, setMinTemperature] = useState(0);
  const [humidity, setAverageHumidity] = useState(0);
  const [precipi, setTotalRainfall] = useState(0);
  const [visibility, setAverageVisibility] = useState(0);
  const [wind_speed, setAverageWindSpeed] = useState(0);
  const [sus_wind_speed, setMaxWindSpeed] = useState(0);
const [predictedAIO, setPredictedAIO] = useState(0);
    const [city, setCity] = useState("");
    const [aqiData, setAqiData] = useState(null);
    const API_KEY = "04df8fe323c68d9dfed184277c75c13cb8052f3d";
  
    const handleChange = (e) => {
      setCity(e.target.value);
    };
  
    const handleApiSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(
          `https://api.waqi.info/feed/${city}/?token=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch AQI data");
        }
        const data = await response.json();
        setAqiData(data);
      } catch (error) {
        console.error(error);
        // Optionally, you can also setAqiData(null) here to reset the state
      }
    };

    //AQI PREDICTION
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Construct the JSON payload
      const payload = {
        avg_temp,
        max_temp,
        min_temp,
        humidity,
        precipi,
        visibility,
        wind_speed,
        sus_wind_speed
      };

      console.log(payload)
  
      try {
        // Send POST request to your API
        const response = await fetch('http://localhost:8000/predict-air-quality/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
  
        if (!response.ok) {
          throw new Error('Failed to submit data');
        }
  
        // Handle successful response
        const data = await response.json();
        setPredictedAIO(data?.air_quality_index)
      } catch (error) {
        // Handle error
        console.error('Error:', error);
      }
    };
  
  
    return (
      <div>
        <div className="aqi-box-container">
          <div
            className="aqi-container"
            style={{
              backgroundImage: `URL(https://www.envirotech-online.com/assets/file_store/pr_files/57953/thumbnails/images/391w_clouds-gb504287d4_1280.jpg)`,
            }}
          >
            <div className="aqi-topic">
              <h3>Current Air Quality Index</h3>
            </div>
            {aqiData ? (
              <>
                <div className="current-aqi">{aqiData.data.aqi}</div>
                {/* <div className="city-name">City: {aqiData.data.city.name}</div> */}
              </>
            ): <div className="current-aqi">00</div>}
            <div className="city-form">
              <form onSubmit={handleApiSubmit}>
                <input
                  onChange={handleChange}
                  value={city}
                  className="city-input"
                  type="text"
                  placeholder="Enter city for AQI"
                />
                <button type="submit" className="predict-button">
                  Get AQI
                </button>
              </form>
            </div>
          </div>

     
  
        <Bargraph iaqiData={aqiData?.data.iaqi} />
      </div>
      <div className="prediction-box-container">
        <div className="prediction-input-container">
          <h2>Try out our ML prediction model to predict AQIs</h2>
          <table className="predictive-input-table">
            <tbody>
              <tr>
                <td>Average Temperature &deg;C</td>
                <td>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="2"
                    value={avg_temp}
                    onChange={(e) => setAverageTemperature(e.target.value)}
                  />{" "}
                  {avg_temp}
                </td>
              </tr>
              <tr>
                <td>Maximum Temperature &deg;C</td>
                <td>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="2"
                    value={max_temp}
                    onChange={(e) => setMaxTemperature(e.target.value)}
                  />{" "}
                  {max_temp}
                </td>
              </tr>
              <tr>
                <td>Minimum Temperature &deg;C</td>
                <td>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="2"
                    value={min_temp}
                    onChange={(e) => setMinTemperature(e.target.value)}
                  />{" "}
                  {min_temp}
                </td>
              </tr>
              <tr>
                <td>Average Humidity</td>
                <td>
                  <input
                    type="range"
                    min="0"
                    max="12"
                    step="1"
                    value={humidity}
                    onChange={(e) => setAverageHumidity(e.target.value)}
                  />{" "}
                  {humidity}
                </td>
              </tr>
              <tr>
                <td>Precipitation</td>
                <td>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="2"
                    value={precipi}
                    onChange={(e) => setTotalRainfall(e.target.value)}
                  />{" "}
                  {precipi}
                </td>
              </tr>
              <tr>
                <td>Visibility</td>
                <td>
                  {" "}
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={visibility}
                    onChange={(e) => setAverageVisibility(e.target.value)}
                  />{" "}
                  {visibility}
                </td>
              </tr>
              <tr>
                <td>Average WindSpeed</td>
                <td>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={wind_speed}
                    onChange={(e) => setAverageWindSpeed(e.target.value)}
                  />{" "}
                  {wind_speed}
                </td>
              </tr>
              <tr>
                <td>Maximum Wind Speed</td>
                <td>
                  <input
                    type="range"
                    min="-0"
                    max="15"
                    step="1"
                    value={sus_wind_speed}
                    onChange={(e) => setMaxWindSpeed(e.target.value)}
                  />{" "}
                  {sus_wind_speed}
                </td>
              </tr>
            </tbody>
          </table>

          <button onClick={handleSubmit} className="predict-button">Predict</button>
        </div>
        <div className="prediction-output-container">
          <div className="predicted-aqi">
            <p className="predicted-aqi-announcer">
              The predicted Air Quality Index is
            </p>
            <div className="aqi-number">{predictedAIO ? predictedAIO : "00"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Airquality;
