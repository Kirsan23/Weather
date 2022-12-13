import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './slices/citiesSlice';

export default configureStore({
  reducer: {
    cities: citiesReducer,
  },
});
