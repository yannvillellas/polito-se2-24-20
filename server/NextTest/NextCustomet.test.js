import { test, expect, jest } from "@jest/globals";
import sqlite3 from 'sqlite3';
const { Database } = sqlite3.verbose();
import { getNextTicket, getTicketInfo, insertInDone_Ticket } from "../../src/dao/nextCustomer.mjs";


describe("getNextTicket", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test("should return the next ticket when available", async () => {
        // Mock database response for getNextTicket
        const mockRows = [
            { serviceId: 1, numberinQueue: 10, serviceTime: 15, number: 101 }
        ];

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(null, mockRows);
            return {};
        });

        const counterNumber = 1;
        const expectedTicket = { number: 101, serviceId: 1 };

        await expect(getNextTicket(counterNumber)).resolves.toStrictEqual(expectedTicket);
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("should return null if no tickets are available", async () => {
        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(null, []);
            return {};
        });

        const counterNumber = 1;
        await expect(getNextTicket(counterNumber)).resolves.toBeNull();
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("should reject with error if the query fails", async () => {
        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(new Error("Database error"));
            return {};
        });

        const counterNumber = 1;
        await expect(getNextTicket(counterNumber)).rejects.toThrow("Database error");
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });
});


describe("getTicketInfo", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test("should return ticket info for a valid ticket number", async () => {
        const mockRows = [
            { timeId: 1, serviceId: 2, number: 101 }
        ];

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(null, mockRows);
            return {};
        });

        const ticketNumber = 101;
        const expectedTicketInfo = { timeId: 1, serviceId: 2, number: 101 };

        await expect(getTicketInfo(ticketNumber)).resolves.toStrictEqual(expectedTicketInfo);
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("should return null if no ticket is found", async () => {
        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(null, []);
            return {};
        });

        const ticketNumber = 101;
        await expect(getTicketInfo(ticketNumber)).resolves.toBeNull();
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("should reject with error if the query fails", async () => {
        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(new Error("Database error"));
            return {};
        });

        const ticketNumber = 101;
        await expect(getTicketInfo(ticketNumber)).rejects.toThrow("Database error");
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });
});

describe("insertInDone_Ticket", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test("should update existing record in Done_Ticket if found", async () => {
        const ticketInfo = { timeId: 1, serviceId: 2, number: 101 };
        const counter = 1;

        jest.spyOn(Database.prototype, "run").mockImplementation((sql, params, callback) => {
            callback(null);
            return { changes: 1 };  // Simulate that an update happened
        });

        await expect(insertInDone_Ticket(ticketInfo, counter)).resolves.toBe(1);
        expect(Database.prototype.run).toHaveBeenCalledTimes(1);
    });

    test("should insert a new record in Done_Ticket if no update happens", async () => {
        const ticketInfo = { timeId: 1, serviceId: 2, number: 101 };
        const counter = 1;

        // First call to `run` simulates no changes (no update)
        jest.spyOn(Database.prototype, "run").mockImplementationOnce((sql, params, callback) => {
            callback(null);
            return { changes: 0 };  // Simulate that no update happened
        });

        // Second call to `run` simulates the insert
        jest.spyOn(Database.prototype, "run").mockImplementationOnce((sql, params, callback) => {
            callback(null);
            return { lastID: 123 };  // Simulate successful insert
        });

        await expect(insertInDone_Ticket(ticketInfo, counter)).resolves.toBe(123);
        expect(Database.prototype.run).toHaveBeenCalledTimes(2);
    });

    test("should reject with error if the update fails", async () => {
        const ticketInfo = { timeId: 1, serviceId: 2, number: 101 };
        const counter = 1;

        jest.spyOn(Database.prototype, "run").mockImplementation((sql, params, callback) => {
            callback(new Error("Update failed"));
        });

        await expect(insertInDone_Ticket(ticketInfo, counter)).rejects.toThrow("Update failed");
        expect(Database.prototype.run).toHaveBeenCalledTimes(1);
    });
});


