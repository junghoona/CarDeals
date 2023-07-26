import React, { useState, useEffect } from "react";

function ModelsList() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch("http://localhost:8100/api/models");
    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    }
  };

  return (
    <div className="container m-3">
      <h1>Models</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {models.map(model => {
              return (
                <tr key={model.id}>
                  <td>{ model.name }</td>
                  <td>{ model.manufacturer.name }</td>
                  <td><img src={model.picture_url} width="250px" height="125px"/></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
    );
}

export default ModelsList;
