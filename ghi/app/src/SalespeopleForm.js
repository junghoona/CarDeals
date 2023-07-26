import { useState, useEffect } from 'react';

function SalespeopleForm ({ loadSalespeople }) {
    const [firstName, setFirstName] = useState([]); 
    const [lastName, setLastName] = useState([]);
    const [employeeId, setEmployeeId] = useState([]);
    const [salespeople, setSalespeople] = useState([]); 

    const fetchData = async() => {
        const response = await fetch('http://localhost:8090/api/salespeople/');
            if (response.ok) {
                const data = await response.json();
                setSalespeople(data.salespeople);
            }
    }

    useEffect(() => {fetchData();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        // create an empty data obj
        const data = {};

        // assign values to the key names that backend server is expecting
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;

        const url = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newSalesperson = await response.json();
            console.log(newSalesperson);

            setFirstName('');
            setLastName('');
            setEmployeeId('');
            setSalespeople('');
        }
    }

    // Create the handleNameChange method to take what the user inputs
    // into the form and store it in the state's "name" variable.
    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const handleEmployeeIdChange = (event) => {
        const value = event.target.value;
        setEmployeeId(value);
    }

    return (
    <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Add a Salesperson</h1>
                <form onSubmit={handleSubmit} id="create-salesperson-form">
                    <div className="form-floating mb-3">
                        <input value={firstName} onChange={handleFirstNameChange} placeholder="First name..." required type="text" name="first_name" id="first_name" className="form-control" />
                        <label htmlFor="first_name">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={lastName} onChange={handleLastNameChange} placeholder="Last Name..." required type="text" name="last_name" id="last_name" className="form-control" />
                        <label htmlFor="last_name">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={employeeId} onChange={handleEmployeeIdChange} placeholder="Employee ID..." required type="text" name="employee_id" id="employee_id" className="form-control" />
                        <label htmlFor="employee_id">Employee ID</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </div>
    );
}

export default SalespeopleForm;
