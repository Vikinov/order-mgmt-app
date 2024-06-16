const db = require("../data/database");
const logger = require("../logger");

const CartHandler = {};

CartHandler.getCart = async (req, res) => {
    try {
        const userId = res.locals.id;
        const cartData = await db.getData("/cart");
        const userCart = cartData.find((cart) => cart.userId === userId);
        res.status(200).json({
            data: userCart
        });
    } catch(error) {
        logger.error(`Error fetching items in cart. error: ${JSON.stringify(error)}`);
        res.status(400).json({
            error
        });
    }
};

CartHandler.addItemToCart = async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const item = req.body;
        if(!cartId) {
            throw("Cart Id is mandatory for adding items to cart");
        }
        if(!item) {
            throw("Item details are mandatory for adding items to cart");
        }
        const cartIndex = await db.getIndex("/cart", cartId);        
        if(cartIndex < 0) {
            throw("Invalid Cart id");
        }
        const itemIndex = await db.getIndex(`/cart[${cartIndex}]/items`, item.id);
        if (itemIndex >= 0) {
            throw("Item already exists in cart");
        }
        await db.push(`/cart[${cartIndex}]/items[]`, item, true);
        
        res.status(200).send("Item added successfuly");

    } catch(error) {
        logger.error(`Error adding item to cart. error: ${JSON.stringify(error)}`);
        res.status(400).json({
            error
        });
    }
};

CartHandler.updateQuantity = async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const itemId = req.params.itemId;
        const body = req.body;
        const quantity = body.quantity;
        if(!cartId) {
            throw("Cart Id is mandatory to update the quantity of item in cart");
        }
        if(!itemId) {
            throw("Item Id is mandatory to update the quantity of item in cart");
        }
        if(!quantity) {
            throw("Quantity is mandatory to update the quantity of item in cart");
        }
        if(quantity < 0) {
            throw("invalid quantity of item");
        }

        const cartIndex = await db.getIndex("/cart", cartId);
        if (cartIndex < 0) {
            throw("invalid cart id");
        }
        const itemIndex = await db.getIndex(`/cart[${cartIndex}]/items`, itemId);
        if (itemIndex < 0) {
            throw("invalid item id");
        }
        if(quantity === 0) {
            await db.delete(`/cart[${cartIndex}]/items[${itemIndex}]`);
        } else {
            await db.push(`/cart[${cartIndex}]/items[${itemIndex}]`, { quantity }, false);
        }

        res.status(200).send("Item updated successfuly");

    } catch(error) {
        logger.error(`Error updating the item quantity. error: ${JSON.stringify(error)}`);
        res.status(400).json({
            error
        });
    }
};

CartHandler.removeItemFromCart = async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const itemId = req.params.itemId;
        if(!cartId) {
            throw("Cart Id is mandatory to delete item in cart");
        }
        if(!itemId) {
            throw("Item Id is mandatory to delete item in cart");
        }
        const cartIndex = await db.getIndex("/cart", cartId);
        if (cartIndex < 0) {
            throw("invalid cart id");
        }
        const itemIndex = await db.getIndex(`/cart[${cartIndex}]/items`, itemId);
        if (itemIndex < 0) {
            throw("invalid item id");
        }
        await db.delete(`/cart[${cartIndex}]/items[${itemIndex}]`);

        res.status(200).send("Item deleted successfuly");

    } catch(error) {
        logger.error(`Error removing item from cart. error: ${JSON.stringify(error)}`);
        res.status(400).json({
            error
        });
    }
};

module.exports = CartHandler;
