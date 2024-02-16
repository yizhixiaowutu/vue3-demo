const express = require('express')
const cors = require('cors')
const { expressjwt: expressJwt } = require('express-jwt')

const errorHandler = require('./handler/error')
const config = require('./config')

const app = express()

// 中间件处理
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
  errorHandler.handlerError(req, res, next)
}) // 错误处理中间件


app.use(expressJwt({
  secret: config.JWT_SECRET_KEY,
  algorithms: ['HS256']
}).unless({
  path: [/^\/user/]
}))


// 路由模块处理
const userRouter = require('./router/user')
app.use('/user', userRouter)
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.send({
      status: 401,
      msg: 'token is not valid'
    })
  } else {
    next(err)
  }
})


app.listen('8023', () => {
  console.log('server is running at http://127.0.0.1:8023')
})