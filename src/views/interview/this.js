
Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx && Object(ctx) || globalThis
  const fn = Symbol()
  Object.defineProperty(ctx, fn, {
    value: this,
    enumerable: false
  })
  const r = ctx[fn](...args)
  delete ctx[fn]
  return r
}

Function.prototype.myApply = function (ctx, args) {
  ctx = ctx && Object(ctx) || globalThis
  const fn = Symbol()
  Object.defineProperty(ctx, fn, {
    value: this,
    enumerable: false
  })
  const r = ctx[fn](...args)
  delete ctx[fn]
  return r

}

// test 

function fn(a, b) {
  console.log('a ->', a, '\n', 'b ->', b)
  console.log(this)
}

fn.myCall(null, 10, 99)
fn.myApply(null, [10, 99])