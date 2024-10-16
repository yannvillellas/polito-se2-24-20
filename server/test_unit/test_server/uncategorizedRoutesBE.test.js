
import { test, expect, jest, afterEach } from "@jest/globals"
import request from 'supertest'
import express from "express"
import app from "../../Index.mjs";
import { getNumberOfServicesForCounter, getNumberOfCountersForService } from "../../src/dao/counterServicesDao.mjs";
import { getTodayTimeId, insertTime } from "../../src/dao/timeDAO.mjs";
import { getServices } from "../../src/dao/serviceDAO.mjs";
import { getLastNumber, insertTicket,deleteTicket } from "../../src/dao/ticketDAO.mjs";
import { updateServiceNumberInQueue } from "../../src/dao/serviceDAO.mjs";
import { getServiceById } from "../../src/dao/serviceDAO.mjs";
import {insertCallingTicket} from '../../src/dao/callCustomerDAO.mjs';
import { insertInDone_Ticket } from '../../src/dao/nextCustomer.mjs';
import { getNextTicket, getTicketInfo } from '../../src/dao/nextCustomer.mjs';
import {getAllCustomers, deleteFromCallingTicket} from '../../src/dao/callCustomerDAO.mjs';

jest.mock("../../src/dao/counterServicesDao.mjs");
jest.mock("../../src/dao/timeDAO.mjs");
jest.mock("../../src/dao/serviceDAO.mjs");
jest.mock("../../src/dao/ticketDAO.mjs");
jest.mock("../../src/dao/callCustomerDAO.mjs");
jest.mock('../../src/dao/nextCustomer.mjs');
jest.mock('../../src/dao/callCustomerDAO.mjs');



