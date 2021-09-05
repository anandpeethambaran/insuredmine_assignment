const logger = require("../../logger");
const { buildSuccess, handle_server_error } = require("../../utils/handleServerResponse");
const scheduleMessageDAO = require('../../models/scheduleMessage.model');
const messageDAO = require('../../models/message.model');
const { scheduleMessage } = require("../../hooks/message");

exports.addMessageSchedule = async (req, res) => {
  logger.info(`Endpoint - ${req.originalUrl} [${req.method}]`)
  try {

    const { message, date } = req.body

    let newDate = new Date(date)

    let newSchedule = new scheduleMessageDAO({
      message,
      date: newDate.toLocaleString()
    })

    await newSchedule.save();

    let schedule = await scheduleMessage({ message, date: newDate })

    logger.info(`Endpoint - ${req.originalUrl} [${req.method}] - succefull`)
    return res.status(200).json(buildSuccess({ message: 'Added new schedule' }))
  } catch (error) {
    let serverError = await handle_server_error(error, req);
    return res.status(serverError.code).json(serverError);
  }
}

exports.getMessages = async (req, res) => {
  logger.info(`Endpoint - ${req.originalUrl} [${req.method}]`)
  try {

    let messages = await messageDAO.find(req.query);

    logger.info(`Endpoint - ${req.originalUrl} [${req.method}] - succefull`)
    return res.status(200).json(buildSuccess({ data: messages }))
  } catch (error) {
    let serverError = await handle_server_error(error, req);
    return res.status(serverError.code).json(serverError);
  }
}