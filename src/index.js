import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const URL = 'http://localhost:3333/api';
global.URL = URL;

ReactDOM.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
,
  document.getElementById('root')
);

