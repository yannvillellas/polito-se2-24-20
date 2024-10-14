import { test, expect, jest } from "@jest/globals";
import { getLastNumber, insertTicket } from "../src/dao/ticketDAO.mjs";
import sqlite3 from "sqlite3";
const { Database } = sqlite3.verbose();

describe("Ticket DAO Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    describe("getLastNumber", () => {
        test("should return the ticket number if exists", async () => {
            jest.spyOn(Database.prototype, "get").mockImplementation(
                (sql, params, callback) => {
                    callback(null, { number: 5 });
                }
            );

            const result = await getLastNumber();
            expect(result).toBe(5);
        });

        test("should return 0 if no ticket exists", async () => {
            jest.spyOn(Database.prototype, "get").mockImplementation(
                (sql, params, callback) => {
                    callback(null, undefined);
                }
            );

            const result = await getLastNumber();
            expect(result).toBe(0);
        });
    });

    describe("insertTicket", () => {
        test("should insert a new ticket and return the number", async () => {
            const mockNumber = 5;
            const mockEstimatedTime = "10:30";
            const mockServiceId = 1;
            const mockTimeId = 1;

            jest.spyOn(Database.prototype, "run").mockImplementation(
                (sql, params, callback) => {
                    callback(null);
                }
            );

            const result = await insertTicket(
                mockNumber,
                mockEstimatedTime,
                mockServiceId,
                mockTimeId
            );
            expect(result).toBe(mockNumber);
            expect(Database.prototype.run).toHaveBeenCalledTimes(1);
            expect(Database.prototype.run).toHaveBeenCalledWith(
                expect.any(String),
                [mockNumber + 1, mockEstimatedTime, mockServiceId, mockTimeId],
                expect.any(Function)
            );
        });

        test("should reject on database error", async () => {
            jest.spyOn(Database.prototype, "run").mockImplementation(
                (sql, params, callback) => {
                    callback(new Error("Insert error"));
                }
            );

            await expect(insertTicket(5, "10:30", 1, 1)).rejects.toThrow(
                "Insert error"
            );
        });
    });
});
