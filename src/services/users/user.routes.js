const router = require('express').Router();

//calling the required service
const { getPolicies } = require('./user.service');

router.get('/test', getPolicies);

module.exports = router;