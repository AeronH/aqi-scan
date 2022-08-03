export interface Stations {
  aqi: string;
  lat: number;
  lon: number;
  station: {
    name: string;
    time: string;
  };
  uid: number;
}