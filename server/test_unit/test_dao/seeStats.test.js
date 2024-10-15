import { test, expect, jest } from "@jest/globals"

//import { Database } from "sqlite3"
import sqlite3 from 'sqlite3';
const { Database } = sqlite3.verbose();

import { getStats2Dday,getStats2Dmonth,getStats2Dweek,getStats3Dday,getStats3Dweek,getStats3Dmonth } from "../../src/dao/statsDAO.mjs";

describe("getStats2Dmonth", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test("correct getStats2Dmonth DAO", async () => {

        let DBdata=[
            {year:'2023' ,month:'10' ,name:'servizio1', totalTickets:'99'},
            {year:'2024' ,month:'10' ,name:'SPID', totalTickets:'20'},
            {year:'2024' ,month:'10' ,name:'spedizioni', totalTickets:'31'},
            {year:'2024' ,month:'10' ,name:'servizio3', totalTickets:'7'},
            {year:'2024' ,month:'11' ,name:'SPID', totalTickets:'26'},
        ]

        let resultData=[
            {year:'2023' ,month:'10' ,serviceName:'servizio1', totalTickets:'99'},
            {year:'2024' ,month:'10' ,serviceName:'SPID', totalTickets:'20'},
            {year:'2024' ,month:'10' ,serviceName:'spedizioni', totalTickets:'31'},
            {year:'2024' ,month:'10' ,serviceName:'servizio3', totalTickets:'7'},
            {year:'2024' ,month:'11' ,serviceName:'SPID', totalTickets:'26'},
        ]

        /*mock of DB result*/
        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(null, DBdata);
            return ({});
        });

        /*calling function to test*/
        await expect(getStats2Dmonth()).resolves.toStrictEqual(resultData);
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("getStats2Dmonth DAO - Error", async () => {

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(Error);
            return ({});
        });

        await expect(getStats2Dmonth()).rejects.toBe(Error);     //see if parameters changes
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    
});

describe("getStats2Dweek", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test("correct getStats2Dweek DAO", async () => {
        let DBdata=[
            {year:'2023' ,month:'10' ,week:'1',name:'servizio1', totalTickets:'99'},
            {year:'2024' ,month:'10' ,week:'1',name:'SPID', totalTickets:'20'},
            {year:'2024' ,month:'10' ,week:'1',name:'spedizioni', totalTickets:'31'},
            {year:'2024' ,month:'10' ,week:'1',name:'servizio3', totalTickets:'7'},
            {year:'2024' ,month:'11' ,week:'2',name:'SPID', totalTickets:'26'},
        ]

        let resultData=[
            {year:'2023' ,month:'10' ,week:'1',serviceName:'servizio1', totalTickets:'99'},
            {year:'2024' ,month:'10' ,week:'1',serviceName:'SPID', totalTickets:'20'},
            {year:'2024' ,month:'10' ,week:'1',serviceName:'spedizioni', totalTickets:'31'},
            {year:'2024' ,month:'10' ,week:'1',serviceName:'servizio3', totalTickets:'7'},
            {year:'2024' ,month:'11' ,week:'2',serviceName:'SPID', totalTickets:'26'},
        ]

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(null, DBdata);
            return ({});
        });

        await expect(getStats2Dweek()).resolves.toStrictEqual(resultData);     //see if parameters changes
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("getStats2Dweek DAO - Error", async () => {
        let startData="10/10/2024";
        let endData="11/11/2024"

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(Error);
            return ({});
        });

        await expect(getStats2Dweek(startData, endData)).rejects.toBe(Error);     //see if parameters changes
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });
});

describe("getStats2Dday", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test("correct getStats2Dday DAO", async () => {
        let DBdata=[
            {year:'2023' ,month:'10' ,day:'10',name:'servizio1', totalTickets:'99'},
            {year:'2024' ,month:'10' ,day:'10',name:'SPID', totalTickets:'20'},
            {year:'2024' ,month:'10' ,day:'12',name:'spedizioni', totalTickets:'31'},
            {year:'2024' ,month:'10' ,day:'12',name:'servizio3', totalTickets:'7'},
            {year:'2024' ,month:'11' ,day:'30',name:'SPID', totalTickets:'26'},
        ]

        let resultData=[
            {year:'2023' ,month:'10' ,day:'10',serviceName:'servizio1', totalTickets:'99'},
            {year:'2024' ,month:'10' ,day:'10',serviceName:'SPID', totalTickets:'20'},
            {year:'2024' ,month:'10' ,day:'12',serviceName:'spedizioni', totalTickets:'31'},
            {year:'2024' ,month:'10' ,day:'12',serviceName:'servizio3', totalTickets:'7'},
            {year:'2024' ,month:'11' ,day:'30',serviceName:'SPID', totalTickets:'26'},
        ]

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(null,DBdata );
            return ({});
        });

        await expect(getStats2Dday()).resolves.toStrictEqual(resultData);     //see if parameters changes
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("getStats2Dday DAO - Error", async () => {
        let startData="10/10/2024";
        let endData="11/11/2024"

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(Error);
            return ({});
        });

        await expect(getStats2Dday()).rejects.toBe(Error);     //see if parameters changes
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });
});

