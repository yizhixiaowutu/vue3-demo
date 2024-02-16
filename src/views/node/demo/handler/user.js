const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('../config')

const sql_query_user_exist = 'select * from ev_users where username = ?' // 查询用户是否存在
const sql_insert_user = 'insert into ev_users set ?' // 插入用户

const register = (req, res) => {
  const userinfo = req.body
  // 执行数据库查询
  db.query(sql_query_user_exist, [userinfo.username], (err, results) => {
    if (err) {
      return res.handlerError(err)
    }
    if (results.length > 0) {
      return res.handlerError('username is exist')
    }

    // note 上述校验通过后执行入库操作
    // 加密密码
    insertUser({
      username: userinfo.username,
      password: bcrypt.hashSync(userinfo.password, 10),
      email: userinfo?.email,
      nickname: userinfo?.nickname,
      user_pic: userinfo?.user_pic
    }).then(() => {
      return res.send({
        status: 200,
        msg: 'register successful',
      })
    }).catch(err => {
      return res.handlerError(err.message)
    })
  })
}

const login = (req, res) => {
  const userinfo = req.body
  db.query(sql_query_user_exist, [userinfo.username], (err, results) => {
    if (err) {
      return res.handlerError(err)
    }
    if (results.length !== 1) {
      return res.handlerError('username is not exist')
    }
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if (!compareResult) {
      return res.handlerError('password is incorrect')
    }

    const user = {
      ...results[0],
      password: ''
    }
    const tokenStr = jwt.sign(user, config.JWT_SECRET_KEY, {
      expiresIn: config.EXPIRES_IN
    })
    return res.send({
      status: 200,
      msg: 'login successful',
      token: 'Bearer ' + tokenStr,
    })
  })

}

// 插入用户
const insertUser = (userinfo) => {
  return new Promise((resolve, reject) => {
    db.query(sql_insert_user, userinfo, (err, results) => {
      if (err) return reject(err)
      if (results.affectedRows !== 1) {
        reject({
          status: -1,
          message: 'insert user failed'
        })
      }
      if (results.affectedRows === 1) {
        resolve()
      }
    })
  })
}

module.exports = {
  register,
  login
}