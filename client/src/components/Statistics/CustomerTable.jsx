import { useEffect, useState } from "react";
import ServerAPI from "../../API/serviceAPI.mjs";

/*esempio struttura dati ricevuta dal backend
const stats = {
    "10/10/2024": {
        "servizio1": 100
        "servizio2":20
    },
    "11/10/2024": {
        "servizio2": 250
    }
};

// Accesso al valore
console.log(dict["10/10/2024"]["servizio1"]);  // 100
console.log(dict["11/10/2024"]["servizio2"]);  // 250


*/


function CustomerTable(props){
    /* table tha shows how many customer has been served for each service each day/week */
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
        for(s of services){ //iterate over service avaible with the order of the table header
            for (service in time){  //iterate over service counted for each day/week
                if(s==service){
                    tableRow.push(<td>{stats.time.service}</td>)
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


function CustomerRow(props){
    //data is the object stats that contains alla data retrivied from server
    let found=false;
    let finalRow=[];
    for(s of props.services){
        for(time in data){  //iterate over each day/week
            for(service in time){   //iterate over service counter on each day/week
                if(service==s){

                }
            }
        }
    }


    return(
        <tr>
            <td>{/*day or week*/ stat.day}</td>
            <td>{/* a column for each service */}</td>
        </tr>
    );
}

export default CustomerTable;

