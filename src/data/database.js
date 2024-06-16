const { JsonDB, Config } = require("node-json-db");

let db;

if(process.env.NODE_ENV === "test"){
    db = new JsonDB(new Config("src/data/testdb", true, true, "/"));
} else {
    db = new JsonDB(new Config("src/data/db", true, true, "/"));
}

module.exports = db;
