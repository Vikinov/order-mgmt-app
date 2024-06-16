const swaggerJSDoc = require("swagger-jsdoc");


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Order Management App",
            description: "API endpoints for an order management application",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }],
        servers: [
            {
                url: "http://localhost:3000/",
                description: "Local server",
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
