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

















const ServerAPI = {
    getServices,
}

export default ServerAPI;