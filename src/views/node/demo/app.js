const express = require('express')
const cors = require('cors')

const userRouter = require('./router/user')
const errorHandler = require('./handler/error')

const app = express()

// 中间件处理
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
  errorHandler.handlerError(req, res, next)
}) // 错误处理中间件

// app.use((req, res, next) => {
//   res.handlerError = function (err, status = -1) {
//     res.send({
//       status,
//       msg: err instanceof Error ? err.message : err
//     })
//   }
//   next()
// })

// 路由模块处理
app.use('/user', userRouter)


app.listen('8023', () => {
  console.log('server is running at http://127.0.0.1:8023')
})