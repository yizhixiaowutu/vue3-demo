const db = require('../db/index')
const bcrypt = require('bcryptjs')

const sql_query_userinfo = 'select username,nickname,email,user_pic from ev_users where id = ?'
const sql_update_userinfo = 'update ev_users set ? where id = ?'
const sql_query_user_pwd = 'select password from ev_users where id = ?'

const getUserInfo = (req, res) => {
  db.query(sql_query_userinfo, req.auth.id, (err, results) => {
    if (err) {
      return res.handlerError(err)
    }
    if (results.length !== 1) {
      return res.handlerError('fail to get user info')
    }
    return res.send({
      status: 200,
      msg: 'success get user info',
      data: results[0]
    })
  })
}

const updateUserInfo = (req, res) => {
  db.query(sql_update_userinfo, [req.body, req.body.id], (err, results) => {
    if (err) {
      return res.handlerError(err)
    }
    if (results.affectedRows !== 1) {
      return res.handlerError('fail to update user info')
    }
    return res.send({
      status: 200,
      msg: 'success update user info',
    })
  })
}

const updateUserPwd = (req, res) => {
  db.query(sql_query_user_pwd, [req.body.id], (err, results) => {
    if (err) {
      return res.handlerError(err)
    }
    if (results.length !== 1) {
      return res.handlerError('fail to get user info')
    }
    // 判断旧密码是否正确
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) {
      return res.handlerError('old password is incorrect')
    }
    // 新旧密码不允许相同
    if (req.body.oldPwd === req.body.password) {
      return res.handlerError('new password is not same as old password')
    }
    // 更新密码
    db.query(sql_update_userinfo, [{ password: bcrypt.hashSync(req.body.password, 10) }, req.body.id], (err, results) => {
      if (err) {
        return res.handlerError(err)
      }
      if (results.affectedRows !== 1) {
        return res.handlerError('fail to update user password')
      }
      return res.send({
        status: 200,
        msg: 'success update user password',
      })
    })
  })
}

module.exports = {
  getUserInfo,
  updateUserInfo,
  updateUserPwd
}