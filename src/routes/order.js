const express = require("express");
const order = express.Router();
const OrderHandler = require("../handlers/order.handler");

/**
 * @openapi
 * '/api/v1.0/order':
 *  post:
 *     tags:
 *     - Order
 *     summary: Place new order
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - items
 *            properties:
 *              items:
 *                type: array
 *                default: [ { "id": "f335347b-2f54-406c-9668-7ec742752e26", "name": "White Sauce Pasta", "description": "Italian white sauce pasta", "price": 200, "quantity": 1 } ]              
 *     responses:
 *      200:
 *        description: Item added
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Authentication Failure
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
order.post("/", OrderHandler.placeOrder);

/**
 * @openapi
 * '/api/v1.0/order/{id}/status':
 *  put:
 *     tags:
 *     - Order
 *     summary: Update order status
 *     parameters:
 *      - name: id
 *        in: path
 *        description: the order id
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - status
 *            properties:
 *              status:
 *                type: string
 *                default: dispatched
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
order.put("/:id/status", OrderHandler.updateStatus);

/**
 * @openapi
 * '/api/v1.0/order/history':
 *  get:
 *     tags:
 *     - Order
 *     summary: Fetch order history
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
order.get("/history", OrderHandler.orderHistory);

/**
 * @openapi
 * '/api/v1.0/order/{id}':
 *  get:
 *     tags:
 *     - Order
 *     summary: Fetch order details
 *     parameters:
 *      - name: id
 *        in: path
 *        description: the order id
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
order.get("/:id", OrderHandler.getOrderDetails);

module.exports = order;
