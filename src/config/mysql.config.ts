import * as fs from 'fs';

export const mysqlConfig = {
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || '11965'),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  
  ssl: {
    ca: process.env.NODE_ENV === 'production'
      ? fs.readFileSync('/etc/secrets/aiven-ca.pem', 'utf8')  // ✅ RENDER PATH
      : fs.readFileSync('./ca.pem', 'utf8'),      // ✅ LOCAL PATH
    rejectUnauthorized: true,
  },
};
