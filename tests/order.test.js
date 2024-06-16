const request = require("supertest");
const app = require("../src/app");
require("dotenv").config();
const fs = require('fs');
const TestConstants = require("./tests.constants");

let token;
let orderId;

beforeAll(async () => {
    fs.writeFileSync("src/data/testdb.json", JSON.stringify(TestConstants.defaultDb), 'utf8');
    const res = await request(app).post("/api/v1.0/user/login").send(TestConstants.testUserCredentials);
    token = res.body.token;
});

describe("Place Order", () => {
    it("should throw error for minimun number of items to place order", async () => {
        const res = await request(app)
        .post(TestConstants.orderEndpoint)
        .send(TestConstants.testInvalidOrder)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(400);
        expect(res.error.text).toMatch("Atleast 1 item is needed to place an order");
    });

    it("should place a new order", async () => {
        const res = await request(app)
        .post(TestConstants.orderEndpoint)
        .send(TestConstants.testOrder)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Order placed successfully");
        orderId = res.body.data.id;
    });
});

describe("Update order status", () => {

    it("should throw error for invalid order id", async () => {
        const res = await request(app)
        .put(`${TestConstants.orderEndpoint}/123/status`)
        .send({ status: "delivered" })
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(400);
        expect(res.error.text).toMatch("Invalid Order Id");
    });

    it("should update the order status", async () => {
        const res = await request(app)
        .put(`${TestConstants.orderEndpoint}/${orderId}/status`)
        .send({ status: "delivered" })
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("Order status updated successfully");
    });
});

describe("Get Order Details", () => {
    it("should throw error for invalid order id", async () => {
        const res = await request(app)
        .get(`${TestConstants.orderEndpoint}/123`)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(400);
        expect(res.error.text).toMatch("Invalid Order Id");
    });
    it("should fetch the order details based on the order id", async () => {
        const res = await request(app)
        .get(`${TestConstants.orderEndpoint}/${orderId}`)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });
});

describe("Get Order History", () => {
    it("should get the list orders for the user", async () => {
        const res = await request(app)
        .get(`${TestConstants.orderEndpoint}/history`)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    });
});
