

function CounterTable(props) {
    /* table tha shows how many customer has been served for each service each month/week by each counter*/

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
                    {props.statType === 'daily' && <th>Days</th>}
                    {props.statType === 'weekly' && <th>Weeks</th>}
                    {props.statType === 'monthly' && <th>Months</th>}
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

}

export default CounterTable;

