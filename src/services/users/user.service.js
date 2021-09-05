
const { handle_server_error, buildSuccess, CSV_UPLOAD_ERROR } = require('../../utils/handleServerResponse');
const APIError = require('../../utils/Error.class');
const logger = require('../../logger');
const { uploadFileToDB } = require('../../hooks/users');
const userDAO = require('../../models/user.model')

exports.uploadCSV = async (req, res) => {
  logger.info(`Endpoint - ${req.originalUrl} [${req.method}]`)
  try {
    const { originalname } = req.file;

    let messageData = {
      originalname
    }

    let upload = await uploadFileToDB(messageData);

    if (upload.status === 'SUCCESS') {
      logger.info(`Endpoint - ${req.originalUrl} [${req.method}] - succefull`)
      return res.status(200).json(upload)
    }
    throw new APIError(CSV_UPLOAD_ERROR)
  } catch (error) {
    let serverError = await handle_server_error(error, req);
    return res.status(serverError.code).json(serverError);
  }
}

exports.getUser = async (req, res) => {
  logger.info(`Endpoint - ${req.originalUrl} [${req.method}]`)
  try {

    let policyDetails = await userDAO.aggregate([
      {
        $lookup: {
          from: "policies",
          localField: 'policyId',
          foreignField: '_id',
          as: 'policyDetails'
        }
      }
    ])

    let data = policyDetails && policyDetails.length > 0 ? policyDetails : [];

    logger.info(`Endpoint - ${req.originalUrl} [${req.method}] - succefull`)
    return res.status(200).json(buildSuccess({ data }))
  } catch (error) {
    let serverError = await handle_server_error(error, req);
    return res.status(serverError.code).json(serverError);
  }
}