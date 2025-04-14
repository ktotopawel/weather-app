export interface DayDataFromAPI {
  datetime: string;
  temp: number;
  feelslike: number;
  conditions: string;
  icon: string;
  description: string;
  tempmax: number;
  tempmin: number;
  precip: number;
  pressure: number;
  winddir: number;
  windspeed: number;
  uvindex: number;
  sunrise: string;
  sunset: string;
}

export interface APIResponse {
  resolvedAddress: string;
  alerts: any;
  days: DayDataFromAPI[];
}

export interface Day {
  date: string;
  temp: number;
  conditions: string;
  feelslike: number;
  icon: string;
  description: string;
  tempmax: number;
  tempmin: number;
  precip: number;
  pressure: number;
  winddir: number;
  windspeed: number;
  uvindex: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherData {
  address: string;
  alerts: any;
  days: Day[];
}
