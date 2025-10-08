import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './css/all.css';
import App from './App';
import CursorCircle from './components/CursorCircle';
// import  './js/bootstrap_bundle_min.js';
// import 'bootstrap/dist/js/bootstrap_bundle_min.js';
// import 'bootstrap/dist/css/bootstrap.css';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CursorCircle />
    <App />
  </React.StrictMode>
);



