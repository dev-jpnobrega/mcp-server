import { z } from 'zod';
import { ITool } from './index.js';

const toolWeatherByCity: ITool = {
  name: 'queryWeatherByCity',
  schema: {
    city: z.string().describe('City name'),
    startDate: z.string().datetime().describe('Start date'),
    endDate: z.string().datetime().describe('End date'),
  },
};

export default toolWeatherByCity;
