import { test, expect, jest } from "@jest/globals"

//import { Database } from "sqlite3"
import sqlite3 from 'sqlite3';
const { Database } = sqlite3.verbose();

import { getStats2Dday,getStats2Dmonth,getStats2Dweek } from "../../src/dao/statsDAO.mjs";

describe("getStats2Dmonth", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test("correct getStats2Dmonth DAO", async () => {
        let startData="10/10/2024";
        let endData="11/11/2024"

        let data=[
            {time:'10',sevice:'s1', count:'130'},  //time could be also the full data that is elaborated then in the server
            {time:'10', service:'s2', count:'150'},
            {time:'11', service:'s1', count:'76'},
            {time:'11', service:'s3', count:'29'},
        ]

        /*mock of DB result*/
        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(null, data);
            return ({});
        });

        /*calling function to test*/
        await expect(getStats2Dmonth(startData, endData)).resolves.toStrictEqual(data);     //see if parameters changes
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("getStats2Dmonth DAO - Error", async () => {
        let startData="10/10/2024";
        let endData="11/11/2024"

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(Error);
            return ({});
        });

        await expect(getStats2Dmonth(startData, endData)).rejects.toBe(Error);     //see if parameters changes
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    
});

describe("getStats2Dweek", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test("correct getStats2Dweek DAO", async () => {
        let startData="10/10/2024";
        let endData="11/10/2024"

        let data=[
            {time:'week_n',sevice:'s1', count:'130'}, //time could be also the full data that is elaborated then in the server
            {time:'week_n',sevice:'s2', count:'0'},
            {time:'week_n',sevice:'s3', count:'51'},       
        ]

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(null, data);
            return ({});
        });

        await expect(getStats2Dweek(startData, endData)).resolves.toStrictEqual(data);     //see if parameters changes
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
        let startData="10/10/2024";
        let endData="11/10/2024"

        let data=[
            {time:'10/10/2024',sevice:'s1', count:'130'}, //time could be also the full data that is elaborated then in the server
            {time:'10/10/2024',sevice:'s2', count:'35'},
            {time:'11/10/2024',sevice:'s2', count:'51'},       
        ]

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(null, data);
            return ({});
        });

        await expect(getStats2Dday(startData, endData)).resolves.toStrictEqual(data);     //see if parameters changes
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("getStats2Dday DAO - Error", async () => {
        let startData="10/10/2024";
        let endData="11/11/2024"

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(Error);
            return ({});
        });

        await expect(getStats2Dday(startData, endData)).rejects.toBe(Error);     //see if parameters changes
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
        let startData="10/10/2024";
        let endData="11/11/2024"

        let data=[//time could be also the full data that is elaborated then in the server
            {time:'10',sevice:'s1',counter:'c1', count:'130'}, 
            {time:'10',sevice:'s1',counter:'c2', count:'54'}, 
            {time:'10', service:'s2',counter:'c1', count:'150'},
            {time:'10', service:'s2',counter:'c3', count:'34'},
            {time:'11', service:'s1', counter:'c2', count:'76'},
            {time:'11', service:'s3',counter:'c2', count:'29'},
        ]

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(null, data);
            return ({});
        });

        await expect(getStats3Dmonth(startData, endData)).resolves.toStrictEqual(data);     //see if parameters changes
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("getStats3Dmonth DAO - Error", async () => {
        let startData="10/10/2024";
        let endData="11/11/2024"

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(Error);
            return ({});
        });

        await expect(getStats3Dmonth(startData, endData)).rejects.toBe(Error);     //see if parameters changes
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });
});

describe("getStats3Dweek", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test("correct getStats3Dweek DAO", async () => {
        let startData="10/10/2024";
        let endData="11/10/2024"

        let data=[//time could be also the full data that is elaborated then in the server
            {time:'week1',sevice:'s1',counter:'c1', count:'130'}, 
            {time:'week1',sevice:'s1',counter:'c2', count:'54'}, 
            {time:'week1', service:'s2',counter:'c1', count:'150'},
            {time:'week1', service:'s2',counter:'c3', count:'34'},
        ]

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(null, data);
            return ({});
        });

        await expect(getStats3Dweek(startData, endData)).resolves.toStrictEqual(data);     //see if parameters changes
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("getStats3Dweek DAO - Error", async () => {
        let startData="10/10/2024";
        let endData="11/11/2024"

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(Error);
            return ({});
        });

        await expect(getStats3Dweek(startData, endData)).rejects.toBe(Error);     //see if parameters changes
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });
});

describe("getStats3Dday", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    test("correct getStats3Dday DAO", async () => {
        let startData="10/10/2024";
        let endData="11/10/2024"

        let data=[//time could be also the full data that is elaborated then in the server
            {time:'10/10/2024',sevice:'s1',counter:'c1', count:'130'}, 
            {time:'10/10/2024',sevice:'s1',counter:'c2', count:'54'}, 
            {time:'10/10/2024', service:'s2',counter:'c1', count:'150'},
            {time:'10/10/2024', service:'s2',counter:'c3', count:'34'},
            {time:'11/10/2024', service:'s1', counter:'c2', count:'76'},
            {time:'11/10/2021', service:'s3',counter:'c2', count:'29'},      
        ]

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(null, data);
            return ({});
        });

        await expect(getStats3Dday(startData, endData)).resolves.toStrictEqual(data);     //see if parameters changes
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });

    test("getStats3Dday DAO - Error", async () => {
        let startData="10/10/2024";
        let endData="11/11/2024"

        jest.spyOn(Database.prototype, "all").mockImplementation((sql, params, callback) => {
            callback(Error);
            return ({});
        });

        await expect(getStats3Dday(startData, endData)).rejects.toBe(Error);     //see if parameters changes
        expect(Database.prototype.all).toHaveBeenCalledTimes(1);
    });
});