const TestConstants = {};

TestConstants.userEndpoint = "/api/v1.0/user";
TestConstants.menuEndpoint = "/api/v1.0/menu";
TestConstants.cartEndpoint = "/api/v1.0/cart";
TestConstants.orderEndpoint = "/api/v1.0/order";

TestConstants.testUserCredentials = {
    username: "testinguser",
    password: "test@111"
};

TestConstants.testMenuItem = {
    "name": "Noodles",
    "description": "Japanese Noodles",
    "price": 150,
    "category": [
        "japanese",
        "noodles",
        "vegetarian"
    ]
};

TestConstants.testCartId = "6bf95368-d420-4a06-85c8-3102874a5b54";

TestConstants.testItemId = "7dba5fb5-363d-4719-9738-0fa745289d7e";

TestConstants.testItem = {
    id: "7dba5fb5-363d-4719-9738-0fa745289d7e",
    name: "Masala Pasta",
    description: "Indian style masala pasta",
    price: 175,
    quantity: 1,
};

TestConstants.testOrder = {
    items: [
        {
            "id": "f335347b-2f54-406c-9668-7ec742752e26",
            "name": "White Sauce Pasta",
            "description": "Italian white sauce pasta",
            "price": 200,
            "quantity": 1
        },
        {
            "id": "7dba5fb5-363d-4719-9738-0fa745289d7e",
            "name": "Masala Pasta",
            "description": "Indian style masala pasta",
            "price": 175,
            "quantity": 2
        }
    ],
};

TestConstants.testInvalidOrder = {
    items: [],
};

TestConstants.testUser = {
    "username": "testuser",
    "email": "test@abc.com",
    "password": "test@111",
};

TestConstants.testInvalidUser = {
    "username": "testuser2",
    "password": "test@111",
};

TestConstants.testInvalidEmailUser = {
    "username": "testuser2",
    "email": "test",
    "password": "test@111",
};

TestConstants.testUsernameExistsUser = {
    "username": "testuser",
    "email": "test2@abc.com",
    "password": "test@111",
};

TestConstants.testEmailsExistsUser = {
    "username": "testuser2",
    "email": "test@abc.com",
    "password": "test@111",
};

TestConstants.defaultDb = {
    "users": [
        {
            "id": "ba466dc6-210c-41cb-91b8-77e40c40ccd3",
            "username": "testinguser",
            "email": "testing@abc.com",
            "password": "test@111"
        }
    ],
    "menu": [
        {
            "id": "f335347b-2f54-406c-9668-7ec742752e26",
            "name": "White Sauce Pasta",
            "description": "Italian white sauce pasta",
            "price": 200,
            "category": [
                "italian",
                "pasta",
                "vegetarian"
            ]
        },
        {
            "id": "7dba5fb5-363d-4719-9738-0fa745289d7e",
            "name": "Masala Pasta",
            "description": "Indian style masala pasta",
            "price": 175,
            "category": [
                "indian",
                "pasta",
                "vegetarian"
            ]
        }
    ],
    "cart": [
        {
            "id": "6bf95368-d420-4a06-85c8-3102874a5b54",
            "userId": "ba466dc6-210c-41cb-91b8-77e40c40ccd3",
            "items": []
        }
    ],
    "orders": [],
    "blacklistedTokens": []
};


module.exports = TestConstants;
