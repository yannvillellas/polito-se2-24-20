import sqlite from 'sqlite3';

export const db = new sqlite.Database('database.db', (err)=>{
    if(err){
        console.error('Errore durante l\'apertura del database:', err);
        throw err;
    } else {
        console.log('Database aperto con successo');
    }
});