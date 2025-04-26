import { z } from 'zod';
const toolWeatherByCity = {
    name: 'queryWeatherByCity',
    schema: {
        city: z.string().describe('City name'),
        startDate: z.string().datetime().describe('Start date'),
        endDate: z.string().datetime().describe('End date'),
    },
};
export default toolWeatherByCity;
