import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import React from 'react';
import ManufacturersList from './ManufacturersList';


function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturersList manufacturers={props.manufacturers} />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
