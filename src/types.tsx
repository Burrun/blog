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
