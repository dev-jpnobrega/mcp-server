export interface WeatherQueryParam {
  lat: number;
  lng: number;
  param?: string;
  startDate?: string;
  endDate?: string;
}

export interface IWeatherService {
  getWeather(param: WeatherQueryParam): Promise<any>;
}
