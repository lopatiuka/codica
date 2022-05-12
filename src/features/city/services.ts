import axios from 'axios';
import { citiesSlice } from './citiesSlice';

const apiKey = "04874036817e120aeabaf96bbc6bfef5";

export const getSavedCities = () => {
    return async (dispatch: any) => {

        const citiesStringify: string = localStorage.getItem("cities") || "";
        const citiesParsed = JSON.parse(citiesStringify);
        const requests = [];

        for (const key of citiesParsed) {
            requests.push(axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${ key.lat }&lon=${ key.lon }&appid=${ apiKey }`));
        }

        try {
            const result = await axios.all(requests);
            for (const key of result) {
                for (const i in citiesParsed) {
                    if (key.data.name === citiesParsed[i].name) {
                        citiesParsed[i].weather.temp = key.data.main.temp;
                        citiesParsed[i].weather.sky = key.data.weather[0].main;
                    }
                }
            }

            dispatch(citiesSlice.actions.getCities(citiesParsed));
        }
        catch (error: any) {
            alert ("Something went wrong, try again later");
            throw new Error(error);
        }
    }
}

export const getWeather = (cityName: string, country: string) => {
    return async (dispatch: any, getState: any) => {
        const state = getState();

        for (const key in state.cities.cities) {
            if (state.cities.cities[key].name === cityName) {
                alert("You already have this city");
                return
            }
        }

        try {
            const coordinates = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${ cityName },${ country }&appid=${ apiKey }`);
            const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${ coordinates.data[0].lat }&lon=${ coordinates.data[0].lon }&appid=${ apiKey }`);

            const cityInfo = {
                name: cityName,
                countryCode: country,
                weather: {
                    temp: result.data.main.temp,
                    sky: result.data.weather[0].main
                },
                lat: result.data.coord.lat,
                lon: result.data.coord.lon
            }

            dispatch(citiesSlice.actions.addCity(cityInfo));
        }
        catch (error: any) {
            alert ("Check data and try again");
            throw new Error(error);
        }
    }
}

export const getWeatherDetails = (cityName: string | undefined, lat: string, lon: string) => {
    return async (dispatch: any, getState: any) => {
        if (!lat || !lon) {
            getSavedCities();
            const state = getState();
            for (const key in state.cities.cities) {
                if (state.cities.cities[key].name === cityName) {
                    lat = state.cities.cities[key].lat
                    lon = state.cities.cities[key].lon
                }
            }
        }
        try {
            const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${ lat }&lon=${ lon }&appid=${ apiKey }`);
            const details = {
                temp: result.data.main.temp,
                wind: result.data.wind.speed,
                sky: result.data.weather[0].main,
            }
            dispatch(citiesSlice.actions.getDetails(details));
        }
        catch (error: any) {
            alert ("Something went wrong, try again later");
            throw new Error(error);
        }
    }
}

export const updateWeather = (e: any, lat: string, lon: string) => {
    return async (dispatch: any) => {
        e.stopPropagation();
        try {
            const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${ lat }&lon=${ lon }&appid=${ apiKey }`);
            const weather = {
                name: result.data.name,
                temp: result.data.main.temp,
                sky: result.data.weather[0].main
            }

            dispatch(citiesSlice.actions.updateWeather(weather));
        }
        catch (error: any) {
            alert ("Something wrong, try again later");
            throw new Error(error);
        }
    }
}

export const goTo = (e: any, name: string, navigate: any) => {
    return () => {
        navigate(`/details/${ name }`);
    }
}

export const getHourlyWeather = () => {
    return (dispatch: any) => {
        const temps = ["19", "21", "22", "-5", "-8", "-2", "-1", "0", "5", "12", "15", "19"];
        dispatch(citiesSlice.actions.getHourlyWeather(temps));
    }

}