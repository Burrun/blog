import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { fetchYearlyWeatherData } from "./Utils.tsx";

// Chart.js 요소 등록
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart2 = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
  const [startYearData, setStartYearData] = useState<any[]>([]); // 시작 연도 데이터
  const [endYearData, setEndYearData] = useState<any[]>([]); // 종료 연도 데이터
  const [startYearSeasonData, setStartYearSeasonData] = useState<number[]>([
    0, 0, 0, 0,
  ]);
  const [endYearSeasonData, setEndYearSeasonData] = useState<number[]>([
    0, 0, 0, 0,
  ]);

  useEffect(() => {
    const fetchYearlyData = async () => {
      try {
        // 시작 연도 데이터 가져오기
        const startYearResult = await fetchYearlyWeatherData(
          startDate.getFullYear()
        );
        setStartYearData(startYearResult);
        processSeasonData(startYearResult, setStartYearSeasonData);

        // 종료 연도 데이터 가져오기
        const endYearResult = await fetchYearlyWeatherData(
          endDate.getFullYear()
        );
        setEndYearData(endYearResult);
        processSeasonData(endYearResult, setEndYearSeasonData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchYearlyData();
  }, [startDate, endDate]);

  // 평균 온도로 계절 기간 나누기
  const processSeasonData = (
    data: { date: string; temperature: number }[],
    setSeasonData: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    const springThreshold = 15; // 봄 기준 평균 온도
    const summerThreshold = 25; // 여름 기준 평균 온도
    const fallThreshold = 15; // 가을 기준 평균 온도
    const winterThreshold = 5; // 겨울 기준 평균 온도

    let springDays = 0;
    let summerDays = 0;
    let fallDays = 0;
    let winterDays = 0;

    let currentSeason = "winter"; // 현재 계절
    let totalDays = data.length;

    let currentStreak = 0;

    // 데이터 순회
    data.forEach((entry, index) => {
      const { temperature } = entry;

      // 새로운 계절 판단 로직
      let transitionTo = ""; // 다음 계절로의 전환

      if (currentSeason === "winter" && temperature > springThreshold) {
        // 겨울 → 봄
        currentStreak++;
        if (currentStreak >= 3) transitionTo = "spring";
      } else if (currentSeason === "spring" && temperature > summerThreshold) {
        // 봄 → 여름
        currentStreak++;
        if (currentStreak >= 3) transitionTo = "summer";
      } else if (currentSeason === "summer" && temperature <= fallThreshold) {
        // 여름 → 가을
        currentStreak++;
        if (currentStreak >= 3) transitionTo = "fall";
      } else if (currentSeason === "fall" && temperature <= winterThreshold) {
        // 가을 → 겨울
        currentStreak++;
        if (currentStreak >= 3) transitionTo = "winter";
      } else {
        // 조건을 만족하지 않으면 연속 일수 초기화
        currentStreak = 0;
      }

      // 계절 변경 시 현재 계절의 일수를 기록
      if (transitionTo && transitionTo !== currentSeason) {
        if (currentSeason === "spring") springDays += currentStreak;
        else if (currentSeason === "summer") summerDays += currentStreak;
        else if (currentSeason === "fall") fallDays += currentStreak;
        else if (currentSeason === "winter") winterDays += currentStreak;

        currentSeason = transitionTo; // 계절 전환
        currentStreak = 1; // 새 계절 시작
      } else {
        // 현재 계절의 일수를 증가
        if (currentSeason === "spring") springDays++;
        else if (currentSeason === "summer") summerDays++;
        else if (currentSeason === "fall") fallDays++;
        else if (currentSeason === "winter") winterDays++;
      }
    });

    // 총 일수 대비 비율 계산
    const percentages = [
      (springDays / totalDays) * 100,
      (summerDays / totalDays) * 100,
      (fallDays / totalDays) * 100,
      (winterDays / totalDays) * 100,
    ];
    setSeasonData(percentages);
  };

  const startYearChartData = {
    labels: ["봄", "여름", "가을", "겨울"],
    datasets: [
      {
        data: startYearSeasonData,
        backgroundColor: ["#4CAF50", "#FF5722", "#FF9800", "#2196F3"],
        hoverBackgroundColor: ["#45a049", "#f44336", "#f57c00", "#1976D2"],
      },
    ],
  };

  const endYearChartData = {
    labels: ["봄", "여름", "가을", "겨울"],
    datasets: [
      {
        data: endYearSeasonData,
        backgroundColor: ["#4CAF50", "#FF5722", "#FF9800", "#2196F3"],
        hoverBackgroundColor: ["#45a049", "#f44336", "#f57c00", "#1976D2"],
      },
    ],
  };

  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  return (
    <div
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div style={{ display: "flex", marginBottom: "1.5rem" }}>
        <div style={{ textAlign: "center", width: "45%" }}>
          <h3>{startYear}년 계절 점유율</h3>
          <Doughnut data={startYearChartData} />
        </div>
        <div style={{ textAlign: "center", width: "45%" }}>
          <h3>{endYear}년 계절 점유율</h3>
          <Doughnut data={endYearChartData} />
        </div>
      </div>
      <div>
        <h4>{startYear}년 계절 비율</h4>
        {startYearChartData.labels.map((label, index) => (
          <div key={label}>
            <strong>{label}</strong>: {startYearSeasonData[index].toFixed(2)}%
          </div>
        ))}
      </div>
      <div>
        <h4>{endYear}년 계절 비율</h4>
        {endYearChartData.labels.map((label, index) => (
          <div key={label}>
            <strong>{label}</strong>: {endYearSeasonData[index].toFixed(2)}%
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart2;
