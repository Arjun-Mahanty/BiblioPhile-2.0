const Pool = require('pg').Pool;


const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "library",
    password: "1821",
    port: 5432,
});

module.exports = pool;