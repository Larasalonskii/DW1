// db.js
const { Pool } = require('pg');
require('dotenv').config();

// Pool de conexões com o PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'PROJETO DW1 2BIMESTRE',
    port: process.env.DB_PORT || 5432,
});

module.exports = pool;