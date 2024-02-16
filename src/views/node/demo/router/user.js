const express = require('express')
const { validationResult } = require('express-validator')

const handler = require('../handler/user')
const userSchema = require('../schema/user')

const router = express.Router()

router.post('/register', userSchema.register, (req, res) => {
  // note schema 验证错误处理是否可以提取到全局错误中间件?
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send({
      status: -1,
      msg: errors.array()[0].msg
    })
  }
  handler.register(req, res)
})

router.post('/login', handler.login)

module.exports = router