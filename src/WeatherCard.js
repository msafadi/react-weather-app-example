import { Component } from "react";
import WeatherService from "./services/weather";

class WeatherCard extends Component
{
    #currentCity;

    constructor(props) {
        super(props);
        this.props = props;

        this.#currentCity = props.city;

        this.state = {
            currentTime: new Date(),
            weather: null
        }

    }

    componentDidMount() {
        this.fetchWeather();
    }

    componentDidUpdate() {
        if (this.#currentCity !== this.props.city) {
            this.#currentCity = this.props.city
            this.fetchWeather();
        }
    }

    componentWillUnmount() {
    }

    fetchWeather() {
        let weather = new WeatherService();

        if (this.props.city) {
            weather.fetchCurrentWeatherByName(this.props.city)
                .then(response => response.json())
                .then(json => {
                    if (json.main) {
                        this.setState({
                            weather: json
                        })
                    }
                })
            return;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {

                weather.fetchCurrentWeatherByCoords(pos.coords.latitude, pos.coords.longitude)
                    .then(response => response.json())
                    .then(json => {
                        if (json.main) {
                            this.setState({
                                weather: json
                            })
                        }
                    })
                    
            });
        }
    }

    render() {
        const weather = this.state.weather;
        if (!weather) {
            return <div className="card"></div>;
        }

        return (<div className="card">
            <div className="card-header">
                <time>{ this.state.currentTime.toLocaleTimeString() }</time>
                <h3>{weather.name}</h3>
            </div>
            <div>
                <img alt="" src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                <span className="fs-3">{weather.main.temp}&deg;C</span>
            </div>
            <div className="fs-4">{weather.weather[0].description}</div>
            <div className="row">
                <div className="col-6">
                    <ul className="list-unstyled">
                        <li>Wind: {weather.wind.speed} / {weather.wind.deg}</li>
                        <li>Humidity: {weather.main.humidity}</li>
                    </ul>
                </div>
                <div className="col-6">
                    <ul className="list-unstyled">
                        <li>Pressure: {weather.main.pressure}</li>
                        <li>Visibility: {weather.visibility}</li>
                    </ul>
                </div>
            </div>
        </div>);
    }
}

export default WeatherCard;