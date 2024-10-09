

function CounterTable(props){
    /* table tha shows how many customer has been served for each service each month/week by each counter*/
    return(
        
        <Table striped>
            <thead>
                {/*header*/}
            </thead>
            <tbody>
            {props.statistics.map((stat) => <CounterRow /*props to send to CounterRow*/ />) }
            </tbody>
        </Table>
    );
}


function CounterRow(props){
    return(
        <tr>
            <td>{/*month or week*/}</td>
            <td>{/* a column for each service of each customer */}</td>
        </tr>
    );
}

export default CustomerTable;

