import React, { useEffect, useState } from "react";

function ServiceAppointmentForm() {
    const [technicians, setTechnicians] = useState([])
    const [technician, setTechnician] = useState("")
    const [vin, setVin] = useState("")
    const [customer, setCustomer] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [reason, setReason] = useState("")

    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
    }

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handleDateChange = (event) => {
        const value = event.target.value;
        setDate(value);
    }

    const handleTimeChange = (event) => {
        const value = event.target.value;
        setTime(value);
    }

    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {}
        data.vin = vin;
        data.status = "created";
        data.customer = customer;
        data.reason = reason;
        data.date_time = `${date} ${time}`;
        data.technician = technician;

        const url = "http://localhost:8080/api/appointments/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setVin("");
            setCustomer("");
            setDate("");
            setTime("");
            setReason("");
            setTechnician("");
        }
    }

    const fetchData = async() => {
        const response = await fetch('http://localhost:8080/api/technicians/');
            if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
            }
    }

    useEffect(() => {fetchData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="border rounded p-4 mt-4">
                    <h1 className="text-left">Create a service appointment</h1>
                    <form id="create-appointment-form" onSubmit={handleSubmit}>
                        
                        <label htmlFor="name">Automobile VIN</label>
                        <div className="mb-3">
                            <input onChange={handleVinChange} required type="vin" name ="vin" id="vin" className="form-control" value={vin} />
                        </div>
                    
                        <label htmlFor="customer">Customer</label>
                        <div className="mb-3">
                            <input onChange={handleCustomerChange} required type="customer" name="customer" id="customer" className="form-control" value={customer} />
                        </div>
                    
                        <label htmlFor="date">Date</label>
                        <div className="mb-3">
                            <input onChange={handleDateChange} required type="date" name="date" id="date" className="form-control" value={date} />
                        </div>
                        
                        <label htmlFor="time">Time</label>
                        <div className="mb-3">
                            <input onChange={handleTimeChange} required type="time" name="time" id="time" className="form-control" value={time} />
                        </div>
                    
                        <label htmlFor="technician">Technician</label>
                        <div className="mb-3">
                            <select onChange={handleTechnicianChange} required type="technician" id="technician" className="form-select" value={technician} >
                                <option value="">Technician</option>
                                {technicians.map((technician) => {
                                    return (
                                        <option key={technician.employee_id} value={technician.employee_id}>
                                            {technician.first_name + " " + technician.last_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <label htmlFor="reason">Reason</label>
                        <div className="mb-3">
                            <input onChange={handleReasonChange} required type="reason" name="reason" id="reason" className="form-control" value={reason} />
                        </div>

                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ServiceAppointmentForm