describe("Server routes tests", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });


    /* ************************ '/api/counter-services/services/:counterN' ************************* */
    describe("/api/counter-services/services/:counterN", () => {

        it('should return 422 if counterN is not a number', async () => {
            const res = await request(app).get('/api/counter-services/services/not-a-number');

            expect(res.status).toBe(422);
            expect(res.body.errors).toBeDefined();
        });

        it('should return 200 and the correct number of services', async () => {
            const mockNumberOfServices = 5;
            getNumberOfServicesForCounter.mockResolvedValue(mockNumberOfServices);

            const res = await request(app).get('/api/counter-services/services/1');

            expect(res.status).toBe(200);
            expect(getNumberOfServicesForCounter).toHaveBeenCalledWith('1');
            expect(res.body).toEqual(mockNumberOfServices);
            expect(res.headers['content-type']).toContain('application/json');
        });


        it('should return 500 if there is an internal error', async () => {
            getNumberOfServicesForCounter.mockRejectedValue(new Error('Database error'));

            const res = await request(app).get('/api/counter-services/services/1');

            expect(res.status).toBe(500);
            expect(res.body.error).toBe('internal server error');
        });

    });

    /* ************************ '/api/counter-services/services/:counterN' ************************* */
    describe('/api/counter-services/counters/:serviceId', () => {
        it('should return 422 if serviceId is not a number', async () => {
            const res = await request(app).get('/api/counter-services/counters/not-a-number');

            expect(res.status).toBe(422);
            expect(res.body.errors).toBeDefined();
        });


        it('should return 200 and the correct counter numbers', async () => {
            const mockCounterNumbers = [1, 2, 3];
            getNumberOfCountersForService.mockResolvedValue(mockCounterNumbers);

            const res = await request(app).get('/api/counter-services/counters/1');

            expect(res.status).toBe(200);
            expect(getNumberOfCountersForService).toHaveBeenCalledWith('1');
            expect(res.body).toEqual(mockCounterNumbers);
        });

        it('should return 500 if there is an internal error', async () => {
            getNumberOfCountersForService.mockRejectedValue(new Error('Database error'));

            const res = await request(app).get('/api/counter-services/counters/1');

            expect(res.status).toBe(500);
            expect(res.body.error).toBe('internal server error');
        });
    });

    /* ************************ /api/time/today ************************* */
    describe('/api/time/today', () => {

        it('should return 200 and the correct time ID', async () => {
            const mockTimeId = { timeId: 123 };
            getTodayTimeId.mockResolvedValue(mockTimeId);

            const res = await request(app).get('/api/time/today');

            expect(res.status).toBe(200);
            expect(getTodayTimeId).toHaveBeenCalled();
            expect(res.body).toEqual(mockTimeId);
        });

        it('should return 500 if there is an internal error', async () => {
            getTodayTimeId.mockRejectedValue(new Error('Database error'));

            const res = await request(app).get('/api/time/today');

            expect(res.status).toBe(500);
            expect(res.body.error).toBe('Internal Server Error');
        });
    });

    /* ************************ /api/time ************************* */
    describe('/api/time', () => {
        it('should return 200 and the inserted time ID', async () => {
            const mockTimeId = { timeId: 123 };
            insertTime.mockResolvedValue(mockTimeId);

            const res = await request(app).post('/api/time');

            expect(res.status).toBe(200);
            expect(insertTime).toHaveBeenCalled();
            expect(res.body).toEqual(mockTimeId);
        });

        it('should return 500 if there is an internal error', async () => {
            insertTime.mockRejectedValue(new Error('Database error'));

            const res = await request(app).post('/api/time');

            expect(res.status).toBe(500);
            expect(res.body.error).toBe('Internal Server Error');
        });
    });


    /* ************************ /api/service ************************* */
    describe('/api/service', () => {
        it('should return 200 and the list of services', async () => {
            const mockServices = [
                { id: 1, name: 'Service 1' },
                { id: 2, name: 'Service 2' },
            ];
            getServices.mockResolvedValue(mockServices);

            const res = await request(app).get('/api/service');

            expect(res.status).toBe(200);
            expect(getServices).toHaveBeenCalled();
            expect(res.body).toEqual(mockServices);
        });

        it('should return 500 if there is an internal error', async () => {
            getServices.mockRejectedValue(new Error('Database error'));

            const res = await request(app).get('/api/service');

            expect(res.status).toBe(500);
            expect(res.body.error).toBe('Internal Server Error');
        });
    });

    /* ************************ '/api/counter-services/services/:counterN' ************************* */
    describe("/api/ticket/last-number", () => {

        it('should return 200 and the last ticket number', async () => {
            const mockLastNumber = { lastNumber: 50 };
            getLastNumber.mockResolvedValue(mockLastNumber);

            const res = await request(app).get('/api/ticket/last-number');

            expect(res.status).toBe(200);
            expect(getLastNumber).toHaveBeenCalled();
            expect(res.body).toEqual(mockLastNumber);
        });

        it('should return 500 if there is an internal error', async () => {
            getLastNumber.mockRejectedValue(new Error('Database error'));

            const res = await request(app).get('/api/ticket/last-number');

            expect(res.status).toBe(500);
            expect(res.body.error).toBe('Internal Server Error');
        });
    });

    describe("/api/ticket", () => {
        it('should return 200 and the ticket number when input is valid', async () => {
            const mockTicketNumber = { ticketNumber: 100 }; 
            insertTicket.mockResolvedValue(mockTicketNumber);
    
            const validData = {
                number: 50,
                esimatedTime: 30,
                serviceId: 2,
                timeId: 1
            };
    
            const res = await request(app).post('/api/ticket').send(validData);
    
            expect(res.status).toBe(200);
            expect(insertTicket).toHaveBeenCalledWith(50, 30, 2, 1);
            expect(res.body).toEqual(mockTicketNumber); 
        });
       
        it('should return 422 if input validation fails', async () => {
            const invalidData = {
                number: -1, 
                esimatedTime: 'invalid',
                serviceId: null, 
                timeId: -5 
            };
    
            const res = await request(app).post('/api/ticket').send(invalidData);
    
            expect(res.status).toBe(422);
            expect(res.body.errors).toBeInstanceOf(Array);
            expect(res.body.errors.length).toBeGreaterThan(0);
        });
    
        // Test errore del server
        it('should return 500 if there is an internal error', async () => {
            const validData = {
                number: 50,
                esimatedTime: 30,
                serviceId: 2,
                timeId: 1
            };
    
            insertTicket.mockRejectedValue(new Error('Database error')); 
    
            const res = await request(app).post('/api/ticket').send(validData);
    
            expect(res.status).toBe(500); 
            expect(res.body.error).toBe('Internal Server Error');
        });
    });

    describe('PUT /service/queue', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
    
        it('should return 400 if serviceId or number is missing', async () => {
            const response = await request(app).put('/service/queue').send({});
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'serviceId is required' });
        });
    
        it('should return 200 if service number is updated successfully', async () => {
            updateServiceNumberInQueue.mockResolvedValue(true); // Simula un aggiornamento riuscito
    
            const response = await request(app).put('/service/queue').send({
                serviceId: '123',
                number: 10,
            });
    
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Service number updated successfully' });
        });
    
        it('should return 500 if service number update fails', async () => {
            updateServiceNumberInQueue.mockResolvedValue(false); // Simula un aggiornamento fallito
    
            const response = await request(app).put('/service/queue').send({
                serviceId: '123',
                number: 10,
            });
    
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to update service number' });
        });
    });

    describe('POST /api/saveCallingTicket', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
    
        it('should return 400 if any parameters are missing', async () => {
            const response = await request(app).post('/api/saveCallingTicket').send({});
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: "missing parameters" });
        });
    
        it('should return 201 if ticket is saved successfully', async () => {
            getServiceById.mockResolvedValue('MockServiceName'); // Simula il servizio trovato
            insertCallingTicket.mockResolvedValue(); // Simula un salvataggio riuscito
    
            const response = await request(app).post('/api/saveCallingTicket').send({
                number: '123',
                serviceId: '456',
                actualCounter: 1,
            });
    
            expect(response.status).toBe(201);
            expect(getServiceById).toHaveBeenCalledWith('456');
            expect(insertCallingTicket).toHaveBeenCalledWith('MockServiceName', '123', 1);
        });
    
        it('should return 500 if there is an internal error', async () => {
            getServiceById.mockRejectedValue(new Error('Service not found')); // Simula un errore
    
            const response = await request(app).post('/api/saveCallingTicket').send({
                number: '123',
                serviceId: '456',
                actualCounter: 1,
            });
    
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "internal server error" });
        });
    });


    describe('GET /api/AllCustomers', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
    
        it('should return all customers', async () => {
            const mockCustomers = [{ id: 1, name: 'Customer A' }, { id: 2, name: 'Customer B' }];
            getAllCustomers.mockResolvedValue(mockCustomers); // Simula il ritorno di clienti
    
            const response = await request(app).get('/api/AllCustomers');
    
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockCustomers);
        });
    
        it('should return 500 if there is an internal error', async () => {
            getAllCustomers.mockRejectedValue(new Error('Database error')); // Simula un errore
    
            const response = await request(app).get('/api/AllCustomers');
    
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "internal server error" });
        });
    });

    describe('GET /api/NextCustomer', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
    
        it('should return 400 if counterN is missing', async () => {
            const response = await request(app).get('/api/NextCustomer');
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: "missing parameters" });
        });
    
        it('should return the next ticket', async () => {
            const mockNextTicket = { ticketNumber: '123', serviceId: '456' };
            getNextTicket.mockResolvedValue(mockNextTicket); // Simula il ritorno di un ticket
    
            const response = await request(app).get('/api/NextCustomer').query({ counterN: '1' });
    
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockNextTicket);
        });
    
        it('should return null if there is no next ticket', async () => {
            getNextTicket.mockResolvedValue(null); // Simula che non ci sia un ticket
    
            const response = await request(app).get('/api/NextCustomer').query({ counterN: '1' });
    
            expect(response.status).toBe(200);
            expect(response.body).toBeNull();
        });
    
        it('should return 500 if there is an internal error', async () => {
            getNextTicket.mockRejectedValue(new Error('Database error')); // Simula un errore
    
            const response = await request(app).get('/api/NextCustomer').query({ counterN: '1' });
    
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "internal server error" });
        });
    });


    describe('POST /api/DoneTicket', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
    
        it('should return 400 if number or counter is missing', async () => {
            const response = await request(app).post('/api/DoneTicket').send({});
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: "missing parameters" });
        });
    
        it('should return 404 if ticket is not found', async () => {
            getTicketInfo.mockResolvedValue(null); // Simula che il ticket non esista
    
            const response = await request(app).post('/api/DoneTicket').send({
                number: '123',
                counter: '1',
            });
    
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: "ticket not found" });
        });
    
        it('should return 201 if the ticket is processed successfully', async () => {
            const mockTicketInfo = { ticketNumber: '123', serviceId: '456' };
            getTicketInfo.mockResolvedValue(mockTicketInfo); // Simula il ritorno di informazioni sul ticket
    
            const response = await request(app).post('/api/DoneTicket').send({
                number: '123',
                counter: '1',
            });
    
            expect(response.status).toBe(201);
            expect(getTicketInfo).toHaveBeenCalledWith('123');
            expect(insertInDone_Ticket).toHaveBeenCalledWith(mockTicketInfo, '1');
            expect(deleteTicket).toHaveBeenCalledWith('123');
            expect(deleteFromCallingTicket).toHaveBeenCalledWith('123');
        });
    
        it('should return 500 if there is an internal error', async () => {
            getTicketInfo.mockRejectedValue(new Error('Database error')); // Simula un errore
    
            const response = await request(app).post('/api/DoneTicket').send({
                number: '123',
                counter: '1',
            });
    
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: "internal server error" });
        });
    });








});
