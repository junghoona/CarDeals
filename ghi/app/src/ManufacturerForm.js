import React, { useState } from 'react'

function ManufacturerForm(props) {
    const [ name, setManufacturer] = useState("")
    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value)
    }
    async function handleSubmit (event) {
        event.preventDefault();
        const data = {};
        data.name = name

        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(manufacturerUrl, fetchConfig)
        if (response.ok) {
            await response.json();
            setManufacturer('')
        }}

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="border rounded p-4 mt-4">
            <h1>Create a manufacturer</h1>
            <form onSubmit={handleSubmit} id="create-manufacturer" className="create-manufacturer">
              <div className="mb-3">
                <input onChange={handleManufacturerChange} value ={name} placeholder="Manufacturer name..." required type="text" name="manufacturer" id="manufacturer" className="form-control" />
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>

    );
}
export default ManufacturerForm;
