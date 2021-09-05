const logger = require("../../logger");
const { buildSuccess, handle_server_error } = require("../../utils/handleServerResponse");
const scheduleMessageDAO = require('../../models/scheduleMessage.model')

exports.addMessageSchedule = async (req, res) => {
  logger.info(`Endpoint - ${req.originalUrl} [${req.method}]`)
  try {

    const { message, date } = req.body

    let newSchedule = new scheduleMessageDAO({
      message,
      date
    })

    await newSchedule.save();

    logger.info(`Endpoint - ${req.originalUrl} [${req.method}] - succefull`)
    return res.status(200).json(buildSuccess({ message: 'Added new schedule' }))
  } catch (error) {
    let serverError = await handle_server_error(error, req);
    return res.status(serverError.code).json(serverError);
  }
}