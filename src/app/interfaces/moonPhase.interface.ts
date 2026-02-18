export interface MoonApiResponse {
  location: {
    city: string;
    region: string;
    country: string;
  };
  moon_data: {
    moon_phase: string;
    moon_illumination: number;
    moonrise: string;
    moonset: string;
  };
}