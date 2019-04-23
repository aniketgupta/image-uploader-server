const Image = require('./../../models/image');

module.exports = function getImageServices(server) { //eslint-disable-line
  /**
   * Upload image.
   *
   * @method uploadImage.
   * @param {data} data The file data from request.
   * @return {Promise} Resolved when the image has been uploaded in db.
   */

  function uploadImage(data) {
    return new Promise((resolve, reject) => {
      // save data to database
      const instance = new Image(data);
      // 1 Save the image details in DB
      instance.save((err, res) => {
        if (err) {
          // 1.a Image upload in DB failed
          reject({ message: 'Internal Server Error', code: 500, error: 'ERROR_DB_SAVE' });
        } else {
          // 1.b Image has been successfully saved to db
          resolve(res);
        }
      });
    });
  }

  /**
   * Get images fromm DB
   * @return {Promise} Resolved when the images has been retrieved.
   */
  function getImages() {
    return new Promise((resolve, reject) => {
      // Get all images from DB
      Image.find({}, (findErr, res) => {
        if (findErr) {
          // 1.a If error, reject with error
          reject({
            message: 'Internal Server Error',
            code: 500,
            error: 'ERROR_DB_FIND_IMAGES',
          });
        }
        if (res.length > 0) {
          // 1.b. Images found
          resolve(res);
        }
      });
    });
  }

  return {
    uploadImage,
    getImages,
  };
};
