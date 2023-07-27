import { useState, useEffect } from 'react';

function CustomersForm () {
    const [firstName, setFirstName] = useState([]); 
    const [lastName, setLastName] = useState([]);
    const [address, setAddress] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState([]);
    const [customers, setCustomers] = useState([]); 

    const fetchData = async() => {
        const response = await fetch('http://localhost:8090/api/customers/');
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();

        // create an empty data obj
        const data = {};

        // assign values to the key names that backend server is expecting
        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.phone_number = phoneNumber;

        const url = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer);

            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNumber('');
            setCustomers('');
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

    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
    }

    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    }


    return (
    <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Add a Customer</h1>
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
                        <input value={address} onChange={handleAddressChange} placeholder="Address..." required type="text" name="address" id="address" className="form-control" />
                        <label htmlFor="address">Address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="Phone Number..." required type="text" name="phone_number" id="phone_number" className="form-control" />
                        <label htmlFor="phone_number">Phone Number</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </div>
    );
}

export default CustomersForm;
