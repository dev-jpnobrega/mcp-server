import BaseCommand from './base.command.js';
class QueryWeatherByCityCommand extends BaseCommand {
    cityService;
    weatherService;
    constructor(cityService, weartherService) {
        super();
        this.cityService = cityService;
        this.weatherService = weartherService;
    }
    async execute(param) {
        const { city } = param;
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
        const paramWeather = {
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
                    text: `The weather in ${cities[0].name} is ${JSON.stringify(weather)}.`,
                    weather,
                },
            ],
        };
    }
}
export default QueryWeatherByCityCommand;
