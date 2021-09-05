const logger = require('../../logger');
const policyDAO = require('../../models/policy.model');
const { buildSuccess, handle_server_error } = require('../../utils/handleServerResponse');

exports.getPolicyInfo = async (req, res) => {
  logger.info(`Endpoint - ${req.originalUrl} [${req.method}]`)
  try {

    let policyDetails = await policyDAO.aggregate([
      {
        $lookup: {
          from: "users",
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails'
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

exports.searchPolicyInfo = async (req, res) => {
  logger.info(`Endpoint - ${req.originalUrl} [${req.method}]`)
  try {
    const { name } = req.query;

    let policyDetails = await policyDAO.aggregate([
      {
        $lookup: {
          from: "users",
          localField: 'userId',
          foreignField: '_id',
          as: 'userData'
        }
      },
      {
        $match: { 'userData.firstName': new RegExp(name, 'i') }
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