import { createSlice } from '@reduxjs/toolkit';

const cities = [
  {
    name: 'Kyiv',
    coords: {
      latitude: '50.45',
      longitude: '30.52',
    },
  },
  {
    name: 'Berlin',
    coords: {
      latitude: '52.52',
      longitude: '13.41',
    },
  },
  {
    name: 'Paris',
    coords: {
      latitude: '48.85',
      longitude: '2.35',
    },
  },
  {
    name: 'London',
    coords: {
      latitude: '51.51',
      longitude: '-0.13',
    },
  },
];
const citiesFull = [
  {
    name: 'Kyiv',
    coords: {
      latitude: '50.45',
      longitude: '30.52',
    },
  },
  {
    name: 'Berlin',
    coords: {
      latitude: '52.52',
      longitude: '13.41',
    },
  },
  {
    name: 'Paris',
    coords: {
      latitude: '48.85',
      longitude: '2.35',
    },
  },
  {
    name: 'New York',
    coords: {
      latitude: '40.71',
      longitude: '-74.01',
    },
  },
  {
    name: 'Mexico City',
    coords: {
      latitude: '19.43',
      longitude: '-99.13',
    },
  },
  {
    name: 'Rome',
    coords: {
      latitude: '41.89',
      longitude: '12.51',
    },
  },
];

const additionalCities = citiesFull.filter((primaryItem) => {
  return !cities.find((secondaryItem) => {
    return secondaryItem.name === primaryItem.name;
  });
});

const initialState = {
  citiesList: cities,
  additionalCitiesList: additionalCities,
};

const deleteCity = (list, city) =>
  list.filter((item) => item.name !== city.name);
const addCity = (list, city) => list.concat(city);
const sortList = (list, value) => {
  if (value === 'name') {
    return list.sort((a, b) => {
      const A = a.name.toUpperCase();
      const B = b.name.toUpperCase();

      if (A < B) return -1;
      if (A > B) return 1;
      return 0;
    });
  }

  if (value === 'min_temp') {
    return list.sort(
      (a, b) =>
        Math.round(a.minTemp[0] * 10) / 10 - Math.round(b.minTemp[0] * 10) / 10
    );
  }

  return list.sort(
    (a, b) =>
      Math.round(Math.round((b.maxTemp[0] * 10) / 10) - (a.maxTemp[0] * 10) / 10)
  );
};

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    add: (state, action) => {
      state.citiesList = addCity(state.citiesList, action.payload);
      state.additionalCitiesList = deleteCity(
        state.additionalCitiesList,
        action.payload
      );
    },
    del: (state, action) => {
      state.citiesList = deleteCity(state.citiesList, action.payload);
      state.additionalCitiesList = addCity(
        state.additionalCitiesList,
        action.payload
      );
    },
    sort: (state, action) => {
      state.citiesList = sortList(state.citiesList, action.payload);
    },
    weather: (state, action) => {
      state.citiesList = state.citiesList.map((item) => {
        if (item.name === action.payload.name) {
          return {
            ...item,
            maxTemp: action.payload.weather.temperature_2m_max,
            minTemp: action.payload.weather.temperature_2m_min,
            time: action.payload.weather.time,
          };
        } else return item;
      });
    },
    date: (state, action) => {
      
    }
  },
});

export const { add, del, sort, weather } = citiesSlice.actions;
export default citiesSlice.reducer;
