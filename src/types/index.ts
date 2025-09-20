export interface Location {
  latitude: number;
  longitude: number;
}

export interface Alert {
  id: string;
  type: string;
  description: string;
  location: Location;
  time: number;
}

export interface AlertsApiResponse {
  alerts: Alert[];
}