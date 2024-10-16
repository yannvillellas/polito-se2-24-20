
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
    });
});
