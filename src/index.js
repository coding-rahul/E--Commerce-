import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Adminapp from './Adminapp';

const root = ReactDOM.createRoot(document.getElementById('root'));

if (localStorage.getItem("vid") == null) {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
else {
  root.render(
    <React.StrictMode>
      <Adminapp />
    </React.StrictMode>
  )
}


//json-server --watch data.json --port 1234


// login.js , index.js , adminheader.js , sort reverse .
