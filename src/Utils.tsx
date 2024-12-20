import { ForecastData } from "./types.tsx";

export const fetchTodayWeather = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/get_weather");
    if (!res.ok) {
      throw new Error("날씨 데이터를 가져오는 데 실패했습니다.");
    }
    const jsn = await res.json();
    return jsn;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchWeatherByDate = async (selectedDate: Date): Promise<any> => {
  try {
    // Date 객체를 "yyyymmdd" 형식의 문자열로 변환
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}${month}${day}`;

    const res = await fetch(
      `http://localhost:5000/api/get_avg_temperature?date=${formattedDate}`
    );
    const jsn = await res.json();
    console.log(jsn);
    return jsn;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchForecast = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/get_forecast`);
    const jsn = await res.json();
    return jsn;
  } catch (err) {
    console.error(err);
    return [];
  }
};

// 이부분 수정 (jsn 구조가 forcast , temperature, date,  강수확률로 되어있음)
//이걸 (condition, tempature, date, rainPer)로 바꿔야함

export const fetchSpecificDateAcrossYears = async (
  startDate: Date,
  endDate: Date
) => {
  const specificDateTemperatures: { date: string; temperature: number }[] = [];
  const targetMonthDay = startDate.toISOString().slice(5, 10); // "MM-DD" 추출

  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  // 지정된 범위 내 특정 월/일의 데이터 가져오기
  for (let year = startYear; year <= endYear; year++) {
    const specificDate = new Date(`${year}-${targetMonthDay}`); // 해당 연도의 특정 날짜 생성

    try {
      const weatherData = await fetchWeatherByDate(specificDate); // 특정 날짜의 날씨 데이터 가져오기
      if (weatherData) {
        specificDateTemperatures.push({
          date: weatherData.date, // yyyyMMdd 형식의 날짜
          temperature: weatherData.average_temperature, // 평균 기온
        });
      }
    } catch (error) {
      console.error(
        `Error fetching data for ${year}-${targetMonthDay}:`,
        error
      );
    }
  }

  console.log("배열: ", specificDateTemperatures);
  return specificDateTemperatures; // 수집된 특정 날짜 데이터 반환
};

export const fetchYearlyWeatherData = async (year: number) => {
  const yearlyWeatherData: { date: string; temperature: number }[] = [];

  try {
    // 1월 1일부터 12월 31일까지 날짜 생성
    const startDate = new Date(year, 0, 1); // 1월은 0
    const endDate = new Date(year, 11, 31); // 12월은 11

    // 날짜 범위의 모든 날짜를 반복
    let currentDate = startDate;
    while (currentDate <= endDate) {
      try {
        // 각 날짜에 대해 데이터를 가져오는 fetchWeatherByDate 호출
        const weatherData = await fetchWeatherByDate(currentDate);
        if (weatherData) {
          yearlyWeatherData.push({
            date: weatherData.date, // yyyy-MM-dd
            temperature: weatherData.average_temperature, // 평균 온도
          });
        }
      } catch (error) {
        console.error(
          `Error fetching data for ${currentDate.toISOString()}:`,
          error
        );
      }

      // 다음 날짜로 이동
      currentDate.setDate(currentDate.getDate() + 1);
    }
  } catch (error) {
    console.error(`Error fetching yearly data for year ${year}:`, error);
  }

  return yearlyWeatherData;
};
