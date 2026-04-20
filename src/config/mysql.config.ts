import { registerAs } from '@nestjs/config';

export default registerAs('mysql', () => ({
  url: process.env.MYSQL_PUBLIC_URL,
}));
