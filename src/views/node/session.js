const express = require('express')
const session = require('express-session')

const app = express()

app.use(session({
  secret: 'zoe',
  resave: false,
  saveUninitialized: true
}))


// 托管静态页面
app.use(express.static(__dirname))
app.use('/pages', express.static('./pages'))
// 解析提交的表单数据
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post('/api/login', (req, res) => {
  console.log('login-req', req.body);
  // 校验登录信息
  if (req.body.username !== 'admin' || req.body.password !== 'admin123') {
    return res.send({ status: -1, msg: '登录失败' })
  }

  // 登录成功，将用户信息保存到 session 中
  req.session.user = req.body
  req.session.isLogin = true
  res.send({ status: 0, msg: '登录成功' })
})

// 获取用户姓名
app.post('/api/username', (req, res) => {
  if (!req.session.isLogin) {
    return res.send({ status: -1, msg: '请先登录' })
  }
  res.send({
    status: 0,
    msg: 'success',
    username: req.session.user.username
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