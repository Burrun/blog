import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Chart.js에 필요한 요소 등록
ChartJS.register(
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

interface ChartProps {
  startDate: Date;
  endDate: Date;
}

const Chart3: React.FC<ChartProps> = ({ startDate, endDate }) => {
  const [data, setData] = useState<any>(null);

  // 이상기후 정의 (서울의 계절별 정상 평균기온 범위)
  const seasonRanges = {
    봄: { min: 10, max: 20 },
    여름: { min: 20, max: 30 },
    가을: { min: 10, max: 20 },
    겨울: { min: -5, max: 5 },
  };

  // 각 계절의 기온 데이터를 받아오는 함수 (예시로 임의의 기온 값 사용)
  const getTemperatureData = (year: number) => {
    // 각 계절별 임의의 기온 데이터를 생성합니다.
    // 실제로는 API나 데이터베이스에서 기온 데이터를 가져오는 방식이어야 합니다.
    return {
      봄: [12, 15, 18, 25, 22], // 봄의 기온 예시
      여름: [25, 28, 35, 33, 30], // 여름의 기온 예시
      가을: [18, 12, 15, 17, 22], // 가을의 기온 예시
      겨울: [-3, 1, 5, 7, -2], // 겨울의 기온 예시
    };
  };

  // 이상기후를 계산하는 함수
  const calculateAnomalies = (year: number) => {
    const temperatureData = getTemperatureData(year);
    let anomalyCount = 0;

    // 각 계절별로 기온을 체크하고 이상기후를 계산
    for (const season in seasonRanges) {
      const { min, max } = seasonRanges[season];
      const temperatures = temperatureData[season];

      // 해당 계절의 기온 중 정상 범위를 벗어난 기온을 찾기
      for (const temp of temperatures) {
        if (temp < min || temp > max) {
          anomalyCount++;
        }
      }
    }
    return anomalyCount;
  };

  // 이상기후 발생 횟수를 연도별로 계산
  const calculateAnnualAnomalies = () => {
    const anomalies: { year: number; count: number }[] = [];
    let currentYear = startDate.getFullYear();

    // 시작 년도에서 종료 년도까지 반복
    while (currentYear <= endDate.getFullYear()) {
      const anomalyCount = calculateAnomalies(currentYear);
      anomalies.push({ year: currentYear, count: anomalyCount });
      currentYear++;
    }
    return anomalies;
  };

  // 차트 데이터를 준비
  const prepareChartData = () => {
    const anomalies = calculateAnnualAnomalies();
    const years = anomalies.map((item) => item.year);
    const counts = anomalies.map((item) => item.count);

    return {
      labels: years.map(String), // 연도를 라벨로 사용
      datasets: [
        {
          label: "이상기후 발생 횟수",
          data: counts,
          borderColor: "#FF5722",
          backgroundColor: "rgba(255, 87, 34, 0.2)",
          fill: true,
          tension: 0.4, // 선이 부드럽게 연결되도록
          pointBackgroundColor: "#FF5722", // 점의 배경색
          pointBorderColor: "#FF5722", // 점의 테두리 색
          pointRadius: 5, // 점의 크기
        },
      ],
    };
  };

  useEffect(() => {
    setData(prepareChartData());
  }, [startDate, endDate]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "이상기후 발생 횟수 (연도별)",
      },
    },
    scales: {
      x: {
        type: "category", // 연도별로 X축을 설정
        title: {
          display: true,
          text: "연도",
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "이상기후 발생 횟수",
        },
        min: 0, // Y축의 최소값 설정
      },
    },
  };

  return (
    <div
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          marginBottom: "1.5rem",
          justifyContent: "center",
        }}
      >
        <Line data={data} />
      </div>
    </div>
  );
};

export default Chart3;
