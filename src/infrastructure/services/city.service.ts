import fetch from 'node-fetch';

import ICityService from '../../domain/contracts/interfaces/city-service.interface.js';
import City from '../../domain/contracts/interfaces/city.interface.js';

const SERVICE_URL = `https://raw.githubusercontent.com/alanwillms/geoinfo/refs/heads/master/latitude-longitude-cidades.csv`;

const cities: City[] = [];

export default class CityService implements ICityService {
  async getCity(cityName: string): Promise<City[]> {
    if (cities.length !== 0) {
      return cities.filter((city) => city.name === cityName);
    }

    const response = await fetch(SERVICE_URL);
    const data = await response.text();

    const rows = data.trim().split('\n');
    const headers = rows[0].split(',');

    rows.slice(1).map((row, index) => {
      const values = row.split(';');
      cities.push({
        id: parseInt(values[0], 2),
        uf: values[1].replaceAll('"', ''),
        name: values[2].replaceAll('"', ''),
        longitude: parseFloat(values[3]),
        latitude: parseFloat(values[4]),
      });
    });

    return cities.filter((city) => city.name === cityName);
  }
}
