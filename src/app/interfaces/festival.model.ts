export interface Festival {
  id: string;
  name: string;
  date: string;
  month: number;
  year: number;
  description: string;
  imageUrl?: string;
}

export interface FestivalResponse {
  total: number;
  data: Festival[];
}
