import { useEffect, useState } from "react";


function CustomerTable(props) {
    /* table tha shows how many customer has been served for each service each day/week */

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
                    {props.statType === 'daily' && <th>Days</th>}
                    {props.statType === 'weekly' && <th>Weeks</th>}
                    {props.statType === 'monthly' && <th>Months</th>}
                    {services.map((service) => (
                        <th key={service}>{service}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {transformedData.map((row, index) => (
                    <tr key={index}>
                        <td>{row.time}</td>
                        {services.map((service) => (
                            <td key={service}>{row[service] || 0}</td> /* If service doesn't have value, put 0 */
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );



    
}

export default CustomerTable;

