import React, { useState, useEffect } from "react";

function TechnicianList() {
  const [technicians, setTechnician] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch("http://localhost:8080/api/technicians/");
    if (response.ok) {
      const data = await response.json();
      setTechnician(data.technicians);
    }
  };


  return (
    <div className="container m-3">
      <h1>Technicians</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map((technician) => (
              <tr key={technician.employee_id}>
                <td>{technician.employee_id}</td>
                <td>{technician.first_name}</td>
                <td>{technician.last_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}

export default TechnicianList;
