import ICityService from '../contracts/interfaces/city-service.interface.js';
import {
  IWeatherService,
  WeatherQueryParam,
} from '../contracts/interfaces/weather-service.interface.js';
import { queryWeatherByCityParam } from '../contracts/value-objects/index.js';
import BaseCommand from './base.command.js';

class QueryWeatherByCityCommand extends BaseCommand {
  private cityService: ICityService;
  private weatherService: IWeatherService;

  constructor(cityService: ICityService, weartherService: IWeatherService) {
    super();

    this.cityService = cityService;
    this.weatherService = weartherService;
  }

  async execute(param: queryWeatherByCityParam) {
    const { city } = param;
    console.log('Executing QueryWeatherByCityCommand', param);

    const cities = await this.cityService.getCity(city);

    if (cities.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: `City ${city} not found.`,
          },
        ],
      };
    }

    const paramWeather: WeatherQueryParam = {
      lat: cities[0].latitude,
      lng: cities[0].longitude,
      startDate: param?.startDate,
      endDate: param?.endDate,
    };

    const weather = await this.weatherService.getWeather(paramWeather);

    return {
      content: [
        {
          type: 'text',
          text: `The weather in ${cities[0].name} is ${JSON.stringify(
            weather
          )}.`,
          weather,
        },
      ],
    };
  }
}

export default QueryWeatherByCityCommand;
