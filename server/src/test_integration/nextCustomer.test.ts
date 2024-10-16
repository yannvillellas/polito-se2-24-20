import { describe, test, expect, beforeAll, afterAll } from "@jest/globals";
import request from 'supertest';
import { app } from "../index"; // Make sure this imports your express app
import { cleanup } from "../src/db/cleanup"; // Adjust the cleanup function for your database if needed

const routePath = "/api"; // Base route path for the API

// Before running tests, clean the database and set up necessary data
beforeAll(async () => {
    await cleanup(); // Ensure the DB is clean before tests
});

// After running tests, clean the database
afterAll(() => {
    cleanup();
});

describe("NextCustomer API integration tests", () => {
    
    describe("GET /NextCustomer", () => {
        test("It should return the next customer for a given counter", async () => {
            const counterN = 1; // Assuming counter 1 is being tested

            // Call the API to get the next customer for the counter
            const response = await request(app)
                .get(`${routePath}/NextCustomer?counterN=${counterN}`)
                .expect(200); // Check for a successful response

            // Verify the response body contains valid data
            expect(response.body).toHaveProperty('number');
            expect(response.body).toHaveProperty('serviceId');
        });

        test("It should return null if no customers are in the queue", async () => {
            const counterN = 999; // Assuming no customer is assigned to counter 999

            // Call the API to get the next customer for the counter
            const response = await request(app)
                .get(`${routePath}/NextCustomer?counterN=${counterN}`)
                .expect(200); // Check for a successful response

            // Verify that no customer is found
            expect(response.body).toBeNull();
        });
    });

    describe("POST /DoneTicket", () => {
        test("It should mark the current customer as served", async () => {
            const actualCustomerInfo = { number: 1, serviceId: 1 }; // Example customer info
            const actualCounter = 1;

            // Call the API to mark the customer as served
            await request(app)
                .post(`${routePath}/DoneTicket`)
                .send({ number: actualCustomerInfo.number, counter: actualCounter })
                .expect(200); // Check for a successful response

            // Add any additional checks if needed to verify the DB changes
        });

        test("It should return a 400 error if customer info or counter is missing", async () => {
            // Call the API with missing customer info
            await request(app)
                .post(`${routePath}/DoneTicket`)
                .send({ counter: 1 }) // Missing customer number
                .expect(400);

            // Call the API with missing counter
            await request(app)
                .post(`${routePath}/DoneTicket`)
                .send({ number: 1 }) // Missing counter
                .expect(400);
        });
    });
});
