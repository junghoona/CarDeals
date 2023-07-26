import React, { useState, useEffect } from "react";

function ManufacturersList() {
  const [manufacturers, setManufacturers] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch("http://localhost:8100/api/manufacturers");
    if (response.ok) {
      const data = await response.json();
      setManufacturers(data.manufacturers);
    }
  };

  return (
    <div className="container m-3">
      <h1>Manufacturers</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {manufacturers.map(manufacturer => {
              return (
                <tr key={manufacturer.id}>
                  <td>{ manufacturer.name }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
    );
}

export default ManufacturersList;
