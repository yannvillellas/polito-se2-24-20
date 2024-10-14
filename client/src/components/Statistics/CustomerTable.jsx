import { useEffect, useState } from "react";


function CustomerTable(props) {
    /* table tha shows how many customer has been served for each service each day/week */


    // example data from queries
    const queryResults = [
        { time: '10/10/2024', service: 's1', count: 20 },
        { time: '10/10/2024', service: 's2', count: 30 },
        { time: '11/10/2024', service: 's2', count: 50 }
    ];

    // function to transform data from db
    const transformData = (data) => {
        const groupedData = {};
        const servicesSet = new Set();

        data.forEach(({ time, service, count }) => {
            servicesSet.add(service);

            if (!groupedData[time]) {
                groupedData[time] = { time };
            }
            groupedData[time][service] = count;
        });

        return {
            time: Object.values(groupedData),
            services: Array.from(servicesSet),
        };
    };

    // Component to visualize table
    const { time: transformedData, services } = transformData(props.stats);  //use query result to try with mock data

    return (
        <table border="1">
            <thead>
                <tr>
                    <th>{props.statType=='daily'? 'days': props.statType=='weekly'? 'weeks': 'months'}</th>
                    {services.map((service) => (
                        <th key={service}>{service}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {transformedData.map((row, index) => (
                    <tr key={index}>
                        <td>{row.time}</td> {/*****************************time or data**************************************/}
                        {services.map((service) => (
                            <td key={service}>{row[service] || 0}</td> /* If service doesn't have value, put 0 */
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );



    /*
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
    */

    /*
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
    */
}
/*
return(
    
    <Table striped>
        {<thead>
            <td>{props.statType=='daily'? 'days':'weeks'}</td>
            {serviceHeaders}
        </thead>
        <tbody>
            {finalTable}
        </tbody>}


    </Table>
);
}*/


function CustomerRow(props) {
    //data is the object stats that contains alla data retrivied from server
    let found = false;
    let finalRow = [];
    for (s of props.services) {
        for (time in data) {  //iterate over each day/week
            for (service in time) {   //iterate over service counter on each day/week
                if (service == s) {

                }
            }
        }
    }


    return (
        <tr>
            <td>{/*day or week*/ stat.day}</td>
            <td>{/* a column for each service */}</td>
        </tr>
    );
}

export default CustomerTable;

