export interface Place {
  name: string;
  slug: string;
}

export interface City {
  name: string;
  slug: string;
  places: Place[];
}

export interface MenuItem {
  name: string;
  slug: string;
  type: 'page' | 'dropdown';
  cities: City[] | null;
}

export interface HeaderResponse {
  menu: MenuItem[];
}
