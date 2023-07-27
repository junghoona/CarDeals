import React, { useEffect, useState } from 'react';

function ModelForm() {
    const [manufacturers, setManufacturers] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        picture_url: '',
        manufacturer_id: '',
    })

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setFormData({
                name: '',
                picture_url: '',
                manufacturer_id: '',
            });
        }
    }

    const handleFormChange = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
    }

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="border rounded p-4 mt-4">
            <h1>Create a vehicle model</h1>
            <form onSubmit={handleSubmit} id="create-vehicle-form">
              <div className="mb-3">
                <input value={formData.name} onChange={handleFormChange} placeholder="Model name..." required type="text" name="name" id="name" className="form-control"/>
              </div>
              <div className="mb-3">
                <input value={formData.picture_url} onChange={handleFormChange} placeholder="Picture URL..."  type="text" name="picture_url" id="picture_url" className="form-control"/>
              </div>
              <div className="mb-3">
              <select onChange={handleFormChange} required name="manufacturer_id" id="manufacturer_id" className="form-select">
                  <option value="">Choose a manufacturer </option>
                  {manufacturers.map(manufacturer => {
                  return (
                  <option key={manufacturer.id} value={manufacturer.id}> {manufacturer.name} </option>
                  );
                })}
                </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default ModelForm;
