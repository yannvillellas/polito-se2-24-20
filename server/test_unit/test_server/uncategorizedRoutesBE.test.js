
import { test, expect, jest, afterEach } from "@jest/globals"
import request from 'supertest'
import express from "express"
import app from "../../Index.mjs";
import { getNumberOfServicesForCounter, getNumberOfCountersForService } from "../../src/dao/counterServicesDao.mjs";
import { getTodayTimeId, insertTime } from "../../src/dao/timeDAO.mjs";
import { getServices } from "../../src/dao/serviceDAO.mjs";
import { getLastNumber, insertTicket } from "../../src/dao/ticketDAO.mjs";

jest.mock("../../src/dao/counterServicesDao.mjs");
jest.mock("../../src/dao/timeDAO.mjs");
jest.mock("../../src/dao/serviceDAO.mjs");
jest.mock("../../src/dao/ticketDAO.mjs");



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
});
