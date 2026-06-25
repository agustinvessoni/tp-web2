const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "tp-web2",
    password: "41543451",
    port: 5432,
});

module.exports = pool;