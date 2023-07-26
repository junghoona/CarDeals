import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// async function to get manufacturers data
async function loadManufacturers() {
  const response = await fetch('http://localhost:8100/api/manufacturers/');
  console.log(response);
  if (response.ok) {
    // Gets manufacturer data
    const data = await response.json();
    console.log('DATA: ', data);
    // using manufacturer data
    root.render(
      <React.StrictMode>
        <App manufacturers={data.manufacturers} />
      </React.StrictMode>
    );
  } else {
    console.error(response);
  }
}

loadManufacturers();