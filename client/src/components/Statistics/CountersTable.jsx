


/*esempio struttura dati ricevuta dal backend
const stats = {
    "10/10/2024": {
        "counter1": {
            "servizio1": 100
            "servizio2":20
        }
        "counter2":{
            "servizio1":4
            "servizio3":90
        }
    },
    "11/10/2024": {
        "counter1": {
            "servizio2": 250
        }
    }
};

// Accesso al valore
console.log(dict["10/10/2024"]["counter1"]["servizio1"]);  // 100
console.log(dict["11/10/2024"]["counter1"]["servizio2"]);  // 250


*/

function CounterTable(props){
    /* table tha shows how many customer has been served for each service each month/week by each counter*/
    let[services, setServices]=useState([])

    useEffect(()=>{
        const getServices= async ()=>{
            let state=[];
            let services= await ServerAPI.getServices();
            let serviceHeaders=[];
            for (let i=0;i<services.length;i++){
                serviceHeaders.push(<td key={"service-"+i}>{services[i].name}</td>);
                state.append(services[i].name)
            }
            setServices(state)
        }
        getServices();
    },[]);

    let found=false;
    let finalTable=[];
    let tableRow=[];
    //stats is the object stats that contains alla data retrivied from server
    for(time in stats){  //iterate over days/week
        tableRow.push(<td>{time}</td>);
        for(counter in time){   //iterate over counters for each day/week
            for(s of services){ //iterate over service avaible with the order of the table header
                for (service in counter){  //iterate over service counted for each counter for each day/week and
                    if(s==service){
                        tableRow.push(<td>{stats.time.counter.service}</td>)
                        found=true;
                    }
                }
                if (!found){
                    tableRow.push(<td>0</td>)
                }
                found=false;
            }
            finalTable.push(<tr>{tableRow}</tr>)
            tableRow=[];
        }
    }
    
    return(
        
        <Table striped>
            <thead>
                <td>{props.statType=='daily'? 'days':'weeks'}</td>
                {serviceHeaders}
            </thead>
            <tbody>
                {finalTable}
                {/*props.stats.map((stat) => <CustomerRow services={services} />) */}
            </tbody>
        </Table>
    );
}

export default CounterTable;

