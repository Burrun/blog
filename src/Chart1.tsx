import React, { useEffect, useState } from "react";
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

const Chart1 = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchSpecificDateAcrossYears(startDate, endDate);
        setData(result); // 데이터 저장
      } catch (err) {
        console.error(err);
      }
    };

    fetchData(); // 비동기 데이터 호출
  }, [startDate, endDate]); // startDate와 endDate가 변경될 때마다 호출됩니다

  if (!data || data.length === 0) {
    return <div>Loading...</div>; // 데이터가 없거나 로딩 중일 때 표시할 내용
  }

  const labels = data.map((item) => item.date);
  const values = data.map((item) => item.temperature);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "평균 온도",
        data: values,
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

  return (
    <div>
      <Line options={options} data={chartData} />
      <h3 style={{ padding: "20px" }}>
        {startDate.getFullYear()}년부터 {endDate.getFullYear()}년까지의 평균
        온도가 얼마나 변했는지 확인해보세요.
      </h3>
    </div>
  );
};

export default Chart1;
