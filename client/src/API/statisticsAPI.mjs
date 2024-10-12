const SERVER_URL = 'http://localhost:3001'


// HTTP GET per prendere statistiche per giorno:
const stats2Dday = async (startDate, endDate) => {
    console.log("sono in statisticsAPI");
    
    // Crea l'URL con i parametri startDate e endDate
    const url = new URL(`${SERVER_URL}/api/Stats2Dyear`);
    url.searchParams.append('startDate', startDate);
    url.searchParams.append('endDate', endDate);
    // url.searchParams.append('type', 'someType'); // Aggiungi il tipo se necessario

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












const getStats2D = async (startDate, endDate, type)=>{
    const response = await fetch(`${SERVER_URL}/statistics/2d/${type}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(startDate, endDate),
    });
    if (response.ok) {
        const statsJson = await response.json();
        return statsJson;
    } else {
        throw new Error('Error to retrive statistics from the server');
    }
}

const getStats3D = async (startDate, endDate, type)=>{
    const response = await fetch(`${SERVER_URL}/statistics/3d/${type}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(startDate, endDate),
    });
    if (response.ok) {
        const statsJson = await response.json();
        return statsJson;
    } else {
        throw new Error('Error to retrive statistics from the server');
    }
}

/*
const getDailyStats2D = async (startDate, endDate) => {
    const response = await fetch(SERVER_URL + '/daily2d', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(startDate, endDate),
    });
    if (response.ok) {
        const statsJson = await response.json();
        return statsJson;
    } else {
        throw new Error('Error to retrive statistics from the server');
    }
}

const getDailyStats3D = async (startDate, endDate) => {
    const response = await fetch(SERVER_URL + '/daily3d', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(startDate, endDate),
    });
    if (response.ok) {
        const statsJson = await response.json();
        return statsJson;
    } else {
        throw new Error('Error to retrive statistics from the server');
    }
}

const getWeeklyStats2D = async (startDate, endDate) => {
    const response = await fetch(SERVER_URL + '/weekly2d', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(startDate, endDate),
    });
    if (response.ok) {
        const statsJson = await response.json();
        return statsJson;
    } else {
        throw new Error('Error to retrive statistics from the server');
    }
}

const getWeeklyStats3D = async (startDate, endDate) => {
    const response = await fetch(SERVER_URL + '/weekly3d', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(startDate, endDate),
    });
    if (response.ok) {
        const statsJson = await response.json();
        return statsJson;
    } else {
        throw new Error('Error to retrive statistics from the server');
    }
}

const getMonthlyStats2D = async (startDate, endDate) => {
    const response = await fetch(SERVER_URL + '/weekly2d', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(startDate, endDate),
    });
    if (response.ok) {
        const statsJson = await response.json();
        return statsJson;
    } else {
        throw new Error('Error to retrive statistics from the server');
    }
}

const getMonthlyStats3D = async (startDate, endDate) => {
    const response = await fetch(SERVER_URL + '/weekly3d', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(startDate, endDate),
    });
    if (response.ok) {
        const statsJson = await response.json();
        return statsJson;
    } else {
        throw new Error('Error to retrive statistics from the server');
    }
}*/

//const statsAPI = { getDailyStats2D, getDailyStats3D, getWeeklyStats2D, getWeeklyStats3D, getMonthlyStats2D, getMonthlyStats3D }

const statsAPI = {getStats2D, getStats3D, stats2Dday} 
export default statsAPI