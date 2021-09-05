const users = require('./users/user.routes');
const policy = require('./policy/policy.routes');
const message = require('./message/message.router')

require('../utils/cron-jobs')


module.exports = (app) => {
  app.use('/users', users)
  app.use('/policy', policy)
  app.use('/message', message)
}