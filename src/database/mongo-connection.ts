import { config } from '../config/constants'
import mongoose from 'mongoose'

export class MongoConnection {
  async connect() {
    try {
      const mongoUrl = config.MONGO_CONECCTION!
      await mongoose.connect(mongoUrl)
      console.log('databse connected')
    } catch (err) {
      console.log(err)
      process.exit(1)
    }
  }
}
