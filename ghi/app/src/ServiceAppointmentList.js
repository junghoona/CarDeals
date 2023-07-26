import React, { useEffect, useState  } from 'react';

function ServiceAppointmentList () {
    const [appointments, setAppointments] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [inventoryVin, setInventoryVin] = useState([]);
    const [vinSearch, setVinSearch] = useState("");
    const [vinResult, setVinResult] = useState([]);

    const fetchData = async () => {
        const response = await fetch("http://localhost:8080/api/appointments/");
        if(response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        }
    };

    const fetchTechnicians = async () => {
        const response = await fetch("http://localhost:8080/api/technicians/");
        if (response.ok) {
          const data = await response.json();
          setTechnicians(data.technicians);
        }
      };

    const fetchInventoryVin = async () => {
    const response = await fetch("http://localhost:8100/api/automobiles/");
    if (response.ok) {
        const data = await response.json();
        setInventoryVin(data.autos);
        }
    };

    useEffect(() => {
        fetchData();
        fetchTechnicians();
        fetchInventoryVin();
    }, []);

// Handles search input field
    const handleVinSearch = (event) => {
        setVinSearch(event.target.value);
    };

// Handles Search Button click event
    const handleSearchButton = () => {
        const search = appointments.filter(appointment => appointment.vin === vinSearch);
        setVinResult(search);
      };

// "PUT" request to the cancel url
    const cancel = async (appointment) => {
        const url = `http://localhost:8080/api/appointments/${appointment.id}/cancel`
        const fetchConfig = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ satus: 'canceled' }),
        };
        const response = await fetch(url, fetchConfig);
// Updates Status column field to 'canceled' when cancel button is clicked
        if (response.ok) {
            setAppointments((prevAppointments) =>
              prevAppointments.map((appt) =>
                appt.id === appointment.id ? { ...appt, status: 'canceled' } : appt
              )
            );
          }
        }
    
// "PUT" request to finish url
    const finish = async (appointment) => {
        const url = `http://localhost:8080/api/appointments/${appointment.id}/finish`
        const fetchConfig = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);
// Updates Status column field to 'finished' when finish button is clicked
        if (response.ok) {
            setAppointments((prevAppointments) =>
              prevAppointments.map((appt) =>
                appt.id === appointment.id ? { ...appt, status: 'finished' } : appt
              )
            );
          }
        }

// Find technician by id & returns full name
    const technicianName = (technicianId) => {
        const technician = technicians.find(tech => tech.employee_id === technicianId);
        return technician ? `${technician.first_name} ${technician.last_name}` : "";
      };

// Check if appointment VIN matches any inventory VINs
    const checkVinInInventory = (appointmentVin) => {
        return inventoryVin.some((auto) => auto.vin === appointmentVin);
    };

    return (
      <div className="container m-3">
        <h1>Service Appointments</h1>
        <div className="d-flex flex-column">
          <div className="row mb-3">
            <div className="col">
              <div className="input-group">
                <input type="text" placeholder="Search by VIN..." value={vinSearch} onChange={handleVinSearch} className="form-control" />
                <div className="input-group-append">
                  <button onClick={handleSearchButton} type="button" className="btn btn-outline-secondary">Search</button>
                </div>
              </div>
            </div>
          </div>
            <table className='table table-striped'>
            <thead>
              <tr>
                <th>VIN</th>
                <th>Is VIP?</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Technician</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
{/* Filtered appointments */}
              {vinResult.length > 0 ? (vinResult.map(appointment => (
                <tr key={appointment.vin}>
                    <td>{appointment.vin}</td>
                    <td>{checkVinInInventory(appointment.vin) ? "Yes" : "No"}</td>
                    <td>{appointment.customer}</td>
                    <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                    <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                    <td>{technicianName(appointment.technician)}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.status}</td>
                    <td>
                    <button type="button" className="btn btn-danger" onClick={() => cancel(appointment)}>Cancel</button>
                    </td>
                    <td>
                    <button type="button" className="btn btn-success" onClick={() => finish(appointment)}>Finish</button>
                    </td>
                </tr>
                ))
                ) : (
// If search input is empty, list all appointments
                appointments.map(appointment => (
                <tr key={appointment.vin}>
                    <td>{appointment.vin}</td>
                    <td>{checkVinInInventory(appointment.vin) ? "Yes" : "No"}</td>
                    <td>{appointment.customer}</td>
                    <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                    <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                    <td>{technicianName(appointment.technician)}</td>
                    <td>{appointment.reason}</td>
                    <td>{appointment.status}</td>
                    <td>
                    <button type="button" className="btn btn-danger" onClick={() => cancel(appointment)}>Cancel</button>
                    </td>
                    <td>
                    <button type="button" className="btn btn-success" onClick={() => finish(appointment)}>Finish</button>
                    </td>
                </tr>
                )))
              }
            </tbody>
            </table>
        </div>
      </div>
    )
}

export default ServiceAppointmentList
