const SERVER_URL = 'http://localhost:3001'

// HTTP GET per getNextCustomer
const getNextCustomer = async (counterN) => {
    console.log("sono in statisticsAPI");
    // Crea l'URL con il parametro counterN
    const url = new URL(`${SERVER_URL}/api/NextCustomer`);
    url.searchParams.append('counterN', counterN);

    // Esegui la richiesta GET
    const response = await fetch(url, { 
        method: 'GET',
    });

    // Controlla se la risposta è OK
    if (response.ok) {
        const statsJson = await response.json(); // Ottieni i dati in formato JSON
        return statsJson; // Restituisci i dati
    } else {
        throw new Error('Error to retrieve statistics from the server'); // Gestisci gli errori
    }
};

const nextCAPI = {getNextCustomer} 
export default nextCAPI