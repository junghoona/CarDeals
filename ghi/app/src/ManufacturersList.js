function ManufacturersList({manufacturers}) {
    return (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {/* loop over the shoes data stored in props.shoes */}
            {manufacturers.map(manufacturer => {
              return (
                <tr key={manufacturer.id}>
                  <td>{ manufacturer.name }</td>
                </tr>
              );
            })}
          </tbody>
        </table>
    );
}

export default ManufacturersList;
