import * as mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port:Number(process.env.DB_PORT),

    timezone: '-05:00',
    dateStrings: true,
    charset : 'utf8',
    decimalNumbers: true,
    namedPlaceholders: true
});

export {pool}