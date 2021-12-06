import { useEffect, useState } from "react";
import WeatherService from "./services/weather";

const WeatherForecast = (props) => {
    const city = props.city;
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        function fetchForecast() {
            
            let weather = new WeatherService();
            weather.fetch5DayForecastByName(city).then(json => {
                if (json.cod === "200") {
                    let list = [];
                    let last_date = null;
                    for (let i = 0; i < json.list.length; i++) {
                        let item = json.list[i];
                        let date = (new Date(1000 * item.dt)).toLocaleDateString();
                        if (last_date !== date) {
                            console.log(item, last_date);
                            list.push(item);
                            last_date = date;
                        }
                    }
                    setForecast(list);
                }
            });
        }

        fetchForecast();

    }, [city]);

    return (
        <div>
            <h3>{city} - 5-day Forecast</h3>
            <hr />
            {forecast.map((item) => {
                return (<div className="row">
                    <div className="col-md-4">
                        {(new Date(1000 * item.dt)).toDateString()}
                    </div>
                    <div className="col-md-4">
                        <img alt="" src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} />
                        <span>{item.main.temp_max} / {item.main.temp_min}&deg; C</span>
                    </div>
                    <div className="col-md-4">
                        {item.weather[0].description}
                    </div>
                </div>);
            })}
            
        </div>
    );
}

export default WeatherForecast;