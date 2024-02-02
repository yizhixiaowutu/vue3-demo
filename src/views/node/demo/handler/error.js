const handlerError = (req, res, next) => {
  res.handlerError = function (err, status = -1) {
    res.send({
      status,
      msg: err instanceof Error ? err.message : err
    })
  }
  next()
}

module.exports = {
  handlerError
}