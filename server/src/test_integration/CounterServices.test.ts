import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import { getNumberOfServicesForCounter, getNumberOfCountersForService } from "../src/dao/counterServicesDao.mjs";
import { db } from "../src/database/db.mjs";  // Assuming you export the db for testing purposes

describe("CounterServices DAO integration tests", () => {
    beforeAll(async () => {
        // Initialize the database with test data
        await db.run(`INSERT INTO CounterAndServices (counterN, serviceId) VALUES (1, 1)`);
    });

    afterAll(async () => {
        // Clean up the database
        await db.run(`DELETE FROM CounterAndServices`);
    });

    test("getNumberOfServicesForCounter should return the number of services for a specific counter", async () => {
        const numberOfServices = await getNumberOfServicesForCounter(1);
        expect(numberOfServices).toBe(1);  // Expecting 1 based on the data inserted in beforeAll
    });

    test("getNumberOfCountersForService should return the counters associated with a service", async () => {
        const counters = await getNumberOfCountersForService(1);
        expect(counters).toEqual([1]);  // Expecting an array with counter 1
    });
});
