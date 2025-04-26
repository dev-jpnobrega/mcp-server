import fetch from 'node-fetch';
const SERVICE_URL = `https://raw.githubusercontent.com/alanwillms/geoinfo/refs/heads/master/latitude-longitude-cidades.csv`;
const cities = [];
export default class CityService {
    async getCity(cityName) {
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
