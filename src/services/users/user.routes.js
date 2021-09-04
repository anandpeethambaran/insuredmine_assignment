const router = require('express').Router();

const { uploadFile } = require('../../middleware/upload-file')

//calling the required service
const { uploadCSV } = require('./user.service');

router.post('/upload-csv', uploadFile, uploadCSV)

module.exports = router;