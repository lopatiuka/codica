import reducer, { citiesSlice } from './citiesSlice';

test('savedCities should be incremented', () => {
    interface IWeatherInfo {
        temp: string,
        sky: string,
    }

    interface ISavedCityDetails {
        name: string,
        countryCode: string,
        weather: IWeatherInfo,
        lat: string,
        lon: string
    }
    const previousState = { cities: [] as ISavedCityDetails[], city: { } as IWeatherInfo, hourlyWeather: [] }

    const newState = reducer(previousState, citiesSlice.actions.addCity({ name: "Kharkov" }))
    expect(newState.cities.length).toBe(previousState.cities.length + 1);
})

test('weather should be updated', () => {
    interface IWeatherInfo {
        temp: string,
        sky: string,
    }
    
    interface ISavedCityDetails {
        name: string,
        countryCode: string,
        weather: IWeatherInfo,
        lat: string,
        lon: string
    }
    const previousState = { 
        cities: [{ name: "Kharkov", countryCode: "ua", weather: { temp: "10", sky: "Clear" } }] as ISavedCityDetails[], 
        city: { } as IWeatherInfo, 
        hourlyWeather: [] 
    }

    const newWeather = {
        name: "Kharkov",
        temp: "12",
        sky: "Cloudy"
    }

    let newState = reducer(previousState, citiesSlice.actions.updateWeather(newWeather))
    expect(newState.cities[0].weather.temp).toEqual(newWeather.temp);
    expect(newState.cities[0].weather.sky).toEqual(newWeather.sky);
})

test('weather details should be fetched', () => {
    interface IWeatherInfo {
        temp: string,
        sky: string,
        wind: string
    }
    
    interface ISavedCityDetails {
        name: string,
        countryCode: string,
        weather: IWeatherInfo,
        lat: string,
        lon: string
    }
    const previousState = { 
        cities: [{ name: "Kharkov", countryCode: "ua", weather: { temp: "10", sky: "Clear" } }] as ISavedCityDetails[], 
        city: { } as IWeatherInfo, 
        hourlyWeather: [] 
    }

    const weatherDetails = {
        temp: "12",
        sky: "Cloudy",
        wind: "7"
    }

    let newState = reducer(previousState, citiesSlice.actions.getDetails(weatherDetails))
    expect(newState.city.temp).toEqual(weatherDetails.temp);
    expect(newState.city.sky).toEqual(weatherDetails.sky);
})


test('cities should be fetched', () => {
    interface IWeatherInfo {
        temp: string,
        sky: string,
        wind: string
    }
    
    interface ISavedCityDetails {
        name: string,
        countryCode: string,
        weather: IWeatherInfo,
        lat: string,
        lon: string
    }
    const previousState = { 
        cities: [] as ISavedCityDetails[], 
        city: { } as IWeatherInfo, 
        hourlyWeather: [] 
    }

    const cities = [
        { 
            name: "Kharkov", 
            countryCode: "ua", 
            weather: { 
                temp: "10", 
                sky: "Clear" 
            } 
        }, 
        { 
            name: "Lviv", 
            countryCode: "ua", 
            weather: { 
                temp: "10", 
                sky: "Clear" 
            } 
        }, 
    ];

    let newState = reducer(previousState, citiesSlice.actions.getCities(cities))
    expect(newState.cities.length).toEqual(cities.length);
})