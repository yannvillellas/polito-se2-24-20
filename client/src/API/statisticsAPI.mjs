const SERVER_URL = 'http://localhost:3001/api/statistics'

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

const statsAPI = {getStats2D, getStats3D}
export default statsAPI