import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import FetchInterceptor from './utils/FetchInterceptor';


const URL = 'http://localhost:3333/api';
global.URL = URL;

FetchInterceptor();

ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
        <App />
  </Provider>  
  </BrowserRouter>
,
  document.getElementById('root')
);

