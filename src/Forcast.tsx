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
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import ClimateCountdown from "./CountDown.tsx";
import "./Forcast.css";

const exampleWeather: Weather = {
  location: "서울",
  date: "2024-12-08",
  temperature: 25,
  temperatureMin: 20,
  temperatureMax: 30,
  condition: "sun",
  wind: 3,
  precipitation: 50,
};

const ex1: Weather = {
  location: "서울",
  date: "2024-12-09",
  temperature: null,
  temperatureMin: -3,
  temperatureMax: 5,
  condition: "sun",
  wind: 3,
  precipitation: 20,
};

const ex2: Weather = {
  location: "서울",
  date: "2024-12-10",
  temperature: null,
  temperatureMin: -2,
  temperatureMax: 3.5,
  condition: "cloud",
  wind: 5,
  precipitation: 10,
};

const ex3: Weather = {
  location: "서울",
  date: "2024-12-11",
  temperature: null,
  temperatureMin: -3,
  temperatureMax: 3,
  condition: "cloud",
  wind: 2,
  precipitation: 20,
};

function Forecast({ location }) {
  const [date] = useState(new Date());
  const [weather, setWeather] = useState(exampleWeather);
  const [temp, setTemp] = useState({ date: "", temperature: "" });
  const [weekWeather, setWeekWeather] = useState([ex1, ex2, ex3]);

  const fetchTodayWeather = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/get_weather");
      if (!res.ok) {
        throw new Error("날씨 데이터를 가져오는 데 실패했습니다.");
      }
      const jsn = await res.json();
      setTemp(jsn || { date: "N/A", temperature: "N/A" }); // 기본값 설정
      return jsn;
    } catch (err) {
      console.error(err);
      setTemp({ date: "N/A", temperature: "N/A" }); // 에러 발생 시 기본값
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchTodayWeather();
    };

    fetchData();
  }, [date]);

  const handleCardClick = (dayWeather) => {
    setWeather(dayWeather);
  };

  const getWeatherImage = (condition) => {
    switch (condition) {
      case "rain":
        return "/assets/rain.png";
      case "snow":
        return "/assets/snowman.png";
      case "sun":
        return "/assets/sun.png";
      case "cloud":
        return "/assets/cloud.png";
      default:
        return "/assets/default.png";
    }
  };
  const renderWeatherIcon = (condition) => {
    switch (condition) {
      case "sun":
        return (
          <LightModeIcon
            className="weather-icon condition-icon"
            sx={{ fontSize: "50px" }}
          />
        );
      case "cloud":
        return (
          <WbCloudyIcon
            className="weather-icon condition-icon"
            sx={{ fontSize: "50px" }}
          />
        );
      case "snow":
        return (
          <AcUnitIcon
            className="weather-icon condition-icon"
            sx={{ fontSize: "50px" }}
          />
        );
      case "rain":
        return (
          <UmbrellaIcon
            className="weather-icon condition-icon"
            sx={{ fontSize: "50px" }}
          />
        );
      default:
        return (
          <WbCloudyIcon
            className="weather-icon condition-icon"
            sx={{ fontSize: "50px" }}
          />
        );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "날짜 정보 없음"; // temp.date가 null이거나 undefined일 경우 대비

    const year = dateString.slice(0, 4); // 연도
    const month = dateString.slice(4, 6); // 월
    const day = dateString.slice(6, 8); // 일
    const hour = dateString.slice(8, 10); // 시

    return `${year}년 ${month}월 ${day}일 ${hour}시`;
  };

  return (
    <div className="forecast-container">
      <ClimateCountdown />
      <div className="today-weather">
        <h2>{location}</h2>
        <h3> {formatDate(temp.date)}의 날씨</h3>
        {weather ? (
          <div className="weather-display">
            <img
              className="weather-image"
              src={getWeatherImage(weather.condition)}
              alt={weather.condition}
            />
            <div className="temperature-info">
              <ThermostatIcon
                className=" tempature-icon"
                sx={{ fontSize: "50px" }}
              />
              <Typography className="weather-text">
                {temp.temperature}°C
              </Typography>
              <Typography style={{ marginTop: 10, fontWeight: 400 }}>
                {Number(temp.temperature)} | {Number(temp.temperature) + 2.1}
              </Typography>
            </div>
            <div className="weather-info">
              <div className="weather-item">
                {renderWeatherIcon(weather.condition)}
                <Typography className="weather-text">
                  {weather.condition}
                </Typography>
              </div>
              <div className="weather-item">
                <AirIcon
                  className="weather-icon wind-icon"
                  sx={{ fontSize: "50px" }}
                />
                <Typography className="weather-text">
                  {weather.wind} m/s
                </Typography>
              </div>
              <div className="weather-item">
                <WaterDropIcon
                  className="weather-icon humidity-icon"
                  sx={{ fontSize: "50px" }}
                />
                <Typography className="weather-text">
                  {weather.precipitation}%
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
                  {dayWeather.temperatureMin} | {dayWeather.temperatureMax} °C
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dayWeather.date}
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
