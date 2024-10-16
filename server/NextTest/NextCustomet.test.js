import { test, expect, jest } from "@jest/globals";
import sqlite3 from 'sqlite3';
const { Database } = sqlite3.verbose();
import { getNextTicket, getTicketInfo, insertInDone_Ticket } from "../../src/dao/nextCustomer.mjs";

// Mock database setup
jest.mock('../database/db.mjs', () => ({
    db: new Database(':memory:')
}));

describe("getNextTicket", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test("correctly retrieves the next ticket for the counter", async () => {
        const mockData = [
            { serviceId: 1, numberinQueue: 10, serviceTime: 20, number: 100 }
        ];

        jest.spyOn(Database.prototype, 'all').mockImplementation((query, params, callback) => {
            callback(null, mockData);  // simulate successful database query
        });

        const result = await getNextTicket(1);

        expect(result).toEqual({
            number: 100,
            serviceId: 1
        });

        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("handles no tickets available", async () => {
        jest.spyOn(Database.prototype, 'all').mockImplementation((query, params, callback) => {
            callback(null, []);  // simulate no rows returned
        });

        const result = await getNextTicket(1);

        expect(result).toBeNull();  // no tickets available
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("handles database error", async () => {
        jest.spyOn(Database.prototype, 'all').mockImplementation((query, params, callback) => {
            callback(new Error("DB error"));  // simulate error
        });

        await expect(getNextTicket(1)).rejects.toThrow("DB error");
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });
});

describe("getTicketInfo", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test("correctly retrieves ticket information", async () => {
        const mockData = [
            { timeId: 1, serviceId: 2, number: 100 }
        ];

        jest.spyOn(Database.prototype, 'all').mockImplementation((query, params, callback) => {
            callback(null, mockData);  // simulate successful database query
        });

        const result = await getTicketInfo(100);

        expect(result).toEqual({
            timeId: 1,
            serviceId: 2,
            number: 100
        });

        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("handles no ticket found", async () => {
        jest.spyOn(Database.prototype, 'all').mockImplementation((query, params, callback) => {
            callback(null, []);  // simulate no rows returned
        });

        const result = await getTicketInfo(100);

        expect(result).toBeNull();  // no ticket found
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("handles database error", async () => {
        jest.spyOn(Database.prototype, 'all').mockImplementation((query, params, callback) => {
            callback(new Error("DB error"));  // simulate error
        });

        await expect(getTicketInfo(100)).rejects.toThrow("DB error");
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });
});

describe("insertInDone_Ticket", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test("correctly updates done_ticket with existing record", async () => {
        const mockTicketInfo = { timeId: 1, serviceId: 2, number: 100 };

        jest.spyOn(Database.prototype, 'run').mockImplementation((query, params, callback) => {
            callback(null, { changes: 1 });  // simulate successful update
        });

        const result = await insertInDone_Ticket(mockTicketInfo, 1);

        expect(result).toEqual(1);  // 1 row updated
        expect(Database.prototype.run).toHaveBeenCalledTimes(1);
    });

    test("inserts new record when no existing entry", async () => {
        const mockTicketInfo = { timeId: 1, serviceId: 2, number: 100 };

        jest.spyOn(Database.prototype, 'run')
            .mockImplementationOnce((query, params, callback) => {
                callback(null, { changes: 0 });  // simulate no update
            })
            .mockImplementationOnce((query, params, callback) => {
                callback(null, { lastID: 1 });  // simulate successful insert
            });

        const result = await insertInDone_Ticket(mockTicketInfo, 1);

        expect(result).toEqual(1);  // inserted new row
        expect(Database.prototype.run).toHaveBeenCalledTimes(2);
    });

    test("handles database error during update", async () => {
        const mockTicketInfo = { timeId: 1, serviceId: 2, number: 100 };

        jest.spyOn(Database.prototype, 'run').mockImplementation((query, params, callback) => {
            callback(new Error("DB error"));  // simulate error
        });

        await expect(insertInDone_Ticket(mockTicketInfo, 1)).rejects.toThrow("DB error");
        expect(Database.prototype.run).toHaveBeenCalledTimes(1);
    });
});
