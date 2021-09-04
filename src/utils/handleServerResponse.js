const logger = require('../logger')


exports.handle_server_error = async (error, req) => {
  return new Promise(async (resolve, reject) => {
    try {
      logger.error(`Endpoint - ${req.originalUrl}[${req.method}]- Error : ${JSON.stringify(error)}`)
      let errorObj;
      if (!error.errorType || error.errorType !== 'API.Error') {
        errorObj = {
          error: 'Internal Server Error',
          code: error.status ? parseInt(error.status) : 500,
          errorCode: "INTERNAL_SERVER_ERROR",
          message: error.message,
          Endpoint: req.originalUrl
        }
      }
      if (error.errorType && error.errorType === 'API.Error') {
        errorObj = {
          error: error.errorType,
          code: parseInt(error.ec.status),
          errorCode: error.ec.errorCode,
          message: error.msg,
          Endpoint: req.originalUrl
        }
      }
      console.log(errorObj);
      return resolve(errorObj)
    } catch (error) {
      return reject({
        error: 'Internal Server Error',
        code: error.status ? parseInt(error.status) : 500,
        errorCode: "INTERNAL_SERVER_ERROR",
        message: error.message,
        Endpoint: req.originalUrl
      })
    }
  })
}

exports.buildSuccess = (payload) => {
  return { status: "SUCCESS", ...payload };
}

exports.CSV_UPLOAD_ERROR = {
  status: 500,
  errorCode: "CSV_UPLOAD_ERROR",
  errorMessage: "csv file upload error",
}