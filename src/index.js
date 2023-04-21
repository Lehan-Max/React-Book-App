import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import logger from './services/logService'; 
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';

logger.init();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
