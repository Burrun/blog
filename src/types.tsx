export interface Weather {
  location: string;
  date: string | null;
  temperature: number | null;
  temperatureMax: number | null;
  temperatureMin: number | null;
  condition: string | undefined;
  wind: number | null;
  humidity: number | null;
  precipitation: number | null;
  uv: string | null;
}

export interface Article {
  title: string | null;
  subtitle: string | null;
  author: string | null;
  date: string | null;
  content: string | null;
}
