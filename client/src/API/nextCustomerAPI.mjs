
const SERVER_URL = 'http://localhost:3001'


const saveDoneTicket = async (actualTicketNumber, actualCounter) => {
    console.log("sono in statisticsAPI, sto mandando", actualTicketNumber, actualCounter);
    // Crea l'URL con il parametro actualTicket
    const url = new URL(`${SERVER_URL}/api/DoneTicket`);

    // Esegui la richiesta POST
    const response = await fetch(url, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({number: actualTicketNumber.number, counter: actualCounter}),
    });

    // Controlla se la risposta è OK
    if(!response.ok) {
        const errMessage = await response.json();
        throw errMessage;
      }
      else return null;
};




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


const nextCAPI = {getNextCustomer, saveDoneTicket} 
export default nextCAPI