const SERVER_URL = 'http://localhost:3001/api/counter-services';

const getNumberOfServicesForCounter = async(counterN)=>{
    const number = await fetch(`${SERVER_URL}/services/${counterN}`, {
        method: 'GET'
    })
    .then(handleInvalidResponse)
    .then(response => response.json())

    return number;
}

const getNumberOfCountersForService = async(serviceId) => {
    const counterNumbers = await fetch(`${SERVER_URL}/counters/${serviceId}`, {
        method: 'GET'
    })
    .then(handleInvalidResponse)
    .then(response => response.json());

    return counterNumbers;
}


function handleInvalidResponse(response) {
    if (!response.ok) { throw Error(response.statusText) }
    let type = response.headers.get('Content-Type');
    if (type !== null && type.indexOf('application/json') === -1){
        throw new TypeError(`Expected JSON, got ${type}`)
    }
    return response;
}

const CounterServicesAPI = {
    getNumberOfCountersForService,
    getNumberOfServicesForCounter
}

export default CounterServicesAPI;