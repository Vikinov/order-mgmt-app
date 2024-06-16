const express = require("express");
const user = express.Router();
const UserHandler = require("../handlers/user.handler");
const authenticationMiddleware = require("../auth/authenticationMiddleware");

/**
 * @openapi
 * '/api/v1.0/user/register':
 *  post:
 *     tags:
 *     - User
 *     summary: Register
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *              - email
 *            properties:
 *              email:
 *                type: string
 *                default: john@doe.com
 *              username:
 *                type: string
 *                default: johndoe
 *              password:
 *                type: string
 *                default: johndoe@111
 *     responses:
 *      200:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
user.post("/register", UserHandler.registerUser);

/**
 * @openapi
 * '/api/v1.0/user/login':
 *  post:
 *     tags:
 *     - User
 *     summary: Login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                default: johndoe
 *              password:
 *                type: string
 *                default: johndoe@111
 *     responses:
 *      200:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
user.post("/login", UserHandler.authenticateAndLoginUser);

/**
 * @openapi
 * '/api/v1.0/user/logout':
 *  post:
 *     tags:
 *     - User
 *     summary: Logout
 *     requestBody:
 *      required: false
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *     responses:
 *      200:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
user.post("/logout", authenticationMiddleware, UserHandler.logoutUser);

module.exports = user;
