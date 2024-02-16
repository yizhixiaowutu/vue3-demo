const { body, validationResult } = require('express-validator')

const updateUserInfo = [
  body('id').isInt().withMessage('id必须为整数'),
  body('nickname').isLength({ min: 3 }).withMessage('昵称至少3位'),
  body('email').isEmail().withMessage('邮箱格式不正确'),
  body('user_pic').isURL().withMessage('头像地址不正确') // note 仅判断是否为url图片地址
]

const updateUserPwd = [
  body('oldPwd').matches(/^[\S]{6,12}/).withMessage('旧密码长度6-12位'),
  body('password').matches(/^[\S]{6,12}/).withMessage('新密码长度6-12位'),
]

module.exports = {
  updateUserInfo,
  updateUserPwd
}