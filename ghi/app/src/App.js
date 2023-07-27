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
  const [manufacturers, setManufacturers] = useState([]);

  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);
  const [automobileVO, setAutomobileVO] = useState([]);

  async function loadManufacturers() {
    const response = await fetch('http://localhost:8100/api/manufacturers/');
    console.log(response);

    if (response.ok) {
      // Gets manufacturers data
      const data = await response.json();
      // console.log('DATA: ', data);
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
      // console.log('DATA: ', data);
      // using salespeople data
      setSalespeople(data.salespeople);
    } else {
      console.error(response);
    }
  }

  async function loadCustomers() {
    const response = await fetch('http://localhost:8090/api/customers/');
    console.log(response);

    if (response.ok) {
      // Gets customers data
      const data = await response.json();
      // console.log('CUSTOMERS: ', data);
      // using customers data
      setCustomers(data.customers);
    } else {
      console.error(response);
    }
  }

  async function loadSales() {
    const response = await fetch('http://localhost:8090/api/sales/');
    console.log(response);

    if (response.ok) {
      // Gets sales data
      const data = await response.json();
      // console.log('SALES: ', data);
      // using sales data
      setSales(data.sales);
    } else {
      console.error(response);
    }
  }

  async function loadAutomobileVO() {
    const response = await fetch('http://localhost:8100/api/automobiles/');
    console.log(response);

    if (response.ok) {
      // Gets automobile VO data
      const data = await response.json();
      // console.log('AUTO VO: ', data);
      // using autovo data
      if (data.autos.sold === false) {
        setAutomobileVO(data.autos);
      }
    } else {
      console.error(response);
    }
  }
  
  useEffect(() => {
    loadManufacturers();
    loadSalespeople();
    loadCustomers();
    loadSales();
    loadAutomobileVO();
  },[]);

  if (manufacturers === undefined) {
    return null;
  }

  if (salespeople === undefined) {
    return null;
  }

  if (customers === undefined) {
    return null;
  }

  if (sales === undefined) {
    return null;
  }

  if (automobileVO === undefined) {
    return null;
  }

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
            <Route index element={<ManufacturersList manufacturers={manufacturers} />} />
          </Route>
          <Route path="salespeople/">
            <Route path="create" element={<SalespeopleForm />} />
            <Route index element={<SalespeopleList salespeople={salespeople} />} />
          </Route>
          <Route path="customers/">
            <Route path="create" element={<CustomersForm />} />
            <Route index element={<CustomersList customers={customers} />} />
          </Route>
          <Route path="sales/">
            <Route path="create" element={<SalesForm />} />
            <Route index element={<SalesList sales={sales} />} />
            <Route path="history" element={<SalesPersonHistory />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
