const { body, validationResult } = require('express-validator')

const register = [
  body('username').isLength({ min: 3 }).withMessage('用户名至少3位'),
  body('password').matches(/^[\S]{6,12}/).withMessage('密码长度6-12位'),
  body('email').optional().isEmail().withMessage('邮箱格式不正确')
]
module.exports = {
  register
}