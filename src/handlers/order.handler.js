const { v4:uuidv4 } = require("uuid");
const db = require("../data/database");
const logger = require("../logger");

const OrderHandler = {};

OrderHandler.placeOrder = async (req, res) => {
    try {
        const body = req.body;
        const items = body.items;
        if(!Array.isArray(items)) {
            throw("Items are passed in an invalid format");
        }
        if(items.length === 0) {
            throw("Atleast 1 item is needed to place an order");
        }
        const userId = res.locals.id;
        const totalPrice = items.reduce((acc, item) => acc+(item.price * item.quantity), 0);
        const order = {
            id: uuidv4(),
            userId,
            items,
            totalPrice,
            timestamp: new Date(),
            status: "ordered",
        };
        await db.push("/orders[]", order, true);
        res.status(200).json({
            message: "Order placed successfully",
            data: order
        });
    } catch(error) {
        logger.error(`Error placing new order. error: ${JSON.stringify(error)}`);
        res.status(400).json({
            error
        });
    }
};

OrderHandler.updateStatus = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id) {
            throw("Order Id is mandatory to update status");
        }
        const body = req.body;
        const status = body.status;
        if(!status) {
            throw("Status is mandatory to update status");
        }
        const index = await db.getIndex("/orders", id);
        if(index < 0) {
            throw("Invalid Order Id");
        }
        await db.push(`/orders[${index}]`, { status }, false);
        res.status(200).send("Order status updated successfully");
    } catch(error) {
        logger.error(`Error updating order status. error: ${JSON.stringify(error)}`);
        res.status(400).json({
            error
        });
    }
};

OrderHandler.getOrderDetails = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id) {
            throw("Order Id is mandatory for fetch the order details");
        }
        const index = await db.getIndex("/orders", id);
        if(index < 0) {
            throw("Invalid Order Id");
        }
        const orderDetails = await db.getData(`/orders[${index}]`);
        res.status(200).json({
            data: orderDetails
        });
    } catch(error) {
        logger.error(`Error fetching order details. error: ${JSON.stringify(error)}`);
        res.status(400).json({
            error
        });
    }
};

OrderHandler.orderHistory = async (req, res) => {
    try {
        const userId = res.locals.id;
        const orders = await db.getData("/orders");
        const userOrders = orders.filter((order) => order.userId === userId);
        res.status(200).json({
            data: userOrders
        });
    } catch(error) {
        logger.error(`Error fetching order history. error: ${JSON.stringify(error)}`);
        res.status(400).json({
            error
        });
    }
};

module.exports = OrderHandler;
