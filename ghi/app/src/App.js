import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianList from './TechnicianList';
import TechnicianForm from './TechnicianForm';
import ServiceAppointmentForm from './ServiceAppointmentForm';
import ServiceAppointmentList from './ServiceAppointmentList';
import React, { useEffect, useState } from 'react';
import ManufacturersList from './ManufacturersList';
import SalespeopleList from './SalespeopleList';
import SalespeopleForm from './SalespeopleForm';
import CustomersList from './CustomersList';
import CustomersForm from './CustomersForm';
import SalesList from './SalesList';
import SalesForm from './SalesForm';
import SalesPersonHistory from './SalespersonHistory'


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians/" element={<TechnicianList />} />
          <Route path="/technicians/create" element={<TechnicianForm />} />
          <Route path="/appointments/" element={<ServiceAppointmentList />} />
          <Route path="/appointments/create" element={<ServiceAppointmentForm />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturersList />} />
          </Route>
          <Route path="salespeople/">
            <Route path="create" element={<SalespeopleForm />} />
            <Route index element={<SalespeopleList />} />
          </Route>
          <Route path="customers/">
            <Route path="create" element={<CustomersForm />} />
            <Route index element={<CustomersList />} />
          </Route>
          <Route path="sales/">
            <Route path="create" element={<SalesForm />} />
            <Route index element={<SalesList />} />
            <Route path="history" element={<SalesPersonHistory />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
