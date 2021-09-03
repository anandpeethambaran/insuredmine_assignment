const mongoose = require('mongoose');
const config = require('config')

module.exports = (app) => {
  mongoose.connect(
    config.mongodb
  ).catch(err => {
    console.log(err);
    logger.error(err);
    process.exit(1);
  });

  app.set('mongooseClient', mongoose);
};
