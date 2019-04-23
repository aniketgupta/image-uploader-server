// importing all the services
const getImageServices = require('./images');

module.exports = function initServices(server) {
  const imageServices = getImageServices(server);

  return {
    imageServices,
  };
};
