import store from './redux/store';
import { Provider } from 'react-redux';
import { WeatherForecasts } from './containers/WeatherForecasts';

export const App = () => {
  return (
    <Provider store={store}>
      <WeatherForecasts></WeatherForecasts>
    </Provider>
  );
};
