import 'dotenv/config';
export const envConfig = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DOMAIN: process.env.DOMAIN,

  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  REFRESH_TOKEN_EXP_DAYS: process.env.REFRESH_TOKEN_EXP_DAYS,
  
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_HOST: process.env.MAIL_HOST,
};
