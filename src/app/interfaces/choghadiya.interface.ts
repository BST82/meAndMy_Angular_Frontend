export interface ChoghadiyaSlot {
  type: string;
  start: string;
  end: string;
}

export interface ChoghadiyaResponse {
  date: string;
  sunrise: string;
  sunset: string;
  day_choghadiya: ChoghadiyaSlot[];
  night_choghadiya: ChoghadiyaSlot[];
}
