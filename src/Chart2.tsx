import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProps {
  startDate: Date;
  endDate: Date;
}

const Chart2: React.FC<ChartProps> = ({ startDate, endDate }) => {
  const [data, setData] = useState<any>(null);
  const historicalData = {
    labels: ["봄", "여름", "가을", "겨울"],
    datasets: [
      {
        data: [25, 20, 25, 30],
        backgroundColor: ["#4CAF50", "#FF5722", "#FF9800", "#2196F3"],
        hoverBackgroundColor: ["#45a049", "#f44336", "#f57c00", "#1976D2"],
      },
    ],
  };

  const currentData = {
    labels: ["봄", "여름", "가을", "겨울"],
    datasets: [
      {
        data: [15, 30, 20, 35],
        backgroundColor: ["#4CAF50", "#FF5722", "#FF9800", "#2196F3"],
        hoverBackgroundColor: ["#45a049", "#f44336", "#f57c00", "#1976D2"],
      },
    ],
  };

  // 증가율 계산 함수
  const calculateIncrease = (historical: number[], current: number[]) => {
    return historical.map((value, index) => {
      const increase = ((current[index] - value) / value) * 100;
      return increase.toFixed(2); // 소수점 두 자리까지
    });
  };

  const increaseData = calculateIncrease(
    historicalData.datasets[0].data,
    currentData.datasets[0].data
  );

  const startYear = startDate.getFullYear();

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
          <h3>1900년대 계절 점유율</h3>
          <Doughnut data={historicalData} />
        </div>
        <div style={{ textAlign: "center", width: "45%" }}>
          <h3>2023년 계절 점유율</h3>
          <Doughnut data={currentData} />
        </div>
      </div>
      {currentData.labels.map((label, index) => (
        <div
          key={label}
          style={{
            color: currentData.datasets[0].backgroundColor[index],
            lineHeight: "1.5",
          }}
        >
          <strong>{label}</strong>은 {startYear}년 대비{" "}
          <strong>{increaseData[index]}%</strong> 변화하였습니다.
        </div>
      ))}
    </div>
  );
};

export default Chart2;
