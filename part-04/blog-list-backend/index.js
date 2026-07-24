const log = require('./utils/log')
const cfg = require('./utils/config')
const app = require('./app')


app.listen(cfg.PORT, () => {
  log.info(`Server running on port ${cfg.PORT}`)
})