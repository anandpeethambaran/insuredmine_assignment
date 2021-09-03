const users = require('./users/user.routes')

module.exports = (app) => {
  app.use('/users', users)
}