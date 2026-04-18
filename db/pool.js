const { Pool } = require("pg");
require('dotenv').config({ path: '../.env' });


// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
module.exports = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
            rejectUnauthorized: false, // 🔥 required for most cloud DBs
        },
});