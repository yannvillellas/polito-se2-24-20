import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { check, validationResult } from 'express-validator';
import { insertTicket, getLastNumber, deleteTicket } from './src/dao/ticketDAO.mjs';
import { getServices } from './src/dao/serviceDAO.mjs';
import { insertTime, getTodayTimeId } from './src/dao/timeDAO.mjs'
import { getNumberOfCountersForService, getNumberOfServicesForCounter } from './src/dao/counterServicesDao.mjs';
import { getStats2Dmonth, getStats2Dweek, getStats2Dday, getStats3Dmonth, getStats3Dweek, getStats3Dday } from './src/dao/statsDAO.mjs';
import { insertInDone_Ticket } from './src/dao/nextCustomer.mjs';
import dayjs from 'dayjs';

import { getNextTicket, getTicketInfo } from './src/dao/nextCustomer.mjs';
import {getAllCustomers} from './src/dao/callCustomerDAO.mjs';
import {getServiceById} from './src/dao/serviceDAO.mjs';
import {insertCallingTicket, deleteFromCallingTicket} from './src/dao/callCustomerDAO.mjs';

const app = express();
const port = 3001;


app.use(express.json());
app.use(morgan('dev'));

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/api/DoneTicket', async (req, res) => {
    try {
        const ticketNumber = req.body.number;
        const counter = req.body.counter;

        if(!ticketNumber || !counter) {
            return res.status(400).json({ error: "missing parameters" }).end();
        }


        const ticketInfo = await getTicketInfo(ticketNumber);

        if(!ticketInfo) {
            return res.status(404).json({ error: "ticket not found" }).end();
        }
    

        // non è stato inserito il ticket
        await insertInDone_Ticket(ticketInfo, counter);

        // cancella da TICKET
        await deleteTicket(ticketNumber); // Funziona
        // cancella da callingTicket
        await deleteFromCallingTicket(ticketNumber);

        res.status(201).end();


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal server error" }).end();
    }

});



app.get('/api/NextCustomer', async (req, res) => {
    try {

        if (!req.query.counterN) {
            return res.status(400).json({ error: "missing parameters" }).end();
        }

        const counterN = req.query.counterN;
        const nextTicket = await getNextTicket(counterN); // mi restituisce: ticketNumber e serviceId

        if(!nextTicket) {
            return res.status(404).json({ error: "no ticket to serve" }).end();
        }

        res.json(nextTicket);

    } catch (error) {
        res.status(500).json({ error: "internal server error" }).end();
    }

});


app.get('/api/AllCustomers', async (req, res) => {
    try {

        const allCustomers = await getAllCustomers();
        res.json(allCustomers);

    } catch (error) {
        res.status(500).json({ error: "internal server error" }).end();
    }

});

app.post('/api/saveCallingTicket', async (req, res) => {
    try {

        if (!req.body.number || !req.body.serviceId || !req.body.actualCounter) {
            return res.status(400).json({ error: "missing parameters" }).end();
        }

        const serviceId = req.body.serviceId;
        console.log("sono in index, saveCallingTicket, ecco il serviceId", serviceId);
        const serviceName = await getServiceById(serviceId);
        console.log("sono in index, saveCallingTicket, ecco il serviceName:", serviceName);
        const ticketNumber = req.body.number;
        const actualCounter = req.body.actualCounter;

        console.log("sono in saveCallingTicket, ecco i dati che sto per inserire in CallingTicekt:", serviceId, serviceName, ticketNumber, actualCounter);

        await insertCallingTicket(serviceName, ticketNumber, actualCounter);
        res.status(201).end();
    } catch (error) {
        res.status(500).json({ error: "internal server error" }).end();
    }
});






////////////////////////////////////////////////////////////////////////////////////////////////////









//ticketAPI
app.post('/api/ticket', [
    check('number').isNumeric().notEmpty().custom(value => value >= 0),
    check('esimatedTime').isNumeric().notEmpty().custom(value => value >= 0),
    check('serviceId').isNumeric().notEmpty().custom(value => value >= 0),
    check('timeId').isNumeric().notEmpty().custom(value => value >= 0)
], async (req, res) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            console.error(errors.array())
            return res.status(422).json({ errors: errors.array() });
        }

        const number = req.body.number;
        const esimatedTime = req.body.esimatedTime;
        const serviceId = req.body.serviceId;
        const timeId = req.body.timeId;

        const ticketNumber = await insertTicket(number, esimatedTime, serviceId, timeId);
        return res.status(200).json(ticketNumber).end();
    } catch (error) {
        console.error('Error in ticket creation:', error);
        return res.status(500).json({ error: 'Internal Server Error' }).end();
    }
})

app.get('/api/ticket/last-number', [], async (req, res) => {
    try {
        const lastNumber = await getLastNumber()
        return res.status(200).json(lastNumber).end();
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' }).end();
    }
})

//serviceAPI
app.get('/api/service', async (_, res) => {
    try {
        const listServices = await getServices();
        res.status(200).json(listServices)
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' }).end();
    }
})

//timeAPI
app.post('/api/time', async (_, res) => {
    try {
        const timeId = await insertTime()
        return res.status(200).json(timeId).end();
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' }).end();
    }
})

app.get('/api/time/today', async (_, res) => {
    try {
        const timeId = await getTodayTimeId()
        return res.status(200).json(timeId).end();
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal Server Error' }).end();
    }
})

