import { UrlController } from './controller/url-controller'
import express from 'express'
import { MongoConnection } from './database/mongo-connection'

const database = new MongoConnection()
database.connect()

const app = express()
app.use(express.json())

const urlController = new UrlController()

app.post('/shorten', urlController.shorten)
app.get('/:hash', urlController.redirect)

app.listen(5000, () => console.log('Server started on port 5000'))
