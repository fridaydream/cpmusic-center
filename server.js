// require('@babel/register')();
// require('babel-polyfill');
// // require('./server/index');
// // const { connect, initSchemas, initAdmin } = require('./database/init.js')

// const Koa = require('koa')
// const { resolve } = require('path')

// const R = require('ramda')
// const MIDDLEWARES = [ 'common', 'router', 'render' ]

// const userMiddlewares = (app) => {
//   R.map(
//     R.compose(
//       R.forEachObjIndexed(
//         initWith => initWith(app)
//       ),
//       require,
//       name => resolve(__dirname, `./server/middlewares/${name}`)
//     )
//   )(MIDDLEWARES)
// }

// const app = new Koa()

// app.listen(7001)


// const mongoose = require('mongoose')
// let db = process.env.ENV_DB;
// // if (isDev) {
// //   db = 'mongodb://127.0.0.1:27017/music?authSource=admin'
// // }
// const glob = require('glob')
// mongoose.Promise = global.Promise

// const initSchemas = () => {
//   glob.sync((resolve(__dirname, './database/schema/', '**/*.js'))).forEach(require)
// }

// // const connect = () => {
// //   let maxConnectTimes = 0;
// //   return new Promise((resolve, reject) => {
// //     // if (process.env.NODE_ENV !== 'production') {
// //     //   mongoose.set('debug', true)
// //     // }
// //     console.log('start');
// //     mongoose.connect(db, { bufferCommands: false, // Disable mongoose buffering
// //       bufferMaxEntries: 0, // and MongoDB driver buffering
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //       useCreateIndex: true, }, () => {
// //         console.log('connect===')
// //         resolve();
// //       })

// //     mongoose.connection.on('disconnected', () => {
// //       console.log('disconnect')
// //       maxConnectTimes++;
// //       if (maxConnectTimes < 5) {
// //         mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
// //       } else {
// //         throw new Error('数据库挂了，快去fix')
// //       }
// //     })

// //     mongoose.connection.on('error', err => {
// //       console.log('error')
// //       maxConnectTimes++;
// //       if (maxConnectTimes < 5) {
// //         mongoose.connect(db, { useNewUrlParser: true })
// //       } else {
// //         throw new Error('数据库挂了，快去fix')
// //       }
// //     })

// //     mongoose.connection.once('open', () => {
// //       console.log('MongoDB Connected successfully!')
// //       // var schema = new mongoose.Schema({ name: 'string'});
// //       // var Tank = mongoose.model('Tank', schema);

// //       // var small = new Tank({ name: 'small' });
// //       // small.save()
// //       //   .then(() => {
// //       //     console.log('saved')
// //       //   })
// //       resolve(true)
// //     })
// //   })
// // }

// // ;(async () => {
// //   await connect();
// //   await initSchemas();

// // })()
// console.log('db', db)
// // mongoose.connect(db, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// //   useCreateIndex: true, }, () => {
// //     console.log('connect===')
// //   })

// mongoose.connect(
//   db,
//   {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false},
//   function(error) { if (error) console.log("Error!" + error); }
// );
//   initSchemas()
//   userMiddlewares(app)

// // console.log('====');
// // connect();
// // initSchemas();

// module.exports = app

require('./server/index');
