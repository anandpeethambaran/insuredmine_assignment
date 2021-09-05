const { workerData, parentPort } = require('worker_threads')
const fastcsv = require("fast-csv");
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose');
const config = require('config')

const { buildSuccess, buildFailed } = require('../utils/handleServerResponse')

mongoose.connect(
  config.mongodb
).catch(err => {
  console.log(err);
  logger.error(err);
  process.exit(1);
});


const usersDAO = require('../models/user.model');
const lobDAO = require('../models/lob.model');
const carrierDAO = require('../models/carrier.mode');
const agentDAO = require('../models/agent.model');
const policyDAO = require('../models/policy.model');
const userAccountDAO = require('../models/userAccount.model');
const logger = require('../logger');

const { __basedir, originalname } = workerData

logger.info(`CSV - ${originalname} Parsing in worker thread started`)

const addCSVtoDb = async () => {

  try {
    let csvData = await processRecord();
    if (csvData && csvData.length > 0) {
      let userData = [];
      let policyData = [];
      let userAccountData = [];
      let carrierData = [];
      let lobData = [];
      let agentData = [];
      await Promise.all(
        csvData.map(async data => {
          let userObj = {
            firstName: data.firstname,
            address: data.address,
            phone: data.phone,
            email: data.email,
            zip: data.zip,
            gender: data.gender,
            dob: data.dob,
            userType: data.userType,
          }
          let newUser = new usersDAO(userObj);


          let policyObj = {
            userId: newUser._id,
            category: data.category_name,
            policyNo: data.policy_number,
            startDate: data.policy_start_date,
            endDate: data.policy_end_date,
            collectionId: data.collectionId ? data.collectionId : '',
            companyCollectionId: data.collectionId ? data.collectionId : ''
          }
          let newPolicy = new policyDAO(policyObj);
          policyData.push(newPolicy);
          newUser["policyId"] = newPolicy._id;
          userData.push(newUser);

          let userAccountObj = {
            userId: newUser._id,
            accountName: data.account_name
          }

          let newUserAccount = new userAccountDAO(userAccountObj);
          userAccountData.push(newUserAccount)
          if (data.company_name && data.company_name !== '') {
            let carrierObj = {
              companyName: data.company_name
            }
            let newCarrier = new carrierDAO(carrierObj)
            carrierData.push(newCarrier)
          }

          if (data.category_name && data.category_name !== '') {
            let lobObj = {
              categoryName: data.category_name
            }
            let newLob = new lobDAO(lobObj)
            lobData.push(newLob)
          }
          if (data.agent && data.agent !== '') {
            let agentObj = {
              agentName: data.agent
            }
            let newAgent = new agentDAO(agentObj)
            agentData.push(newAgent)
          }

        })
      )
      if (userData.length > 0) await usersDAO.insertMany(userData);
      if (policyData.length > 0) await policyDAO.insertMany(policyData);
      if (userAccountData.length > 0) await userAccountDAO.insertMany(userAccountData);
      if (carrierData.length > 0) await carrierDAO.insertMany(carrierData);
      if (lobData.length > 0) await lobDAO.insertMany(lobData);
      if (agentData.length > 0) await agentDAO.insertMany(agentData);

      logger.info(`CSV - ${originalname} Parsing in worker thread started - succefull`)
      parentPort.postMessage(buildSuccess({ message: 'Completed csv migration' }))

    }
  } catch (error) {
    console.log(error);
    logger.info(`CSV - ${originalname} Parsing in worker thread started - Error : ${JSON.stringify(error)}`)
    parentPort.postMessage(buildFailed({ message: `Error on csv migration : ${error}` }))
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