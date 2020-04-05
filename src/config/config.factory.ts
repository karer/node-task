export const configFactory = () => {
  const { env } = process;

  return {
    env: env.NODE_ENV,
    app: { key: env.APP_KEY, port: parseInt(env.APP_PORT, 10) },
    database: {
      host: env.DB_HOST,
      port: parseInt(env.DB_PORT, 10),
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
    },
  };
};
