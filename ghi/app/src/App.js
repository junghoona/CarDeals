import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianList from './TechnicianList';
import TechnicianForm from './TechnicianForm';
import ServiceAppointmentForm from './ServiceAppointmentForm';
import ServiceAppointmentList from './ServiceAppointmentList';
import React, { useEffect, useState } from 'react';
import ManufacturersList from './ManufacturersList';
import ManufacturerForm from './ManufacturerForm';
import SalespeopleList from './SalespeopleList';
import SalespeopleForm from './SalespeopleForm';
import ModelsList from './ModelsList';
import ModelForm from './ModelForm';
import AutomobilesList from './AutomobilesList';

function App(props) {
  const [manufacturers, setManufacturers] = useState([]);

  const [salespeople, setSalespeople] = useState([]);

  async function loadManufacturers() {
    const response = await fetch('http://localhost:8100/api/manufacturers/');

    if (response.ok) {
      // Gets manufacturers data
      const data = await response.json();
      // using manufacturers data
      setManufacturers(data.manufacturers);
    } else {
      console.error(response);
    }
  }



  async function loadSalespeople() {
    const response = await fetch('http://localhost:8090/api/salespeople/');
  
    if (response.ok) {
      // Gets salespeople data
      const data = await response.json();
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

          <Route path="/manufacturers" element={<ManufacturersList />} />
          <Route path="/manufacturers/create" element={<ManufacturerForm />} />

          <Route path="/models" element={<ModelsList />} />
          <Route path="/models/create" element={<ModelForm />} />

          <Route path="/automobiles" element={<AutomobilesList />} />

          <Route path="/technicians/" element={<TechnicianList />} />
          <Route path="/technicians/create" element={<TechnicianForm />} />

          <Route path="/appointments/" element={<ServiceAppointmentList />} />
          <Route path="/appointments/create" element={<ServiceAppointmentForm />} />

          <Route path="salespeople">
            <Route path="new" element={<SalespeopleForm />} />
            <Route index element={<SalespeopleList salespeople={salespeople} />} />
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
