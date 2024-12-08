// Utils.tsx
export const getDatesInRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate)); // 각 날짜를 배열에 추가
    currentDate.setDate(currentDate.getDate() + 1); // 하루씩 증가
  }

  return dates;
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

export const fetchWeatherInRange = async (startDate: Date, endDate: Date) => {
  const datesInRange = getDatesInRange(startDate, endDate); // 날짜 범위 내의 날짜 배열을 얻음
  const weatherData: any[] = [];

  // 각 날짜에 대해 날씨 데이터를 가져와서 배열에 저장
  for (const date of datesInRange) {
    const weatherForDate = await fetchWeatherByDate(date);
    if (weatherForDate) {
      weatherData.push({
        date: weatherForDate.date, // 날짜
        av_temperature: weatherForDate.average_temperature, //평균 기온
      });
    }
  }
  return weatherData; // 가져온 날씨 데이터 반환
};

// 년도별 평균 온도 계산하는 함수
export const getYearlyAverageTemperature = (weatherData: any[]) => {
  const yearlyData: { [year: number]: number[] } = {};

  // 날씨 데이터를 년도별로 그룹화하고 평균 기온을 계산
  weatherData.forEach((entry) => {
    const year = parseInt(entry.date.slice(0, 4), 10); // "yyyyMMdd" 형태에서 년도만 추출
    const temperature = entry.av_temperature;

    // 년도별로 배열을 생성하여 기온을 저장
    if (!yearlyData[year]) {
      yearlyData[year] = [];
    }
    yearlyData[year].push(temperature);
  });

  // 각 년도의 평균 온도 계산
  const yearlyAverageTemperatures = Object.keys(yearlyData).map((year) => {
    const temperatures = yearlyData[parseInt(year, 10)];
    const avgTemperature =
      temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;
    return { year: parseInt(year, 10), avg_temperature: avgTemperature };
  });

  return yearlyAverageTemperatures;
};

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
