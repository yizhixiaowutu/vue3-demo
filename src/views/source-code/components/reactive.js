// 存储副作用函数的桶
const bucket = new WeakMap()
// 迭代器的key
const ITERATE_KEY = Symbol()

const reactiveMap = new Map() // 存储代理对象的Map
const effectStack = [] // 存储副作用函数的栈
let activeEffect = null // 全局存储当前的副作用函数
let shouldTrack = true // 是否需要收集依赖
const arrayInstrumentations = {} // 数组的原生方法

  ;['includes', 'indexOf', 'lastIndexOf'].forEach(method => {
    const originMethod = Array.prototype[method]
    arrayInstrumentations[method] = function (...args) {
      // this 是代理对象，先在代理对象中查找，将结果存储到 res 中
      let res = originMethod.apply(this, args)
      if (res === false) {
        // res 为 false 说明没找到，在通过 this.raw 拿到原始数组，再去原始数组中查找，并更新 res 值
        res = originMethod.apply(this.raw, args)
      }
      return res
    }
  })

  // push 方法隐式读取length属性，两个 effect 函数如果触发两次push，会导致无限循环
  // 此时需要在 push 方法触发时，shouldTrack 置为 false禁止追踪，执行完毕后再允许追踪
  ;['push'].forEach(method => {
    const originMethod = Array.prototype[method]
    arrayInstrumentations[method] = function (...args) {
      shouldTrack = false
      let res = originMethod.apply(this, args)
      shouldTrack = true
      return res
    }
  })

/**
 * 创建响应式对象
 * @param obj 需要代理的原始对象
 * @param isShallow 是否浅代理
 * @param isReadonly 是否只读
 */
function createReactive(obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      console.log('get => ', key)
      if (key === 'raw') return target // 禁止访问到原型链上的raw属性

      // 非只读才需要建立相应联系
      if (!isReadonly && typeof key === 'symbol') {
        track(target, key)
      }

      const res = Reflect.get(target, key, receiver)
      if (isShallow) return res // 浅代理直接返回结果
      if (typeof res === 'object' && res !== null) {
        // 深层 只读/响应式，递归代理
        return isReadonly ? readonly(res) : reactive(obj)
      }
      return res
    },
    set(target, key, newVal, receiver) {
      console.log('set => ', key)
      if (isReadonly) {
        console.warn(`属性 ${key} 是只读的`)
        return true
      }
      const oldVal = target[key] // 旧值
      // 记 type 为属性是否存在，设置为 SET 或者 ADD
      // 数组根据设置的key是否大于当前长度，超出长度视为添加，否则视为修改原数组索引为key的值
      const type = Array.isArray(target) ? Number(key) < target.length ? 'SET' : 'ADD' : Object.prototype.hasOwnProperty.call(target, key) ? 'SET' : 'ADD'
      const res = Reflect.set(target, key, newVal, receiver)
      if (target === receiver.raw) {
        // 新旧值不相等，排除 NaN
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          trigger(target, key, type, newVal)
        }
      }
      return res
    },
    has(target, key) {
      track(target, key)
      return Reflect.has(target, key)
    },
    ownKeys(target, key) {
      track(target, Array.isArray(target) ? 'length' : ITERATE_KEY)
      return Reflect.ownKeys(target)
    },
    deleteProperty(target, key) {
      if (isReadonly) {
        console.warn(`属性 ${key} 是只读的`)
        return true
      }
      const hadKey = Object.prototype.hasOwnProperty.call(target, key)
      const res = Reflect.deleteProperty(target, key)
      if (res && hadKey) {
        trigger(target, key, 'DELETE')
      }
      return res
    }
  })
}

// 创建响应式对象
function reactive(obj) {
  const proxy = createReactive(obj)
  const existProxy = reactiveMap.get(obj)
  if (existProxy) return existProxy
  reactiveMap.set(obj, proxy)
  return proxy
}

// 创建只读对象
function readonly(obj) {
  return createReactive(obj, false, true)
}

function shallowReactive(obj) {
  return createReactive(obj, true)
}

function shallowReadonly(obj) {
  return createReactive(obj, true, true)
}

// 依赖收集
function track(target, key) {
  if (!activeEffect || !shouldTrack) return // 没有副作用函数或者不需要收集依赖
  let depsMap = bucket.get(target) // 获取当前对象的依赖Map
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key) // 获取当前key的依赖
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}

// 副作用函数执行
function trigger(target, key, type, newVal) {
  console.log('trigger => ', key)
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)

  const effectsToRun = new Set() // 重新创建需要执行的副作用函数集合，避免因forEach中执行的副作用函数进行删除添加操作导致的死循环
  effects && effects.forEach((effectFn) => {
    if (effectFn !== activeEffect) { // 避免属性自增操作进入死循环 eg: obj.num = obj.num + 1
      effectsToRun.add(effectFn)
    }
  })

  if (['ADD', 'DELETE'].includes(type)) {
    const iterateEffects = depsMap.get(ITERATE_KEY)
    iterateEffects && iterateEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn)
      }
    })
  }

  if (Array.isArray(target) && type === 'ADD') { // 隐式修改数组的长度  eg: 原本 arr = [0,1] =>  arr.length = 100 或者 arr[2] = 2
    const lengthEffects = depsMap.get('length')
    lengthEffects && lengthEffects.forEach(effectFn => {
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn)
      }
    })
  }

  if (Array.isArray(target) && key === 'length') {
    // 对于索引 key >= 新长度 length 的元素，需要把所有相关联的副作用函数取出并加入待执行函数中
    depsMap.forEach((effects, key) => {
      if (key > newVal) {
        effects.forEach(effectFn => {
          if (effectFn !== activeEffect) {
            effectsToRun.add(effectFn)
          }
        })
      }
    })
  }

  effectsToRun && effectsToRun.forEach(effectFn => {
    if (effectFn.options.scheduler) {
      // 如果有调度函数，则调用调度函数，将 effectFn 作为入参传入，交由调度函数处理
      effectFn.options.scheduler(effectFn)
    } else {
      effectFn()
    }
  })
}

// 副作用函数
function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn // 赋值当前副作用函数
    effectStack.push(effectFn) // 副作用函数压栈
    const res = fn() // 记录函数执行结果
    effectStack.pop() // 副作用函数出栈
    activeEffect = effectStack[effectStack.length - 1]
    return res
  }

  effectFn.options = options
  effectFn.deps = [] // 存储副作用函数的依赖
  if (!options.lazy) { // NOTE: 非懒执行则立即触发副作用函数，lazy: true 用于实现 computed
    effectFn()
  }
  return effectFn
}

// 断开副作用函数与响应式数据之间的联系
function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}
