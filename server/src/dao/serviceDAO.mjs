import { db } from "../database/db.mjs";
import Service from "../models/Service.mjs";

export const getServices = ()=>{
    return new Promise((resolve, reject)=>{
        const getServicesQuery = `SELECT * FROM service`;
        db.all(getServicesQuery,[], (err, rows)=>{
            if(err){
                reject(err)
            }

            const services = rows.map(row => new Service(row.serviceId, row.name, row.serviceTime, row.numberInQueue));
            resolve(services);
        })
    })
}