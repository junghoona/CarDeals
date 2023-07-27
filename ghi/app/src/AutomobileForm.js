import React, {useEffect, useState } from 'react';

function AutomobileForm() {
  const [models, setModels] = useState([]);
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [vin, setVin] = useState('');
  const [year, setYear] = useState('');

  const fetchData = async () => {
    const url = 'http://localhost:8100/api/models/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    }
  }

  useEffect(() =>{
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.color = color;
    data.year = year;
    data.model_id = model;
    data.vin = vin;

  const automobileUrl = 'http://localhost:8100/api/automobiles/'
  const fetchConfig = {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const autoResponse = await fetch(automobileUrl, fetchConfig);
    if (autoResponse.ok) {
      setModel('');
      setYear('');
      setColor('');
      setVin('');
    }
  }

  const handleModelChange = (event) => {
    const value = event.target.value;
    setModel(value);
  }

  const handleColorChange = (event) => {
    const value = event.target.value;
    setColor(value);
  }

  const handleVinChange = (event) => {
    const value = event.target.value;
    setVin(value);
  }

  const handleYearChange = (event) => {
    const value = event.target.value;
    setYear(value);
  }

  return (
    <div className="row">
    <div className="offset-3 col-6">
      <div className="border rounded p-4 mt-4">
        <form onSubmit={handleSubmit} id="create-model-form">
          <h1 className="card-title">Add an automobile to inventory</h1>
            <div className="col">
              <div className="mb-3">
                <input onChange={handleColorChange} required placeholder="Color..." type="text" name="color" className="form-control" value={color}/>
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <input onChange={handleYearChange} required placeholder="Year..." type="text" name="year" className="form-control" value={year} />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <input onChange={handleVinChange} required placeholder="VIN..." type="text" name="vin" className="form-control" value={vin} />
              </div>
            </div>
            <div className="mb-3">
            <select onChange={handleModelChange} name="model" className="form-select" required value={model}>
              <option value="">Choose a model...</option>
              {models.map(model => {
                return (
                  <option key={model.id} value={model.id}>{model.name}</option>
                )
              })}
            </select>
            </div>
          <button className="btn btn-lg btn-primary">Create</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default AutomobileForm;
