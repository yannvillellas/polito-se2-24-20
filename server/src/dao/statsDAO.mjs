import {db} from '../database/db.mjs';


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

            // Mappiamo le righe in oggetti: ho ipotizzato che vuoi vedere solamente con granularità mensile e basea (perciò ho neglettato il giorno)
            const mappedRows = rows.map(row => ({
                year: row.year,
                month: row.month,
                serviceId: row.serviceId,
                totalTickets: row.totalTickets
            }));

            resolve(mappedRows);

        });

        
})}

export const getStats3Dmonth= () => {
    return new Promise((resolve, reject) => {

        // Costruiamo la query per filtrare nell'intervallo di date
        const query = `
            SELECT T.year, T.month, serviceId, counterN, COUNT(*) AS totalTickets
            FROM Done_ticket D, Time T 
            WHERE D.timeId = T.timeId 

            GROUP BY T.year, T.month, serviceId, counterN
            ORDER BY T.year, T.month, serviceId, counterN
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
                month: row.month,
                counterN: row.counterN,
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
                year: row.year,
                month: row.month,
                week: row.week,
                serviceId: row.serviceId,
                totalTickets: row.totalTickets
            }));

            resolve(mappedRows);

        });

        
})}

export const getStats3Dweek= () => {
    return new Promise((resolve, reject) => {


        // Costruiamo la query per filtrare nell'intervallo di date
        const query = `
            SELECT T.year, T.month, T.week, serviceId, counterN, COUNT(*) AS totalTickets
            FROM Done_ticket D, Time T 
            WHERE D.timeId = T.timeId 

            GROUP BY T.year, T.month, T.week, serviceId, counterN
            ORDER BY T.year, T.month, T.week, serviceId, counterN
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
                month: row.month,
                week: row.week,
                counterN: row.counterN,
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
                year: row.year,
                month: row.month,
                day: row.day,
                serviceId: row.serviceId,
                totalTickets: row.totalTickets
            }));

            resolve(mappedRows);

        });

        
})}

export const getStats3Dday = () => {
    return new Promise((resolve, reject) => {
        

        // Costruiamo la query per filtrare nell'intervallo di date
        const query = `
            SELECT T.year, T.month, T.week, T.day, serviceId, counterN, COUNT(*) AS totalTickets
            FROM Done_ticket D, Time T 
            WHERE D.timeId = T.timeId 

            GROUP BY T.year, T.month, T.week, T.day, serviceId, counterN
            ORDER BY T.year, T.month, T.week, T.day, serviceId, counterN
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
                month: row.month,
                day: row.day,
                counterN: row.counterN,
                serviceId: row.serviceId,
                totalTickets: row.totalTickets
            }));

            resolve(mappedRows);

        });

        
})}