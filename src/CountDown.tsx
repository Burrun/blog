import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ClimateComparison from "./ClimateCompar.tsx";

const ClimateCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    years: 4,
    days: 231,
    hours: 2,
    minutes: 36,
    seconds: 46,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevState) => {
        if (prevState.seconds > 0) {
          return {
            ...prevState,
            seconds: prevState.seconds - 1,
          };
        } else if (prevState.minutes > 0) {
          return {
            ...prevState,
            minutes: prevState.minutes - 1,
            seconds: 59,
          };
        } else if (prevState.hours > 0) {
          return {
            ...prevState,
            hours: prevState.hours - 1,
            minutes: 59,
            seconds: 59,
          };
        } else if (prevState.days > 0) {
          return {
            ...prevState,
            days: prevState.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        } else if (prevState.years > 0) {
          return {
            ...prevState,
            years: prevState.years - 1,
            days: 364,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        } else {
          // Time's up, do something here
          clearInterval(interval);
          return prevState;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardContent>지구 온난화 1.5°C 한도 내 억제를 위한 시간</CardContent>
      <CardContent>
        <div
          style={{
            textAlign: "center",
            fontSize: "2.25rem",
            fontWeight: "bold",
          }}
        >
          {timeLeft.years}년 {timeLeft.days}일 {timeLeft.hours}시간{" "}
          {timeLeft.minutes}분 {timeLeft.seconds}초
        </div>
        <ClimateComparison />
      </CardContent>
    </Card>
  );
};

export default ClimateCountdown;
