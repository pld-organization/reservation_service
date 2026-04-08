import { registerAs } from '@nestjs/config';

export default registerAs('mysql', () => ({
  host: process.env.MYSQLHOST,
  port: parseInt(process.env.MYSQLPORT || '3306', 10),
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
}));