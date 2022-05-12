import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { selectCities, selectCity, selectHourlyWeather } from './citiesSlice';
import { getHourlyWeather, getWeatherDetails } from "./services";
import { useNavigate } from "react-router-dom";

export function Details() {
    const params = useParams();
    const savedCities = useSelector(selectCities);
    const hourlyWeather = useSelector(selectHourlyWeather);
    const cityWeather = useSelector(selectCity);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let lon: string;
    let lat: string;

    useEffect( () => {
        if (savedCities.length === 0) {
            navigate("/");
        }
        else {
            for (const key in savedCities) {
                if (savedCities[key].name === params.name) {

                    lon = savedCities[key].lon;
                    lat = savedCities[key].lat;
                    break;
                }
            }
            dispatch(getWeatherDetails(params.name, lat, lon));
            dispatch(getHourlyWeather());
        }
    }, [])

    return( <Container>
        <NavLink to="/">Back</NavLink>
        <div className="details">
            <h3>{ params.name }</h3>
            <p><span className="option">Temperature</span>: <span className="value">{ cityWeather.temp }</span></p>
            <p><span className="option">Wind</span>: <span className="value">{ cityWeather.wind } m/s</span></p>
            <p><span className="option">Sky</span>: <span className="value">{ cityWeather.sky }</span></p>

            <div className="hourly-weather">
                {
                    hourlyWeather.map((item: string) => {
                        return <span className="hourly-weather-value" style={ { backgroundColor: Number.parseInt(item, 10) < 0 ? `rgba(0, 170, 255, ${ Number.parseInt(item, 10) / 100 * -3 } )` : `rgba(255, 145, 0, ${ Number.parseInt(item, 10) / 100 * 3 } )`, top: -Number.parseInt(item, 10) / 3 * 3, position: "relative" } }>{ item }</span>
                    })
                }
            </div>
        </div>
    </Container>)
}