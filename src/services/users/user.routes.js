const router = require('express').Router();

const { uploadFile } = require('../../middleware/upload-file')

//calling the required service
const { uploadCSV, getUser } = require('./user.service');

router.post('/upload-csv', uploadFile, uploadCSV)
router.get('/', getUser)

module.exports = router;