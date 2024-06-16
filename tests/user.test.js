const request = require("supertest");
const app = require("../src/app");
require("dotenv").config();
const fs = require('fs');
const TestConstants = require("./tests.constants");

let token;

beforeAll(() => {
    fs.writeFileSync("src/data/testdb.json", JSON.stringify(TestConstants.defaultDb), 'utf8');
});

describe("Register a new user", () => {
    it("should be able to register a new user", async () => {
        const res = await request(app)
        .post(`${TestConstants.userEndpoint}/register`)
        .send(TestConstants.testUser);
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("User registered successfully");
    });

    it("should throw an error for invalid email id", async () => {
        const res = await request(app)
        .post(`${TestConstants.userEndpoint}/register`)
        .send(TestConstants.testInvalidEmailUser);
        expect(res.statusCode).toBe(400);
        expect(res.error.text).toMatch("Invalid Email Id");
    });

    it("should throw an error for email id already exists", async () => {
        const res = await request(app)
        .post(`${TestConstants.userEndpoint}/register`)
        .send(TestConstants.testEmailsExistsUser);
        expect(res.statusCode).toBe(400);
        expect(res.error.text).toMatch("Email id already exists");
    });

    it("should throw an error for username already exists", async () => {
        const res = await request(app)
        .post(`${TestConstants.userEndpoint}/register`)
        .send(TestConstants.testUsernameExistsUser);
        expect(res.statusCode).toBe(400);
        expect(res.error.text).toMatch("Username already exists");
    });

});

describe("Login user", () => {

    it("should throw an error for invalid credentials", async () => {
        const res = await request(app)
        .post(`${TestConstants.userEndpoint}/login`)
        .send(TestConstants.testInvalidUser);
        expect(res.statusCode).toBe(400);
        expect(res.error.text).toMatch("Invalid login credentials");
    });

    it("should be able login to the application", async () => {
        const res = await request(app)
        .post(`${TestConstants.userEndpoint}/login`)
        .send({ username: TestConstants.testUser.username, password: TestConstants.testUser.password });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Login Successful");
        token = res.body.token;
    });
});

describe("Logout user", () => {
    it("should be able logout user from the application", async () => {
        const res = await request(app)
        .post(`${TestConstants.userEndpoint}/logout`)
        .set("Authorization", `Bearer ${token}`)
        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("User logged out successfully");
    });
});
