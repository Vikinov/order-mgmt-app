const request = require("supertest");
const app = require("../src/app");
require("dotenv").config();
const fs = require('fs');
const TestConstants = require("./tests.constants");

let token;
let menuId;

beforeAll(async () => {
    fs.writeFileSync("src/data/testdb.json", JSON.stringify(TestConstants.defaultDb), 'utf8');
    const res = await request(app).post("/api/v1.0/user/login").send(TestConstants.testUserCredentials);
    token = res.body.token;
});

describe("Add menu item", () => {
    it("should add a menu item to the list of menus", async () => {
        const res = await request(app)
        .post(TestConstants.menuEndpoint)
        .send(TestConstants.testMenuItem)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Menu item added successfully");
        menuId = res.body.data.id;
    });
});

describe("Update menu item", () => {
    it("should throw error for invalid menu id", async () => {
        const res = await request(app)
        .put(`${TestConstants.menuEndpoint}/123`)
        .send({ price: 225 })
        .set("Authorization", `Bearer ${token}`)
        expect(res.statusCode).toBe(400);
        expect(res.error.text).toMatch("Menu item not found");
    });
    it("should update the menu item based on ID passed", async () => {
        const res = await request(app)
        .put(`${TestConstants.menuEndpoint}/${menuId}`)
        .send({ price: 225 })
        .set("Authorization", `Bearer ${token}`)
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("Menu item updated successfully");
    });
});

describe("GET menu list", () => {
    it("should return the list of menus", async () => {
        const res = await request(app)
        .get(TestConstants.menuEndpoint)
        .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    });
});

describe("Delete menu item", () => {
    it("should throw error for invalid menu id", async () => {
        const res = await request(app)
        .delete(`${TestConstants.menuEndpoint}/123`)
        .set("Authorization", `Bearer ${token}`)
        expect(res.statusCode).toBe(400);
        expect(res.error.text).toMatch("Menu item not found");
    });
    it("should delete the menu item based on ID passed", async () => {
        const res = await request(app)
        .delete(`${TestConstants.menuEndpoint}/${menuId}`)
        .set("Authorization", `Bearer ${token}`)
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("Menu item deleted successfully");
    });
});
