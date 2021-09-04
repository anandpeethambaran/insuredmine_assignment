const { workerData, parentPort } = require('worker_threads')
const fastcsv = require("fast-csv");
const path = require('path')
const fs = require('fs')

const users = require('../models/user.model');
const lob = require('../models/lob.model');
const carrier = require('../models/carrier.mode');
const agent = require('../models/agent.model');
const policy = require('../models/policy.model');
const userAccount = require('../models/userAccount.model');

const { __basedir, originalname } = workerData





const addCSVtoDb = async () => {

  let csvData = await processRecord();

  if (csvData && csvData.length > 0) {
    await Promise.all(
      csvData.map(async data => {
        let userObj = {

        }
      })
    )
  }
}

const processRecord = async () => {
  return new Promise(async (resolve, reject) => {
    var csvData = [];

    let stream = fs.createReadStream(originalname);
    let csvstream = fastcsv.parse({ headers: true, discardUnmappedColumns: true })
      .on('data', (data) => {
        csvData.push(data);
      })
      .on('error', (error) => {
        reject(error)
      })
      .on('end', async () => {
        csvData.shift();
        resolve(csvData)
      });
    stream.pipe(csvstream);
  })
}

addCSVtoDb();




parentPort.postMessage({ welcome: workerData })