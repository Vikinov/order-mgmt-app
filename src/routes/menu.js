const express = require("express");
const menu = express.Router();
const MenuHandler = require("../handlers/menu.handler");

/**
* @openapi
* "/api/v1.0/menu":
*  get:
*     tags:
*     - Menu
*     summary: Get list of menu items
*     responses:
*      200:
*        description: Menu Items Fetched Successfully
*      400:
*        description: Bad Request
*      403:
*        description: Authentication Failure
*      404:
*        description: Not Found
*      500:
*        description: Server Error
*/
menu.get("/", MenuHandler.getMenuList);

 /**
 * @openapi
 * '/api/v1.0/menu':
 *  post:
 *     tags:
 *     - Menu
 *     summary: Add a new menu item
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *              - price
 *              - category
 *            properties:
 *              name:
 *                type: string
 *                default: pizza
 *              description:
 *                type: string
 *                default: italian pizza
 *              price:
 *                type: number
 *                default: 100
 *              category:
 *                type: array,
 *                default: ["pizza"]
 *     responses:
 *      200:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Authentication Failure
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
menu.post("/", MenuHandler.addMenuItem);

/**
 * @openapi
 * '/api/v1.0/menu/{id}':
 *  put:
 *     tags:
 *     - Menu
 *     summary: Update menu item
 *     parameters:
 *      - name: id
 *        in: path
 *        description: the menu option id
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - name
 *              - description
 *              - price
 *              - category
 *            properties:
 *              name:
 *                type: string
 *                default: pizza
 *              description:
 *                type: string
 *                default: italian pizza
 *              price:
 *                type: number
 *                default: 100
 *              category:
 *                type: array,
 *                default: ["pizza"]
 *     responses:
 *      200:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Authentication Failure
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
menu.put("/:id", MenuHandler.updateMenuItem);

/**
 * @openapi
 * '/api/v1.0/menu/{id}':
 *  delete:
 *     tags:
 *     - Menu
 *     summary: Delete menu item
 *     parameters:
 *      - name: id
 *        in: path
 *        description: the menu option id
 *        required: true
 *     responses:
 *      200:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Authentication Failure
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
menu.delete("/:id", MenuHandler.deleteMenuItem);

module.exports = menu;
