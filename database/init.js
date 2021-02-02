const mongoose = require('mongoose')
const isDev = process.env.NODE_ENV === 'development'
let db = 'mongodb+srv://cpadmin:cp131625@cluster0.n6ldn.mongodb.net/music?retryWrites=true'
// if (isDev) {
  // let db = 'mongodb://127.0.0.1:27017/music?authSource=admin'
// }
const { resolve } = require('path')
const glob = require('glob')
mongoose.Promise = global.Promise

exports.initSchemas = () => {
  glob.sync((resolve(__dirname, './schema/', '**/*.js'))).forEach(require)
}

exports.initAdmin = async () => {
  const User = mongoose.model('User')
  let user = await User.findOne({
    username: 'admin'
  })
  if (!user) {
    const user = new User({
      username: 'admin',
      email: 'number2demon@gmail.com',
      password: '123qwe',
      role: 'admin',
      music: []
    })
    await user.save()
  }
}

let cachedDb = {};

console.log('restart');
exports.connect = () => {
  let maxConnectTimes = 0;
  return new Promise((resolve, reject) => {
    // if (process.env.NODE_ENV !== 'production') {
    //   mongoose.set('debug', true)
    // }
    console.log('cachedDb.isConnected', cachedDb.isConnected);
    if (cachedDb.isConnected) {
      resolve(cachedDb)
      return
    }
    const dbInstance = mongoose.connect(db, { bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0, // and MongoDB driver buffering
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, })

    mongoose.connection.on('disconnected', () => {
      console.log('disconnect')
      maxConnectTimes++;
      if (maxConnectTimes < 5) {
        mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
      } else {
        throw new Error('数据库挂了，快去fix')
      }
    })

    mongoose.connection.on('error', err => {
      console.log('error')
      maxConnectTimes++;
      if (maxConnectTimes < 5) {
        mongoose.connect(db, { useNewUrlParser: true })
      } else {
        throw new Error('数据库挂了，快去fix')
      }
    })

    mongoose.connection.once('open', () => {
      console.log('MongoDB Connected successfully!')
      cachedDb.isConnected = 1;
      resolve(cachedDb)
    })
  })
}
