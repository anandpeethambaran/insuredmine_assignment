const cron = require('node-cron');
const scheduleMessageDAO = require('../models/scheduleMessage.model');
const messageDAO = require('../models/message.model');
const logger = require('../logger');

exports.scheduleMessage = (data) => {
  return new Promise(async (resolve, reject) => {
    logger.info(`Schedule message transfer`)
    try {
      const { date } = data;

      cron.schedule(`${date.getSeconds()} ${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} * ${date.getFullYear()}`, async () => {

        let newDate = new Date();
        logger.info(`Scheduler for ${newDate.toLocaleString()} - started`)

        newDate = newDate.toLocaleString();

        let messageData = await scheduleMessageDAO.findOne({ date: newDate })

        let transferMessage = new messageDAO({
          message: messageData.message,
          transferDate: newDate
        })

        let newMessage = transferMessage.save();

        logger.info(`Scheduler for ${newDate.toLocaleString()} - completed`)

      });
      logger.info(`Schedule message transfer - succefull`)
      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}