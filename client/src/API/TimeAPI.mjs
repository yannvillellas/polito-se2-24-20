const SERVER_URL = 'http://localhost:3001/api/time/'

const insertTime = async()=>{
    const timeId = await fetch(SERVER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(handleInvalidResponse)
    .then(response => response.json())
    
    return timeId;
}

const getTodayTimeId = async()=>{
    const timeId = await fetch(SERVER_URL+'today', {
        method: 'GET',
    })
    .then(handleInvalidResponse)
    .then(response => response.json())
    
    return timeId;
}

function handleInvalidResponse(response) {
    if (!response.ok) { throw Error(response.statusText) }
    let type = response.headers.get('Content-Type');
    if (type !== null && type.indexOf('application/json') === -1){
        throw new TypeError(`Expected JSON, got ${type}`)
    }
    return response;
}

const TimeAPI = {
    insertTime,
    getTodayTimeId
}

export default TimeAPI;