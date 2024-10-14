import { db } from "../database/db.mjs";
import dayjs from "dayjs";

export const getTodayTimeId = () => {
    return new Promise((resolve, reject)=>{
        const day = dayjs().date(); 
        const month = dayjs().month() + 1;
        const year = dayjs().year();

        const query = `SELECT timeId 
                        FROM time 
                        WHERE day = ? AND month = ? AND year = ?
                        LIMIT 1;`

        db.get(query, [day, month, year], (err, row) => {
            if (err) {
                console.error(err.message)
                reject(err);
            }

            
            if (row && row.timeId !== null && row.timeId !== undefined) {
                resolve(row.timeId);
            } else {
                insertTime().then((timeId)=>{
                    resolve(timeId); 
                })
            }
        });
    });
}

export const insertTime = () => {
    return new Promise((resolve, reject)=>{
        const day = dayjs().date(); 
        const month = dayjs().month() + 1;
        const year = dayjs().year();

        const query = `INSERT INTO Time ("day", "month", "year")
                        VALUES (?, ?, ?);`

        db.run(query, [day, month, year], function(err)  {
            if (err) {
                console.error(err.message)
                reject(err);
            }else{

                resolve(this.lastID);
            }

            
        });
    });
} 