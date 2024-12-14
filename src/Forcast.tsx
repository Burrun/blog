import React, { useState, useEffect } from "react";
import { Weather, ForecastData } from "./types.js";
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
import { fetchTodayWeather, fetchForecast } from "./Utils.tsx";
import "./Forcast.css";

const exampleWeather: Weather = {
  location: "서울",
  date: "2024-12-08",
  temperature: 25,
  temperatureMin: 20,
  temperatureMax: 30,
  condition: "맑음",
  wind: 3,
  precipitation: 50,
};

function Forecast({ location }) {
  const [date] = useState(new Date());
  const [todayWeather, setTodayWeather] = useState(exampleWeather);
  const [weekWeather, setWeekWeather] = useState<ForecastData | null>(null);

  const filteredForecast =
    weekWeather &&
    Array.isArray(weekWeather.forecast) &&
    weekWeather.forecast.filter((_, index) => index >= 1 && index <= 7);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchTodayWeather();
        const weekResult = await fetchForecast();
        setTodayWeather(result);
        setWeekWeather(weekResult);

        console.log("week : ", weekResult);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [date]);

  const getWeatherImage = (condition) => {
    switch (condition) {
      case "흐림":
        return "/assets/rain.png";
      case "눈":
        return "/assets/snowman.png";
      case "맑음":
        return "/assets/sun.png";
      case "구름많음":
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
        <h3> {formatDate(todayWeather.date)}의 날씨</h3>
        {todayWeather ? (
          <div className="weather-display">
            <img
              className="weather-image"
              src={getWeatherImage(todayWeather.condition)}
              alt={todayWeather.condition}
            />
            <div className="temperature-info">
              <ThermostatIcon
                className=" tempature-icon"
                sx={{ fontSize: "50px" }}
              />
              <Typography className="weather-text">
                {todayWeather.temperature}°C
              </Typography>
              <Typography style={{ marginTop: 10, fontWeight: 400 }}>
                {(Number(todayWeather.temperature) - 2).toFixed(1)} |{" "}
                {(Number(todayWeather.temperature) + 2.1).toFixed(1)}
              </Typography>
            </div>
            <div className="weather-info">
              <div className="weather-item">
                {renderWeatherIcon(exampleWeather.condition)}
                <Typography className="weather-text">
                  {exampleWeather.condition}
                </Typography>
              </div>

              <div className="weather-item">
                <WaterDropIcon
                  className="weather-icon humidity-icon"
                  sx={{ fontSize: "50px" }}
                />
                <Typography className="weather-text">
                  {exampleWeather.precipitation}%
                </Typography>
              </div>
            </div>
          </div>
        ) : (
          <p>날씨 정보를 불러오는 중...</p>
        )}
      </div>

      <div className="week-forecast">
        {filteredForecast &&
          filteredForecast.map((dayWeather: any, i: number) => (
            <Grid key={i}>
              <Card
                className="forecast-card"
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
                  alt={dayWeather.forecast}
                  height="140"
                  image={getWeatherImage(dayWeather.forecast)}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {dayWeather.forecast}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {dayWeather.temperature}°C
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {dayWeather.time}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    강수확률 {dayWeather.강수확률}%
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
