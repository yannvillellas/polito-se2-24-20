
import { test, expect, jest, afterEach } from "@jest/globals"
import request from 'supertest'
import express from "express"
//import { app, server } from "../../Index.mjs"
import app from "../../Index.mjs";
import { getStats2Dmonth, getStats2Dweek, getStats2Dday, getStats3Dmonth, getStats3Dweek, getStats3Dday } from '../../src/dao/statsDAO.mjs';

jest.mock('../../src/dao/statsDAO.mjs');



describe("Server routes tests", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    /*afterEach((done) => {
        //server.close(done);
    })*/

    /* ************************ /api/Stats2Dmonth ************************* */
    describe("/api/Stats2Dmonth", () => {
        test("It should return a 200 success code", async () => {

            let DBdata = [
                { year: '2023', month: '10', serviceName: 'servizio1', totalTickets: '99' },
                { year: '2024', month: '10', serviceName: 'SPID', totalTickets: '20' },
                { year: '2024', month: '10', serviceName: 'spedizioni', totalTickets: '31' },
                { year: '2024', month: '10', serviceName: 'servizio3', totalTickets: '7' },
                { year: '2024', month: '11', serviceName: 'SPID', totalTickets: '26' },
            ]
            const resultData = [
                { year: '2024', month: '10', serviceName: 'SPID', totalTickets: '20' },
                { year: '2024', month: '10', serviceName: 'spedizioni', totalTickets: '31' },
                { year: '2024', month: '10', serviceName: 'servizio3', totalTickets: '7' },
            ]
            getStats2Dmonth.mockResolvedValue(DBdata);

            const response = await request(app)
                .get('/api/Stats2Dmonth')
                .query({ startDate: '2024-10-10', endDate: '2024-10-24' })
                .expect(200);

            expect(response.body).toStrictEqual(resultData);
            expect(getStats2Dmonth).toHaveBeenCalledTimes(1);


        });

        test("It should return a 500 error", async () => {
            getStats2Dmonth.mockResolvedValue(new Error());

            const response = await request(app)
                .get('/api/Stats2Dmonth')
                .query({ startDate: '2024-10-10', endDate: '2024-10-24' })
                .expect(500);

        });
        
    });

    describe("/api/Stats3Dmonth", () => {
        test("It should return a 200 success code", async () => {

            let DBdata = [
                { year: '2023', month: '10',counterN:'1', serviceName: 'servizio1', totalTickets: '99' },
                { year: '2024', month: '10',counterN:'1', serviceName: 'SPID', totalTickets: '20' },
                { year: '2024', month: '10',counterN:'2', serviceName: 'spedizioni', totalTickets: '31' },
                { year: '2024', month: '10',counterN:'3', serviceName: 'servizio3', totalTickets: '7' },
                { year: '2024', month: '11',counterN:'1', serviceName: 'SPID', totalTickets: '26' },
            ]
            const resultData = [
                { year: '2024', month: '10',counterN:'1', serviceName: 'SPID', totalTickets: '20' },
                { year: '2024', month: '10',counterN:'2', serviceName: 'spedizioni', totalTickets: '31' },
                { year: '2024', month: '10',counterN:'3', serviceName: 'servizio3', totalTickets: '7' },
            ]
            getStats3Dmonth.mockResolvedValue(DBdata);

            const response = await request(app)
                .get('/api/Stats3Dmonth')
                .query({ startDate: '2024-10-10', endDate: '2024-10-24' })
                .expect(200);

            expect(response.body).toStrictEqual(resultData);
            expect(getStats3Dmonth).toHaveBeenCalledTimes(1);
        });

        test("It should return a 500 error", async () => {
            getStats2Dmonth.mockResolvedValue(new Error());

            const response = await request(app)
                .get('/api/Stats3Dmonth')
                .query({ startDate: '2024-10-10', endDate: '2024-10-24' })
                .expect(500);
        });
    });

    describe("/api/Stats2Dweek", () => {
        test("It should return a 200 success code", async () => {

            let DBdata = [
                { year: '2023', month: '10',week:'1', serviceName: 'servizio1', totalTickets: '99' },
                { year: '2024', month: '10',week:'1', serviceName: 'SPID', totalTickets: '20' },
                { year: '2024', month: '10',week:'1', serviceName: 'spedizioni', totalTickets: '31' },
                { year: '2024', month: '10',week:'1', serviceName: 'servizio3', totalTickets: '7' },
                { year: '2024', month: '11',week:'1', serviceName: 'SPID', totalTickets: '26' },
            ]
            const resultData = [
                { year: '2024', month: '10',week:'1', serviceName: 'SPID', totalTickets: '20' },
                { year: '2024', month: '10',week:'1', serviceName: 'spedizioni', totalTickets: '31' },
                { year: '2024', month: '10',week:'1', serviceName: 'servizio3', totalTickets: '7' },
            ]
            getStats2Dweek.mockResolvedValue(DBdata);

            const response = await request(app)
                .get('/api/Stats2Dweek')
                .query({ startDate: '2024-10-10', endDate: '2024-10-24' })
                .expect(200);

            expect(response.body).toStrictEqual(resultData);
            expect(getStats2Dweek).toHaveBeenCalledTimes(1);
        });

        test("It should return a 500 error", async () => {
            getStats2Dmonth.mockResolvedValue(new Error());

            const response = await request(app)
                .get('/api/Stats2Dweek')
                .query({ startDate: '2024-10-10', endDate: '2024-10-24' })
                .expect(500);
        });
    });

    describe("/api/Stats3Dweek", () => {
        test("It should return a 200 success code", async () => {

            let DBdata = [
                { year: '2023', month: '10',week:'1',counterN:'1', serviceName: 'servizio1', totalTickets: '99' },
                { year: '2024', month: '10',week:'1',counterN:'1', serviceName: 'SPID', totalTickets: '20' },
                { year: '2024', month: '10',week:'1',counterN:'2', serviceName: 'spedizioni', totalTickets: '31' },
                { year: '2024', month: '10',week:'1',counterN:'3', serviceName: 'servizio3', totalTickets: '7' },
                { year: '2024', month: '11',week:'1',counterN:'1', serviceName: 'SPID', totalTickets: '26' },
            ]
            const resultData = [
                { year: '2024', month: '10',week:'1',counterN:'1', serviceName: 'SPID', totalTickets: '20' },
                { year: '2024', month: '10',week:'1',counterN:'2', serviceName: 'spedizioni', totalTickets: '31' },
                { year: '2024', month: '10',week:'1',counterN:'3', serviceName: 'servizio3', totalTickets: '7' },
            ]
            getStats3Dweek.mockResolvedValue(DBdata);

            const response = await request(app)
                .get('/api/Stats3Dweek')
                .query({ startDate: '2024-10-10', endDate: '2024-10-24' })
                .expect(200);

            expect(response.body).toStrictEqual(resultData);
            expect(getStats3Dweek).toHaveBeenCalledTimes(1);
        });

        test("It should return a 500 error", async () => {
            getStats2Dmonth.mockResolvedValue(new Error());

            const response = await request(app)
                .get('/api/Stats3Dweek')
                .query({ startDate: '2024-10-10', endDate: '2024-10-24' })
                .expect(500);
        });
    });

    describe("/api/Stats2Dday", () => {
        test("It should return a 200 success code", async () => {

            let DBdata = [
                { year: '2023', month: '10',day:'30', serviceName: 'servizio1', totalTickets: '99' },
                { year: '2024', month: '10',day:'20', serviceName: 'SPID', totalTickets: '20' },
                { year: '2024', month: '10',day:'05', serviceName: 'spedizioni', totalTickets: '31' },
                { year: '2024', month: '10',day:'11', serviceName: 'servizio3', totalTickets: '7' },
                { year: '2024', month: '11',day:'13',serviceName: 'SPID', totalTickets: '26' },
            ]
            const resultData = [
                { year: '2024', month: '10',day:'20', serviceName: 'SPID', totalTickets: '20' },
                { year: '2024', month: '10',day:'11', serviceName: 'servizio3', totalTickets: '7' },
            ]
            getStats2Dday.mockResolvedValue(DBdata);

            const response = await request(app)
                .get('/api/Stats2Dday')
                .query({ startDate: '2024-10-10', endDate: '2024-10-24' })
                .expect(200);

            expect(response.body).toStrictEqual(resultData);
            expect(getStats2Dday).toHaveBeenCalledTimes(1);
        });

        test("It should return a 500 error", async () => {
            getStats2Dmonth.mockResolvedValue(new Error());

            const response = await request(app)
                .get('/api/Stats2Dday')
                .query({ startDate: '2024-10-10', endDate: '2024-10-24' })
                .expect(500);
        });
    });

    describe("/api/Stats3Dday", () => {
        test("It should return a 200 success code", async () => {

            let DBdata = [
                { year: '2023', month: '10',day:'30',week:'4',counterN:'1', serviceName: 'servizio1', totalTickets: '99' },
                { year: '2024', month: '10',day:'20',week:'3',counterN:'1', serviceName: 'SPID', totalTickets: '20' },
                { year: '2024', month: '10',day:'05',week:'1',counterN:'2', serviceName: 'spedizioni', totalTickets: '31' },
                { year: '2024', month: '10',day:'11',week:'2',counterN:'3', serviceName: 'servizio3', totalTickets: '7' },
                { year: '2024', month: '11',day:'13',week:'2',counterN:'1',serviceName: 'SPID', totalTickets: '26' },
            ]
            const resultData = [
                { year: '2024', month: '10',day:'20',week:'3',counterN:'1', serviceName: 'SPID', totalTickets: '20' },
                { year: '2024', month: '10',day:'11',week:'2',counterN:'3', serviceName: 'servizio3', totalTickets: '7' },
            ]
            getStats3Dday.mockResolvedValue(DBdata);

            const response = await request(app)
                .get('/api/Stats3Dday')
                .query({ startDate: '2024-10-10', endDate: '2024-10-24' })
                .expect(200);

            expect(response.body).toStrictEqual(resultData);
            expect(getStats3Dday).toHaveBeenCalledTimes(1);
        });

        test("It should return a 500 error", async () => {
            getStats2Dmonth.mockResolvedValue(new Error());

            const response = await request(app)
                .get('/api/Stats3Dday')
                .query({ startDate: '2024-10-10', endDate: '2024-10-24' })
                .expect(500);
        });
    });
});
