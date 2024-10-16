
import { test, expect, jest, afterEach } from "@jest/globals"
import request from 'supertest'
import express from "express"
import app from "../../Index.mjs";
import { getLastNumber } from "../../src/dao/ticketDAO.mjs";

jest.mock("../../src/dao/ticketDAO.mjs");




describe("Server routes tests", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });


    /* ************************ '/api/counter-services/services/:counterN' ************************* */
    describe("/api/counter-services/services/:counterN", () => {

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

});
