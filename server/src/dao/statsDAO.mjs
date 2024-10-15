import {db} from '../database/db.mjs';


export const getStats2Dmonth= () => {
    return new Promise((resolve, reject) => {

        // Costruiamo la query per filtrare nell'intervallo di date
        const query = `
            SELECT T.year, T.month, S.name, COUNT(*) AS totalTickets
            FROM Done_ticket D, Time T , Service S
            WHERE D.timeId = T.timeId and S.serviceId=D.serviceId

            GROUP BY T.year, T.month, D.serviceId
            ORDER BY T.year, T.month, D.serviceId
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
                serviceName: row.name,
                totalTickets: row.totalTickets
            }));

            resolve(mappedRows);

        });

        
})}

export const getStats3Dmonth= () => {
    return new Promise((resolve, reject) => {

        // Costruiamo la query per filtrare nell'intervallo di date
        const query = `
            SELECT T.year, T.month, S.name, counterN, COUNT(*) AS totalTickets
            FROM Done_ticket D, Time T , Service S
            WHERE D.timeId = T.timeId and S.serviceId=D.serviceId

            GROUP BY T.year, T.month, D.serviceId, counterN
            ORDER BY T.year, T.month, D.serviceId, counterN
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
                serviceName: row.name,
                totalTickets: row.totalTickets
            }));

            resolve(mappedRows);
        });

})}

export const getStats2Dweek= () => {
    return new Promise((resolve, reject) => {


        // Costruiamo la query per filtrare nell'intervallo di date
        const query = `
            SELECT T.year, T.month, T.week, S.name, COUNT(*) AS totalTickets
            FROM Done_ticket D, Time T, Service S 
            WHERE D.timeId = T.timeId and S.serviceId=D.serviceId

            GROUP BY T.year, T.month, T.week, D.serviceId
            ORDER BY T.year, T.month, T.week, D.serviceId
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
                serviceName: row.name,
                totalTickets: row.totalTickets
            }));

            resolve(mappedRows);

        });

        
})}

export const getStats3Dweek= () => {
    return new Promise((resolve, reject) => {


        // Costruiamo la query per filtrare nell'intervallo di date
        const query = `
            SELECT T.year, T.month, T.week, S.name, counterN, COUNT(*) AS totalTickets
            FROM Done_ticket D, Time T, Service S
            WHERE D.timeId = T.timeId and S.serviceId=D.serviceId

            GROUP BY T.year, T.month, T.week, D.serviceId, counterN
            ORDER BY T.year, T.month, T.week, D.serviceId, counterN
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
                serviceName: row.name,
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
            SELECT T.year, T.month, T.week, T.day, S.name, COUNT(*) AS totalTickets
            FROM Done_ticket D, Time T, Service S 
            WHERE D.timeId = T.timeId and S.serviceId=D.serviceId

            GROUP BY T.year, T.month, T.week, T.day, D.serviceId
            ORDER BY T.year, T.month, T.week, T.day, D.serviceId
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
                serviceName: row.name,
                totalTickets: row.totalTickets
            }));

            resolve(mappedRows);

        });

        
})}

export const getStats3Dday = () => {
    return new Promise((resolve, reject) => {
        

        // Costruiamo la query per filtrare nell'intervallo di date
        const query = `
            SELECT T.year, T.month, T.week, T.day, S.name, counterN, COUNT(*) AS totalTickets
            FROM Done_ticket D, Time T, Service S
            WHERE D.timeId = T.timeId and S.serviceId=D.serviceId

            GROUP BY T.year, T.month, T.week, T.day, D.serviceId, counterN
            ORDER BY T.year, T.month, T.week, T.day, D.serviceId, counterN
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
                serviceName: row.name,
                totalTickets: row.totalTickets
            }));

            resolve(mappedRows);

        });

        
})}