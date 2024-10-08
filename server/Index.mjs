import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { check, validationResult } from 'express-validator';
import { insertTicket } from './src/dao/ticketDAO.mjs';
import { getServices } from './src/dao/serviceDAO.mjs';

const app = express();
const port = 3001;

app.use(express.json());
app.use(morgan('dev'));

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


//ticketAPI
app.post('/api/ticket',[ 
    check('number').isNumeric().notEmpty().custom(value => value > 0),
    check('esimatedTime').isNumeric().notEmpty().custom(value => value > 0),
    check('serviceId').isNumeric().notEmpty().custom(value => value > 0),
    check('timeId').isNumeric().notEmpty().custom(value => value > 0)
], async (req, res)=>{
    const errors = validationResult(req);

    try{
        if (!errors.isEmpty()) {
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

//serviceAPI
app.get('/api/service', async(req, res)=>{
    try {
        const listServices = await getServices();
        res.status(200).json(listServices)
    } catch (error) {
        console.error('Error in proposal creation:', error);
        return res.status(500).json({ error: 'Internal Server Error' }).end();
    }
})

app.listen(port, () => { console.log(`Server started at http://localhost:${port}`); });
