const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const imageSchema = new mongoose.Schema({
  image_url: {
    type: String,
    required: false,
  },
});

imageSchema.plugin(timestamps);

module.exports = mongoose.model('Image', imageSchema);
