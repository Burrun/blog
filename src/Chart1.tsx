import React from "react";
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
import { fetchSpecificDateAcrossYears } from "./Utils.tsx";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart1 = async (startDate: Date, endDate: Date) => {
  const data = await fetchSpecificDateAcrossYears(startDate, endDate);
  const labels = data.map((item) => item.date);
  const temperatures = data.map((item) => item.temperature);

  // 이후 코드 작성
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "평균 온도",
        data: temperatures,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Temperature Chart",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "날짜",
        },
      },
      y: {
        title: {
          display: true,
          text: "평균 온도 (°C)",
        },
        suggestedMin: -10,
        suggestedMax: 10,
      },
    },
  };

  return <Line options={options} data={chartData} />;
};

export default Chart1;
