import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import React, { useEffect, useState } from 'react';
import ManufacturersList from './ManufacturersList';
import SalespeopleList from './SalespeopleList';


function App(props) {
  const [manufacturers, setManufacturers] = useState([]);

  const [salespeople, setSalespeople] = useState([]);

  async function loadManufacturers() {
    const response = await fetch('http://localhost:8100/api/manufacturers/');
    console.log(response);

    if (response.ok) {
      // Gets manufacturers data
      const data = await response.json();
      console.log('DATA: ', data);
      // using manufacturers data
      setManufacturers(data.manufacturers);
    } else {
      console.error(response);
    }
  }



  async function loadSalespeople() {
    const response = await fetch('http://localhost:8090/api/salespeople/');
    console.log(response);
  
    if (response.ok) {
      // Gets salespeople data
      const data = await response.json();
      console.log('DATA: ', data);
      // using salespeople data
      setSalespeople(data.salespeople);
    } else {
      console.error(response);
    }
  }
  
  useEffect(() => {
    loadManufacturers();
    loadSalespeople();
  },[]);

  if (manufacturers === undefined) {
    return null;
  }

  if (salespeople === undefined) {
    return null;
  }

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturersList manufacturers={manufacturers} />} />
          </Route>
          <Route path="salespeople">
            <Route index element={<SalespeopleList salespeople={salespeople} />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
