import { db } from "../database/db.mjs";

export const insertTicket = (number, esimatedTime, serviceId, timeId) =>{
    return new Promise((resolve, reject)=>{
        const insertTicketQuery = `INSERT INTO Ticket ("number", "estimatedTime", "serviceId", "timeId") VALUES (?, ?, ?, ?);`
        db.run(insertTicketQuery, [number, esimatedTime, serviceId, timeId], (err)=>{
            if(err){
                reject(err);
            }

            resolve(number);
        } )
    });
};