import { db } from "../database/db.mjs";
import CounterServices from "../models/CounterServices.mjs";

export const getNumberOfServicesForCounter = (counterN)=>{ //quanti servizi fa un counter
    return new Promise((resolve, reject)=>{
        const query = `SELECT COUNT(*) as number FROM CounterAndServices WHERE counterN = ?`;
        db.get(query,[counterN],(err,row)=>{
            if(err){
                reject(err);
            }
            if (row && row.number !== null && row.number !== undefined) {
                resolve(row.number);
            } else {
                resolve(0); 
            }
        })
    });
}

export const getNumberOfCountersForService = (serviceId)=>{
    return new Promise((resolve, reject)=>{
        const query = `SELECT counterN FROM CounterAndServices WHERE serviceId = ?`;
        db.all(query,[serviceId],(err,rows)=>{
            if(err){
                reject(err);
            }
            if (rows && rows.length > 0) {
                const counterNumbers = rows.map(row => row.counterN);
                resolve(counterNumbers);
            } else {
                resolve([]); 
            }
        })
    });
}