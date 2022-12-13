import { useState, useEffect, useRef, Fragment, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, del, sort } from '../redux/slices/citiesSlice';
import { City } from '../components';
import './WeatherForecasts.scss';

export const WeatherForecasts = () => {
  const [click, setClick] = useState(false);
  const [selectedDate, setSelectedDate] = useState(0);
  const data = useSelector((state) => state.cities);
  const ref = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const outsideClickHandler = (event) => {
      if (ref.current.contains(event.target)) return;

      setClick(!click);
    };
    if (click) {
      document.addEventListener('click', outsideClickHandler, true);
    }

    console.log('test');
    return () => {
      document.removeEventListener('click', outsideClickHandler, true);
    };
  }, [click]);

  console.log(data.citiesList);

  return (
    <Fragment>
      <section className='main_title_wrapper'>
        <h1 className='main_title'>Weather Forecast</h1>
      </section>
      {data.citiesList[0].time && (
        <section className='date_wrapper'>
          {data.citiesList[0].time.map((date, index) => (
            <button
              key={date}
              className='select_btn'
              onClick={() => setSelectedDate(index)}
            >
              {date}
            </button>
          ))}
        </section>
      )}
      <section className='weather_forecast'>
        <div className='titles'>
          <div className='title_wrapper'>
            <h2>City</h2>
            <button
              className='filter_btn'
              onClick={() => dispatch(sort('name'))}
            >
              SORT
            </button>
          </div>
          <div className='title_wrapper'>
            <h2>MinTemp</h2>
            <button
              className='filter_btn'
              onClick={() => dispatch(sort('min_temp'))}
            >
              SORT
            </button>
          </div>
          <div className='title_wrapper'>
            <h2>MaxTemp</h2>
            <button
              className='filter_btn'
              onClick={() => dispatch(sort('max_temp'))}
            >
              SORT
            </button>
          </div>
        </div>
        {data.citiesList.map((city) => (
          <div key={city.name} className='city_wrapper'>
            <City name={city.name} coords={city.coords} date={selectedDate} />
            <button className='delete_btn' onClick={() => dispatch(del(city))}>
              -
            </button>
          </div>
        ))}
        <button className='add_list_btn' onClick={() => setClick(!click)}>
          ADD CITY
        </button>
        {data.additionalCitiesList.length > 0 ? (
          <div ref={ref} className={`add_list ${click ? 'show' : 'hide'}`}>
            {data.additionalCitiesList.map((city) => (
              <div key={city.name} className='city_wrapper'>
                <h2>{city.name}</h2>
                <button className='add_btn' onClick={() => dispatch(add(city))}>
                  +
                </button>
              </div>
            ))}
          </div>
        ) : (
          <h2 className={`add_list ${click ? 'show' : 'hide'}`}>
            The list is empty
          </h2>
        )}
      </section>
    </Fragment>
  );
};
