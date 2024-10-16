import sqlite3 from "sqlite3";
import path from "path";

// Definisci il percorso relativo del database
const dbPath = path.resolve("src", "database", "database.db"); // Punti al database esistente nella tua struttura

// Crea una nuova connessione al database
export const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Errore durante l'apertura del database:", err);
        throw err;
    }
});
