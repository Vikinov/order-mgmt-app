const request = require("supertest");
const app = require("../src/app");
require("dotenv").config();
const fs = require('fs');
const TestConstants = require("./tests.constants");

let token;

beforeAll(async () => {
    fs.writeFileSync("src/data/testdb.json", JSON.stringify(TestConstants.defaultDb), 'utf8');
    const res = await request(app).post("/api/v1.0/user/login").send(TestConstants.testUserCredentials);
    token = res.body.token;
});


describe("Get Cart", () => {
    it("should get the list of cart", async () => {
        const res = await request(app)
        .get(TestConstants.cartEndpoint)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
    });
});

describe("Add item to cart", () => {
    it("should throw error for invalid cart id", async () => {
        const res = await request(app)
        .post(`${TestConstants.cartEndpoint}/123`)
        .send(TestConstants.testItem)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(400);
        expect(res.error.text).toMatch("Invalid Cart id");
    });

    it("should be able to add the passed item to the cart", async () => {
        const res = await request(app)
        .post(`${TestConstants.cartEndpoint}/${TestConstants.testCartId}`)
        .send(TestConstants.testItem)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("Item added successfuly");
    });

    it("should throw error for invalid cart id", async () => {
        const res = await request(app)
        .post(`${TestConstants.cartEndpoint}/${TestConstants.testCartId}`)
        .send(TestConstants.testItem)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(400);
        expect(res.error.text).toMatch("Item already exists in cart");
    });
});

describe("Update quantity of item in cart", () => {

    it("should throw error for invalid quantity", async () => {
        const res = await request(app)
        .put(`${TestConstants.cartEndpoint}/${TestConstants.testCartId}/${TestConstants.testItemId}`)
        .send({ quantity: -1 })
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(400);
        expect(res.error.text).toMatch("invalid quantity of item");
    });

    it("should throw error for invalid cart id", async () => {
        const res = await request(app)
        .put(`${TestConstants.cartEndpoint}/123/${TestConstants.testItemId}`)
        .send({ quantity: 2 })
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(400);
        expect(res.error.text).toMatch("invalid cart id");
    });

    it("should throw error for invalid item id", async () => {
        const res = await request(app)
        .put(`${TestConstants.cartEndpoint}/${TestConstants.testCartId}/123`)
        .send({ quantity: 2 })
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(400);
        expect(res.error.text).toMatch("invalid item id");
    });

    it("should update the quantity of the item in the cart", async () => {
        const res = await request(app)
        .put(`${TestConstants.cartEndpoint}/${TestConstants.testCartId}/${TestConstants.testItemId}`)
        .send({ quantity: 2 })
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("Item updated successfuly");
    });
});

describe("Delete item in cart", () => {

    it("should throw error for invalid cart id", async () => {
        const res = await request(app)
        .delete(`${TestConstants.cartEndpoint}/123/${TestConstants.testItemId}`)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(400);
        expect(res.error.text).toMatch("invalid cart id");
    });

    it("should throw error for invalid item id", async () => {
        const res = await request(app)
        .delete(`${TestConstants.cartEndpoint}/${TestConstants.testCartId}/123`)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(400);
        expect(res.error.text).toMatch("invalid item id");
    });

    it("should remove the item from the cart", async () => {
        const res = await request(app)
        .delete(`${TestConstants.cartEndpoint}/${TestConstants.testCartId}/${TestConstants.testItemId}`)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("Item deleted successfuly");
    });
});
