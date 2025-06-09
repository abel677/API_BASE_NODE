export const envConfig = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
  REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  REFRESH_TOKEN_EXP_DAYS: process.env.REFRESH_TOKEN_EXP_DAYS,
};
