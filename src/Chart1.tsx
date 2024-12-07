import React, { useState, useEffect } from "react";
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
import axios from "axios";

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

interface ChartProps {
  startDate: Date | null;
  endDate: Date | null;
}

const Chart1: React.FC<ChartProps> = ({ startDate, endDate }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startYear = startDate.getFullYear();
        const endYear = endDate.getFullYear();
        const labels: number[] = [];
        const values: number[] = [];

        for (let year = startYear; year <= endYear; year++) {
          labels.push(year); // number를 string으로 변환
          const response = await axios.get(
            `https://api.example.com/temperature?year=${year}`
          );
          values.push(response.data.averageTemperature);
        }

        setData({
          labels,
          datasets: [
            {
              label: "연평균 기온",
              data: values,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching temperature data", error);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "연평균 기온 변화량",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ justifyContent: "center" }}>
      {data ? <Line data={data} options={options} /> : <p>Loading...</p>}
      <div>
        <p>
          이 그래프는 {startDate.getFullYear()}년부터 {endDate.getFullYear()}
          년까지 의 연평균 기온 변화를 보여줍니다.
        </p>
      </div>
    </div>
  );
};

export default Chart1;
