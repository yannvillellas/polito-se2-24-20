import Service from '../models/Service.mjs'
const SERVER_URL = 'http://localhost:3001/api/service/' 

const getServices = async()=>{
    const listServices = await fetch(SERVER_URL, {
        method: 'GET'
    })
    .then(handleInvalidResponse)
    .then(response => response.json())

    return listServices
}

function handleInvalidResponse(response) {
    if (!response.ok) { throw Error(response.statusText) }
    let type = response.headers.get('Content-Type');
    if (type !== null && type.indexOf('application/json') === -1){
        throw new TypeError(`Expected JSON, got ${type}`)
    }
    return response;
}

// HTTP PUT per updateServiceNumberInQueue
const updateServiceNumberInQueue = async (serviceId) => {
    console.log("Invio richiesta per aggiornare il numero di clienti in coda per quel servizio:", serviceId);
    const response = await fetch(`${SERVER_URL}queue`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({serviceId: serviceId}),
      });
    
      if(!response.ok) {
        const errMessage = await response.json();
        throw errMessage;
      }
      else return null;
};















const ServerAPI = {
    getServices,
    updateServiceNumberInQueue
}

export default ServerAPI;