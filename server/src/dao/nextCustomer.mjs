import {db} from '../database/db.mjs';


export const getNextTicket= (counterNumber) => {
    return new Promise((resolve, reject) => {

        // Costruiamo la query per filtrare nell'intervallo di date
        const query = `
            SELECT S.serviceId, S.numberinQueue, S.serviceTime, T.number
            FROM  CounterAndServices C, Service S, Ticket T 
            WHERE C.counterN = ? AND C.serviceId = S.serviceId AND S.serviceId = T.serviceId 

            GROUP BY S.serviceId
            ORDER BY numberinQueue DESC, S.serviceTime ASC
            LIMIT 1 
        `;
        // ORDER BY numberinQueue DESC, S.serviceTime ASC : a partià di persone in coda ordina per tempo di servizio (più piccolo prima)
        // LIMIT 1 : prendi il primo ticket della coda
        
        // Eseguiamo la query
        db.all(query, [counterNumber], (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            console.log(rows);
            
            if (rows.length === 0) {
                resolve(null); // Non ci sono ticket da servire
            } else {
                const nextTicket = {
                    serviceId: rows[0].serviceId,
                    number: rows[0].number,
                };

                resolve(nextTicket);
            }
            
        });

        
})}

// funziona
export const getTicketInfo = (ticketNumber) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT * 
            FROM Ticket 
            WHERE number = ? 
        `;

        db.all(query, [ticketNumber], (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else {
                console.log(rows);
    
                const ticketInfo = {
                    timeId : rows[0].timeId,
                    serviceId: rows[0].serviceId,
                    number: rows[0].number
                };
                resolve(ticketInfo);
                
            }
        });
    });
}

export const insertInDone_Ticket = (ticketInfo, counter) => {
    return new Promise((resolve, reject) => {
        console.log("sono in insertInDone_Ticket, con", ticketInfo, counter);
        
        const sql = `
            UPDATE Done_Ticket 
            SET numberTicketServed = numberTicketServed + 1 
            WHERE timeId = ? AND serviceId = ? AND counterN = ?
        `; 
        db.run(sql, [ticketInfo.timeId, ticketInfo.serviceId, counter], function(err) {
            if(err)
              reject(err);
            else
              resolve(this.changes);
        });
          
        
    });
}

export const deleteTicket = (ticketNumber) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM Ticket WHERE number = ?';
        db.all(query, [ticketNumber], (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }

            if (rows.length === 0) {
                reject("Ticket not found");
            } else {
                resolve(this.changes);
            }
        });
    });
}