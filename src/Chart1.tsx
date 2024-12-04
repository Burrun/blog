import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Chart 컴포넌트 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart1: React.FC = () => {
  const data = {
    labels: ["1월", "2월", "3월", "4월", "5월"],
    datasets: [
      {
        label: "월별 매출",
        data: [12, 19, 3, 5, 2],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        fill: false, // 선 아래 영역을 채우지 않음
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 컨테이너 크기에 맞추기
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "차트 제목",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "600px", height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart1;
