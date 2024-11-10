import React, { useState, useEffect } from "react";
import { Weather } from "./types.js";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import LightModeIcon from "@mui/icons-material/LightMode";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import UmbrellaIcon from "@mui/icons-material/Umbrella";
import WbCloudyIcon from "@mui/icons-material/WbSunny";
import "./Forcast.css";

const exampleWeather: Weather = {
  location: "서울",
  date: "2023-10-01",
  temperature: 25,
  condition: "rain",
  wind: 3,
  humidity: 50,
  precipitation: null,
  uv: "위험",
};

function Forecast({ location }) {
  const [date] = useState(new Date());
  const [weather, setWeather] = useState(exampleWeather);
  const [weekWeather, setWeekWeather] = useState(Array(7).fill(exampleWeather));

  useEffect(() => {
    fetchWeatherByDate(date); // 그날의 날씨 정보를 가져옴
    fetchWeekWeather(date); //그 주의 날씨 정보를 가져옴
  }, [date]);

  const fetchWeatherByDate = (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split("T")[0]; // 날짜를 'YYYY-MM-DD' 형식으로 변환
    fetch(`https://api.example.com/weather?date=${formattedDate}`)
      .then((response) => response.json())
      .then((data) => setWeather(data))
      .catch((error) => console.error("Error fetching weather data:", error));
  };
  const fetchWeekWeather = (selectedDate) => {};

  const handleCardClick = (dayWeather) => {
    setWeather(dayWeather);
  };

  const getWeatherImage = (condition) => {
    switch (condition) {
      case "rain":
        return "/assets/rain.png";
      case "sky":
        return "/assets/sky.png";
      case "snow":
        return "/assets/snowman.png";
      case "sun":
        return "/assets/sun.png";
      default:
        return "/assets/default.png";
    }
  };
  const renderWeatherIcon = (condition) => {
    switch (condition) {
      case "맑음":
        return <LightModeIcon className="weather-icon condition-icon" />;
      case "흐림":
        return <WbCloudyIcon className="weather-icon condition-icon" />;
      case "눈":
        return <AcUnitIcon className="weather-icon condition-icon" />;
      case "비":
        return <UmbrellaIcon className="weather-icon condition-icon" />;
      default:
        return <LightModeIcon className="weather-icon condition-icon" />;
    }
  };

  return (
    <div className="forecast-container">
      <div className="today-weather">
        <h3>{location}</h3>
        <h2>{weather.date} 의 날씨</h2>
        {weather ? (
          <div className="weather-display">
            <img
              className="weather-image"
              src={getWeatherImage(weather.condition)}
              alt={weather.condition}
            />
            <div className="weather-info">
              <div className="weather-item">
                <ThermostatIcon className="weather-icon temperature-icon" />
                <Typography className="weather-text temperature-text">
                  {weather.temperature}°C
                </Typography>
              </div>
              <div className="weather-item">
                {renderWeatherIcon(weather.condition)}
                <Typography className="weather-text">
                  {weather.condition}
                </Typography>
              </div>
              <div className="weather-item">
                <AirIcon className="weather-icon wind-icon" />
                <Typography className="weather-text">
                  {weather.wind} m/s
                </Typography>
              </div>
              <div className="weather-item">
                <WaterDropIcon className="weather-icon humidity-icon" />
                <Typography className="weather-text">
                  {weather.humidity}%
                </Typography>
              </div>
            </div>
          </div>
        ) : (
          <p>날씨 정보를 불러오는 중...</p>
        )}
      </div>

      <div className="week-forecast">
        {weekWeather.map((dayWeather, i) => (
          <Grid key={i}>
            <Card
              className="forecast-card"
              onClick={() => handleCardClick(dayWeather)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.02)",
                  transition: "transform 0.2s ease-in-out",
                },
              }}
            >
              <CardMedia
                component="img"
                alt={dayWeather.condition}
                height="140"
                image={getWeatherImage(dayWeather.condition)}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {dayWeather.condition}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  온도: {dayWeather.temperature}°C
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </div>
    </div>
  );
}
export default Forecast;
