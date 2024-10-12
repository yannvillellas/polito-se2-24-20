import {db} from '../database/db.mjs';




export const getStats2Dyear= () => {
    return new Promise((resolve, reject) => {

        console.log("sono in getStats2Dyear");
        
        // Costruiamo la query per filtrare nell'intervallo di date
        const query = `
            SELECT T.year, serviceId, COUNT(*) AS totalTickets
            FROM Done_ticket D, Time T 
            WHERE D.timeId = T.timeId 

            GROUP BY T.year, serviceId
            ORDER BY T.year, serviceId
        `;
        
        
        // Eseguiamo la query
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            

            // Mappiamo le righe in oggetti
            const mappedRows = rows.map(row => ({
                year: row.year,
                serviceId: row.serviceId,
                totalTickets: row.totalTickets
            }));

            resolve(mappedRows);


        });

        
})}

export const getStats2Dmonth= () => {
    return new Promise((resolve, reject) => {



        // Costruiamo la query per filtrare nell'intervallo di date
        const query = `
            SELECT T.year, T.month, serviceId, COUNT(*) AS totalTickets
            FROM Done_ticket D, Time T 
            WHERE D.timeId = T.timeId 

            GROUP BY T.year, T.month, serviceId
            ORDER BY T.year, T.month, serviceId
        `;
        
        
        // Eseguiamo la query
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }

            // Mappiamo le righe in oggetti
            const mappedRows = rows.map(row => ({
                month: row.month,
                year: row.year,
                serviceId: row.serviceId,
                totalTickets: row.totalTickets
            }));

            resolve(mappedRows);

        });

        
})}

export const getStats2Dweek= () => {
    return new Promise((resolve, reject) => {


        // Costruiamo la query per filtrare nell'intervallo di date
        const query = `
            SELECT T.year, T.month, T.week, serviceId, COUNT(*) AS totalTickets
            FROM Done_ticket D, Time T 
            WHERE D.timeId = T.timeId 

            GROUP BY T.year, T.month, T.week, serviceId
            ORDER BY T.year, T.month, T.week, serviceId
        `;
        
        
        // Eseguiamo la query
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }

            // Mappiamo le righe in oggetti
            const mappedRows = rows.map(row => ({
                week: row.week,
                month: row.month,
                year: row.year,
                serviceId: row.serviceId,
                totalTickets: row.totalTickets
            }));

            resolve(mappedRows);

        });

        
})}

// startDate = DD/MM/YYYY, Granularià del giorno:
export const getStats2Dday = () => {
    return new Promise((resolve, reject) => {
        

        // Costruiamo la query per filtrare nell'intervallo di date
        const query = `
            SELECT T.year, T.month, T.week, T.day, serviceId, COUNT(*) AS totalTickets
            FROM Done_ticket D, Time T 
            WHERE D.timeId = T.timeId 

            GROUP BY T.year, T.month, T.week, T.day, serviceId
            ORDER BY T.year, T.month, T.week, T.day, serviceId
        `;
        
        
        // Eseguiamo la query
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }

            // Mappiamo le righe in oggetti
            const mappedRows = rows.map(row => ({
                day: row.day,
                month: row.month,
                year: row.year,
                serviceId: row.serviceId,
                totalTickets: row.totalTickets
            }));

            resolve(mappedRows);

        });

        
})}