import * as fs from 'fs';

export const mysqlConfig = () => {
  // En production, utilisez DATABASE_URL (une seule variable)
  if (process.env.NODE_ENV === 'production') {
    return {
      url: process.env.DATABASE_URL,  // ← L'URL complète avec certificat inline
    };
  }
  
  return {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT || '11965'),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    ssl: {
      ca: fs.readFileSync('./ca.pem', 'utf8'),
      rejectUnauthorized: true,
    },
  };
};
