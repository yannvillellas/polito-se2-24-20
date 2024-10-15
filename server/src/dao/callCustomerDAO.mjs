import {db} from '../database/db.mjs';

export const getAllCustomers= () => {
    return new Promise((resolve, reject) => {

        // Costruiamo la query per filtrare nell'intervallo di date
        const query = `
            SELECT C.ticketNumber, C.courrierNumber
            FROM  CallingTicket C
        `;
        
        // Eseguiamo la query
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }else{
                const allTickets = rows.map(row => ({
                    ticketNumber: row.ticketNumber,
                    courrierNumber: row.courrierNumber
                }));
                resolve(allTickets);
            }
            
        });

        
})}


export const insertCallingTicket = (serviceName, ticketNumber, actualCounter) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO CallingTicket(ticketNumber, serviceName, courrierNumber)
            VALUES(?, ?, ?)
        `;
        console.log("sono in insertCallingTicket", ticketNumber, serviceName, actualCounter);

        db.run(query, [ticketNumber, serviceName, actualCounter], (err) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                resolve();
            }
        });
    });

}
