import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { check, validationResult } from 'express-validator';
import { insertTicket, getLastNumber } from './src/dao/ticketDAO.mjs';
import { getServices } from './src/dao/serviceDAO.mjs';
import {insertTime, getTodayTimeId} from './src/dao/timeDAO.mjs'
import { getNumberOfCountersForService, getNumberOfServicesForCounter } from './src/dao/counterServicesDao.mjs';

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
        
        /* Non funziona:
        await insertInDone_Ticket(ticketInfo, counter);
        console.log("sono in doneTicket, ho finito");
        
        await deleteTicket(ticketNumber);
        res.status(201).end();
        */

    } catch (error) {
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
app.post('/api/ticket',[ 
    check('number').isNumeric().notEmpty().custom(value => value >= 0),
    check('esimatedTime').isNumeric().notEmpty().custom(value => value >= 0),
    check('serviceId').isNumeric().notEmpty().custom(value => value >= 0),
    check('timeId').isNumeric().notEmpty().custom(value => value >= 0)
], async (req, res)=>{
    const errors = validationResult(req);

    try{
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
    }catch(error) {
        console.error('Error in ticket creation:', error);
        return res.status(500).json({ error: 'Internal Server Error' }).end();
    }
})

app.get('/api/ticket/last-number', [], async (req, res)=>{
    try {
        const lastNumber = await getLastNumber()
        return res.status(200).json(lastNumber).end();
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' }).end();
    }
})

//serviceAPI
app.get('/api/service', async(_, res)=>{
    try {
        const listServices = await getServices();
        res.status(200).json(listServices)
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' }).end();
    }
})

//timeAPI
app.post('/api/time', async(_, res)=>{
    try{
        const timeId = await insertTime()
        return res.status(200).json(timeId).end();
    }catch(error){
        return res.status(500).json({ error: 'Internal Server Error' }).end();
    }
})

app.get('/api/time/today', async(_, res)=>{
    try{
        const timeId = await getTodayTimeId()
        return res.status(200).json(timeId).end();
    }catch(error){
        console.error(error)
        return res.status(500).json({ error: 'Internal Server Error' }).end();
    }
})

//counterServicesAPI
app.get('/api/counter-services/counters/:serviceId',[
    check('serviceId').notEmpty().isNumeric()
], async (req, res)=>{
    try {
        
        const counterNumbers = await getNumberOfCountersForService(req.params.serviceId);
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(counterNumbers).end();
    } catch (error) {
        console.error(error)
        res.status(500).json({error: "internal server error"}).end();
    }
})

app.get('/api/counter-services/services/:counterN',[
    check('counterN').notEmpty().isNumeric()
], async (req, res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const number = await getNumberOfServicesForCounter(req.params.counterN);
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(number).end();
    } catch (error) {
        res.status(500).json({error: "internal server error"}).end();
    }
})

app.listen(port, () => { console.log(`Server started at http://localhost:${port}`); });
