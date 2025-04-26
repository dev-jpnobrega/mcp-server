import QueryWeatherByCityCommand from '../../domain/commands/queryWeatherByCity.command.js';
import ICommand from '../../domain/contracts/interfaces/command.interface.js';
import CityService from '../services/city.service.js';
import WeatherService from '../services/weather.service.js';
import IFactory from './factory.interface.js';

class QueryWeatherByCityFactory implements IFactory {
  create(): ICommand {
    return new QueryWeatherByCityCommand(
      new CityService(),
      new WeatherService()
    );
  }
}
export default QueryWeatherByCityFactory;
