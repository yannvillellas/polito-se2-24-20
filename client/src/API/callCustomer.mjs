
const SERVER_URL = 'http://localhost:3001'



// HTTP GET per getAllCustomers
const getAllCustomers = async (counterN) => {
    // Crea l'URL con il parametro counterN
    const url = new URL(`${SERVER_URL}/api/AllCustomers`);
    

    // Esegui la richiesta GET
    const response = await fetch(url, { 
        method: 'GET',
    });

    // Controlla se la risposta è OK
    if (response.ok) {
        const allTickets = await response.json(); // Ottieni i dati in formato JSON
        return allTickets; // Restituisci i dati
    } else {
        throw new Error('Error to retrieve statistics from the server'); // Gestisci gli errori
    }
};

// HTTP POST per getAllCustomers
const saveCallingTicket = async (nextTicket, actualCounter) => {

    if(!nextTicket || !actualCounter) return null;



    // Crea l'URL con il parametro counterN
    const url = new URL(`${SERVER_URL}/api/saveCallingTicket`);
    
    // Esegui la richiesta POST
    const response = await fetch(url, { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({number: nextTicket.number, serviceId: nextTicket.serviceId, actualCounter: actualCounter}),
    });

    // Controlla se la risposta è OK
    if(!response.ok) {
        const errMessage = await response.json();
        throw errMessage;
    }

    else return null;
};


// HTTP PUT per updateServiceNumberInQueue
const updateServiceNumberInQueue = async (serviceId, number) => {

    if(!serviceId) return null;

    const response = await fetch(`${SERVER_URL}/service/queue`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({serviceId: serviceId, number: number}),
      });
    
      if(!response.ok) {
        const errMessage = await response.json();
        throw errMessage;
      }
      else return null;
};




export default {getAllCustomers, saveCallingTicket, updateServiceNumberInQueue} 
