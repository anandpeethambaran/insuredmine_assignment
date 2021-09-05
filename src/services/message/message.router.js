const router = require('express').Router();


//calling the required service
const { addMessageSchedule } = require('./message.service');

router.post('/add-schedule', addMessageSchedule)


module.exports = router;