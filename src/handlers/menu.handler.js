const db = require("../data/database");
const { v4:uuidv4 } = require("uuid");
const logger = require("../logger");

const MenuHandler = {};

MenuHandler.getMenuList = async (req, res) => {
    try {
        const data = await db.getData("/menu");
        return res.status(200).json({
            data
        });
    } catch (error) {
        logger.error(`Error fetching menu items. error: ${JSON.stringify(error)}`);
        res.status(400).json({
            error
        });
    }
};

MenuHandler.addMenuItem = async (req, res) => {
    try {
        const body = req.body;
        const name = body.name;
        const description = body.description;
        const price = body.price;
        const category = body.category;

        if (!name) {
            throw("Name is mandatory for menu addition");
        }
        if (!description) {
            throw("Description is mandatory for menu addition");
        }
        if (!price) {
            throw("Price is mandatory for menu addition");
        }
        if (typeof price !== "number") {
            throw("Price should be a valid number");
        }
        if (!category) {
            throw("Category is mandatory for menu addition");
        }
        if (!Array.isArray(category)) {
            throw("Category is in an invalid format");
        }
        const item = {
            id: uuidv4(),
            name,
            description,
            price,
            category,
        };
        logger.info(`new item being added to menu ${JSON.stringify(item)}`);
        await db.push("/menu[]", item, true);
        
        res.status(200).json({
            message: "Menu item added successfully",
            data: item
        });
    } catch(error) {
        logger.error(`Error adding item to menu. error: ${JSON.stringify(error)}`);
        res.status(400).json({
            error
        });
    }
};

MenuHandler.updateMenuItem = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        logger.info(`editing menu item with id ${id}`);
        const index = await db.getIndex("/menu", id);
        if (index < 0) {
            throw("Menu item not found");
        }
        await db.push(`/menu[${index}]`, { ...body }, false);
        res.status(200).send("Menu item updated successfully");
    } catch(error) {
        logger.error(`Error editing menu item. error: ${JSON.stringify(error)}`);
        res.status(400).json({
            error
        });
    }
};

MenuHandler.deleteMenuItem = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        logger.info(`deleting menu item with id ${id}`);
        const index = await db.getIndex("/menu", id);
        if (index < 0) {
            throw("Menu item not found");
        }
        await db.delete(`/menu[${index}]`);
        res.status(200).send("Menu item deleted successfully");
    } catch(error) {
        logger.error(`Error deleting menu item. error: ${JSON.stringify(error)}`);
        res.status(400).json({
            error
        });
    }
};

module.exports = MenuHandler;
