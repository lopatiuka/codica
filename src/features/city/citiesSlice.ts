import { createSlice } from '@reduxjs/toolkit'

export interface IWeatherInfo {
  temp: string,
  sky: string,
}

export interface ISavedCityDetails {
  name: string,
  countryCode: string,
  weather: IWeatherInfo,
  lat: string,
  lon: string
}

const storedItem = "cities";

export const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    cities: [] as ISavedCityDetails[],
    city: { } as IWeatherInfo,
    hourlyWeather: []
  },
  reducers: {

    getCities: (state, action) => {
      state.cities = action.payload;
    },

    addCity: (state, action) => {
      const city = {
        ...action.payload
      }

      state.cities.push(city);
      localStorage.setItem(storedItem, JSON.stringify(state.cities));
    },

    deleteCity: (state, action) => {
      action.payload.event.stopPropagation();

      let position: number = 0;

      for (let i = 0; i < state.cities.length; i++) {
        if (state.cities[i].name === action.payload.name) {

          position = i;
          break;
        }
      }

      state.cities.splice(position, 1);
      localStorage.setItem(storedItem, JSON.stringify(state.cities));
    },

    getDetails: (state, action) => {
      state.city = {
        ...action.payload
      }
    },

    updateWeather: (state, action) => {
      for (const key in state.cities) {
        if (state.cities[key].name === action.payload.name) {
          state.cities[key].weather.temp = action.payload.temp;
          state.cities[key].weather.sky = action.payload.sky;
          alert("Success");
          break;
        }
      }
    },

    getHourlyWeather: (state, action) => {
      state.hourlyWeather = action.payload;
    }
  }
})
export const initialState = (state: any) => state;
export const selectCities = (state: any) => state.cities.cities;
export const selectCity = (state: any) => state.cities.city;
export const selectHourlyWeather = (state: any) => state.cities.hourlyWeather;
export default citiesSlice.reducer