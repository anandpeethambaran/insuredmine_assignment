const { Worker } = require('worker_threads')
const { handle_server_error, buildSuccess, CSV_UPLOAD_ERROR } = require('../../utils/handleServerResponse')
const APIError = require('../../utils/Error.class')

const path = require('path')
const { uploadFileToDB } = require('../../hooks/users')

exports.uploadCSV = async (req, res) => {
  try {
    const { originalname } = req.file;

    let messageData = {
      originalname
    }

    let upload = await uploadFileToDB(messageData);

  } catch (error) {
    let serverError = await handle_server_error(error, req);
    return res.status(serverError.code).json(serverError);
  }
}