
class WeatherService {

    #url = 'https://api.openweathermap.org/data/2.5';
    #apiKey;

    constructor() {
        this.#apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    }

    async fetchCurrentWeatherByName(city, units='metric', lang='en') {
        return await fetch(`${this.#url}/weather?units=${units}&lang=${lang}&q=${city}&appid=${this.#apiKey}`)
    }

    async fetchCurrentWeatherByCoords(lat, lng, units='metric', lang='en') {
        return await fetch(`${this.#url}/weather?units=${units}&lang=${lang}&lat=${lat}&lon=${lng}&appid=${this.#apiKey}`)
    }

    async fetch5DayForecastByName(city, units='metric', lang='en') {
        let response = await fetch(`${this.#url}/forecast?units=${units}&lang=${lang}&q=${city}&appid=${this.#apiKey}`);
        let json = await response.json();
        return json;
    } 
}

export default WeatherService;