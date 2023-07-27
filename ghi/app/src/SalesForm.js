import { useState, useEffect } from 'react';

function SalesForm () {
    const [salesperson, setSalesperson] = useState('');
    const [customer, setCustomer] = useState('');
    const [vin, setVIN]= useState('');
    const [price, setPrice] = useState('');

    const [sales, setSales] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [automobileVO, setAutomobileVO] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // create an empty data obj for salesperson fetch
        const data = {}

        // assign values to the key names that backend server is expecting
        data.automobile = vin;
        data.customer = customer;
        data.salesperson = salesperson;
        data.price = price;

        const url = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const newSale = await response.json();

            setSalesperson('');
            setCustomer('');
            setVIN('');
            setPrice('');
            setSales('');
        }
    }

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handleVINChange = (event) => {
        const value = event.target.value;
        setVIN(value);
    }

    const handlePriceChange = (event) => {
        const value = event.target.value;
        setPrice(value);
    }

    const fetchAutomobileVO = async() => {
        const response = await fetch('http://localhost:8100/api/automobiles/');

        if (response.ok) {
            const data = await response.json();
            setAutomobileVO(data.autos.filter(auto => !auto.sold))
        } else {
            console.error(response);
        }
    }

    const fetchSalespeople = async() => {
        const response = await fetch('http://localhost:8090/api/salespeople/');

        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        } else {
            console.error(response);
        }
    }

    const fetchCustomers = async() => {
        const response = await fetch('http://localhost:8090/api/customers/');

        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        } else {
            console.error(response);
        }
    }

    useEffect(() => {
        fetchAutomobileVO();
        fetchSalespeople();
        fetchCustomers();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1 className="text-left">Record a new sale</h1>
                    <form id="create-appointment-form" onSubmit={handleSubmit}>
                        <label htmlFor="vin">Automobile VIN</label>
                        <div className="mb-3">
                            <select onChange={handleVINChange} required type="automobile" id="automobile" className="form-select" value={vin} >
                                <option value="">Choose an automobile VIN...</option>
                                {automobileVO.map((auto) => {
                                    return (
                                        <option key={auto.id} value={auto.id}>
                                            {auto.vin}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <label htmlFor="salesperson">Salesperson</label>
                        <div className="mb-3">
                            <select onChange={handleSalespersonChange} required type="salesperson" id="salesperson" className="form-select" value={salesperson} >
                                <option value="">Choose a salesperson...</option>
                                {salespeople.map((salesperson) => {
                                    return (
                                        <option key={salesperson.id} value={salesperson.id}>
                                            {salesperson.first_name} {salesperson.last_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <label htmlFor="customer">Customer</label>
                        <div className="mb-3">
                            <select onChange={handleCustomerChange} required type="customer" id="customer" className="form-select" value={customer} >
                                <option value="">Choose a customer...</option>
                                {customers.map((customer) => {
                                    return (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.first_name} {customer.last_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <label htmlFor="price">Price</label>
                        <div className="mb-3">
                            <input onChange={handlePriceChange} required type="price" name="price" id="price" className="form-control" value={price} />
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SalesForm;