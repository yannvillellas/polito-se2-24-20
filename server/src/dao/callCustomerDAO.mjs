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
        const checkQuery = `
            SELECT COUNT(*) AS count FROM CallingTicket WHERE ticketNumber = ?
        `;

        db.get(checkQuery, [ticketNumber], (err, row) => {
            if (err) {
                return reject(err);
            }

            if (row.count == 0) {
            
                const insertQuery = `
                    INSERT INTO CallingTicket(ticketNumber, serviceName, courrierNumber)
                    VALUES(?, ?, ?)
                `;

                db.run(insertQuery, [ticketNumber, serviceName, actualCounter], (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        });
    });
};


export const deleteFromCallingTicket = (ticketNumber) => {
    return new Promise((resolve, reject) => {
        const query = `
            DELETE FROM CallingTicket
            WHERE ticketNumber = ?
        `;

        db.run(query, [ticketNumber], (err) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                console.log(`Row with ticketNumber ${ticketNumber} deleted`);
                resolve();
            }
        });
    });
}