export default function FoodList(props) {
    const employees = props.employees;
  
    if (employees.length > 0) {
        const listEmployees = employees.map((value, index) => {
            return (
            <tr key={value.id_user}>
                <td>{value.id_user}</td>
                <td>{value.username}</td>
                <td>{value.type}</td>
                <td>{value.id_store}</td>
            </tr>
            );
        });
  
        return (
            <Table striped bordered hover size="sm" className="text-center shadow-lg">
            <thead>
                <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Type</th>
                <th>Related store id</th>
                </tr>
            </thead>
            <tbody>{listEmployees}</tbody>
            </Table>
        );
    } else {
        return (
            <React.Fragment>
            <div>No employees in the database</div>
            <br />
            </React.Fragment>
        );
    }
}