export interface Weather {
  location: string;
  date: string | null;
  temperature: number | null;
  temperatureMax: number | null;
  temperatureMin: number | null;
  condition: string | undefined;
  wind: number | null;
  precipitation: number | null;
}

export interface Article {
  title: string | null;
  subtitle: string | null;
  author: string | null;
  date: string | null;
  body: string | null;
}

export interface ForecastData {
  forecast: string; // 날씨 상태 (예: "맑음" 등)
  temperature: string; // 온도 값 (예: "2")
  time: string; // 날짜 및 시간 (예: "202412171200")
  강수확률: string; // 강수 확률 (예: "0")
}
