import { Pool } from "pg";

let conn: Pool;
conn = new Pool({
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	port: Number(process.env.PGPORT),
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
});
export default conn;
