import { Pool } from "pg";

const pool = new Pool({
    user: "academy",
    host: "localhost",
    database: "citybike",
    password: "academy",
    port: 5432,
});

export { pool };
