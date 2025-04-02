import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// Dynamically replace the placeholder with the actual API key
const script = document.getElementById('google-maps-api');
if (script) {
  script.src = script.src.replace('__VITE_API_KEY__', import.meta.env.VITE_API_KEY);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
