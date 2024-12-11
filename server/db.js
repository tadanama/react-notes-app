import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;

// Enable the use of environment variable
dotenv.config();

export const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});

// Check if can access the environment variable
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_PORT);
// console.log(process.env.DB_NAME);
