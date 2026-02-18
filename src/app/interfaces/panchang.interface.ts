
export interface Choghadiya {
  name: string;
  type: 'Auspicious' | 'Inauspicious';
  start_time: string;
  end_time: string;
}


export interface PanchangResponse {
  date: string;
  day_choghadiya: Choghadiya[];
  night_choghadiya: Choghadiya[];
  special_muhurts: string[];
}
