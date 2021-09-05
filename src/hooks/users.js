const { Worker, workerData } = require('worker_threads');
const path = require('path');
const APIError = require('../utils/Error.class')
const { CSV_UPLOAD_ERROR } = require('../utils/handleServerResponse');

exports.uploadFileToDB = (data) => {
  return new Promise((resolve, reject) => {
    try {
      data["__basedir"] = __basedir
      const worker = new Worker(path.join(__basedir, '/hooks/user-csv-worker.js'), {
        workerData: data
      });
      worker.on('message', (data) => {
        if (data.status === 'SUCCESS') {
          resolve(data)
        }
        if (data.status === 'FAILED') {
          reject(new APIError(CSV_UPLOAD_ERROR))
        }
      });
      worker.on('error', (error) => {
        reject(error)
      });
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new APIError(CSV_UPLOAD_ERROR));
      });
    } catch (error) {
      reject(error)
    }

  });
}