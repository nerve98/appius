const { Pool, Client } = require("pg");

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT_DB
});

export const STATO_VALUES = ["pending", "todo", "done"];

export async function executeQuery(query: string, input: string[]): Promise<[] | null> {
    let result = null;
    let client = null;
    try {
        client = await pool.connect();
        const { rows } = await client.query(query, input);
        result = rows;
    }
    catch (err) {
        console.error(err);
    }
    finally {
        if (client) {
            client.release();
        }
    }
    return result;
}