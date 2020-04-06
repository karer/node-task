export const configFactory = () => {
  const { env } = process;

  return {
    env: env.NODE_ENV,
    app: { key: env.APP_KEY, port: parseInt(env.APP_PORT, 10) },
    database: {
      uri: env.DB_URI,
    },
  };
};
