const mysql = require('mysql')
const { nextTick } = require('process')

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Tt18339364454.',
  database: 'my_db_01'
})

// // 插入一条数据
// const user = { username: 'Spider-man', password: 'pcc321' }
// // 待执行的 SQL 语句，? 代表占位符
// const sqlStr = 'insert into users (username, password) values (?,?)'
// db.query(sqlStr, [user.username, user.password], (err, results) => {
//   if (err) return console.log(err.message)
//   // affectedRows 受影响的行数，如果大于 0 就表示操作成功
//   if (results.affectedRows === 1) {
//     console.log('插入数据成功')
//   }
// })


// note: 如果插入的数据属性较多，声明多个占位符不方便
// insert into [表名] set ?
// const user2 = { username: 'Iron Man', password: 'xlj321' }
// const sqlStr2 = 'insert into users set ?'
// db.query(sqlStr2, user2, (err, results) => {
//   if (err) return console.log(err.message)
//   if (results.affectedRows === 1) {
//     console.log('插入数据成功')
//   }

// })


// note: 更新一条数据
// const user3 = { id: 7, username: 'tlp-update', password: 'tlp123-update' }
// const sqlStr3 = 'update users set username = ?, password = ? where id = ?'
// db.query(sqlStr3, [user3.username, user3.password, user3.id], (err, results) => {
//   if (err) return console.log(err.message)
//   if (results.affectedRows === 1) {
//     console.log('更新数据成功')
//   }
// })

// note: 快速更新一条数据
// const user4 = { id: 4, username: 'txq-update', password: 'ini8023-update', status: 1 }
// const sqlStr4 = 'update users set ? where id = ?'
// db.query(sqlStr4, [user4, user4.id], (err, results) => {
//   if (err) return console.log(err.message)
//   if (results.affectedRows === 1) {
//     console.log('快速更新数据成功')
//   }
// })

// note: 删除一条数据
// query 方法第二个参数，如果占位符为一个，可以直接传入一个值，也可以写成数组
// const sqlStr5 = 'delete from users where id = ?'
// db.query(sqlStr5, [3], (err, results) => {
//   if (err) return console.log(err.message)
//   if (results.affectedRows === 1) {
//     console.log('删除数据成功')
//   }

// })

// note: 考虑删除数据具有危险性，可以采用标记删除的方式，将数据的状态标记为已删除
const sqlStr6 = 'update users set status = ? where id = ?'
db.query(sqlStr6, [1, 1], (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) {
    console.log('标记删除数据成功')
  }
})


// nextTick(() => {
//   db.query('select * from users', (err, results) => {
//     if (err) return console.error(err.message)
//     console.log("🚀 ~ db.query ~ results1:", results)
//   })
// })