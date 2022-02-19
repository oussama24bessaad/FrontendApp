import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider } from 'react-redux'
import store from './store';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000'
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

