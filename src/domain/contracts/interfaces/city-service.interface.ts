import City from './city.interface.js';

export default interface ICityService {
  getCity(cityName: string): Promise<City[]>;
}
