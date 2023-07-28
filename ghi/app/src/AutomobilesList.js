import React, { useState, useEffect } from "react";

function AutomobilesList() {
  const [automobiles, setAutomobiles] = useState([]);
  const [vinsSold, setVinsSold] = useState([]);

  const fetchData = async () => {
    const response = await fetch("http://localhost:8100/api/automobiles");
    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.autos);
    }
  };

  const fetchSales = async () => {
    const response = await fetch('http://localhost:8090/api/sales/');

    if (response.ok) {
      const data = await response.json();
      setVinsSold(data.sales.map(sale => sale.automobile.vin));
    }
  };

  useEffect(() => {
      fetchData();
      fetchSales();
  }, []);

  // Check if automobile VIN matches any VINs in Sales list
  const checkVinSold = (automobileVin) => {
    return vinsSold.includes(automobileVin);
  };

  return (
    <div className="container m-3">
      <h1>Automobiles</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Color</th>
              <th>Year</th>
              <th>Model</th>
              <th>Manufacturer</th>
              <th>Sold</th>
            </tr>
          </thead>
          <tbody>
            {automobiles.map(automobile => {
              return (
                <tr key={automobile.id}>
                  <td>{ automobile.vin }</td>
                  <td>{ automobile.color }</td>
                  <td>{ automobile.year }</td>
                  <td>{ automobile.model.name }</td>
                  <td>{ automobile.model.manufacturer.name }</td>
                  <td>{ checkVinSold(automobile.vin) ? "Yes" : "No" }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
    );
}

export default AutomobilesList;
