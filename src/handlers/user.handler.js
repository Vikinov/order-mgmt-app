const jwt = require("jsonwebtoken");
const db = require("../data/database");
const { v4:uuidv4 } = require("uuid");
const logger = require("../logger");

const UserHandler = {};

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

UserHandler.registerUser = async (req, res) => {
    try {
        const body = req.body;
        const email = body.email;
        const username = body.username;
        const password = body.password;
        if(!email) {
            throw("Email is mandatory for registration");
        }
        if(!EMAIL_REGEX.test(email)) {
            throw("Invalid Email Id");
        }
        if(!username) {
            throw("Username is mandatory for registration");
        }
        if(!password) {
            throw("Password is mandatory for registration");
        }

        const existingUsers = await db.getData("/users");

        existingUsers.forEach(user => {
            if (email === user.email) {
                throw("Email id already exists");
            }
            if (username === user.username) {
                throw("Username already exists");
            }
        });

        const userId = uuidv4();

        const user = {
            id: userId,
            username,
            email,
            password,
        };
        const cart = {
            id: uuidv4(),
            userId,
            items: [], 
        };
        await db.push("/users[]", user, true);
        await db.push("/cart[]", cart, true);
        logger.info(`new user registered ${JSON.stringify(user)}`);
        res.status(200).send("User registered successfully");
    } catch(error) {
        logger.error(`Error registering user. error: ${JSON.stringify(error)}`);
        res.status(400).json({
            error
        });
    }
};

UserHandler.authenticateAndLoginUser = async (req, res) => {
    try {
        const body = req.body;
        const username = body.username;
        const password = body.password;

        if(!username) {
            throw("Username is mandatory for login");
        }
        if(!password) {
            throw("Password is mandatory for login");
        }

        const user = await _getUserDetails(username, password);

        if(!user) {
            throw("Invalid login credentials");
        }

        const token = jwt.sign({ username: user.username, email: user.email, id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            message: "Login Successful",
            token,
        });
    } catch(error) {
        logger.error(`Error logging in. error: ${JSON.stringify(error)}`);
        res.status(400).json({
            error
        });
    }
};

UserHandler.logoutUser = async (req, res) => {
    try {
        const authorization = req?.headers?.authorization;
        const token = authorization.split(" ")[1];
        await db.push("/blacklistedTokens[]", token, true);
        res.status(200).send("User logged out successfully");
    } catch(error) {
        logger.error(`Error logging out. error: ${JSON.stringify(error)}`);
        res.status(400).json({
            error
        });
    }
};

const _getUserDetails = async (username, password) => {
    const existingUsers = await db.getData("/users");
    let userDetails = false;
    existingUsers.forEach(user => {
        if (username === user.username && password === user.password) {
            userDetails = user;
        }
    });
    return userDetails;
};

module.exports = UserHandler;
