import { test, expect, jest } from "@jest/globals";
import { db } from "../src/database/db.mjs";
import {
    getAllCustomers,
    insertCallingTicket,
    deleteFromCallingTicket,
} from "../src/dao/callCustomerDAO.mjs";

jest.mock("../src/database/db.mjs");

describe("getAllCustomers", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should return all customers", async () => {
        const mockRows = [
            { ticketNumber: 1, courrierNumber: 101 },
            { ticketNumber: 2, courrierNumber: 102 },
        ];

        db.all.mockImplementation((query, params, callback) => {
            callback(null, mockRows);
        });

        const expectedCustomers = [
            { ticketNumber: 1, courrierNumber: 101 },
            { ticketNumber: 2, courrierNumber: 102 },
        ];

        await expect(getAllCustomers()).resolves.toStrictEqual(
            expectedCustomers
        );
        expect(db.all).toHaveBeenCalledTimes(1);
    });

    test("should return an empty array if no customers are found", async () => {
        db.all.mockImplementation((query, params, callback) => {
            callback(null, []);
        });

        await expect(getAllCustomers()).resolves.toStrictEqual([]);
        expect(db.all).toHaveBeenCalledTimes(1);
    });

    test("should reject with error if the query fails", async () => {
        db.all.mockImplementation((query, params, callback) => {
            callback(new Error("Database error"));
        });

        await expect(getAllCustomers()).rejects.toThrow("Database error");
        expect(db.all).toHaveBeenCalledTimes(1);
    });
});

describe("insertCallingTicket", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should insert a new calling ticket", async () => {
        db.get.mockImplementation((query, params, callback) => {
            callback(null, { count: 0 });
        });

        db.run.mockImplementation((query, params, callback) => {
            callback(null);
        });

        const serviceName = "Service A";
        const ticketNumber = 1;
        const actualCounter = 101;

        await expect(
            insertCallingTicket(serviceName, ticketNumber, actualCounter)
        ).resolves.toBeUndefined();
        expect(db.get).toHaveBeenCalledTimes(1);
        expect(db.run).toHaveBeenCalledTimes(1);
    });

    test("should not insert a duplicate calling ticket", async () => {
        db.get.mockImplementation((query, params, callback) => {
            callback(null, { count: 1 });
        });

        const serviceName = "Service A";
        const ticketNumber = 1;
        const actualCounter = 101;

        await expect(
            insertCallingTicket(serviceName, ticketNumber, actualCounter)
        ).resolves.toBeUndefined();
        expect(db.get).toHaveBeenCalledTimes(1);
        expect(db.run).not.toHaveBeenCalled();
    });

    test("should reject with error if the query fails", async () => {
        db.get.mockImplementation((query, params, callback) => {
            callback(new Error("Database error"));
        });

        const serviceName = "Service A";
        const ticketNumber = 1;
        const actualCounter = 101;

        await expect(
            insertCallingTicket(serviceName, ticketNumber, actualCounter)
        ).rejects.toThrow("Database error");
        expect(db.get).toHaveBeenCalledTimes(1);
        expect(db.run).not.toHaveBeenCalled();
    });
});

describe("deleteFromCallingTicket", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should delete a calling ticket", async () => {
        db.run.mockImplementation((query, params, callback) => {
            callback(null);
            return { changes: 1 };
        });

        const ticketNumber = 1;

        await expect(deleteFromCallingTicket(ticketNumber)).resolves.toBe(1);
        expect(db.run).toHaveBeenCalledTimes(1);
    });

    test("should resolve with 0 if no ticket is found", async () => {
        db.run.mockImplementation((query, params, callback) => {
            callback(null);
            return { changes: 0 };
        });

        const ticketNumber = 1;

        await expect(deleteFromCallingTicket(ticketNumber)).resolves.toBe(0);
        expect(db.run).toHaveBeenCalledTimes(1);
    });

    test("should reject with error if the query fails", async () => {
        db.run.mockImplementation((query, params, callback) => {
            callback(new Error("Database error"));
        });

        const ticketNumber = 1;

        await expect(deleteFromCallingTicket(ticketNumber)).rejects.toThrow(
            "Database error"
        );
        expect(db.run).toHaveBeenCalledTimes(1);
    });
});
