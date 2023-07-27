import React, { useEffect, useState } from 'react';


function SalespersonHistory () {
    const [salesperson, setSalesperson] = useState('');

    const [salespeople, setSalespeople] = useState([]);
    const [sales, setSales] = useState([]);

    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        console.log('VALUE: ', value);
        setSalesperson(value);
    }

    const fetchSalespeople = async() => {
        const response = await fetch('http://localhost:8090/api/salespeople/');

        if (response.ok) {
            const data = await response.json();
            // console.log('SALESPEOPLE: ', data);

            setSalespeople(data.salespeople);
        } else {
            console.error(response);
        }
    }

    const fetchSales = async() => {
        const response = await fetch('http://localhost:8090/api/sales/');

        if (response.ok) {
            const data = await response.json();
            // console.log('SALES: ', data);

            setSales(data.sales);
        } else {
            console.error(response);
        }
    }

    useEffect(() => {
        fetchSalespeople();
        fetchSales();
    }, []);

    // console.log('SALESPERSON: ' , salesperson); 
    console.log('SALES: ', sales);
    console.log('SALESPERSON: ', salesperson);

    const filteredSales = [];
    if (salesperson) {
        filteredSales = sales.filter(sale => sale.salesperson.id === salesperson);
    } else {
        filteredSales = sales
    }

    return (
        <div className="container m-3">
        <h1>Salesperson History</h1>
            <label htmlFor="vin">Automobile VIN</label>
                <div className="mb-3">
                    <select onChange={handleSalespersonChange} required type="salesperson" id="salesperson" className="form-select" value={salesperson} >
                        <option value="">Choose a salesperson</option>
                        {salespeople.map((salesperson) => {
                            return (
                                <option key={salesperson.id} value={salesperson.id}>
                                    { salesperson.first_name } { salesperson.last_name }
                                </option>
                            );
                        })}
                    </select>
                </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Salesperson</th>
                <th>Customer</th>
                <th>VIN</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
                { filteredSales.map(sale => (
                    <tr key={sale.id}>
                        <td>{ sale.salesperson.first_name } { sale.salesperson.last_name }</td>
                        <td>{ sale.customer.first_name } { sale.customer.last_name }</td>
                        <td>{ sale.automobile.vin }</td>
                        <td>${ sale.price }.00</td>
                    </tr>

                ))}
            </tbody>
          </table>
        </div>
    );
}

export default SalespersonHistory;
