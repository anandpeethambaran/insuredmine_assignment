const cron = require('node-cron');
var os = require('os-utils');
const logger = require('../logger');

cron.schedule('*/10 * * * * *', () => {
  os.cpuUsage((value) => {
    logger.info(`CPU Usage (%): ${value}%`)
    if (value > 70) {
      process.exit(1)
    }
  });
});