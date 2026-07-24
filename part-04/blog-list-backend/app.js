const mongoose = require('mongoose')
const express = require('express')

const cfg = require('./utils/config')
const log = require('./utils/log')
const blogsRouter = require('./controllers/blogs')

const app = express()

log.info('Connecting to', cfg.MONGODB_URI)
mongoose.connect(cfg.MONGODB_URI, { family: 4 })
  .then(() => {
    log.info('Connected to MongoDB')
  })
  .catch(error => {
    log.error('Error connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app