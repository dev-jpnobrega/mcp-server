import QueryWeatherByCityCommand from '../../domain/commands/queryWeatherByCity.command.js';
import CityService from '../services/city.service.js';
import WeatherService from '../services/weather.service.js';
class QueryWeatherByCityFactory {
    create() {
        return new QueryWeatherByCityCommand(new CityService(), new WeatherService());
    }
}
export default QueryWeatherByCityFactory;
