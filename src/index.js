import { render } from 'react-dom';
import App from './components/App';
import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import configureStore from './store/configureStore';
import { initWebSocket } from './middleware/sensorSocketMW';
import { initFittingWebSocket } from './middleware/fittingSocketMW';

// create and configure store
const store = configureStore();
initWebSocket(store);
initFittingWebSocket(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('App')
);
