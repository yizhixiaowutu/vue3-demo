const express = require('express')
const jwt = require('jsonwebtoken')
const { expressjwt: expressJwt } = require('express-jwt')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(__dirname))
app.use('/pages', express.static('./pages'))

const SECRET_KEY = 'ini8023'

// expressJwt 中间件使用成功后，会在 req 对象上添加一个 user 属性，值为解析出来的 token
app.use(expressJwt({
  secret: SECRET_KEY,
  algorithms: ['HS256']
}).unless({ path: ['/api/login', '/api/logout'] }))


app.post('/api/login', (req, res) => {
  // 校验登录信息
  if (req.body.username !== 'admin' || req.body.password !== 'admin123') {
    return res.send({ status: -1, msg: '登录失败' })
  }
  const tokenStr = jwt.sign({ username: req.body.username }, SECRET_KEY, { expiresIn: '30s' })
  // 登录成功，将用户信息保存到 session 中
  res.send({ status: 0, msg: '登录成功', token: tokenStr })
})

// 获取用户姓名
app.post('/api/username', expressJwt({ secret: SECRET_KEY, algorithms: ['HS256'] }), (req, res) => {
  if (!req.session.isLogin) {
    return res.send({ status: -1, msg: '请先登录' })
  }
  res.send({
    status: 0,
    msg: 'success',
    username: req.user.username
  })
})

// 退出登录, 销毁 session
app.post('/api/logout', (req, res) => {
  req.session.destroy()
  res.send({ status: 0, msg: '退出登录成功' })
})




app.listen(8023, () => {
  console.log('serve at http://127.0.0.1:8023')
})