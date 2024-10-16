
import { test, expect, jest, afterEach } from "@jest/globals"
import request from 'supertest'
import express from "express"
import { app, server } from "../../Index.mjs"
import * as dao from "../../src/dao/statsDAO.mjs"
//import { getStats2Dmonth, getStats2Dweek, getStats2Dday, getStats3Dmonth, getStats3Dweek, getStats3Dday } from './src/dao/statsDAO.mjs';
//import getStats2Dmonth from "../../src/dao/statsDAO.mjs"


//const baseURL = "/ezelectronics"
//let app: express.Application;

jest.mock('../../src/dao/statsDAO');


/*jest.mock('../../src/dao/statsDAO.mjs', () => ({
    getStats2Dmonth: jest.fn(),
}));*/

/*jest.mock(dao, () => ({
    __esModule: true,
    getStats2Dmonth: jest.fn().mockResolvedValueOnce("prova"),
}));*/

describe("Server routes tests", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    afterEach((done) => {
        server.close(done);
    })

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

            //getStats2Dmonth.mockResolvedValue(DBdata);
            dao.getStats2Dmonth.mockResolvedValue(DBdata);
            //jest.spyOn(dao, 'getStats2Dmonth').mockResolvedValueOnce(resultData);
            //dao.getStats2Dmonth = jest.fn().mockResolvedValueOnce(resultData);
            //getStats2Dmonth = jest.fn().mockResolvedValueOnce(resultData);
            //jest.spyOn(dao, "getStats2Dmonth").mockResolvedValueOnce(resultData)

            const response = await request(app)
                .get('/api/Stats2Dmonth')
                .query({ startDate: '2024-10-10', endDate: '2024-10-24' })
                //.expect('Content-Type', 'json')
                .expect(200);

            // Controlla che il risultato sia stato filtrato correttamente
            expect(response.body).toStrictEqual(resultData);

            // Verifica che getStats2Dmonth sia stato chiamato una volta
            expect(getStats2Dmonth).toHaveBeenCalledTimes(1);

            // Verifica che isDateInRange sia stato chiamato per ogni item in mockStats
            expect(isDateInRange).toHaveBeenCalledTimes(3);

        });
    });
});
