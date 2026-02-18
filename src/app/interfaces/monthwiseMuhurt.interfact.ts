export interface MuhuratResponse {
  month: string;
  year: number;
  data: Muhurat[];
}

export interface Muhurat {
  date?: string;
  sunrise?: string;
  sunset?: string;
  abhijit_muhurat?: string;
  rahu_kaal?: string;
  yamaganda?: string;
  gulika_kaal?: string;
}
