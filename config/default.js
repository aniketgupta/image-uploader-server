function getDBUri() {
  const dbName = process.env.DB_NAME;
  const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${dbName}`;
  return uri;
}

module.exports = {
  server: {
    host: '0.0.0.0',
    port: process.env.PORT,
    maxBytes: 104857600,
  },
  database: {
    uri: getDBUri(),
    opts: {
      useMongoClient: true,
      config: {
        autoIndex: true,
      },
    },
  },
};
