const express = require('express')
const { validationResult } = require('express-validator')

const router = express.Router()

const handler = require('../handler/userinfo')
const userinfoSchema = require('../schema/userinfo')

router.get('/userinfo', (req, res) => {
  handler.getUserInfo(req, res)
})

router.post('/userinfo', userinfoSchema.updateUserInfo, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send({
      status: -1,
      msg: errors.array()[0].msg
    })
  }
  handler.updateUserInfo(req, res)
})

router.post('/password', userinfoSchema.updateUserPwd, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.send({
      status: -1,
      msg: errors.array()[0].msg
    })
  }
  handler.updateUserPwd(req, res)
})

module.exports = router