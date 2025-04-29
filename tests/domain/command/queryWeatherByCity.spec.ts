import QueryWeatherByCityCommand from '../../../src/domain/commands/queryWeatherByCity.command.js';
import ICityService from '../../../src/domain/contracts/interfaces/city-service.interface.js';
import { IWeatherService } from '../../../src/domain/contracts/interfaces/weather-service.interface.js';

describe('QueryWeatherByCityCommand', () => {
  let cityServiceMock: jest.Mocked<ICityService>;
  let weatherServiceMock: jest.Mocked<IWeatherService>;
  let command: QueryWeatherByCityCommand;

  beforeEach(() => {
    // Mocking cityService
    cityServiceMock = {
      getCity: jest.fn(),
    } as unknown as jest.Mocked<ICityService>;

    // Mocking weatherService
    weatherServiceMock = {
      getWeather: jest.fn(),
    } as unknown as jest.Mocked<IWeatherService>;

    // Instantiating the command with mocked services
    command = new QueryWeatherByCityCommand(
      cityServiceMock,
      weatherServiceMock
    );
  });

  it('should return a message if the city is not found', async () => {
    cityServiceMock.getCity.mockResolvedValueOnce([]);

    const result = await command.execute({
      city: 'UnknownCity',
      startDate: '2025-04-01',
      endDate: '2025-04-02',
    });

    expect(cityServiceMock.getCity).toHaveBeenCalledWith('UnknownCity');
    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: 'City UnknownCity not found.',
        },
      ],
    });
  });

  it('should return weather information for a valid city', async () => {
    cityServiceMock.getCity.mockResolvedValueOnce([
      { id: 1, name: 'ValidCity', uf: 'VC', latitude: 10, longitude: 20 },
    ]);
    weatherServiceMock.getWeather.mockResolvedValueOnce({
      temperature: 25,
      condition: 'Sunny',
    });

    const result = await command.execute({
      city: 'ValidCity',
      startDate: '2025-04-01',
      endDate: '2025-04-02',
    });

    expect(cityServiceMock.getCity).toHaveBeenCalledWith('ValidCity');
    expect(weatherServiceMock.getWeather).toHaveBeenCalledWith({
      lat: 10,
      lng: 20,
      startDate: '2025-04-01',
      endDate: '2025-04-02',
    });
    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: 'The weather in ValidCity is {"temperature":25,"condition":"Sunny"}.',
          weather: { temperature: 25, condition: 'Sunny' },
        },
      ],
    });
  });
});
