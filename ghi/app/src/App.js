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
import ModelsList from './ModelsList';
import ModelForm from './ModelForm';
import AutomobilesList from './AutomobilesList';
import AutomobileForm from './AutomobileForm';
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
          <Route path="manufacturers/">
            <Route path="create" element={<ManufacturerForm />} />
            <Route index element={<ManufacturersList />} />
          </Route>
          <Route path="models/">
            <Route path="create" element={<ModelForm />} />
            <Route index element={<ModelsList />} />
          </Route>
          <Route path="automobiles/">
            <Route path="create" element={<AutomobileForm />} />
            <Route index element={<AutomobilesList />} />
          </Route>
          <Route path="technicians/">
            <Route path="create" element={<TechnicianForm />} />
            <Route index element={<TechnicianList />} />
          </Route>
          <Route path="appointments/">
            <Route path="create" element={<ServiceAppointmentForm />} />
            <Route index element={<ServiceAppointmentList />} />
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
