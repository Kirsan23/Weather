import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { weather } from '../../redux/slices/citiesSlice';
import { SyncLoader } from 'react-spinners';
import axios from 'axios';
import './City.scss';

const weatherApi = 'https://api.open-meteo.com/v1/forecast';

export const City = (props) => {
  const { name, coords, date } = props;
  const [weatherData, setWeatherData] = useState('');
  // const [date, setDate] = useState('');
  // const test = useSelector((state) => state.cities.citiesList[0].time);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await axios.get(weatherApi, {
        params: {
          latitude: coords.latitude,
          longitude: coords.longitude,
          hourly: 'temperature_2m',
          daily: 'temperature_2m_max,temperature_2m_min',
          current_weather: true,
          timezone: 'Europe/London',
        },
      });
      setWeatherData(response);
      dispatch(weather({ name: name, weather: response.data.daily }));
      // setDate(response.data.daily.time[0]);
    };

    fetchWeatherData();
  }, []);

  return weatherData ? (
    <div className='city'>
      <h2>{name}</h2>
      <p>{weatherData.data.daily.temperature_2m_min[date]}&#176;С</p>
      <p>{weatherData.data.daily.temperature_2m_max[0]}&#176;С</p>
    </div>
  ) : (
    <SyncLoader color='#ffffff' />
  );
};
