import fetch from 'node-fetch';
export default class WeatherService {
    async getWeather(param) {
        try {
            const apiKey = process.env.WEATHER_API_KEY ||
                '476857ca-2076-11f0-a93f-0242ac130003-4768582e-2076-11f0-a93f-0242ac130003';
            if (!apiKey) {
                throw new Error('WEATHER_API_KEY is not set');
            }
            const startDate = param?.startDate || new Date(Date.now()).toISOString();
            const endDate = param?.endDate || param?.startDate
                ? new Date(Date.parse(param.startDate) + 60 * 60 * 1000).toISOString()
                : new Date(Date.now() + 60 * 60 * 1000).toISOString();
            const apiUrl = `https://api.stormglass.io/v2/weather/point?lat=${param.lat}&lng=${param.lng}&params=${param?.param || 'waveHeight,airTemperature'}&start=${startDate}&end=${endDate}`;
            const response = await fetch(apiUrl, {
                headers: {
                    Authorization: apiKey,
                },
            });
            if (!response.ok) {
                throw new Error(`query weather failed with status ${response.status}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('query weather error:', error);
            throw error;
        }
    }
}
