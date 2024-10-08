import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(express.json());
app.use(morgan('dev'));

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


app.listen(port, () => { console.log(`Server started at http://localhost:${port}`); });
