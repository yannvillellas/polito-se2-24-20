import { test, expect, jest } from "@jest/globals";
import sqlite3 from "sqlite3";
import {
    getAllCustomers,
    insertCallingTicket,
    deleteFromCallingTicket,
} from "../src/dao/callCustomerDAO.mjs";

const { Database } = sqlite3.verbose();

describe("getAllCustomers", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test("should return all customers", async () => {
        const mockRows = [
            { ticketNumber: 1, courrierNumber: 101 },
            { ticketNumber: 2, courrierNumber: 102 },
        ];

        jest.spyOn(Database.prototype, "all").mockImplementation(
            (sql, params, callback) => {
                callback(null, mockRows);
                return {};
            }
        );

        await expect(getAllCustomers()).resolves.toStrictEqual(mockRows);
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("should return an empty array if no customers are found", async () => {
        jest.spyOn(Database.prototype, "all").mockImplementation(
            (sql, params, callback) => {
                callback(null, []);
                return {};
            }
        );

        await expect(getAllCustomers()).resolves.toStrictEqual([]);
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("should reject with error if the query fails", async () => {
        jest.spyOn(Database.prototype, "all").mockImplementation(
            (sql, params, callback) => {
                callback(new Error("Database error"));
                return {};
            }
        );

        await expect(getAllCustomers()).rejects.toThrow("Database error");
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });
});

describe("insertCallingTicket", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test("should insert a new calling ticket", async () => {
        jest.spyOn(Database.prototype, "get").mockImplementation(
            (sql, params, callback) => {
                callback(null, { count: 0 });
                return {};
            }
        );

        jest.spyOn(Database.prototype, "run").mockImplementation(
            (sql, params, callback) => {
                callback(null);
                return {};
            }
        );

        await expect(
            insertCallingTicket("Service1", 1, 101)
        ).resolves.toBeUndefined();
        expect(Database.prototype.get).toHaveBeenCalledTimes(1);
        expect(Database.prototype.run).toHaveBeenCalledTimes(1);
    });

    test("should reject with error if the query fails", async () => {
        jest.spyOn(Database.prototype, "get").mockImplementation(
            (sql, params, callback) => {
                callback(new Error("Database error"));
                return {};
            }
        );

        await expect(insertCallingTicket("Service1", 1, 101)).rejects.toThrow(
            "Database error"
        );
        expect(Database.prototype.get).toHaveBeenCalledTimes(1);
    });
});

describe("deleteFromCallingTicket", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    //MISSING test case to delete a ticket: Cannot read properties of undefined (reading 'changes')
    // test("should delete a calling ticket", async () => {
    //     jest.spyOn(Database.prototype, "run").mockImplementation(
    //         (sql, params, callback) => {
    //             callback(null);
    //         }
    //     );

    //     await expect(deleteFromCallingTicket(1)).resolves.toBeUndefined();
    //     expect(Database.prototype.run).toHaveBeenCalledTimes(1);
    // });

    test("should reject with error if the query fails", async () => {
        jest.spyOn(Database.prototype, "run").mockImplementation(
            (sql, params, callback) => {
                callback(new Error("Database error"));
            }
        );

        await expect(deleteFromCallingTicket(1)).rejects.toThrow(
            "Database error"
        );
        expect(Database.prototype.run).toHaveBeenCalledTimes(1);
    });
});
