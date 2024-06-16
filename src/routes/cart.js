const express = require("express");
const cart = express.Router();
const CartHandler = require("../handlers/cart.handler");

/**
* @openapi
* "/api/v1.0/cart":
*  get:
*     tags:
*     - Cart
*     summary: Get Cart
*     responses:
*      200:
*        description: Cart Fetched Successfully
*      400:
*        description: Bad Request
*      403:
*        description: Authentication Failure
*      404:
*        description: Not Found
*      500:
*        description: Server Error
*/
cart.get("/", CartHandler.getCart);

/**
 * @openapi
 * '/api/v1.0/cart/{cartId}':
 *  post:
 *     tags:
 *     - Cart
 *     summary: Add item to cart
 *     parameters:
 *      - name: cartId
 *        in: path
 *        description: the cart id
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
 *              - quantity
 *            properties:
 *              id:
 *                type: string
 *                default: f335347b-2f54-406c-9668-7ec742752e26
 *              name:
 *                type: string
 *                default: pizza
 *              description:
 *                type: string
 *                default: italian pizza
 *              price:
 *                type: number
 *                default: 100
 *              quantity:
 *                type: number,
 *                default: 1
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
cart.post("/:cartId", CartHandler.addItemToCart);

/**
 * @openapi
 * '/api/v1.0/cart/{cartId}':
 *  put:
 *     tags:
 *     - Cart
 *     summary: Update item quantity
 *     parameters:
 *      - name: cartId
 *        in: path
 *        description: the cart id
 *        required: true
 *      - name: itemId
 *        in: path
 *        description: the item id
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - quantity
 *            properties:
 *              quantity:
 *                type: number
 *                default: 1
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
cart.put("/:cartId/:itemId", CartHandler.updateQuantity);

/**
 * @openapi
 * '/api/v1.0/cart/{cartId}/{itemId}':
 *  delete:
 *     tags:
 *     - Cart
 *     summary: Delete menu item
 *     parameters:
 *      - name: cartId
 *        in: path
 *        description: the cart id
 *        required: true
 *      - name: itemId
 *        in: path
 *        description: the item id
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
cart.delete("/:cartId/:itemId", CartHandler.removeItemFromCart);

module.exports = cart;
