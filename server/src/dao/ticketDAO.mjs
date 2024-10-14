import { db } from "../database/db.mjs";
import dayjs from "dayjs";


export const insertTicket = (number, esimatedTime, serviceId, timeId) =>{
    return new Promise((resolve, reject)=>{
        const newNumber = number + 1
        const insertTicketQuery = `INSERT INTO Ticket ("number", "estimatedTime", "serviceId", "timeId") VALUES (?, ?, ?, ?);`
        db.run(insertTicketQuery, [newNumber, esimatedTime, serviceId, timeId], (err)=>{
            if(err){
                reject(err);
            }

            resolve(number);
        } )
    });
};

export const getLastNumber = () => {
    return new Promise((resolve, reject) => {
        const day = dayjs().date(); 
        const month = dayjs().month() + 1;
        const year = dayjs().year();
        
        const getLastNumberQuery = `SELECT  MAX(number) AS number
                                    FROM ticket, time
                                    WHERE ticket.timeId = time.timeId AND 
                                    day = ? AND month = ? AND year = ?
                                    LIMIT 1;`;
        
        db.get(getLastNumberQuery, [day, month, year], (err, row) => {
            if (err) {
                console.error(err.message)
                reject(err);
            }

            
            if (row && row.number !== null && row.number !== undefined) {
                resolve(row.number);
            } else {
                resolve(0); 
            }
        });
    });
};
