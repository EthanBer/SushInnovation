import React from 'react';
import ReactDOM from 'react-dom';
import './global.css'; // Import the global CSS file
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();