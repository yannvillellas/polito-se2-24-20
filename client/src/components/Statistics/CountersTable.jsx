

function CounterTable(props) {
    /* table tha shows how many customer has been served for each service each month/week by each counter*/

    // Dati iniziali della query
    const queryResults = [
        { time: '10/10/2024', counter: 'c1', service: 's1', count: 20 },
        { time: '10/10/2024', counter: 'c1', service: 's2', count: 30 },
        { time: '10/10/2024', counter: 'c2', service: 's2', count: 210 },
        { time: '11/10/2024', counter: 'c1', service: 's3', count: 50 }
    ];

    // Funzione per trasformare i dati
    const transformData = (data) => {
        const groupedData = {};
        const servicesSet = new Set();

        data.forEach(({ time, counter, service, count }) => {
            servicesSet.add(service);

            if (!groupedData[time]) {
                groupedData[time] = {};
            }

            if (!groupedData[time][counter]) {
                groupedData[time][counter] = { time, counter };
            }

            groupedData[time][counter][service] = count;
        });

        return {
            time: Object.values(groupedData).flatMap(dateGroup =>
                Object.values(dateGroup)
            ),
            services: Array.from(servicesSet),
        };
    };

    // Component per visualizzare la tabella
    const { time: transformedData, services } = transformData(props.stats); //use query result to try with mock data

    return (
        <table border="1">
            <thead>
                <tr>
                    <th>{props.statType=='daily'? 'days': props.statType=='weekly'? 'weeks': 'months'}</th>
                    <th>Counter</th>
                    {services.map((service) => (
                        <th key={service}>{service}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {transformedData.map((row, index) => (
                    <tr key={index}>
                        <td>{row.time}</td>
                        <td>{row.counter}</td>
                        {services.map((service) => (
                            <td key={service}>{row[service] || 0}</td>  /* Se il service non ha un valore, metti 0 */
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );


    /*let[services, setServices]=useState([])
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
            </tbody>
        </Table>
    );*/
}

export default CounterTable;

