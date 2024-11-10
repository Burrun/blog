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

const exampleWeather: Weather = {
  location: "서울",
  date: new Date("2023-10-01"),
  temperature: 25,
  condition: "sun",
  wind: 3,
  humidity: 50,
  precipitation: null,
  uv: null,
};

function Forecast({ location }) {
  const [date] = useState(new Date());
  const [weather, setWeather] = useState(exampleWeather);
  const [weekWeather, setWeekWeather] = useState([
    exampleWeather,
    exampleWeather,
    exampleWeather,
    exampleWeather,
    exampleWeather,
    exampleWeather,
    exampleWeather,
  ]);

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

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          border: "2px solid yellow",
          marginBottom: "20px",
          padding: "10px",
        }}
      >
        <h3>{location}</h3>
        <h2>오늘의 날씨</h2>
        {weather ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{ border: "2px solid green", padding: "10px" }}
              src={getWeatherImage(weather.condition)}
              alt={weather.condition}
            />
            <div style={{ marginLeft: "20px" }}>
              <Typography variant="body1">{weather.temperature}°C</Typography>
              <Typography variant="body1">{weather.condition}</Typography>
              <Typography variant="body1">{weather.wind}m/s</Typography>
              <Typography variant="body1">{weather.humidity}%</Typography>
            </div>
          </div>
        ) : (
          <p>날씨 정보를 불러오는 중...</p>
        )}
      </div>
      <div
        style={{
          border: "2px solid red",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {weekWeather.map((dayWeather, i) => (
          <Grid>
            <Card>
              <CardMedia
                component="img"
                alt={dayWeather.condition}
                height="140"
                image={getWeatherImage(dayWeather.condition)}
              />
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {dayWeather.condition}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  온도: {dayWeather.temperature}°C
                </Typography>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </Grid>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
