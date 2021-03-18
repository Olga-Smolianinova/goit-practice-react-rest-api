import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';
import './styles/base.scss';

import 'modern-normalize/modern-normalize.css'; //подключение стилей для normalize

import { BrowserRouter } from 'react-router-dom'; //оборачивает весь App в Browser Router - главный компонент, маршрутизатор, который под капотом реализовывает слежение за url-строкой (адресной строкой браузера) и при обнаружении изменений в ней, будет вносить изменения, указанніе разработчиком

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
