import ticket from '../models/Ticket.mjs';
const SERVER_URL = 'http://localhost:3001/api/ticket/'

const createTicket = async (number, esimatedTime, serviceId, timeId) =>{
    const ticketNumber = await fetch(SERVER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({number, esimatedTime, serviceId, timeId})
    })
    .then(handleInvalidResponse)
    .then(response => response.json())
    
    return ticketNumber;
}

const getLastNumber = async () =>{
    const lastNumber = await fetch(SERVER_URL + 'last-number', {
        method: 'GET'
    })
    .then(handleInvalidResponse)
    .then(response => response.json())

    return lastNumber;
}


function handleInvalidResponse(response) {
    if (!response.ok) { throw Error(response.statusText) }
    let type = response.headers.get('Content-Type');
    if (type !== null && type.indexOf('application/json') === -1){
        throw new TypeError(`Expected JSON, got ${type}`)
    }
    return response;
}

const TicketAPI = {
    createTicket,
    getLastNumber
}

export default TicketAPI;