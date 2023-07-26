function CustomersList({customers}) {
    return (
        <div className="container m-3">
            <h1>Customers</h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {/* loop over the shoes data stored in props.shoes */}
                    {customers.map(customer => {
                    return (
                        <tr key={customer.id}>
                        <td>{ customer.first_name }</td>
                        <td>{ customer.last_name }</td>
                        <td>{ customer.phone_number }</td>
                        <td>{ customer.address }</td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default CustomersList;