import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from '../features/city/citiesSlice'

export default configureStore({
    reducer: {
        cities: citiesReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['cities/deleteCity'],
      },
    }),
})