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
        const ticketInfo = await getTicketInfo(ticketNumber);
        console.log("sono appena uscito da getTicketInfo", ticketInfo);
        

        await insertInDone_Ticket(ticketInfo, counter);
        console.log("sono in doneTicket, ho finito");
        
        await deleteTicket(ticketNumber);
        res.status(201).end();
        

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "internal server error" }).end();
    }

});



app.get('/api/NextCustomer', async (req, res) => {
    try {
        
        const counterN = req.query.counterN;
        const nextTicket = await getNextTicket(counterN);
        res.json(nextTicket);

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

app.get('/api/Stats2Dmonth', async (req, res) => {
    try {
        
        const [yearStart, monthStart, dayStart] = req.query.startDate.split("-");
        console.log(`Giorno: ${dayStart}`);
        console.log(`Mese: ${monthStart}`);
        console.log(`Anno: ${yearStart}`);

        const [yearEnd, monthEnd, dayEnd] = req.query.endDate.split("-");
        console.log(`Giorno: ${dayEnd}`);
        console.log(`Mese: ${monthEnd}`);
        console.log(`Anno: ${yearEnd}`);

        const stats2D = await getStats2Dmonth();
        console.log("stats2D: ", stats2D);

        
        const filteredStats = stats2D.filter((item) => {
           return Number(item.year) >= Number(yearStart) && Number(item.year) <= Number(yearEnd)
            && Number(item.month) >= Number(monthStart) && Number(item.month) <= Number(monthEnd)
            // && Number(item.day) >= Number(dayStart) && Number(item.day) <= Number(dayEnd); perchè semplicemente non restituisco il giorno con questa query
        });
        console.log("Post filtro:");
        console.log("filteredStats: ", filteredStats);
        

        res.json(filteredStats);

    } catch (error) {
        res.status(500).json({ error: "internal server error" }).end();
    }

});

app.get('/api/Stats3Dmonth', async (req, res) => {
    try {
        
        const [yearStart, monthStart, dayStart] = req.query.startDate.split("-");
        console.log(`Giorno: ${dayStart}`);
        console.log(`Mese: ${monthStart}`);
        console.log(`Anno: ${yearStart}`);

        const [yearEnd, monthEnd, dayEnd] = req.query.endDate.split("-");
        console.log(`Giorno: ${dayEnd}`);
        console.log(`Mese: ${monthEnd}`);
        console.log(`Anno: ${yearEnd}`);

        const stats2D = await getStats3Dmonth();
        console.log("stats2D: ", stats2D);

        
        const filteredStats = stats2D.filter((item) => {
           return Number(item.year) >= Number(yearStart) && Number(item.year) <= Number(yearEnd)
            && Number(item.month) >= Number(monthStart) && Number(item.month) <= Number(monthEnd)
            // && Number(item.day) >= Number(dayStart) && Number(item.day) <= Number(dayEnd); perchè semplicemente non restituisco il giorno con questa query
        });
        console.log("Post filtro:");
        console.log("filteredStats: ", filteredStats);
        

        res.json(filteredStats);

    } catch (error) {
        res.status(500).json({ error: "internal server error" }).end();
    }

});

// by week
app.get('/api/Stats2Dweek', async (req, res) => {
    try {
        
        const [yearStart, monthStart, dayStart] = req.query.startDate.split("-");
        console.log(`Giorno: ${dayStart}`);
        console.log(`Mese: ${monthStart}`);
        console.log(`Anno: ${yearStart}`);

        const [yearEnd, monthEnd, dayEnd] = req.query.endDate.split("-");
        console.log(`Giorno: ${dayEnd}`);
        console.log(`Mese: ${monthEnd}`);
        console.log(`Anno: ${yearEnd}`);

        const stats2D = await getStats2Dweek();
        console.log("stats2D: ", stats2D);

        
        const filteredStats = stats2D.filter((item) => {
           return Number(item.year) >= Number(yearStart) && Number(item.year) <= Number(yearEnd)
            && Number(item.month) >= Number(monthStart) && Number(item.month) <= Number(monthEnd)
            // && Number(item.day) >= Number(dayStart) && Number(item.day) <= Number(dayEnd); idem come sopra
        });
        console.log("Post filtro:");
        console.log("filteredStats: ", filteredStats);
        

        res.json(filteredStats);

    } catch (error) {
        res.status(500).json({ error: "internal server error" }).end();
    }

});

app.get('/api/Stats3Dweek', async (req, res) => {
    try {
        
        const [yearStart, monthStart,dayStart ] = req.query.startDate.split("-");
        console.log(`Giorno: ${dayStart}`);
        console.log(`Mese: ${monthStart}`);
        console.log(`Anno: ${yearStart}`);

        const [yearEnd, monthEnd,dayEnd ] = req.query.endDate.split("-");
        console.log(`Giorno: ${dayEnd}`);
        console.log(`Mese: ${monthEnd}`);
        console.log(`Anno: ${yearEnd}`);

        const stats2D = await getStats3Dweek();
        console.log("stats2D: ", stats2D);

        
        const filteredStats = stats2D.filter((item) => {
           return Number(item.year) >= Number(yearStart) && Number(item.year) <= Number(yearEnd)
            && Number(item.month) >= Number(monthStart) && Number(item.month) <= Number(monthEnd)
            // && Number(item.day) >= Number(dayStart) && Number(item.day) <= Number(dayEnd); idem come sopra
        });
        console.log("Post filtro:");
        console.log("filteredStats: ", filteredStats);
        

        res.json(filteredStats);

    } catch (error) {
        res.status(500).json({ error: "internal server error" }).end();
    }

});

// by day
app.get('/api/Stats2Dday', async (req, res) => {
    try {
        
        const [dayStart, monthStart, yearStart] = req.query.startDate.split("-");
        console.log(`Giorno: ${dayStart}`);
        console.log(`Mese: ${monthStart}`);
        console.log(`Anno: ${yearStart}`);

        const [dayEnd, monthEnd, yearEnd] = req.query.endDate.split("-");
        console.log(`Giorno: ${dayEnd}`);
        console.log(`Mese: ${monthEnd}`);
        console.log(`Anno: ${yearEnd}`);

        const stats2D = await getStats2Dday();
        console.log("stats2D: ", stats2D);

        
        const filteredStats = stats2D.filter((item) => {
           return Number(item.year) >= Number(yearStart) && Number(item.year) <= Number(yearEnd)
            && Number(item.month) >= Number(monthStart) && Number(item.month) <= Number(monthEnd)
            && Number(item.day) >= Number(dayStart) && Number(item.day) <= Number(dayEnd);
        });
        console.log("Post filtro:");
        console.log("filteredStats: ", filteredStats);
        

        res.json(filteredStats);

    } catch (error) {
        res.status(500).json({ error: "internal server error" }).end();
    }

});

app.get('/api/Stats3Dday', async (req, res) => {
    try {
        
        const [yearStart, monthStart,dayStart ] = req.query.startDate.split("-");
        console.log(`Giorno: ${dayStart}`);
        console.log(`Mese: ${monthStart}`);
        console.log(`Anno: ${yearStart}`);

        const [yearEnd, monthEnd, dayEnd] = req.query.endDate.split("-");
        console.log(`Giorno: ${dayEnd}`);
        console.log(`Mese: ${monthEnd}`);
        console.log(`Anno: ${yearEnd}`);

        const stats2D = await getStats3Dday();
        console.log("stats2D: ", stats2D);

        
        const filteredStats = stats2D.filter((item) => {
           return Number(item.year) >= Number(yearStart) && Number(item.year) <= Number(yearEnd)
            && Number(item.month) >= Number(monthStart) && Number(item.month) <= Number(monthEnd)
            && Number(item.day) >= Number(dayStart) && Number(item.day) <= Number(dayEnd);
        });
        console.log("Post filtro:");
        console.log("filteredStats: ", filteredStats);
        

        res.json(filteredStats);

    } catch (error) {
        res.status(500).json({ error: "internal server error" }).end();
    }

});





















app.listen(port, () => { console.log(`Server started at http://localhost:${port}`); });
