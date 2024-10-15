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


export const getServiceById = (serviceId)=>{
    return new Promise((resolve, reject)=>{
        const getServiceByIdQuery = `SELECT name FROM service S WHERE serviceId = ?`;
        db.all(getServiceByIdQuery,[serviceId], (err, rows)=>{
            if(err){
                reject(err)
            }

            // Verifica che ci siano righe nei risultati
            if (rows.length > 0) {
                // Risolvi direttamente la stringa del nome del servizio
                const serviceName = rows[0].name; 
                resolve(serviceName);
            } else {
                resolve(null); // Se non c'è nessun servizio con quell'ID
            }
        })
    })
}


export const updateServiceNumberInQueue = (serviceId) => {
    console.log("sono in serviceDAO, updateServiceNumberInQueue, sto mandando", serviceId);
    return new Promise((resolve, reject) => {
        const updateServiceNumberInQueueQuery = `UPDATE Service SET numberInQueue = numberInQueue + 1 WHERE serviceId = ?`;
        
        db.run(updateServiceNumberInQueueQuery, [serviceId], function(err) {
            if (err) {
                console.log("Errore nell'aggiornamento del numero di clienti in coda per quel servizio", err);
                reject(err);
            } else {
                resolve(this.changes); // Restituisce il numero di righe modificate
            }
        });
    });
}
