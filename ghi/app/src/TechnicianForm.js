import React, { useState } from "react";

function TechnicianForm() {
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [employee_id, setEmployeeId] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
        first_name: first_name,
        last_name: last_name,
        employee_id: employee_id,
    };

    const technicianUrl = "http://localhost:8080/api/technicians/";
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json",
        },
    };
    const response = await fetch(technicianUrl, fetchConfig);
    if (response.ok) {
        setFirstName("");
        setLastName("");
        setEmployeeId("");
      };
    };

  const handleFirstNameChange = (event) => {
      const value = event.target.value;
      setFirstName(value);
    };

  const handleLastNameChange = (event) => {
      const value = event.target.value;
      setLastName(value);
    };

  const handleEmployeeIDChange = (event) => {
      const value = event.target.value;
      setEmployeeId(value);
    };
  
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="border rounded p-4 mt-4">
          <h1>Add a Technician</h1>
          <form onSubmit={handleSubmit} id="create-location-form">
            <div className="form-floating mb-3">
              <input value={first_name} onChange={handleFirstNameChange} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
              <label htmlFor="first_name">First Name...</label>
            </div>
            <div className="form-floating mb-3">
              <input value={last_name} onChange={handleLastNameChange} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
              <label htmlFor="last_name">Last Name...</label>
            </div>
            <div className="form-floating mb-3">
              <input value={employee_id} onChange={handleEmployeeIDChange} placeholder="number" required type="number" name="number" id="number" className="form-control" />
              <label htmlFor="employee_id">Employee ID...</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TechnicianForm;
