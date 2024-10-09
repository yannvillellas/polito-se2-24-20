

function CustomerTable(props){
    /* table tha shows how many customer has been served for each service each month/week */
    return(
        
        <Table striped>
            <thead>
                {/*header*/}
            </thead>
            <tbody>
            {props.statistics.map((stat) => <CustomerRow /*props to send to CustomerRow*/ />) }
            </tbody>
        </Table>
    );
}


function CustomerRow(props){
    return(
        <tr>
            <td>{/*month or week*/}</td>
            <td>{/* a column for each service */}</td>
        </tr>
    );
}

export default CustomerTable;

