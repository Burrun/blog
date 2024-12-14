import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import ClimateComparison from "./ClimateCompar.tsx";

const ClimateCountdown = () => {
  // 현재 날짜와 시간으로부터 4년 221일 2시간 36분 46초 후를 계산
  const getTargetTime = () => {
    const currentTime = new Date(2024, 11, 14, 18, 24); // 2024년 12월 14일 오후 6시 24분
    currentTime.setFullYear(currentTime.getFullYear() + 4); // 4년 더하기
    currentTime.setDate(currentTime.getDate() + 221); // 221일 더하기
    currentTime.setHours(currentTime.getHours() + 2); // 2시간 더하기
    currentTime.setMinutes(currentTime.getMinutes() + 36); // 36분 더하기
    currentTime.setSeconds(currentTime.getSeconds() + 46); // 46초 더하기
    return currentTime;
  };

  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetTime = getTargetTime(); // 목표 시간 계산
    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = targetTime.getTime() - now.getTime();

      if (timeDifference <= 0) {
        // 시간이 다 되었으면 인터벌 종료
        clearInterval(interval);
        setTimeLeft({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
        const days = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)
        );
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimeLeft({ years, days, hours, minutes, seconds });
      }
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
