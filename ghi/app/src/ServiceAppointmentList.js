import React, { useEffect, useState  } from 'react';

function ServiceAppointmentList () {
    const [appointments, setAppointments] = useState([]);
    const [technicians, setTechnicians] = useState([]);

    const fetchData = async () => {
        const response = await fetch("http://localhost:8080/api/appointments/");

        if(response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        }

    }

    const fetchTechnicians = async () => {
        const response = await fetch("http://localhost:8080/api/technicians/");
    
        if (response.ok) {
          const data = await response.json();
          setTechnicians(data.technicians);
        }
      }

    useEffect(() => {
        fetchData();
        fetchTechnicians();
    }, []);

    const cancel = async (appointment) => {

        const url = `http://localhost:8080/api/appointments/${appointment.vin}`
        const fetchConfig = {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ satus: 'canceled' }),
        };

        const response = await fetch(url, fetchConfig);
        const data = await response.json();
    }

    const finish = async (appointment) => {
        const url = `http://localhost:8080/api/appointments/${appointment.vin}`
        const fetchConfig = {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);
        const data = await response.json();
    }

    const TechnicianName = (technicianId) => {
        const technician = technicians.find(tech => tech.employee_id === technicianId);
        return technician ? `${technician.first_name} ${technician.last_name}` : "";
      };

    return (
        <div className="container m-3">
        <div>
            <h1>Service Appointments</h1>
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
                </tr>
            </thead>
            <tbody>
                {appointments.map(appointment => {
                    return (
                        <tr key={appointment.vin}>
                            <td>{appointment.vin}</td>
                            <td>{appointment.customer}</td>
                            <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                            <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                            <td>{TechnicianName(appointment.technician)}</td>
                            <td>{appointment.reason}</td>
                            <td><button type="button" className="btn btn-danger" onClick={()=>cancel(appointment)}>Cancel</button></td>
                            <td><button type="button" className="btn btn-success" onClick={()=>finish(appointment)}>Finish</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </div>
        </div>
    )
}

export default ServiceAppointmentList