/*################# funzioni 3D #########################*/


describe("getStats3Dmonth", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test("correct getStats3Dmonth DAO", async () => {
        let DBdata=[
            {year:'2023' ,month:'10' ,counterN:'1',name:'servizio1', totalTickets:'99'},
            {year:'2024' ,month:'10' ,counterN:'2',name:'SPID', totalTickets:'20'},
            {year:'2024' ,month:'10' ,counterN:'1',name:'SPID', totalTickets:'31'},
            {year:'2024' ,month:'10' ,counterN:'3',name:'servizio3', totalTickets:'7'},
            {year:'2024' ,month:'11' ,counterN:'1',name:'SPID', totalTickets:'26'},
        ]

        let resultData=[
            {year:'2023' ,month:'10' ,counterN:'1',serviceName:'servizio1', totalTickets:'99'},
            {year:'2024' ,month:'10' ,counterN:'2',serviceName:'SPID', totalTickets:'20'},
            {year:'2024' ,month:'10' ,counterN:'1',serviceName:'SPID', totalTickets:'31'},
            {year:'2024' ,month:'10' ,counterN:'3',serviceName:'servizio3', totalTickets:'7'},
            {year:'2024' ,month:'11' ,counterN:'1',serviceName:'SPID', totalTickets:'26'},
        ]

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(null, DBdata);
            return ({});
        });

        await expect(getStats3Dmonth()).resolves.toStrictEqual(resultData);     //see if parameters changes
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("getStats3Dmonth DAO - Error", async () => {

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(Error);
            return ({});
        });

        await expect(getStats3Dmonth()).rejects.toBe(Error);     //see if parameters changes
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });
});

describe("getStats3Dweek", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test("correct getStats3Dweek DAO", async () => {
        let DBdata=[
            {year:'2023' ,month:'10' ,week:'1',counterN:'1',name:'servizio1', totalTickets:'99'},
            {year:'2024' ,month:'10' ,week:'1',counterN:'2',name:'SPID', totalTickets:'20'},
            {year:'2024' ,month:'10' ,week:'1',counterN:'1',name:'SPID', totalTickets:'31'},
            {year:'2024' ,month:'10' ,week:'1',counterN:'3',name:'servizio3', totalTickets:'7'},
            {year:'2024' ,month:'11' ,week:'2',counterN:'1',name:'SPID', totalTickets:'26'},
        ]

        let resultData=[
            {year:'2023' ,month:'10' ,week:'1',counterN:'1',serviceName:'servizio1', totalTickets:'99'},
            {year:'2024' ,month:'10' ,week:'1',counterN:'2',serviceName:'SPID', totalTickets:'20'},
            {year:'2024' ,month:'10' ,week:'1',counterN:'1',serviceName:'SPID', totalTickets:'31'},
            {year:'2024' ,month:'10' ,week:'1',counterN:'3',serviceName:'servizio3', totalTickets:'7'},
            {year:'2024' ,month:'11' ,week:'2',counterN:'1',serviceName:'SPID', totalTickets:'26'},
        ]

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(null, DBdata);
            return ({});
        });

        await expect(getStats3Dweek()).resolves.toStrictEqual(resultData);     //see if parameters changes
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("getStats3Dweek DAO - Error", async () => {

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(Error);
            return ({});
        });

        await expect(getStats3Dweek()).rejects.toBe(Error);     //see if parameters changes
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });
});

describe("getStats3Dday", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test("correct getStats3Dday DAO", async () => {
        let DBdata=[
            {year:'2023' ,month:'10' ,day:'10',counterN:'1',name:'servizio1', totalTickets:'99'},
            {year:'2024' ,month:'10' ,day:'10',counterN:'2',name:'SPID', totalTickets:'20'},
            {year:'2024' ,month:'10' ,day:'11',counterN:'1',name:'SPID', totalTickets:'31'},
            {year:'2024' ,month:'10' ,day:'11',counterN:'3',name:'servizio3', totalTickets:'7'},
            {year:'2024' ,month:'11' ,day:'10',counterN:'1',name:'SPID', totalTickets:'26'},
        ]

        let resultData=[
            {year:'2023' ,month:'10' ,day:'10',counterN:'1',serviceName:'servizio1', totalTickets:'99'},
            {year:'2024' ,month:'10' ,day:'10',counterN:'2',serviceName:'SPID', totalTickets:'20'},
            {year:'2024' ,month:'10' ,day:'11',counterN:'1',serviceName:'SPID', totalTickets:'31'},
            {year:'2024' ,month:'10' ,day:'11',counterN:'3',serviceName:'servizio3', totalTickets:'7'},
            {year:'2024' ,month:'11' ,day:'10',counterN:'1',serviceName:'SPID', totalTickets:'26'},
        ]

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(null, DBdata);
            return ({});
        });

        await expect(getStats3Dday()).resolves.toStrictEqual(resultData);     //see if parameters changes
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("getStats3Dday DAO - Error", async () => {

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(Error);
            return ({});
        });

        await expect(getStats3Dday()).rejects.toBe(Error);     //see if parameters changes
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });
});