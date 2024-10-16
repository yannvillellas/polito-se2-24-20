import request from 'supertest';
import app from '../../Index.mjs'; // Assicurati che questo percorso sia corretto
import { insertTicket, getLastNumber } from '../../src/dao/ticketDAO.mjs'; // Corretto percorso del DAO

jest.mock('../../src/dao/ticketDAO.mjs'); // Mock del DAO

describe('POST /api/ticket', () => {
    test('Should return 200 and the ticket number when valid data is provided', async () => {
        const mockTicket = 6; // Cambiato il valore atteso in base all'incremento del numero nel DAO
        insertTicket.mockResolvedValue(mockTicket);

        const response = await request(app)
            .post('/api/ticket')
            .send({
                number: 5, // Numero passato, ma il risultato sarà 6 (5+1 nel DAO)
                esimatedTime: 30,
                serviceId: 1,
                timeId: 2
            });
        expect(response.status).toBe(200);
        expect(response.body).toBe(mockTicket);
        expect(insertTicket).toHaveBeenCalledWith(5, 30, 1, 2); // Verifica che il numero passato sia 5
    });

    test('Should return 422 if any parameter is missing or invalid', async () => {
        const response = await request(app)
            .post('/api/ticket')
            .send({
                number: "invalid", // Numero non valido (stringa anziché numero)
                esimatedTime: 30,
                serviceId: 1,
                timeId: 2
            });

        expect(response.status).toBe(422);
        expect(response.body.errors).toBeDefined(); // Verifica la presenza di errori nel corpo della risposta
    });

    test('Should return 500 if an internal server error occurs', async () => {
        insertTicket.mockRejectedValue(new Error('Internal error')); // Simula un errore interno

        const response = await request(app)
            .post('/api/ticket')
            .send({
                number: 10,
                esimatedTime: 30,
                serviceId: 1,
                timeId: 2
            });

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Internal Server Error'); // Verifica il messaggio di errore
    });
});

describe('GET /api/ticket/last-number', () => {
    test('Should return the last ticket number', async () => {
        getLastNumber.mockResolvedValue(1); // Simula il ritorno dell'ultimo numero di ticket

        const response = await request(app).get('/api/ticket/last-number');

        expect(response.status).toBe(200);
        expect(response.body).toBe(1); // Verifica che il numero restituito sia 25
    });

    test('Should return 500 if an internal server error occurs', async () => {
        getLastNumber.mockRejectedValue(new Error('Internal server error')); // Simula un errore interno

        const response = await request(app).get('/api/ticket/last-number');

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Internal Server Error'); // Verifica il messaggio di errore
    });
});
