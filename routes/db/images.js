/** @author Aniket */
/* ------------------------------------------------------------------------------------------- *
 *                                   Available routes                                          *
 * POST   /images                    - Uploades new image
 * ------------------------------------------------------------------------------------------- */
const joi = require('joi');

const uploadImage = {
  path: '/api/v1/db/images',
  method: 'POST',
  config: {
    description: 'Uploads new image',
    tags: ['api', 'db', 'db-images'],
    validate: {
      payload: {
        image_url: joi.string().required(),
      },
    },
  },
  handler: (request, reply) => {
    const opts = {
      image_url: request.payload.image_url,
    };
    global.services.db.imageServices.uploadImage(opts).then((res) => {
      reply(res).code(200);
    }, (err) => {
      reply(err).code(err.code || 400);
    });
  },
};

const getImages = {
  path: '/api/v1/db/images',
  method: 'GET',
  config: {
    description: 'Get all images',
    tags: ['api', 'db', 'db-images'],
  },
  handler: (request, reply) => {
    global.services.db.imageServices.getImages().then((res) => {
      reply(res).code(200);
    }, (err) => {
      reply(err).code(err.code || 400);
    });
  },
};

module.exports = [
  uploadImage,
  getImages,
];
