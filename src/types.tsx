export interface Weather {
  location: string;
  date: string | null;
  temperature: number | null;
  condition: string | undefined;
  wind: number | null;
  humidity: number | null;
  precipitation: number | null;
  uv: string | null;
}
