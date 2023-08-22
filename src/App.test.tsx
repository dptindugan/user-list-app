import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from 'pages/index'; 
import store from './store';

it('renders the app without crashing', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
