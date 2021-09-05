const router = require('express').Router();


//calling the required service
const { addMessageSchedule, getMessages } = require('./message.service');

router.post('/add-schedule', addMessageSchedule)
router.get('/', getMessages)


module.exports = router;