//counterServicesAPI
app.get('/api/counter-services/counters/:serviceId', [
    check('serviceId').notEmpty().isNumeric()
], async (req, res) => {
    try {

        const counterNumbers = await getNumberOfCountersForService(req.params.serviceId);
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(counterNumbers).end();
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "internal server error" }).end();
    }
})

app.get('/api/counter-services/services/:counterN', [
    check('counterN').notEmpty().isNumeric()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const number = await getNumberOfServicesForCounter(req.params.counterN);
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(number).end();
    } catch (error) {
        res.status(500).json({ error: "internal server error" }).end();
    }
})


//statisticsAPI


// Statistics by month:

function isDateInRange(date, start, end, withDay) {

    let currentDate;
    let startDate;
    let endDate

    if (withDay) {
        currentDate = new Date(date.year, date.month - 1, date.day);
        startDate = new Date(start.yearStart, start.monthStart - 1, start.dayStart);
        endDate = new Date(end.yearEnd, end.monthEnd - 1, end.dayEnd);
    } else {

        currentDate = new Date(date.year, date.month - 1);
        startDate = new Date(start.yearStart, start.monthStart - 1);
        endDate = new Date(end.yearEnd, end.monthEnd ,0);
    }
    
    return currentDate >= startDate && currentDate <= endDate;
}

app.get('/api/Stats2Dmonth', async (req, res) => {
    try {

        const [yearStart, monthStart, dayStart] = req.query.startDate.split("-");

        const [yearEnd, monthEnd, dayEnd] = req.query.endDate.split("-");

        const stats2D = await getStats2Dmonth();



        const filteredStats = stats2D.filter(item =>
            isDateInRange({ year: item.year, month: item.month },
                { yearStart: yearStart, monthStart: monthStart },
                { yearEnd: yearEnd, monthEnd: monthEnd },
                false)
        );

        res.json(filteredStats);

    } catch (error) {
        res.status(500).json({ error: "internal server error" }).end();
    }

});

app.get('/api/Stats3Dmonth', async (req, res) => {
    try {

        const [yearStart, monthStart, dayStart] = req.query.startDate.split("-");

        const [yearEnd, monthEnd, dayEnd] = req.query.endDate.split("-");

        const stats3D = await getStats3Dmonth();

        const filteredStats = stats3D.filter(item =>
            isDateInRange({ year: item.year, month: item.month },
                { yearStart: yearStart, monthStart: monthStart },
                { yearEnd: yearEnd, monthEnd: monthEnd },
                false)
        );


        return res.json(filteredStats);

    } catch (error) {
        return res.status(500).json({ error: "internal server error" }).end();
    }

});

// by week
app.get('/api/Stats2Dweek', async (req, res) => {
    try {

        const [yearStart, monthStart, dayStart] = req.query.startDate.split("-");

        const [yearEnd, monthEnd, dayEnd] = req.query.endDate.split("-");

        const stats2D = await getStats2Dweek();


        const filteredStats = stats2D.filter(item =>
            isDateInRange({ year: item.year, month: item.month },
                { yearStart: yearStart, monthStart: monthStart },
                { yearEnd: yearEnd, monthEnd: monthEnd },
                false)
        );


        return res.json(filteredStats);

    } catch (error) {
        return res.status(500).json({ error: "internal server error" }).end();
    }

});

app.get('/api/Stats3Dweek', async (req, res) => {
    try {

        const [yearStart, monthStart, dayStart] = req.query.startDate.split("-");

        const [yearEnd, monthEnd, dayEnd] = req.query.endDate.split("-");

        const stats3D = await getStats3Dweek();


        const filteredStats = stats3D.filter(item =>
            isDateInRange({ year: item.year, month: item.month },
                { yearStart: yearStart, monthStart: monthStart },
                { yearEnd: yearEnd, monthEnd: monthEnd },
                false)
        );



        return res.json(filteredStats);

    } catch (error) {
        return res.status(500).json({ error: "internal server error" }).end();
    }

});

// by day
app.get('/api/Stats2Dday', async (req, res) => {
    try {

        const [yearStart, monthStart, dayStart] = req.query.startDate.split("-");

        const [yearEnd, monthEnd, dayEnd] = req.query.endDate.split("-");

        const stats2D = await getStats2Dday();


        const filteredStats = stats2D.filter(item =>
            isDateInRange({ year: item.year, month: item.month, day: item.day },
                { yearStart: yearStart, monthStart: monthStart, dayStart:dayStart },
                { yearEnd: yearEnd, monthEnd: monthEnd , dayEnd:dayEnd},
                true)
        );

        res.json(filteredStats);

    } catch (error) {
        res.status(500).json({ error: "internal server error" }).end();
    }

});

app.get('/api/Stats3Dday', async (req, res) => {
    try {

        const [yearStart, monthStart, dayStart] = req.query.startDate.split("-");

        const [yearEnd, monthEnd, dayEnd] = req.query.endDate.split("-");

        const stats3D = await getStats3Dday();


        const filteredStats = stats3D.filter(item =>
            isDateInRange({ year: item.year, month: item.month, day: item.day },
                { yearStart: yearStart, monthStart: monthStart, dayStart:dayStart },
                { yearEnd: yearEnd, monthEnd: monthEnd , dayEnd:dayEnd},
                true)
        );


        res.json(filteredStats);

    } catch (error) {
        res.status(500).json({ error: "internal server error" }).end();
    }

});





















app.listen(port, () => { console.log(`Server started at http://localhost:${port}`); });
