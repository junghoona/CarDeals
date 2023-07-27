import React, { useState } from 'react'

function ManufacturerForm() {
  const [ name, setManufacturer] = useState('');

  const handleSubmit = async (event) => {
      event.preventDefault();

      const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
      const fetchConfig = {
          method: 'post',
          body: JSON.stringify({ name }),
          headers: {
              'Content-Type': 'application/json',
          },
      };
      
      const response = await fetch(manufacturerUrl, fetchConfig);
      if (response.ok) {
        setManufacturer('')
      }
    }

  const handleManufacturerChange = (event) => {
    const value = event.target.value;
    setManufacturer(value);
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="border rounded p-4 mt-4">
          <h1>Create a manufacturer</h1>
          <form onSubmit={handleSubmit} id="create-manufacturer" className="create-manufacturer">
            <div className="mb-3">
              <input onChange={handleManufacturerChange} value={name} placeholder="Manufacturer name..." required type="text" name="manufacturer" id="manufacturer" className="form-control" />
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManufacturerForm;
