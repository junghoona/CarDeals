function SalesList({sales}) {
    return (
      <div className="container m-3">
        <h1>Sales</h1>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Salesperson Employee ID</th>
                <th>Salesperson Name</th>
                <th>Customer</th>
                <th>VIN</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {/* loop over the shoes data stored in props.shoes */}
              {sales.map(sale => {
                return (
                  <tr key={sale.id}>
                    <td>{ sale.salesperson.employee_id }</td>
                    <td>{ sale.salesperson.first_name } { sale.salesperson.last_name}</td>
                    <td>{ sale.customer.first_name } { sale.customer.last_name }</td>
                    <td>{ sale.automobile.vin }</td>
                    <td>${ sale.price }.00</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    );
}

export default SalesList;