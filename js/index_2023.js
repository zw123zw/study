;(function () {
  String.prototype.myTrim = function () {
    return rhis.replace(/^\s+/g, "").replace(/\s+$/g, "")
  }

  function deepClone(obj) {
    if (typeof obj === "object") {
      let result = obj instanceof Array ? [] : {}
      for (let key in obj) {
        result[key] = typeof obj === "object" ? deepClone(obj[key]) : obj[key]
      }
      return result
    } else {
      return obj
    }
  }

  const _completeDeepClone = (target, map = new WeakMap()) => {
    if (target === null) return target
    if (typeof target !== "object") return target
    const constructor = target.constructor
    if (/^(Function|RegExp|Date|Map|Set)$/i.test(constructor.name)) {
      return new constructor(target)
    }
    if (map.has(target)) return map.get(target)
    map.set(target, target)
    const cloneTarget = Array.isArray(target) ? [] : {}
    for (prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = _completeDeepClone(target[prop], map)
      }
    }
    return cloneTarget
  }

  function curry(fn) {
    let params = []
    const next = function (...args) {
      params = [...params, ...args]
      if (params.length === fn.length) {
        return fn.apply(this, params)
      } else {
        return next
      }
    }
    return next
  }

  function addString(a, b) {
    let maxLength = Math.max(a.length, b.length)
    a = a.padStart(maxLength, 0)
    b = b.padStart(maxLength, 0)
    let t = 0
    let f = 0
    let sum = ""
    for (let i = maxLength - 1; i >= 0; i--) {
      t = parseInt(a[i]) + parseInt(b[i]) + f
      f = Math.floor(t / 10)
      sum = (t % 10) + sum
    }
    if (f === 1) {
      sum = "1" + sum
    }
    return sum
  }

  function flat() {
    return this.reduce((arr, cur) => {
      return arr.concat(cur)
    }, [])
  }
  function flatDeep(arr, d) {
    return d > 1
      ? arr.reduce(
          (acc, val) =>
            acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
          []
        )
      : arr.slice()
  }
  function flatStack(arr) {
    const result = []
    const stack = [].concat(arr)
    while (stack.length) {
      const val = stack.pop()
      if (Array.isArray(val)) {
        stack.push(...val)
      } else {
        result.unshift(val)
      }
    }
    return result
  }

  function debounce(fn, time) {
    let timeout = null
    return function (...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        fn.apply(this, args)
      }, time)
    }
  }

  function throttle(fn, wait) {
    let timeout = null
    return function (...args) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          fn.apply(this, args)
        }, wait)
      }
    }
  }

  function myRerverse(str) {
    let arr = str.split("")
    let resArr = []
    arr.forEach((val) => {
      resArr.unshift(val)
    })
    return resArr.join("")
  }

  function unqiue(arr) {
    return Array.from(new Set(arr))
  }
  function unique1(arr) {
    let res = []
    arr.forEach((item) => {
      if (res.indexOf(item) === -1) {
        res.push(item)
      }
    })
    return res
  }

  function sliceFun() {
    return [].slice.call(arguments)
    return Array.prototype.slice.apply(arguments)
  }

  Promise.allSettled([Promise.resolve(111), Promise.reject(333)]).then(
    (res) => {
      console.log(res)
    }
  )

  function Array1(...args) {
    return args
  }

  function numFormat(num) {
    num = num.toString().split(".")
    let arr = num[0]
    let res = []
    arr.forEach((item, index) => {
      if (index % 3 === 0 && index !== 0) {
        res.push(",")
      }
      res.push(item)
    })
    res = res.reverse().join("")
    if (num[1]) {
      res = res + "." + num[1]
    }
    return res
  }

  function isPalindroom(x) {
    if (x < 0) return false
    let str = x.toString()
    return Array.from(str).reverse().join("") === str
  }
  function isPalindroom1(str) {
    str = "" + str
    let newStr = ""
    for (let len = str.length, i = len; i >= 0; i--) {
      newStr += str[i]
    }
    return newStr === str
  }

  function tmpl(str, data) {
    let str = document.getElementById(str).innerHTML
    let string =
      "var p = []; p.push('" +
      str
        .replace(/[\r\t\n]/g, "")
        .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
        .replace(/<%/g, "")
        .replace(/%>/g, 'p.push(")')
    eval(string)
    return p.join("")
  }

  function isPrime(num) {
    for (let i = 2; i <= num - 1; i++) {
      if (num % i === 0) return false
    }
    return true
  }

  function countPrimes(n) {
    let ret = [],
      flag = 1
    if (n < 2) {
      return 0
    }
    for (let i = 1; i < n; i++) {
      flag = 2
      for (let j = 2; j < Math.sqrt(i); j++) {
        if (i % j === 0) {
          flag = 0
          break
        }
      }
      if (flag === 2) {
        ret.push(i)
      }
    }
    return ret
  }

  Array.prototype.myMap = function (fn) {
    let obj = {}
    let fn = Symbol("fn")
    obj[fn] = this
    let res = []
    obj[fn].forEach((item, index) => {
      res.push(fn(item, index, obj[fn]))
    })
    return res
  }
  Array.prototype.myMap1 = function (fn) {
    const result = []
    let context = this
    for (let i = 0; i < context.length; i++) {
      result.push(fn(context[i], i, context))
    }
  }

  Array.prototype.myFilter = function (fn) {
    const result = []
    let context = this
    for (let i = 0; i < context.length; i++) {
      if (fn(context[i], i, context)) {
        result.push(context[i])
      }
    }
    return context
  }

  Array.prototype.myReduce = function (fn, initValue) {
    let context = this
    let result = initValue ? initValue : context[0]
    for (let i = 0; i < context.length; i++) {
      result = fn(result, context[i], context)
    }
    return result
  }

  Array.prototype.myEvery = function (fn) {
    let bool = true
    let context = this
    for (let i = 0; i < context.length; i++) {
      if (!fn(context[i], i, context)) {
        bool = false
        break
      }
    }
    return bool
  }

  Array.prototype.mySome = function (fn) {
    let context = this
    let bool = false
    for (let i = 0; i < context.length; i++) {
      if (fn(context[i], i, context)) {
        bool = true
        break
      }
    }
    return bool
  }

  Array.prototype.myFind = function (fn) {
    let result
    let context = this
    for (let i = 0; i < context.length; i++) {
      if (fn(context[i], i, context)) {
        result = context[i]
        break
      }
    }
    return result
  }

  Array.prototype.myFlat = function () {
    let context = this
    if (!Array.isArray(context)) {
      return
    }
    return context.reduce((acc, cur) => {
      return acc.concat(Array.isArray(cur) ? context.myFlat.call(cur) : cur)
    }, [])
  }

  function loadImg(imgs) {
    const handle = () => {
      imgs.forEach((img, index) => {
        const rect = img.getBoundingClientRect()
        if (rect.top > window.innerHeight) {
          setTimeout(() => {
            img.src = img.dataset.src
          }, index * 100)
        }
      })
    }
  }

  function loadImg1(imgs) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.intersectionRatio > 0) {
          setTimeout(() => {
            entry.target.src = entry.target.dataset.src
            observer.unobserve(entry.target)
          }, index * 200)
        }
      })
    })
    imgs.forEach((img) => {
      observer.observe / img
    })
  }

  function preloadImg(...imgs) {
    const imgArr = []
    for (let i = 0; i < imgs.length; i++) {
      imgArr[i] = new Image()
      imgArr[i].src = imgs[i]
    }
  }

  let myNewFn = function (context, ...args) {
    const obj = Object.create(context)
    const res = context.apply(obj, args)
    return typeof res === "object" ? res : obj
  }

  const _objectFreeze1 = (object) => {
    for (let prop in object) {
      const type = Object.prototype.toString.call(object[prop])
      if (["[object, Array]", "[object, Object]"].includes(type)) {
        _objectFreeze1(object[prop])
      } else {
        Object.defineProperty(object, key, {
          writeable: false
        })
      }
    }
  }

  Object.prototype.myInstanceOf = function (left, right) {
    if (typeof left === "undefined" && typeof right === "undefined") {
      return false
    }
    const rPrototype = Object.getPrototypeOf(right)
    while ((left = Object.getPrototypeOf(left))) {
      if (left === rPrototype) {
        return true
      }
    }
    return false
  }

  Function.prototype.myCall = function (context = window, ...args) {
    const fn = Symbol("fn")
    context[fn] = this
    let res = context[fn](...args)
    delete context[fn]
    return res
  }

  Function.prototype.myApply = function (context = window, args) {
    const fn = Symbol("fn")
    if (!Array.isArray(args)) {
      console.log("apply第二个参数必须是数组")
      return
    }
    context[fn] = this
    let res = context[fn](...args)
    delete context[fn]
    return res
  }

  Function.prototype.myBind = function (context = window, ...args) {
    const fn = Symbol("fn")
    context[fn] = this
    return function (..._args) {
      return context[fn].apply(context, args.concat(_args))
    }
  }

  const typezw = function () {
    const type = Object.create(null)
    const typeArr = [
      "String",
      "Number",
      "Object",
      "Array",
      "Null",
      "Undefined",
      "Boolean"
    ]
    typeArr.map((item) => {
      type[`is${item}`] = function (args) {
        return Object.prototype.toString.call(args) === `[Object ${item}]`
      }
    })
    return type
  }

  function memory(fn) {
    const cache = new WeakMap()
    return function (...args) {
      const key = JSON.stringify(args)
      if (cache.has(key)) {
        return cache.get(ket)
      } else {
        cache.set(key, fn.apply(fn, args))
        return cache.get(key)
      }
    }
  }

  function cycle(target) {
    const map = new WeakMap()
    function _cycle(obj) {
      if (!map.has(obj)) {
        mao.set(obj, obj)
      }
      let keys = Object.keys(obj)
      for (let i = 0; i < keys.length; i++) {
        if (typeof obj[keys[i]] === "object") {
          if (map.has(obj[keys[i]])) {
            obj[keys[i]] = "$"
            continue
          } else {
            map.set(obj[keys[i]], obj[keys[i]])
          }
        }
        _cycle(obj[keys[i]])
      }
    }
    _cycle(obj[keys[i]])
    return target
  }

  function DFSdeepClone(obj, visitedArr = []) {
    let _obj = {}
    if (typeof obj === "object" && obj !== null) {
      let index = visitedArr.indexOf(obj)
      _obj = Array.isArray(obj) ? [] : {}
      if (~index) {
        _obj = visitedArr[index]
      } else {
        for (let key in obj) {
          _obj[key] = DFSdeepClone(obj[key], visitedArr)
        }
        visitedArr.push(obj)
      }
    } else if (typeof obj === "function") {
      _obj = eval("(" + obj.toString() + ")")
    } else {
      _obj = obj
    }
    return _obj
  }

  function BFSdeepClone(obj) {
    let originObj = [obj],
      copyObj = [Array.isArray(obj) ? [] : {}],
      visitedOriginArr = [],
      visitedCopyArr = []
    while (originObj.length) {
      const item = originObj.shift()
      const _obj = copyObj.shift()
      visitedOriginArr.push(item)
      if (typeof item === "object" && item !== null) {
        for (let key in item) {
          const val = item[key]
          if (val.constructor === "Object") {
            const index = visitedOriginArr.indexOf(item[key])
            if (~index) {
              _obj[key] = visitedOriginArr[index]
            } else {
              _obj[key] = {}
              originObj.push(val)
              copyObj.push(_obj[key])
            }
          } else if (val.constructor === "Array") {
            _obj[key] = []
            originObj.push(val)
            copyObj.push(_obj[key])
          } else if (val.constructor === "Function") {
            _obj[key] = eval("(" + val.toString() + ")")
          } else {
            _obj[key] = val
          }
        }
        visitedCopyArr.push(_obj)
      } else if (typeof item === "function") {
        _obj = eval("(" + val.toString() + ")")
      } else {
        _obj = item
      }
    }
    return copyObj
  }

  Promise.prototype._all = function (promiseList) {
    const len = promiseList.length,
      result = []
    let count = 0
    return new Promise((resolve, reject) => {
      promiseList.forEach((item, index) => {
        item.then(
          (res) => {
            result.push(res)
            count++
            if (count === len) {
              resolve(result)
            }
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  }
  Promise._all([Promise.resolve(234), Promise.resolve(666)]).then((res) => {
    console.log(res)
  })

  Promise.prototype._race = function (promiseList) {
    return new Promise((resolve, reject) => {
      promiseList.forEach((item) => {
        item.then(
          (res) => {
            resolve(res)
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  }

  Promise.prototype._finally = function (fn) {
    return this.then(
      (res) => {
        Promise.resolve(fn()).then((res) => {
          return res
        })
      },
      (err) => {
        Promise.reject(fn()).catch((err) => {
          return err
        })
      }
    )
  }

  function asyncToGenerator(genF) {
    return new Promise((resolve, reject) => {
      const gen = genF()
      const step = (type, args) => {
        let next
        try {
          next = gen[type](args)
        } catch (error) {
          return reject(error)
        }
        const { done, value } = next
        if (done) {
          return resolve(value)
        }
        Promise.resolve(value).then(
          (val) => step("next", val),
          (err) => step("throw", err)
        )
      }
      step("next")
    })
  }
  asyncToGenerator(function* helloWorldGenerator() {
    yield "hello"
    yield "world"
    return "ending"
  }).then((res) => {
    console.log(res)
  })

  class MyEvent {
    constructor() {
      this._event = Object.create(null)
      this.stackArr = null
      this.stackArr &&
        this.stackArr.forEach((fn, index) => {
          fn()
          if (index === this.stackArr.length - 1) {
            this.stackArr = null
          }
        })
    }
  }

  MyEvent.prototype.on = function (key, on) {
    this._event[key] = this._event[key] || []
    this._event.push(fn)
    return this
  }
  MyEvent.prototype.emit = function (key, ...payload) {
    this._event &&
      this._event[key].forEach((fn) => {
        fn.apply(fn, payload)
      })
    let fn = () => this.emit(this, key, payload)
    if (!this._event[key] && !this.stackArr) {
      this.stackArr = []
      this.stackArr.push(fn)
    }
  }
  MyEvent.prototype.off = function (key, callback) {
    if (callback) {
      return (this._event[key] = this._event[key].filter(
        (fn) => fn !== callback && fn.c !== callback
      ))
    }
  }
  MyEvent.prototype.once = function (key, fn) {
    const once = (...payload) => {
      this.off(key, one)
      fn.apply(fn, payload)
    }
    one.c = fn
    this.on(key, one)
  }
  MyEvent.prototype.clearAllEvent = function () {
    Object.keys(this._event).forEach((key) => {
      this._event[key] = []
    })
  }
  const _eventer = new MyEvent()
  const lister = (a) => {
    console.log("发布订阅a", a)
  }
  const listerb = (b) => {
    console.log("发布订阅b", b)
  }
  _eventer.on("test", lister)
  _eventer.on("test1", listerb)
  _eventer.emit("test")
  _eventer.emit("test1")

  function getSignle(fn) {
    let result
    return function (...args) {
      return result || (result = fn.apply(fn, args))
    }
  }
  let _signFn1 = getSignle(function (a, b) {
    return a + b
  })

  const proxyer = function (fn) {
    let result
    const handler = {
      construct: function () {
        if (!result) {
          result = Reflect.constructor(fn, arguments)
        }
        return result
      }
    }
    return new Proxy(fn, handler)
  }
  const _prer = proxy(function (a) {
    console.log(a)
  })
  new _prer("Proxy拦截")

  Object.prototype._create = function (object) {
    function F() {}
    F.prototype = object
    return new F()
  }

  function fatherFn(...arr) {
    this.some = "parent的this属性"
    this.params = arr
  }
  father.prototype.fatherFnSome = "parent原型对象的属性或者方法"
  function sonFn() {
    this.obkork1 = "child的this属性"
  }
  function inheritPrototype(son, father) {
    const fatherPrototype = Object.create(father.prototype)
    son.prototype = fatherPrototype
    son.prototype.constructor = son
    Object.setPrototypeOf(son, father)
  }
  inheritPrototype(sonFn, fatherFn)
  sonFn.prototype.sonFnSome = "child原型对象的属性或者方法"
  const sonFnIniter = new sonFn()
  console.log(sonFnInit.obkork1, sonFnInit.fatherFnSome)
  console.log(sonFnInit.sonFnSome)

  function compose(fns) {
    return function (...args) {
      let start = fns.length - 1
      let result = [...args]
      while (start >= 0) {
        result = fns[start].apply(
          fn[start],
          Array.isArray(result) ? result : [result]
        )
        start--
      }
      return result
    }
  }

  function asyncParallel(...fns) {
    let count = 0
    return function (...args) {
      const [cb, ...other] = args
      fns.forEach(async (fn) => {
        await fn.apply(fn, other)
        count++
        if (count === fns.length) {
          cb()
        }
      })
    }
  }
  const asyncfn11 = () => {
    return new Promise((resolve, reject) => {
      console.log("异步并行", 888888)
      resolve(1)
    })
  }
  const asyncfn22 = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("异步并行2", 999999)
        resolve(2)
      }, 1000)
    })
  }
  const asyncfn33 = () => {
    return new Promise((resolve, reject) => {
      console.log("异步并行3", 100000000)
      resolve(3)
    })
  }
  asyncParallel(
    asyncfn11,
    asyncfn22,
    asyncfn33
  )(function () {
    console.log("执行结束")
  })

  function asyncSerial(...fns) {
    const [first, ...others] = fns
    return function (...args) {
      return other.reduce((a, b) => {
        Promise.resolve(() => a()).then(() => b(...args))
      }, first(...args))
    }
  }

  function Calculate() {
    let date = new WeakMap()
    Calculate = function () {
      data.set(this, Math.random())
    }
    Calculate.prototype.doSth = function () {
      return data.get(this)
    }
    return new Calculate()
  }

  function A() {
    let a = Math.random()
    A.prototype.getA = () => a
    this.getA = () => a
  }

  String.prototype.myTrim = function (str) {
    return this.replace(/^\s+/g, "").replace(/\s+$/g, "")
  }
  console.log("  1123 12 23   ".myTrim())

  function deepClone(obj) {
    if (typeof obj === "object") {
      let res = obj instanceof Array ? [] : {}
      for (let key in obj) {
        res[key] = typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key]
      }
      return res
    } else {
      return obj
    }
  }
  console.log(
    deepClone({
      a: 12322,
      b: { a: 123 },
      c: [1, 2, 3],
      d: function () {
        console.log(111)
      }
    })
  )

  function curry(fn) {
    const length = fn.length
    let args = []
    const next = function () {
      args = args.concat([].slice.call(arguments))
      if (args.length < length) {
        return next
      } else {
        return fn.apply(this, args)
      }
    }
    return next
  }
  function add(a, b, c) {
    return a + b + c
  }
  const curryFn = curry(add)
  console.log(curryFn(1)(2)(3))

  function addString(a, b) {
    let maxLength = Math.max(a.length, b.length)
    a = a.padStart(maxLength, 0)
    b = b.padStart(maxLength, 0)
    let t = 0
    let f = 0
    let sum = ""
    for (let i = maxLength - 1; i >= 0; i--) {
      t = parseInt(a[i]) + parseInt(b[i]) + f
      f = Math.floor(t / 10)
      sum = (t % 10) + sum
    }
    if (f === 1) {
      sum = "1" + sum
    }
    return sum
  }
  console.log(addString("8234567899999999999", "9234567899999999999"))

  function flat(data) {
    return data.reduce((pre, cur) => pre.concat(cur), [])
  }
  function flatDeep(arr, d) {
    return d > 1
      ? arr.reduce(
          (pre, cur) =>
            pre.concat(Array.isArray(cur) ? flatDeep(cur, d - 1) : cur),
          []
        )
      : arr.slice()
  }
  function flatStack(arr) {
    const result = []
    const stack = [].concat(arr)
    while (stack.length) {
      const val = stack.pop()
      if (Array.isArray(val)) {
        stack.push(...val)
      } else {
        result.unshift(val)
      }
    }
    return result
  }
  console.log(flat([1, 2, [3, 4]]))
  console.log(flatDeep([1, 2, [3, 4, [5, 6]]], 3))
  console.log(flatStack([1, 2, [3, 4, [5, 6]]], 3))

  let debounce = function (fn, time) {
    let timeout = null
    return function () {
      clearTimeout(timeout)
      timeout = setTimeout(fn.bind(fn), time)
    }
  }
  debounce(function () {
    console.log("防抖")
  }, 1000)()
  let throttle = function (fn, wait) {
    let timeout = null

    throttle.cancle = function () {
      clearTimeout(timeout)
      timeout = null
      fn.apply(fn)
    }

    return function () {
      let args = [].slice.call(arguments) || [...arguments]
      if (!timeout) {
        timeout = setTimeout(function () {
          timeout = null
          fn.apply(fn, args)
        }, wait)
      }
    }
  }
  throttle(function () {
    console.log("节流")
  }, 1000)()

  function myReverse(str) {
    let strArr = str.split("")
    let res = []
    strArr.forEach((v) => {
      res.unshift(v)
    })
    return res.join("")
  }
  console.log(myReverse("hello"))

  function unique(arr) {
    return Array.from(new Set(arr))
  }
  function unique1(arr) {
    let res = []
    arr.forEach((v) => {
      if (!res.includes(v)) {
        res.push(v)
      }
    })
    return res
  }
  console.log(unique([1, 2, 1, 3]))
  console.log(unique1([3, 4, 3, 5]))

  function sliceFun(arr) {
    return [].slice.call(arr)
  }
  console.log(sliceFun([1, 2, 3, 3]))

  Promise.allSettled([Promise.resolve(111), Promise.reject(333)]).then(
    (res) => {
      console.log(res)
    }
  )

  function Array1() {
    return [].slice.call(arguments) || [...arguments]
  }

  function numFormat(num) {
    num = num.toString().split(".")
    let arr = num[0].split("").reverse()
    let res = []
    arr.forEach((v, i) => {
      if (i % 3 === 0 && i !== 0) {
        res.push(",")
      }
      res.push(v)
    })
    res = res.reverse().join("")
    if (num[1]) res = res + "." + num[1]
    return res
  }
  console.log(numFormat(1234567894532))
  console.log(numFormat(1234567894.532))

  function isPalindrome(x) {
    if (x < 0) return false
    let str = x.toString()
    return Array.from(str).reverse().join("") === str
  }
  function isPalindrome1(str) {
    str = str.toString()
    let newStr = ""
    for (let i = str.length - 1; i >= 0; i--) {
      newStr += str[i]
    }
    return newStr === str
  }
  console.log(isPalindrome(12421))
  console.log(isPalindrome1(12421))

  function tmpl(str, data) {
    str = document.getElementById(str).innerHTML
    let string =
      "var p = []; p.push('" +
      str
        .repalce(/[\r\t\n]/g, "")
        .replace(/<%=(.*?)%>/g, "'); p.push($1); p.push('")
        .replace(/<%/g, ");")
        .replace(/%>/g, 'p.push("')
    eval(str)
    return p.join("")
  }

  function isPrime(num) {
    for (let i = 2; i < num - 1; i++) {
      if (num % i === 0) {
        return false
      }
    }
    return true
  }
  console.log(isPrime(12))

  function countPrimes(n) {
    let ret = []
    flag = 1
    if (n < 2) return 0
    for (let i = 0; i < n; i++) {
      for (let j = 2; j < Math.sqrt(n); j++) {
        if (i % j === 0) {
          flag = 0
          break
        }
      }
      if (flag === 2) {
        ret.push(i)
      } else {
        flag = 2
      }
    }
    return ret
  }
  console.log(countPrimes(12))

  Array.prototype.myMap = function (fn, _that) {
    let obj = {}
    let arrSymbol = Symbol("123")
    let res = []
    obj[arrSymbol] = this
    obj[arrSymbol].forEach((item, index) => {
      res.push(fn.call(_that, item, index, obj[arrSymbol]))
    })
    return res
  }
  Array.prototype.myMap1 = function (fn, _that) {
    const res = []
    const context = this
    for (let i = 0; i < context.length; i++) {
      if (!context.hasOwnProperty(i)) continue
      res.push(fn.call(_that, context[i], i, context))
    }
    return res
  }
  let a = (a1 = new Array(1, 3, 15))
  a = a.myMap((item) => item * item)
  a1 = a1.myMap1((item) => item * item)
  console.log(a, a1)

  Array.prototype.myFilter = function (fn) {
    let context = this
    let res = []
    for (let i = 0; i < context.length; i++) {
      if (!context.hasOwnProperty(i)) continue

      if (fn(context[i], i, context)) {
        res.push(context[i])
      }
    }
    return res
  }
  let filterArr = [1, 3, 4, 9]
  console.log(filterArr.myFilter((item) => item > 3))
  ;[2, 3, 6].reduce((pre, cur) => {
    return cur + pre
  }, 0)
  Array.prototype.myReduce = function (fn, start) {
    let context = this
    let res = start ? start : context[0]
    for (let i = 0; i < context.length; i++) {
      if (!context.hasOwnProperty(i)) continue
      res = fn(res, context[i], context)
    }
    return res
  }
  let reduceArr = [2, 3, 5]
  console.log(
    reduceArr.myReduce((acc, cur) => {
      acc = acc * cur
      return acc
    }, 2)
  )

  Array.prototype.myEvery = function (fn) {
    let bool = true
    let context = this
    for (let i = 0; i < context.length; i++) {
      if (!context.hasOwnProperty(i)) continue
      if (!fn(context[i], i, context)) {
        bool = false
        break
      }
    }
    return bool
  }
  Array.prototype.mySome = function (fn) {
    let bool = false
    let context = this
    for (let i = 0; i < context.length; i++) {
      if (!context.hasOwnProperty(i)) continue
      if (fn(context[i], i, context)) {
        bool = true
        break
      }
    }
    return bool
  }
  Array.prototype.myFind = function (fn) {
    let res = null
    let context = this
    for (let i = 0; i < context.length; i++) {
      if (!context.hasOwnProperty(i)) continue
      if (fn(context[i], i, context)) {
        res = context[i]
        break
      }
    }
    return res
  }
  Array.prototype.myFlat = function () {
    if (!Array.isArray(this)) return
    return this.reduce(
      (pre, cur) =>
        pre.concat(Array.isArray(cur) ? this.myFlat.call(cur) : cur),
      []
    )
  }
  console.log([1, 3, [2, [3, 599], 5]].myFlat())

  function loadImg(imgs) {
    const handle = () => {
      imgs.forEach((img, index) => {
        const rect = img.getBoundingClientRect()
        if (rect.top > window.innerHeight) {
          setTimeout(() => {
            img.src = img.dataset.src
          }, index * 100)
        }
      })
    }
    return handle
  }
  function loadImg1(imgs) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.intersectionRatio > 0) {
          setTimeout(() => {
            entry.target.src = entry.target.dataset.src
          }, index * 200)
        }
      })
    })
    imgs.forEach((img) => {
      observer.observe(img)
    })
  }
  loadImg1([...document.querySelectorAll(".img1")])
  document.addEventListener(
    "scroll",
    loadImg([...document.querySelectorAll(".img2")])
  )

  function preloadImg(imgs) {
    let imgArr = []
    let count = 0
    imgs.forEach((item, index) => {
      const img = new Image()
      img.onload = function () {
        item.src = imgArr[index]
        count++
        if (count === imgArr.length) {
          console.log("加载完成")
        }
      }
    })

    return {
      setSrc: function (args) {
        imgs.forEach((item, index) => {
          item.src = args[index]
        })
        imgArr = args
      }
    }
  }
  preloadImg([...document.querySelectorAll(".img3")]).setSrc([
    "https://img.2125.com/20200806/img/h001/h41/img20210922095339562620.jpg",
    "https://img.2125.com/20200806/img/h001/h41/img20210922095339562620.jpg",
    "https://img.2125.com/20200806/img/h001/h41/img20210922095339562620.jpg"
  ])

  Function.prototype.myNew = function (...args) {
    let context = this
    const target = Object.create(context)
    const res = context.apply(target, args)
    return typeof res === "onject" ? res : target
  }
  const _myNew = function (a, b) {
    return {
      a,
      b
    }
  }
  console.log(_myNew.myNew(456, 123))

  function myInstanceof(left, right) {
    if (typeof left === "undefind" || typeof right === "undefind") return
    const rPrpto = right.prototype
    while ((left = Object.getPrototypeOf(left))) {
      if (left === rPrpto) return true
    }
    return false
  }
  console.log(myInstanceof({ a: 123 }, Array))

  Function.prototype.myCall = function (context = window, ...args) {
    const fnSymbol = Symbol("fn")
    context[fnSymbol] = this
    context[fnSymbol](...args)
    delete context[fnSymbol]
  }
  let _myCall = function (b, c) {
    console.log(this.a + b + c)
  }
  _myCall.myCall({ a: 111 }, 222, 333)

  Function.prototype.myApply = function (context = window, args) {
    const fnSymbol = Symbol("fn")
    context[fnSymbol] = this
    context[fnSymbol](...args)
    delete context[fnSymbol]
  }
  Function.prototype.myBind = function (context = window, ...args) {
    const fnsymbol = Symbol("fn")
    context[fnsymbol] = this
    return function (...args1) {
      return context[fnsymbol](...args.concat(args1))
    }
  }

  const type = (function () {
    const types = Object.create(null)
    ;[
      "String",
      "Number",
      "Boolean",
      "Null",
      "Undefind",
      "Object",
      "Array"
    ].forEach((v, i) => {
      types["is" + v] = function (data) {
        // return Object.prototype.toString.call(data) === `[object ${v}]`
        return Object.prototype.toString.call(data) === `[Object ${v}]`
      }
    })
    return types
  })()
  console.log(type.isObject({ a: 123 }))
  console.log(type.isArray([2, 42, 64]))
  console.log(type.isNumber(123))

  function memory(fn) {
    const cache = {}
    return function (...args) {
      const key = JSON.stringify(args)
      if (typeof cache[key] !== "undefind") {
        return cache[key]
      } else {
        cache[key] = fn.apply(fn, args)
        return cache[key]
      }
    }
  }
  const _memory = function (a, b) {
    return a + b
  }
  const _memoryTo = memory(_memory)
  console.log(_memoryTo(2, 5))
  console.log(_memoryTo(2, 5))

  function cycle(target) {
    const map = new Map()
    function _cycle(obj) {
      if (!map.has(obj)) {
        map.set(obj, obj)
      }
      let keys = Object.keys(obj)
      for (let i = 0; i < keys.length; i++) {
        if (typeof obj[keys[i]] === "object") {
          if (map.has(obj[keys[i]])) {
            obj[keys[i]] = "$"
            continue
          } else {
            map.set(obj[keys[i]], obj[keys[i]])
          }
        }
      }
    }
    _cycle(target)
    return target
  }
  console.log(cycle({ a: 123 }))

  function deepClobeDfs(obj, arr) {
    let _obj = {}
    if (typeof obj === "object" && obj !== null) {
      let index = arr.indexOf(obj)
      _obj = Array.isArray(obj) ? [] : {}
      if (~index) {
        _obj = arr[index]
      } else {
        arr.push(obj)
        for (let key in obj) {
          _obj[key] = deepClobeDfs(obj[key], arr)
        }
      }
    } else if (typeof obj === "function") {
      _obj = eval("(" + obj.toString() + ")")
    } else {
      _obj = obj
    }
  }

  function getSignle(fn) {
    let res
    return function () {
      return res || (res = fn.apply(fn, arguments))
    }
  }
  let _signFn = getSignle(function (a, b) {
    return a + b
  })
  console.log(_signFn(1, 2))

  Object.prototype._create = function (object) {
    function F() {}
    F.prototype = object
    return new F()
  }

  function inheritPrototype(son, father) {
    const fa = Object.create(father.prototype)
    son.prototype = fa
    son.prototype.constructor = son
    Object.setPrototypeOf(son, father)
  }

  function asyncSerial(...fns) {
    const [first, ...others] = fns
    return function (...args) {
      return others.reduce((pre, cur) => {
        Promise.resolve(() => pre()).then(() => cur(...args))
      }, first(...args))
    }
  }
  const asyncFn4 = () => {
    console.log("异步串行4")
  }
  const asyncFn5 = () => {
    console.log("异步串行5")
  }
  const asyncFn6 = () => {
    console.log("异步串行6")
  }
  asyncSerial(asyncFn4, asyncFn5, asyncFn6)()

  Function.prototype.myNew = function (...args) {
    let context = this
    let obj = Object.create(this)
    let res = context.apply(obj, args)
    return typeof res === "object" ? res : obj
  }

  Function.prototype.myCall = function (context = window, ...args) {
    let fn = Symbol("fn")
    context[fn] = this
    context[fn](...args)
    delete context[fn]
  }

  Function.prototype.myApply = function (context = window, args) {
    let fn = Symbol("fn")
    context[fn] = this
    context[fn](...args)
    delete context[fn]
  }

  Function.prototype.myBind = function (context = window, ...args) {
    let fn = Symbol("fn")
    context[fn] = this
    return function (...args1) {
      context[fn](...args.concat(args1))
    }
  }

  function bindThis(f, oTarget) {
    return function (...args) {
      return f.apply(oTarget, args)
    }
  }
  var r = bindThis(
    function (a, b) {
      return this.test + a + b
    },
    { test: 2 }
  )(2, 3)
  console.log(r === 7)

  function namespace(oNamespace, sPackage) {
    const names = sPackage.split(".")
    let res = oNamespace
    let fn = function (data, key) {
      if (!data[key] || typeof data[key] !== "object") {
        data[key] = {}
      }
      return data[key]
    }

    names.forEach((k, i) => {
      res = fn(res, k, i)
    })
    return oNamespace
  }
  console.log(namespace({ a: { test: 1, b: 2 } }, "a.b.c.d"))

  Array.prototype.uniq = function () {
    let context = this
    return Array.from(new Set(context))
  }
  console.log(
    [false, true, undefined, null, NaN, 0, 1, {}, {}, "a", "a", NaN].uniq()
  )

  function fibonacci(n) {
    if (n === 1 || n === 2) return 1
    else {
      return fibonacci(n - 1) + fibonacci(n - 2)
    }
  }
  function fibonacci1(n) {
    let res = [0, 1, 1]
    for (let i = 3; i <= n; i++) {
      res[i] = res[i - 1] + res[i - 2]
    }
    return res[n]
  }
  console.log(fibonacci(10))
  console.log(fibonacci1(10))

  function formatDate(date, format) {
    let formatStr = format || "yyyy-MM-dd HH:mm:ss 星期w"
    const yyyy = date.getFullYear().toString()
    const yy = yyyy.slice(2)
    const M = date.getMonth() + 1
    const MM = M < 10 ? "0" + M : M
    const d = date.getDay()
    const dd = d < 10 ? "0" + d : d
    const H = date.getHours()
    const HH = H < 10 ? "0" + H : H
    const h = H > 12 ? H - 12 : H
    const hh = "0" + h
    const m = date.getMinutes()
    const mm = m < 10 ? "0" + m : m
    const s = date.getSeconds()
    const ss = s < 10 ? "0" + s : s
    const wName = ["日", "一", "二", "三", "四", "五", "六"]
    const w = wName[date.getDay()]

    formatStr = formatStr
      .replace(/yyyy/g, yyyy)
      .replace(/yy/g, yy)
      .replace(/MM/g, MM)
      .replace(/M/g, M)
      .replace("dd", dd)
      .replace("d", d)
      .replace("HH", HH)
      .replace("H", H)
      .replace("hh", hh)
      .replace("h", h)
      .replace("mm", mm)
      .replace("m", m)
      .replace("ss", ss)
      .replace("s", s)
      .replace("w", w)
    return formatStr
  }
  console.log(formatDate(new Date(1409894060000), "yyyy-MM-dd HH:mm:ss 星期w"))

  String.prototype.myTrim = function () {
    return this.replace(/^\s+/g, "").replace(/\s+$/g, "")
  }

  function deepClone(obj) {
    if (typeof obj === "object") {
      let res = Array.isArray(obj) ? [] : {}
      for (let k in obj) {
        res[k] = typeof obj[k] === "object" ? deepClone(obj[k]) : obj[k]
      }
    } else {
      return obj
    }
  }

  function curry(fn) {
    const length = fn.length
    let args = []
    return function item(...args1) {
      args = [...args, ...args1]
      if (args.length < length) return item
      else {
        return fn.apply(this, args)
      }
    }
  }

  function flatDeep(arr, d) {
    return d > 1
      ? arr.reduce(
          (pre, cur) =>
            pre.concat(Array.isArray(cur) ? flatDeep(cur, d - 1) : cur),
          []
        )
      : arr.slice()
  }

  let myNew = function (context, ...args) {
    const obj = Object.create(context)
    const res = context.apply(obj, args)
    return typeof res === "object" ? res : obj
  }

  Object.prototype.myCreate = function (fn) {
    const fnd = function () {}
    fnd.prototype = fn.prototype
    return new fnd()
  }

  function strLength(s, bUnicode255For1) {
    let res = 0
    if (bUnicode255For1) return s.length
    else {
      ;[...s].forEach((v, i) => {
        if (s.charCodeAt(i) > 255) res = res + 2
        else {
          res++
        }
      })
    }
    return res
  }
  console.log(strLength("hello world, 牛客", false))

  function isAvailableEmail(sEmail) {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    const reg1 = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([[A-Za-z]{2,4}$)/
    return reg1.test(sEmail)
  }
  console.log(isAvailableEmail("front.end@nowcoder.com"))

  function rgb2hex(sRGB) {
    let reg = /^(rgb|RGB)\((\d+),\s*(\d+),\s*(\d+)\)$/
    if (!reg.test(sRGB)) return sRGB
    let tempArr = sRGB.replace(reg, "$2,$3,$4").split(",")
    let newArr = tempArr.map((item) => {
      if (+item > 16) return (+item).toString(16)
      return "0" + (+item).toString(16)
    })
    return "#" + newArr.join("")
  }
  console.log(rgb2hex("rgb(255, 255, 255)"))

  function cssStyle2DomStyle(sName) {
    const names = sName.split("-").filter((v) => v !== "")
    let res = ""
    names.forEach((v, i) => {
      if (i == 0) res = v
      else {
        res += v.charAt(0).toUpperCase() + v.slice(1)
      }
    })
    return res

    let reg1 = /^a{0,}$/g
    let reg2 = /\d+?/g
    return sName
      .replace(/^-/, "")
      .replace(/-([a-z])/g, (_, $) => $.toUpperCase())
    return sName
      .replace(/^-/, "")
      .replace(/-([a-z])/g, (_, $) => $.toUpperCase())
  }
  console.log(cssStyle2DomStyle("-webkit-background-composite"))

  function count(str) {
    let res = {}
    str = str.replace(/\s+/g, "")
    ;[...str].forEach((v) => {
      if (!res[v]) res[v] = 1
      else {
        res[v]++
      }
    })
    return res
  }
  console.log(count("hello world"))
  ;(function () {
    let p = document.querySelector("p")
    p.innerHTML = `<strong>牛客网</strong>${p.innerText.replace(/牛客网/, "")}`
  })()
  ;(function () {
    let head = document.head
    let style = document.createElement("style")
    style.innerHTML = "p {color: red}"
    head.appendChild(style)
  })()

  function removeWithoutCopy(arr, item) {
    while (arr.indexOf(item) !== -1) {
      arr.splice(arr.indexOf(item), 1)
    }
    return arr
  }
  console.log(removeWithoutCopy([1, 2, 2, 3, 4, 2, 2], 2))

  function append(arr, item) {
    return [...arr, item]
  }

  // 反转链表
  function ReverseList(pHead) {
    let prev = null
    let curr = pHead
    while (curr) {
      ;[curr.next, prev, curr] = [prev, curr, curr.next]
    }

    if (pHead === null || pHead.next === null) return pHead
    let p1 = null
    let p2 = null
    while (pHead) {
      p1 = pHead.next
      pHead.next = p2
      p2 = pHead
      pHead = p1
    }
  }

  String.prototype.myTrim = function () {
    return this.replace(/^\s+/, "").replace(/\s+$/, "")
  }

  function deepClone(obj) {
    if (typeof obj === "object") {
      let res = Arrai.isArray(obj) ? [] : {}
      for (let ket in obj) {
        res[k] = typeof obj[k] === "object" ? deepClone(obj[k]) : obj[k]
      }
    } else {
      return obj
    }
  }

  function curry(fn) {
    const lenfth = fn.length
    let args = []
    return function next(...args1) {
      args = [...args, ...args1]
      if (args.length < length) {
        return next
      } else {
        return fn.apply(this, args)
      }
    }
  }

  function addString(a, b) {
    let maxLength = Math.max(a, b)
    a = a.padStart(maxLength, 0)
    b = b.padStart(maxLength, 0)
    let t = 0
    let f = 0
    let sum = ""
    for (let i = maxLength - 1; i >= 0; i--) {
      t = parseInt(a[i]) + parseInt(b[i]) + f
      f = Math.floor(t / 10)
      sum = (t % 10) + sum
    }
    if (f === 1) {
      sum = "1" + sum
    }
  }

  function flat() {
    return this.reduce((arr, cur) => arr.concat(cur), [])
  }

  function flatDeep(arr, d) {
    return d > 1
      ? arr.reduce(
          (acc, val) =>
            acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
          []
        )
      : arr.slice()
  }

  function flatStack(arr) {
    const res = []
    const stack = [].concat(arr)
    while (stack) {
      const val = stack.pop()
      if (Array.isArray(val)) {
        stack.push(...val)
      } else {
        res.unshift(val)
      }
    }
    return res
  }

  function debounce(fn, time) {
    let timeout = null
    return function (...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        fn.apply(this, args)
      }, time)
    }
  }

  function throttle(fn, time) {
    let timeout = null
    return function (...args) {
      if (timeout) return
      timeout = setTimeout(() => {
        timeout = null
        fn.apply(this, args)
      }, timeout)
    }
  }

  function myReverse(str) {
    let res = []
    ;[...str].forEach((v) => {
      res.unshift(v)
    })
    return res.join("")
  }

  function unique(arr) {
    return Array.from(new Set(arr))
  }
  function unique1(arr) {
    let res = []
    arr.forEach((v) => {
      if (!res.includes(v)) {
        res.push(v)
      }
    })
    return res
  }

  function sliceFun(arr) {
    return Array.prototype.slice.call(arr)
    return [].slice.call(arr)
  }

  function numFormat() {
    num = num.toString().split(".")
    let arr = num[0].split("").reverse()
    let res = []
    arr.forEach((v, i) => {
      if (i % 3 === 0 && i !== 0) {
        res.push(",")
      }
      res.push(v)
    })
    res.reverse().join("")
    if (num[1]) {
      res = res + "." + num[1]
    }
    return res
  }

  function isPalindRome(x) {
    if (x < 0) return false
    let str = x.toString()
    return str.split("").reverse().join("") === str
  }

  function tml(str, data) {
    str = document.getElementById(str).innerHTML
    let string =
      "var p = []; p.push('" +
      str
        .replace(/[\r\t\n]/, "")
        .replace(/<%=(.*?)%>/g, "')p.push($1);p/push('")
        .replace(/<%/g, "")
        .replace(/%>/g, 'p.push(")')
    eval(str)
    return str.join("")
  }

  function isPrime(num) {
    for (let i = 2; i <= num - 1; i++) {
      if (num % i === 0) return false
    }
    return true
  }

  function countPrime(n) {
    let res = []
    let flag = 1
    if (n < 2) return 0
    for (let i = 1; i < n; i++) {
      for (j = 2; j < Math.sqrt(i); j++) {
        if (i % j === 0) {
          flag = 0
          break
        }
      }

      if (flag === 2) {
        res.push(i)
      } else {
        flag = 2
      }
    }
  }

  Array.prototype.myMap = function (fn) {
    let obj = {}
    let fn = Symbol("fn")
    obj[fn] = this
    let res = []
    obj[fn].forEach((v, i) => {
      res.push(fn(v, i, obj[fn]))
    })
  }
  Array.prorotype.myMap1 = function (fn) {
    let context = this
    let res = []
    for (let i = 0; i < context.length; i++) {
      if (!context.hasOwnProperty(i)) continue
      res.push(fn(context[i], i, context))
    }
  }

  Array.prototype.myFilter = function (fn) {
    let res = []
    let context = this
    for (let i = 0; i < context.length; i++) {
      if (!context.hasOwnProperty(i)) continue
      if (fn(context[i], i, this)) {
        res.push(context[i])
      }
    }
    return res
  }

  Array.prototype.myReduce = function (fn, start) {
    let context = this
    let res = start || context[0]
    for (let i = 0; i < context.length; i++) {
      if (!context.hasOwnProperty(i)) continue
      res = fn(res, context[i], context)
    }
    return res
  }

  Array.prototype.myEvery = function (fn) {
    let res = true
    let context = this
    for (let i = 0; i < context.length; i++) {
      if (!context.hasOwnProperty(i)) continue
      if (!fn(context[i], i, context)) {
        res = false
        break
      }
    }
    return res
  }

  Array.prototype.mySome = function (fn) {
    let context = this
    let res = false
    for (let i = 0; i < context.length; i++) {
      if (!context.hasOwnProperty(i)) continue
      if (fn(context[i], i, context)) {
        res = true
        break
      }
    }
    return res
  }

  Array.prototype.myFind = function (fn) {
    let res = undefined
    let context = this
    for (let i = 0; i < context.length; i++) {
      if (!context.hasOwnProperty(i)) continue
      if (fn(context[i], i, context)) {
        res = context[i]
        break
      }
    }
    return res
  }

  Array.prototype.myFlat = function () {
    let context = this
    if (!Array1.isArray(context)) return
    return context.reduce(
      (pre, val) => pre.concat(Array.isArray(val) ? context.myFlat(val) : val),
      []
    )
  }

  function loadImg(imgs) {
    return function () {
      imgs.forEach((img, index) => {
        const rect = img.getBoundingClientRect()
        if (rect.top > window.innerHeight) {
          setTimeout(() => {
            img.src = img.dataset.src
          }, 100 * index)
        }
      })
    }
  }

  function loadImg1(imgs) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.intersectionRatio > 0) {
          setTimeout(() => {
            entry.target.src = entry.target.dataset.src
            observer.unobserve(entry.target)
          }, index * 2000)
        }
      })
    })

    imgs.forEach((img) => {
      observer.observe(img)
    })
  }

  function preloadImg(imgs) {
    let imgArr = []
    let count = 0
    imgs.forEach((item, index) => {
      const img = new Image()
      img.onload = function () {
        img.src = imgArr[index]
        count++
      }
    })

    return {
      setSrc: function (args) {
        imgs.forEach((item, index) => {
          item.src = args[index]
        })
        imgArr = args
      }
    }
  }

  let myNew1 = function (context, ...args) {
    let obj = Object.create(context)
    let res = context.apply(obj, args)
    return typeof res === "object" ? res : obj
  }

  Object.prototype.myInstanceof = function (left, right) {
    if (typeof left === "undefined" || typeof right === "undefined") {
      return false
    }
    const rProto = right.prototype
    while ((left = Object.getPrototypeOf(left))) {
      if (left === rProto) return true
    }
    return false
  }

  Function.prototype.myCall = function (context = window, ...args) {
    let fn = Symbol("fn")
    context[fn] = this
    context[fn](...args)
    delete context[fn]
  }

  Function.prototype.myApply = function (context = window, args) {
    let fn = Symbol("fn")
    context[fn] = this
    context[fn](...args)
    delete context[fn]
  }

  Function.prototype.myBind = function (context = window, ...args) {
    let fn = Symbol("fn")
    context[fn] = this
    return function (...args1) {
      return context[fn](...args.concat(args1))
    }
  }

  const type1 = (function () {
    const type = Object.create(null)
    const typeArr = [
      "String",
      "Number",
      "Boolean",
      "Object",
      "Array",
      "Null",
      "Undefined"
    ]
    typeArr.forEach((v) => {
      type[`is${v}`] = function (args) {
        return object.prototype.toString.call(args) === `[Object, ${v}]`
      }
    })
  })()

  function memory(fn) {
    const cache = {}
    return function (...args) {
      let key = JSON.stringify(args)
      if (typeof cache[key] !== "undefined") {
        return cache[key]
      } else {
        cache[key] = fn.apply(this, args)
        return cache[key]
      }
    }
  }

  function cycle(target) {
    const map = new Map()
    function _cycle(obj) {
      if (!map.has(obj)) {
        map.set(obj, obj)
      }
      let keys = Object.keys(map)
      for (let i = 0, len = keys.length; i < len; i++) {
        if (typeof obj[keys[i]] === "object") {
          if (map.has[obj[keys[i]]]) {
            obj[keys[i]] = "$"
            continue
          } else {
            map.set(obj[keys[i]], obj[keys[i]])
          }
        }
        _cycle(obj[keys[i]])
      }
    }
    _cycle(target)
    return target
  }

  Promise.prototype.mAll = function (ps) {
    const len = ps.length
    const res = []
    let count = 0
    return new Promise((resolve, reject) => {
      ps.forEach((fn) => {
        fn.then((ress) => {
          res.push(ress)
          count++
          if (count < length) {
          } else {
            resolve(res)
          }
        })
      })
    })
  }

  Promise.prototype.mRace = function (promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((fn) => {
        fn.then((res) => {
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
    })
  }

  function asyncToGenerator(genF) {
    return new Promise((resolve, reject) => {
      const gen = genF()
      const step = (types, args) => {
        let next
        try {
          next = gen[types][args]
        } catch (error) {
          return reject(error)
        }
        const { done, value } = next
        if (done) {
          return resolve(value)
        }
        Promise.resolve(value).then(
          (val) => step("next", val),
          (error) => step("next", error)
        )
      }
      step("next")
    })
  }

  function getSignle(fn) {
    let res = null
    return function () {
      return res || (res = fn.apply(this, arguments))
    }
  }

  const proxy1 = function (fn) {
    let res
    const handler = {
      constructor: function () {
        if (!res) {
          res = Reflect.constructor(fn, arguments)
        }
        return res
      }
    }
    return new Proxy(fn, handler)
  }

  Function.prototype.myCreate1 = (function (object) {
    function fn() {}
    fn.prototype = object
    return new fn()
  })(function () {
    let head = document.head
    let style = document.createElement("style")
    style.innerHTML = "p {color: red}"
    head.appendChild(style)
  })()

  function cssStyle2DomStyle(str) {
    return str.relace(/-([a-z])/g, function (str, p2, index) {
      return index > 2 ? p2.toUpperCase() : p2
    })
  }

  const regse = /^([a-zA-Z\d_\-\.])+\@([a-zA-Z\d_\-\.])+\.([a-zA-Z\d_\-\.])$/

  function fibonacci(n) {
    if (n === 1 || n === 2) return n
    else {
      return fibonacci(n - 1) + fibonacci(n - 2)
    }
  }

  String.prototype.myTrim = function () {
    return this.replace(/^\s+/g, "").replace(/\s+$/, "")
  }

  function deepClone(obj) {
    if (typeof obj === "object") {
      let result = Array.isArray(obj) ? [] : {}
      for (let key in obj) {
        result[key] =
          typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key]
      }
      return result
    } else {
      return obj
    }
  }

  function curry(fn) {
    let params = []
    let length = fn.length
    const next = function (...args) {
      params = [...params, ...args]
      if (params.length < length) {
        return next
      } else {
        return fn.apply(this, params)
      }
    }
    return next
  }

  function addString(a, b) {
    let maxLength = Math.max(a.length, b.length)
    a = a.padStart(maxLength, 0)
    b = b.padStart(maxLength, 0)
    let t = 0
    let f = 0
    let sum = ""
    for (let i = maxLength - 1; i >= 0; i--) {
      t = parseInt(a[i]) + parseInt(b[i]) + f
      f = Math.floor(t / 10)
      sum = (t % 10) + sum
    }
    if (f === 1) {
      sum = "1" + sum
    }
    return sum
  }

  function flat() {
    return this.reduce((arr, cur) => arr.concat(cur), [])
  }

  function flatDeep(arr, d) {
    return d > 1
      ? arr.reduce(
          (acc, val) =>
            acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
          []
        )
      : arr.slice()
  }

  function flatStack(arr) {
    const result = []
    const stack = [].slice.call(arr)
    while (stack.length) {
      const val = stack.pop()
      if (Array.isArray(val)) {
        stack.push(...val)
      } else {
        result.unshift(val)
      }
    }
    return result
  }

  function debounce(fn, time) {
    let timeout = null
    return function (...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        fn.apply(this, args)
      }, time)
    }
  }

  function throttle(fn, wait) {
    let timeout = null
    return function (...args) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          fn.apply(this, args)
        }, wait)
      }
    }
  }

  function myReverse(str) {
    let arr = str.split("")
    let resArr = []
    arr.forEach((item) => {
      resArr.unshift(item)
    })
    return resArr.join("")
  }

  function unique(arr) {
    return Array.from(new Set(arr))
  }
  function unique1(arr) {
    let res = []
    arr.forEach((item) => {
      if (!res.includes(item)) {
        res.push(item)
      }
    })
    return res
  }

  function sliceFun() {
    return Array.prototype.slice.call(arguments)
    return [].slice.call(arguments)
  }

  Promise.allSettled([Promise.resolve(11), Promise.reject(333)]).then((res) => {
    console.log(res)
  })

  function Arraay1(...args) {
    return args
  }

  function numFormat(num) {
    num = num.toString().split(".")
    let arr = num[0].split("").reverse()
    let res = []
    arr.forEach((item, index) => {
      if (index % 3 === 0 && index !== 0) {
        res.push(",")
      }
      res.push(item)
    })
    res = res.reverse().join("")
    if (num[1]) {
      res = res + "." + num[1]
    }
    return res
  }

  function isPalindrome(x) {
    if (x < 0) return false
    let str = x.toString()
    return Array.from(str).reverse().join("") === str
  }
  function isPalindrome1(str) {
    str = str.toString()
    let newStr = ""
    for (let len = str.length, i = len - 1; i >= 0; i--) {
      newStr += str[i]
    }
    return newStr === str
  }

  function tmpl(str) {
    str = document.getElementById(str).innerHTML
    var string =
      "var p = []; p.push('" +
      str
        .replace(/[\r\t\n]/g, "")
        .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
        .replace(/<%/g, "")
        .replace(/%>/g, 'p.push(")')
    eval(string)
    return p.join("")
  }

  function isPrime(num) {
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        return false
      }
    }
    return true
  }

  function countPrimes(n) {
    let res = []
    flag = 1
    if (n < 2) return 0
    for (let i = 1; i < n; i++) {
      flag = 2
      for (let j = 2; j < Math.sqrt(i); j++) {
        if (i % j === 0) {
          flag = 0
          break
        }
      }
      if (flag === 2) {
        res.push(i)
      }
    }
  }

  Array.prototype.myMap = function (fn) {
    let obj = {}
    let fn = Symbol("fn")
    obj[fn] = this
    let res = []
    obj[fn].forEach((item, index) => {
      res.push(fn(item, index, obj[fn]))
    })
  }
  Array.prototype.myMap1 = function (fn) {
    let res = []
    let context = this
    for (let i = 0; i < context.length; i++) {
      if (!context.hasOwnProperty(i)) continue
      res.push(fn(context[i], i, context))
    }
  }

  Array.prototype.myFilter = function (fn) {
    let res = []
    let context = this
    for (let i = 0; i < context.length; i++) {
      if (!context.hasOwnProperty(i)) continue
      if (fn(context[i], i, context)) {
        res.push(context[i])
      }
    }
    return res
  }

  Array.prototype.myReduce = function (fn, initValue) {
    let context = this
    let res = initValue || context[0]
    for (let i = 0; i < context.length; i++) {
      if (!context.hasOwnProperty(i)) continue
      res = fn(res, context[i], context)
    }
    return res
  }

  Array.prototype.myEvery = function (fn) {
    let context = this
    let bool = true
    for (let i = 0; i < context.length; i++) {
      if (!context.hasOwnProperty(i)) continue
      if (!fn(context[i], i, context)) {
        bool = false
        break
      }
    }
    return bool
  }

  Array.prototype.mySome = function (fn) {
    let bool = false
    let context = this
    for (let i = 0; i < context.length; i++) {
      if (!context.hasOwnProperty(i)) continue
      if (fn(context[i], i, context)) {
        bool = true
        break
      }
    }
    return bool
  }

  Array.prototype.myFind = function (fn) {
    let res
    let context = this
    for (let i = 0; i < context.length; i++) {
      if (!context.hasOwnProperty(i)) continue
      if (fn(context[i], i, context)) {
        res = context[i]
      }
    }
    return res
  }

  Array.prototype.myFlat = function () {
    let context = this
    if (!Array.isArray(context)) {
      return
    }
    return context.reduce((acc, cur) => {
      return acc.concat(Arraay.isArray(cur) ? context.myFlat.call(cur) : cur)
    }, [])
  }

  function loadImg(imgs) {
    const handle = () => {
      importScripts.forEach((imgs, index) => {
        const rect = img.getBoundingClientRect
        if (rect.top < window.innerHeight) {
          setTimeout(() => {
            img.src = img.dataset.src
          }, index * 100)
        }
      })
    }
    return handle
  }
  function loadImg1(imgs) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.intersectionRatio > 0) {
          setTimeout(() => {
            entry.target.src = entry.target.dataset.src
            observer.unobserve(entry.target)
          }, index * 200)
        }
      })
    })
    imgs.forEach((img) => {
      observer.observe(img)
    })
  }
  loadImg1([...document.querySelectorAll(".img1")])
  document.addEventListener(
    "scroll",
    loadImg([...document.querySelectorAll(".img2")])
  )

  function preloadImg(imgs) {
    let imgArr = []
    let count = 0
    imgs.forEach((item, index) => {
      const img = new Image()
      img.onload = function () {
        item.src = imgArr[index]
        count++
        if (count === imgArr.length) {
          return
        }
      }
    })
    return {
      setSrc: function (args) {
        imgs.forEach((item, index) => {
          item.src = args[index]
        })
        imgArr = args
      }
    }
  }

  function preload(...imgs) {
    const imgArr = []
    for (let i = 0; i < imgs.length; i++) {
      imgArr[i] = new Image()
      imgArr[i].src = imgs[i]
    }
  }
  preload([
    "https://img.2125.com/20200806/img/h001/h41/img20210922095339562620.jpg",
    "https://img.2125.com/20200806/img/h001/h41/img20210922095339562620.jpg",
    "https://img.2125.com/20200806/img/h001/h41/img20210922095339562620.jpg"
  ])

  var myNews = function (context, ...args) {
    const obj = Object.create(context)
    const res = context.apply(obj, args)
    return typeof res === "object" ? res : obj
  }

  Object.prptotype.myInstanceof = function (left, right) {
    if (typeof left === "undefined" && typeof right === "undefined") {
      return
    }
    const rPrototype = right.prototype
    while ((left = Object.getPrototypeOf(left))) {
      if (left === rPrototype) {
        return true
      }
    }
    return false
  }

  Function.prototype.myCall = function (context = window, ...args) {
    const fn = Symbol("fn")
    context[fn] = this
    let res = context[fn](...args)
    delete context[fn]
    return res
  }

  Function.prototype.myApply = function (context = window, args) {
    const fn = Symbol("fn")
    if (!(args instanceof Array)) {
      console.log("第二个参数必须为数组")
      return
    }
    context[fn] = this
    let res = context[fn](...args)
    delete context[fn]
    return res
  }

  Function.prototype.myBind = function (context = window, ...args) {
    const fn = Symbol("fn")
    context[fn] = this
    return function (...args1) {
      return context[fn](...args.concat(args1))
    }
  }

  const typeUtils = (function () {
    const type = Object.create(null)
    const typeArr = [
      "String",
      "Number",
      "Object",
      "Array",
      "Null",
      "Undefined",
      "Boolean"
    ]
    typeArr.forEach((item) => {
      type[`is${item}`] = function (args) {
        return Object.prototype.toString.call(args) === `[Object ${item}]`
      }
    })
    return type
  })()

  function memory(fn) {
    const cache = {}
    return function (...args) {
      const key = JSON.stringify(args)
      if (typeof cache[key] !== "undefined") {
        return cache[key]
      } else {
        cache[key] = fn.apply(fn, args)
        return cache[key]
      }
    }
  }

  function cycle(target) {
    const map = new Map()
    function _cycle(obj) {
      if (!map.has(obj)) {
        map.set(obj, obj)
      }
      let keys = Object.keys(obj)
      for (let i = 0; i < keys.length; i++) {
        if (typeof obj[key[i]] === "object") {
          if (map.has(obj[keys[i]])) {
            obj[keys[i]] = "$"
            continue
          } else {
            map.set(obj[keys[i]], obj[keys[i]])
          }
        }
        _cycle(obj[keys[i]])
      }
    }
    _cycle(target)
    return target
  }

  function DFSdeepClone(obj, visitedArr = []) {
    let _obj = {}
    if (typeof obj === "object" && obj !== null) {
      let index = visitedArr.indexOf(obj)
      _obj = Array.isArray(obj) ? [] : {}
      if (~index) {
        _obj = visitedArr[index]
      } else {
        visitedArr.push(obj)
        for (let key in obj) {
          _obj[key] = DFSdeepClone(obj[key], visitedArr)
        }
      }
    } else if (typeof obj === "function") {
      _obj = eval("(" + obj.toString() + ")")
    } else {
      _obj = obj
    }
    return _obj
  }

  function BFSdeepClone(obj) {
    let originObj = [obj],
      copyObj = [Array.isArray(obj) ? [] : {}],
      visitedOriginArr = [],
      visitedCopyArr = []
    while (originObj.length) {
      const item = originObj.shift()
      const _obj = copyObj.shift()
      visitedOriginArr.push(item)
      if (typeof item === "object" && item !== null) {
        for (let key in item) {
          const val = item[key]
          if (val.constructor === "Object") {
            const index = visitedOriginArr.indexOf(item[key])
            if (~index) {
              obj[key] = visitedOriginArr[index]
            } else {
              _obj[key] = {}
              originObj.push(val)
              copyObj.push(_obj[key])
            }
          } else if (val.constructor === "Array") {
            _obj[key] = []
            originObj.push(val)
            copyObj.push(_obj[key])
          } else if (val.constructor === "Function") {
            _obj[key] = eval("(" + val.toString() + ")")
          } else {
            _obj[key] = val
          }
        }
        visitedCopyArr.push(_obj)
      } else if (typeof item === "function") {
        _obj = eval("(" + item.toString() + ")")
      } else {
        _obj = item
      }
    }
    return copyObj
  }

  Promise.prototype.myAll = function (promiseList) {
    const len = promiseList.length,
      result = []
    let count = 0
    return new Promise((resolve, reject) => {
      promiseList.forEach((item) => {
        item.then(
          (res) => {
            result.push(res)
            count++
            if (count === len) {
              resolve(result)
            }
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  }

  Promise.prototype.myRace = function (promiseList) {
    return new Promise((resolve, reject) => {
      promiseList.forEach((item) => {
        item.then(
          (res) => {
            resolve(res)
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  }

  Promise.prototype.myFinally = function (fn) {
    return this.then(
      (res) => {
        Promise.resolve(fn()).then((res) => {
          return res
        })
      },
      (err) => {
        Promise.reject(fn()).catch((err) => {
          return err
        })
      }
    )
  }

  function asyncToGenerator(genF) {
    return new Promise((resolve, reject) => {
      const gen = genF()
      const step = (type, args) => {
        let next
        try {
          next = gen[type](args)
        } catch (error) {
          return reject(err)
        }
        const { done, value } = next
        if (done) {
          return resolve(value)
        }
        Promise.resolve(value).then(
          (val) => step("next", val),
          (err) => step("throw", err)
        )
      }
      step("next")
    })
  }
  asyncToGenerator(function* helloWorldGenerator() {
    yield "hello"
    yield "world"
    return "ending"
  }).then((res) => {
    console.log(res)
  })

  class MyEvent {
    constructor() {
      this._event = Object.create(null)
      this.stackArr = null
      this.stackArr &&
        this.stackArr.forEach((fn, index) => {
          fn()
          if (index === this.stackArr.length - 1) {
            this.stackArr = null
          }
        })
    }
  }
  MyEvent.prototype.on = function (key, fn) {
    this._event[key] = this._event[key] || []
    return this._event.push(fn)
  }
  MyEvent.prototype.emit = function (key, ...payload) {
    this._event[key] &&
      this._event[key].forEach((fn) => {
        fn.apply(fn, payload)
      })
    let fn = () => this.emit(this, key, payload)
    if (!this._event[key] && !this.stackArr) {
      this.stackArr = []
      this.stackArr.push(fn)
    }
  }
  MyEvent.prototype.off = function (key, callback) {
    if (callback) {
      return (this._event[key] = this._event[key].filter((fn) => {
        fn !== callback && fn.c !== callback
      }))
    }
    this._event[key] = []
  }
  MyEvent.getPrototypeOf.once = function (key, fn) {
    const one = (...payload) => {
      fn.apply(fn, payload)
      this.off(key, one)
    }
    one.c = fn
    this.on(key, one)
  }
  MyEvent.prototype.clearAllEvent = function () {
    Object.keys(this._event).forEach((key) => {
      this._event[key] = []
    })
  }

  function getSignle(fn) {
    let result
    return function (...args) {
      return result || (result = fn.apply(fn, args))
    }
  }

  const proxy = function (fn) {
    let result
    const handler = {
      construct: function () {
        if (!result) {
          result = Reflect.construct(fn, arguments)
        }
        return result
      }
    }
    return new Proxy(fn, handler)
  }

  Object.prototype._create = function (object) {
    function F() {}
    F.prototype = object
    return new F()
  }

  function fatherFn(...arr) {
    this.some = "parent的this属性"
    this.params = arr
  }
  fatherFn.prototype.fatherFnSome = "parent原型对象的属性或者方法"
  function sonFn() {
    this.obobk1 = "child的this属性"
  }
  function inheritPrototype(son, father) {
    const fatherPrototype = Object.create(father.prototype)
    son.prototype = fatherPrototype
    son.prototype.constructor = son
    Object.setPrototypeOf(son, father)
  }
  inheritPrototype(sonFn, fatherFn)
  sonFn.prototype.sonFnSome = "child原型对象的属性或者方法"
  const sonFnInit = new sonFn()

  function compose(fns) {
    return function (...args) {
      let start = fns.length - 1
      let result = [...args]
      while (start >= 0) {
        result = fns[start].apply(
          fns[start],
          Array.isArray(result) ? result : [result]
        )
        start--
      }
      return result
    }
  }
  function compose1(fns) {
    return fns.reduce(
      (a, b) =>
        (...args) =>
          a(b(...args))
    )
  }

  function asyncParallel(...fns) {
    let count = 0
    return function (...args) {
      const [cb, ...other] = args
      fns.forEach(async (fn) => {
        await fn.apply(fn, other)
        count++
        if (count === fns.length) {
          cb()
        }
      })
    }
  }

  function asyncSerial(...fns) {
    const [first, ...others] = fns
    return function (...args) {
      return others((a, b) => {
        Promise.resolve(() => a()).then(() => b(...args))
      }, first(...args))
    }
  }

  function Calculate() {
    let data = new WeakMap()
    Calculate = function () {
      data.set(this, Math.random())
    }
    Calculate.prototype.doSth = function () {
      return data.get(this)
    }
    return new Calculate()
  }
  let cal11 = new Calculate()
  let cal22 = new Calculate()
  console.log(cal11.doSth())
  console.log(cal22.doSth())

  function A() {
    let a = Math.random()
    A.prototype.getA = () => a
    this.getA = () => a
  }
  let aa11 = new A()
  console.log(aa11.getA())
  let aa22 = new A()
  console.log(aa22.getA())

  function ListNode(x) {
    this.val = x
    this.next = null
  }

  function reverseBetween(head, m, n) {
    var res = new ListNode(-1)
    res.next = head
    var cur = res
    for (var i = 0; i < m - 1; i++) {
      cur = cur.next
    }
    var temp = cur.next
    for (var i = 0; i < n - m; i++) {
      var ntx = temp.next
      temp.next = ntx.next
      ntx.next = cur.next
      cur.next = ntx
    }
    return res.next
  }

  // 反转链表
  function ReverseList(pHead) {
    let prev = null
    let curr = pHead
    while (curr) {
      ;[curr.next, prev, curr] = [prev, curr, curr.next]
    }
    ;[b, a] = [a, b]
    return prev
  }

  function reverseGroup(head, k) {
    let curr = head
    let prev = null
    let node = head
    for (let i = 0; i < k; i++) {
      if (node === null) return head
      node = node.next
    }
    for (let i = 0; i < k; i++) {
      let next = curr.next
      curr.next = prev
      prev = curr
      curr = next
    }
    head.next = reverseGroup(head, k)
    return prev
  }

  function Merge(pHead1, pHead2) {
    if (!pHead1) return pHead2
    if (!pHead2) return pHead1
    if (pHead1.val <= pHead2.val) {
      pHead1.next = Merge(pHead1.next, pHead2)
      return pHead1
    } else {
      pHead2.next = Merge(pHead2.next, pHead1)
      return pHead2
    }
  }

  function mergeKLists(lists) {
    let arr = []
    for (let i = 0; i < lists.length; i++) {
      let p = lists[i]
      while (p) {
        arr.push(p.val)
        p = p.next
      }
    }
    arr.sort((a, b) => a - b)
    let head = null
    let cur = null
    for (j = 0; j < arr.length; j++) {
      let node = new ListNode(arr[j])
      if (head === null) {
        head = node
      } else {
        cur.next = node
      }
      cur = node
    }
    return head
  }

  function hasCycle(head) {
    while (head) {
      if (head.flag) {
        return true
      }
      head.flag = true
      head = head.next
    }
  }

  function EntryNodeOfLoop(pHead) {
    while (pHead) {
      if (pHead.flag) return pHead
      pHead.flag = true
      pHead = pHead.next
    }
  }

  function FindKthToTail(pHead, k) {
    let fast = pHead,
      slow = pHead
    for (let i = 0; i < k; i++) {
      if (!fast) return null
      fast = fast.next
    }
    while (fast) {
      fast = fast.next
      slow = slow.next
    }
    return slow
  }

  function removeNthFormEnd(head, n) {
    if (!head) return null
    let quick = head
    let slow = head
    for (let i = 0; i < n; i++) {
      quick = quick.next
    }
    if (quick === null) {
      return head.next
    }
    while (quick.next) {
      quick = quick.next
      slow = slow.next
    }
    slow.next = slow.next.next
  }

  function FindFirstCommonNode(pHead1, pHead2) {
    if (!pHead1 || !pHead1) return null
    let p1 = pHead11,
      p2 = pHead2
    while (p1 !== p2) {
      p1 = p1 === null ? pHead2 : p1.next
      p2 = p2 === null ? pHead1 : p2.next
    }
    return p1
  }

  function addInList(head1, head2) {
    let stack1 = new Array()
    let stack2 = new Array()
    while (head1 !== null) {
      stack1.push(head1)
      head1 = head1.next
    }
    while (head2 !== null) {
      stack2.push(head2)
      head2 = head2.next
    }
    let jinwei = 0
    let pHead = new ListNode(-1)
    let pre = pHead
    while (stack1.length !== 0 || stack2.length !== 0) {
      let node1 = stack1.pop()
      let node2 = stack2.pop()
      let v1 = node1 ? node1.val : 0
      let v2 = node2 ? node2.val : 0
      let falsevalue = v1 + v2 + jinwei
      let truevalue = falsevalue % 10
      jinwei = parseInt(falsevalue / 10)
      let node = new ListNode(truevalue)
      node.next = pre.next
      pre.next = node
    }
    if (jinwei === 1) {
      let tmp = new ListNode(1)
      tmp.next = pHead.next
      pHead.next = tmp
    }
    return pHead.next
  }

  function sortInList(head) {
    let arr = []
    let cur = head
    while (cur) {
      arr.push(cur.val)
      cur = cur.next
    }
    arr.sort((a, b) => a - b)
    cur = head
    for (let i = 0; i < arr.length; i++) {
      cur.val = arr[i]
      cur = cur.next
    }
    return head
  }

  function isPail(head) {
    let arr = [],
      res = []
    while (head) {
      arr.push(head.val)
      res.push(head.val)
      head = head.next
    }
    arr.reverse()
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== res[i]) return fasle
    }
    return true
  }

  function oddEvenList(head) {
    if (!head) return head
    let cur = head
    let next = head.next
    let even = head.next
    while (next && next.next) {
      cur.next = next.next
      cur = cur.next
      next.next = cur.next
      next = next.next
    }
    cur.next = even
    return head
  }

  function deleteDuplicates(head) {
    // 改变链表节点的值
    let arr = new Set()
    let cur = head
    while (cur) {
      arr.add(cur.val)
      cur = cur.next
    }
    cur = head
    arr = [...arr]
    for (let i = 0; i > arr.length; i++) {
      cur.val = arr[i]
      if (i === arr.length - 1) {
        cur.next = null
      } else {
        cur = cur.next
      }
    }
    return head

    // 改变next指向
    let current = head
    while (current) {
      if (current.next && current.val === current.next.val) {
        if (current.next.next) {
          current.next = current.next.next
        } else {
          current.next = null
        }
      } else {
        current = current.next
      }
    }
    return head
  }

  function deleteDuplicates(head) {
    if (!head) return head
    let arr = new Set()
    let arr1 = new Set()
    while (cur) {
      if (arr1.has(cur.val)) {
        arr.delete(cur.val)
      } else {
        arr.add(cur.val)
        arr1.add(cur.val)
      }
      cur = cur.next
    }
    arr = Array.from(arr)
    if (!arr.length) return
    cur = new ListNode(arr[0])
    let curr = cur
    for (let i = 1; i < arr.length; i++) {
      cur.next = new ListNode(arr[i])
      cur = cur.next
    }
    return curr
  }

  function search(nums, target) {
    let left = 0
    let right = nums.length - 1
    while (left <= right) {
      let mid = parseInt(left + (right - left) / 2)
      if (target === nums[mid]) {
        return mid
      } else if (target > nums[mid]) {
        left = mid + 1
      } else if (target < nums[mid]) {
        right = mid - 1
      }
    }
    return -1
  }

  function Find(target, array) {
    let m = array.length
    if (m === 0) return false
    let n = array[0].length
    let i = 0,
      j = n - 1
    while (i < m && j >= 0) {
      if (target < array[i][j]) {
        j--
      } else if (target > array[i][j]) {
        i++
      } else {
        return true
      }
    }
    return false
  }

  function findPeakElement(nums) {
    let peakIndex = -1
    let len = nums.length - 1
    function binaySearch(left, right) {
      const mid = Math.floor((left + right) / 2)
      if (left === right) {
        return mid
      } else if (nums[mid + 1] > nums[mid]) {
        left = mid + 1
      } else {
        right = mid
      }
      return binaySearch(left, right)
    }
    peakIndex = binaySearch(0, len)
    return peakIndex
  }

  function InversePairs(data) {
    let sum = 0
    function mergeSort(nums) {
      if (nums.length < 2) return nums
      let mid = Math.floor(nums.length / 2)
      let left = nums.slice(0, mid)
      let right = nums.slice(mid)
      return merge(mergeSort(left), mergeSort(right))
    }
    function merge(left, right) {
      let res = []
      let leftLen = left.length
      let rightLen = right.length
      let len = leftLen + rightLen
      for (let index = 0, i = 0, j = 0; index < len; index++) {
        if (i > leftLen) res[index] = right[j++]
        else if (j > rightLen) res[index] = left[i++]
        else if (left[i] <= right[j]) res[index] = left[i++]
        else {
          res[index] = right[j++]
          sum += leftLen - i
          sum = sum % 1000000007
        }
      }
      return res
    }
    mergeSort(data)
    return sum % 1000000007
  }

  function minNumberInRotateArray(rotateArray) {
    return rotateArray.sort((a, b) => a - b)[0]
  }

  function compare(version1, version2) {
    const arr1 = version1.split(".")
    const arr2 = version2.split(".")
    const maxLength = Math.max(arr1.length, arr2.length)
    for (let i = 0; i < maxLength; i++) {
      const num1 = arr1[i] ? arr1[i] - "0" : 0
      const num2 = arr2[i] ? arr2[i] - "0" : 0
      if (num1 > num2) return 1
      if (num1 < num2) return -1
    }
    return 0
  }

  function preorderTraversal(root) {
    let res = []
    function preOrder(root) {
      if (!root) return
      res.push(root.val)
      preOrder(root.left)
      preOrder(root.right)
    }
    preOrder(root)
    return res
  }

  function inorderTraversal(root) {
    let res = []
    function middleOrder(root) {
      if (!root) return
      middleOrder(root.left)
      res.push(root.val)
      middleOrder(root.right)
    }
    middleOrder(root)
    return res
  }

  function postorderTraversal(root) {
    let res = []
    function postOrder(root) {
      if (!root) return
      postOrder(root.left)
      postOrder(root.right)
      res.push(root.val)
    }
    postOrder(root)
    return res
  }

  function levelOrder(root) {
    let res = []
    function preOrder(root, index) {
      if (!root) return
      if (index >= res.length) res.push([])
      res[index].push(root.val)
      preOrder(root.left, index + 1)
      preOrder(root.right, index + 1)
    }
    preOrder(root, 0)
    return res
  }

  function Print(pRoot) {
    const arr = []
    function das(root, arr, level) {
      if (!root) return
      if (!arr[level]) arr[level] = []
      arr[level].push(root.val)
      das(root.left, arr, level + 1)
      das(root.right, arr, level + 1)
    }
    das(pRoot, res, 0)
    for (let i = 0; i < arr.length; i++) {
      if (i % 2) {
        arr[i].reverse()
      }
    }
    return arr
  }

  function maxDepth(root) {
    function dfs(root) {
      if (!root) return 0
      let left = dfs(root.left)
      let right = dfs(root.right)
      return Math.max(left + 1, right + 1)
    }
    return dfs(root)
  }

  function hasPathSum(root, sum) {
    if (!root) return false
    if (sum === root.val && !root.left && !root.right) return true
    return (
      hasPathSum(root.left, sum - root.val) ||
      hasPathSum(root.right, sum - root.val)
    )
  }

  function Convert(pRootOfTree) {
    let head = null,
      pre = null
    const dfs = (pRootOfTree) => {
      if (!pRootOfTree) return
      dfs(pRootOfTree.left)
      if (!pre) {
        head = pRootOfTree
      } else {
        pre.right = pRootOfTree
      }
      pRootOfTree.left = pre
      pre = pRootOfTree
      if (!pRootOfTree) return
      dfs(pRootOfTree.right)
    }
    if (!pRootOfTree) return
    dfs(pRootOfTree)
    return head
  }

  function isSymmetrical(pRoot) {
    if (!pRoot) return true
    function compare(node1, node2) {
      if (!node1 && !node2) return true
      if (!node1 || !node2) return false
      if (node1.val !== node2.val) return false
      return (
        compare(node1.left, node2.right) && compare(node1.right, node2.left)
      )
    }
    return compare(pRoot.left, pRoot.right)
  }

  function mergeTrees(t1, t2) {
    if (t1 && t2) {
      t1.val += t2.val
      t1.left = mergeTrees(t1.left, t2.left)
      t1.right = mergeTrees(t1.right, t2.right)
    }
    return t1 || t2
  }

  function Mirror(pRoot) {
    if (!pRoot) return
    pRoot.mid = pRoot.left
    pRoot.left = pRoot.right
    pRoot.right = pRoot.mid
    Mirror(pRoot.left)
    Mirror(pRoot.right)
    return pRoot
  }

  function isValidBST(root) {
    let res = []
    function inOrder(root) {
      if (!root) return
      inOrder(root.left)
      res.push(root.val)
      inOrder(root.right)
    }
    inOrder(root)
    for (let i = 0; i < res.length; i++) {
      if (res[i] > res[i + 1]) return false
    }
    return true
  }

  function isCompleteTree(root) {
    let rootArr = new Array()
    rootArr.push(root)
    let end = false
    while (rootArr.length) {
      const node = rootArr.shift()
      if (!node) {
        end = true
      } else {
        if (rootArr.length && end) return false
        rootArr.push(node.left)
        rootArr.push(node.right)
      }
    }
    return true
  }

  function IsBalanced_Solution(pRoot) {
    function getTreeDepth(root) {
      if (!root) return 0
      const left = getTreeDepth(root.left)
      const right = getTreeDepth(root.right)
      return Math.abs(left, right) + 1
    }
    if (!pRoot) return true
    const left = getTreeDepth(pRoot.left)
    const right = getTreeDepth(pRoot.right)
    if (Math.abs(left - right) > 1) {
      return false
    }
    const leftTree = IsBalanced_Solution(pRoot.left)
    const rightTree = IsBalanced_Solution(pRoot.right)
    return leftTree && rightTree

    if (!pRoot) return true
    function getMaxDepth(root) {
      if (!root) return 0
      return Math.max(getMaxDepth(root.left) + 1, getMaxDepth(root.right) + 1)
    }
    return (
      Math.abs(getMaxDepth(pRoot.left), getMaxDepth(pRoot.right) <= 1) &&
      IsBalanced_Solution(pRoot.left) &&
      IsBalanced_Solution(pRoot.right)
    )
  }

  function lowestCommonAncestor(root, p, q) {
    if (!root) return
    if (p < root.val && q < root.val) {
      return lowestCommonAncestor(root.left, p, q)
    } else if (p > root.val && q > root.val) {
      return lowestCommonAncestor(root.right, p, q)
    } else {
      return root.val
    }
  }

  function lowestCommonAncestor(root, o1, o2) {
    if (!root) return
    if (root.val === o1 || root.val === o2) {
      return root.val
    }
    let left = lowestCommonAncestor(root.left, o1, o2)
    let right = lowestCommonAncestor(root.right, o1, o2)
    if (left && right) {
      return root.val
    }
    return left ? left : right
  }

  function TreeNode(x) {
    this.val = x
    this.left = null
    this.right = null
  }
  function Serialize(pRoot) {
    if (!pRoot) return ""
    let str = ""
    let queue = []
    queue.push(pRoot)
    star += pRoot.val + "!"
    while (queue.length) {
      let font = quque.shift()
      if (font.left) {
        str += font.left.val + "!"
        queue.push(font.left)
      } else {
        str += "#"
      }
      if (font.right) {
        str += font.right.val + "!"
        queue.push(font.right)
      } else {
        str += "#!"
      }
    }
    return str
  }

  function reConstructBinaryTree(pre, vin) {
    if (!pre.length || !vin.length) return
    const root = new TreeNode(pre.shift())
    const index = vin.indexOf(root.val)
    root.left = reConstructBinaryTree(pre, vin.slice(0, index))
    root.right = reConstructBinaryTree(pre, vin.slice(index + 1))
    return root
  }

  function solve(xianxu, zhongxu) {
    let level = 0
    let res = []
    function rebuild(xianxu, zhongxu, level, res) {
      if (!xianxu.length) return null
      const root = xianxu[0]
      const index = zhongxu.findIndex((node) => node === root)
      const leftNodePreOrder = xianxu.slice(1, index + 1)
      const leftNodeInOrder = zhongxu.slice(0, index)
      const rightNodePreOrder = xianxu.slice(index + 1)
      const rightNodeInOrder = zhongxu.slice(index + 1)
      rebuild(leftNodePreOrder, leftNodeInOrder, level + 1, res)
      rebuild(rightNodePreOrder, rightNodeInOrder, level + 1, res)
      res[level] = root
    }
    rebuild(xianxu, zhongxu, level, res)
    return res
  }

  let stack1 = []
  let stack2 = []
  function push(node) {
    stack1.push(node)
  }
  function pop() {
    if (stack2.length) {
      while (stack1.length) {
        stack2.push(stack1.pop())
      }
    }
    return stack2.pop()
  }

  let stack = []
  function push(node) {
    let minNode = node
    if (stack.length) {
      minNode = min() < node ? min() : node
    }
    stack.push({ node, minNode })
  }
  function pop() {
    return stack.pop().node
  }
  function top() {
    return stack[stack.length - 1].node
  }
  function min() {
    return stack[stack.length - 1].minNode
  }

  function isValid(s) {
    let arr = {
      "(": ")",
      "[": "]",
      "{": "}"
    }
    let map = []
    for (let i = 0; i < s.length; i++) {
      if (s[i] === "(" || s[i] === "[" || s[i] === "{") {
        map.push(arr[s[i]])
      } else {
        if (!map.length || map.pop() !== s[i]) {
          return false
        }
      }
    }
    return map.length === 0
  }

  function maxInWindows(num, size) {
    let len = num.length
    if (size > len || size === 0) return []
    let i = 0
    let j = size - 1
    let res = []
    while (j < len) {
      let tmp = num.slice(i, j + 1)
      res.push(Math.max(...tmp))
      i++
      j++
    }
    return res
  }

  function GetLeastNumbers_Solution(input, k) {
    input.sort((a, b) => a - b)
    return input.slice(0, k)
  }

  function findKth(a, n, k) {
    let input = a
    input.sort((a, b) => b - a)
    return input[k - 1]
  }

  let arrMid = []
  function Insert(num) {
    let i = 0
    while (arrMid[i] < num) i++
    arrMid.splice(i, 0, num)
  }
  function GetMedian() {
    let index = Math.floor(arrMid.length / 2)
    if (arrMid.length % 2) {
      return arrMid[index]
    } else {
      return (arrMid[index] + arrMid[index - 1]) / 2
    }
  }

  function solve(s) {
    let stack = []
    let sign = "+"
    let i = 0
    let num = 0
    while (i < s.length) {
      if (s[i] === "(") {
        let flag = 1,
          start = i + 1
        while (flag) {
          i++
          if (s[i] === "(") flag++
          if (s[i] === ")") flag--
        }
        let end = i
        let arr = s.slice(start, i)
        num = solve(arr)
        i = end
      } else if (s[i] >= "0" && s[i] <= "9") {
        num = num * 10 + Number(s[i])
      }
      if (s[i] < "0" || s[i] > "9" || i === s.length - 1) {
        if (sign === "+") stack.push(num)
        if (sign === "-") stack.push(num * -1)
        if (sign === "*") stack.push(stack.pop() * num)
        sign = s[i]
        num = 0
      }
      i++
    }
    return stack.reduce((a, b) => a + b)
  }

  function twoSum(numbers, target) {
    const res = new Array(2)
    let map = new Map()
    let n = numbers.length
    for (let i = 0; i < n; i++) {
      if (map.has(target - numbers[i])) {
        res[0] = map.get(target - numbers[i]) + 1
        res[1] = i + 1
      } else {
        map.set(numbers[i], i)
      }
    }
    return res
  }

  function MoreThanHalfNum_Solution(numbers) {
    let map = new Map()
    numbers.forEach((v) => {
      if (!map.has(v)) {
        map.set(v, 1)
      } else {
        map.set(v, map.get(v) + 1)
      }
    })
    return Array.from(map.keys()).find((k) => map.get(k) > numbers.length / 2)
  }

  function FindNumsAppearOnce(array) {
    let map = new Map()
    array.forEach((v) => {
      if (!map.has(v)) {
        map.set(v, 1)
      } else {
        map.set(v, map.get(v) + 1)
      }
    })
    return Array.from(map.keys())
      .filter((k) => map.get(k) === 1)
      .sort((a, b) => a - b)
  }

  function minNumberDisappeared(nums) {
    let map = new Map()
    for (let i = 0; i < nums.length; i++) {
      map.set(nums[i], true)
    }
    for (let j = 1; j <= nums.length; j++) {
      if (!map.has(j)) return j
    }
  }

  function treeSum(num) {
    num.sort((a, b) => a - b)
    let res = []
    for (let i = 0; i < num.length; i++) {
      if (num[i] > 0) return res
      if (i !== 0 && num[i] === num[i - 1]) continue
      let left = i + 1
      let right = num.length - 1
      while (left < right) {
        let sum = num[i] + num[left] + num[right]
        if (sum === 0) {
          res.push(num[i], num[left], num[right])
          left++
          right--
          while (num[left] === num[left - 1]) {
            left++
          }
          while (num[right] === num[right + 1]) {
            right--
          }
        }
        if (sum > 0) {
          right--
        }
        if (sum < 0) {
          left++
        }
      }
    }
    return res
  }

  function permute(nums) {
    let len = nums.length
    let res = []
    function brackTrace(path) {
      if (path.length === len) return res.push(path.slice())
      for (let i = 0; i < len; i++) {
        if (path.indexOf(nums[i]) === -1) {
          path.push(nums[i])
          brackTrace(path)
          path.pop()
        }
      }
    }
    brackTrace([])
    return res
  }

  function permuteUnique(num) {
    num.sort((a, b) => a - b)
    let res = []
    let path = []
    let used = []
    function backTrack(num) {
      if (path.length === num.length) return res.push(path.slice())
      for (let i = 0; i < num.length; i++) {
        if (i > 0 && num[i] === num[i - 1] && !used[i - 1]) continue
        if (!used[i]) {
          path.push(num[i])
          used[i] = true
          brackTrace(num)
          path.pop()
          used[i] = false
        }
      }
    }
    brackTrace(num)
    return res
  }

  function solve(grid) {
    function dfs(i, j) {
      if (i < 0 || i >= grid.length) return
      if (j < 0 || j >= grid[i].length) return
      if (grid[i][j] === "0") return
      grid[i][j] = "0"
      dfs(i - 1, j)
      dfs(i + 1, j)
      dfs(i, j - 1)
      dfs(i, j + 1)
    }
    if (!grid.length) {
      return 0
    }
    let count = 0
    for (let i = 0; i < grid.length; i++) {
      for (j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === "1") {
          count++
          dfs(i, j)
        }
      }
    }
    return count
  }

  function Permutation(str) {
    let arr = str.split("")
    let res = []
    function swap(p, q) {
      ;[arr[p], arr[q]] = [arr[q], arr[p]]
    }
    function dfs(p, q) {
      if (p === q) {
        res.push(arr.join(""))
      }
      for (let i = p; i <= q; i++) {
        swap(p, i)
        dfs(p + 1, q)
        swap(p, i)
      }
    }
    dfs(0, arr.length - 1)
    res = Array.from(new Set(res))
    return res
  }

  function Nqueen(n) {
    let res = []
    const backTrack = (arr) => {
      if (arr.length === n) {
        let temp = new Array(n).fill(0).map((_) => new Array(n).fill("."))
        let ele = arr.map((e, i) => {
          temp[i][e] = "Q"
          return temp[i].join("")
        })
        res.push(ele)
        return
      }
      for (let i = 0; i < n; i++) {
        if (arr.indexOf(i) < 0) {
          let flag = true
          let cur = arr.length
          for (let j = 1; cur - j >= 0; j++) {
            if (arr[cur - j] === i - j) flag = false
          }
          for (let j = 1; cur - j >= 0 && i + j <= n; j++) {
            if (arr[cur - j] === i + j) flag = false
          }
          flag && backTrack(arr.concat(i))
        }
      }
    }
    backTrack([])
    return res.length
  }

  function generateParenthesis(n) {
    let res = []
    const dfs = (left, right, curStr) => {
      if (left === 0 && right === 0) {
        res.push(curStr)
      }
      if (left > 0) {
        dfs(left - 1, right, curStr + "(")
      }
      if (right > left) {
        dfs(left, right - 1, curStr + ")")
      }
    }
    dfs(n, n, "")
    return res
  }

  function solve(matrix) {
    let dirs = [
      [0, 1],
      [0, -1],
      [-1, 0],
      [1, 0]
    ]
    let m = matrix.length
    let n = matrix[0].length
    let dp = new Array(m + 1)
    for (let i = 0; i < dp.length; i++) {
      dp[i] = new Array(n + 1).fill(0)
    }
    function dfs(i, j) {
      if (dp[i][j] > 0) return dp[i][j]
      if (dp[i][j] === 0) dp[i][j] = 1
      for (let k = 0; k < 4; k++) {
        let nextI = i + dirs[k][0]
        let nextJ = j + dirs[k][1]
        if (
          nextI >= 0 &&
          nextI < m &&
          nextJ >= 0 &&
          nextJ < n &&
          matrix[nextI][nextJ] > matrix[i][j]
        )
          dp[i][j] = Math.max(dp[i][j], dfs(nextI, nextJ) + 1)
      }
      return dp[i][j]
    }
    if (m === 0 || n === 0) return 0
    let res = 0
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        res = Math.max(res, dfs(i, j))
      }
    }
    return res
  }

  function Fibonacci(n) {
    const fib = (n) => {
      if (n === 1 || n === 2) return 1
      return fib(n - 1) + fib(n - 2)
    }
    return fib(n)
  }

  function jumpFloor(number) {
    const res = []
    res[1] = 1
    res[2] = 2
    if (number > 2) {
      for (let i = 3; i < number; i++) {
        res[i] = res[i - 1] + res[i - 2]
      }
    }
    return res[number]
  }

  function minCostClimbingStairs(cost) {
    let dp = [0, 0]
    for (let i = 2; i <= cost.length; i++) {
      dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
    }
    return dp[cost.length]
  }

  function LCS(s1, s2) {
    if (typeof s1 !== "string" || typeof s2 !== "string") {
      return -1
    }
    if (!s1 || !s2) return -1
    const arr = []
    let m = s1.length
    let n = s2.length
    for (let i = 0; i <= m; i++) {
      if (arr[i] === undefined) {
        arr[i] = []
      }
      for (let j = 0; j <= n; j++) {
        if (i === 0 || j === 0) {
          arr[i][j] = ""
          continue
        }
        let c1 = s1.charAt(i - 1)
        let c2 = s2.charAt(j - 1)
        if (c1 === c2) {
          arr[i][j] = arr[i - 1][j - 1] + c1
        } else {
          let l1 = arr[i - 1][j].length
          let l2 = arr[i][j - 1].length
          arr[i][j] = l1 >= l2 ? arr[i - 1][j] : arr[i][j - 1]
        }
      }
    }
    return arr[m][n] === "" ? -1 : arr[m][n]
  }

  function LCS(str1, str2) {
    const dp = new Array(str1.length + 1)
    let max = 0
    const map = new Map()
    for (let i = 0; i <= str1.length; i++) {
      dp[i] = new Array(str2.length + 1).fill(0)
    }
    for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1
          max = Math.max(max, dp[i][j])
          if (!map.has(max)) map.set(max, i)
        }
      }
    }
    let startIndex = map.get(max) - max
    let endIndex = map.get(max)
    return str1.substring(startIndex, endIndex)
  }

  function uniquePaths(m, n) {
    let dp = []
    for (let i = 0; i < m; i++) {
      dp[i] = new Array(n)
      d[i][0] = 1
    }
    for (let i = 0; i < n; i++) {
      dp[0][i] = 1
    }
    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
      }
    }
    return dp[m - 1][n - 1]
  }

  function minPathSum(matrix) {
    let m = matrix.length
    let n = matrix[0].length
    let dp = Array(m)
      .fill(0)
      .map((x) => Array(n).fill(0))
    dp[0][0] = matrix[0][0]
    for (let i = 1; i < n; i++) {
      dp[0][i] = dp[0][i - 1] + matrix[0][i]
    }
    for (let i = 1; i < m; i++) {
      dp[i][0] = dp[i - 1][0] + matrix[i][0]
    }
    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + matrix[i][j]
      }
    }
    return dp[m - 1][j - 1]
  }

  function solve(nums) {
    let index
    for (index = 0; index < nums.length; index++) {
      if (nums[index] !== "0") break
    }
    nums = nums.substring(index, nums.length)
    let dp = new Array(nums.length)
    if (!nums.length) return 0
    if (nums.length === 1 && nums[0] === "0") return 0
    if (nums.length === 1) return 1
    if (nums[1] !== "0" && parseInt(nums[0] + nums[1]) <= 26) dp[1] = 2
    else {
      dp[1] = 1
    }
    dp[0] = 1
    for (let i = 2; i < nums.length; i++) {
      if (nums[i] === "0") {
        if (nums[i - 1] === "0") return 0
        else if (nums[i - 1] <= "2") {
          dp[i] = dp[i - 2]
        } else {
          return 0
        }
      } else {
        if (nums[i - 1] === "0") {
          dp[i] = dp[i - 1]
        } else if (parseInt(nums[i - 1] + nums[i]) <= 26) {
          dp[i] = dp[i - 1] + dp[i - 2]
        } else {
          dp[i] = dp[i - 1]
        }
      }
    }
    return dp[nums.length - 1]
  }

  function minMoney(arr, aim) {
    let dp = new Array(aim + 1)
    for (let i = 1; i <= aim; i++) {
      dp[i] = Infinity
    }
    dp[0] = 0
    for (let i = 1; i <= aim; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[j] <= i) {
          dp[i] = Math.min(dp[i], dp[i - arr[j]] + 1)
        }
      }
    }
    return dp[aim] > aim ? -1 : dp[aim]
  }

  function LIS(arr) {
    if (!arr.length) return 0
    let dp = new Array(arr.length)
    dp[0] = 1
    for (let i = 1; i < arr.length; i++) {
      dp[i] = 1
      for (let j = 0; j < i; j++) {
        if (arr[i] > arr[j]) {
          dp[i] = Matn.max(dp[i], dp[j] + 1)
        }
      }
    }
    return Math.max(...dp)
  }

  function FindGreatestSumOfSubArray(array) {
    let dp = []
    dp[0] = array[0]
    let n = array.length
    for (let i = 1; i < n; i++) {
      dp[i] = Math.max(dp[i - 1] + array[i], array[i])
    }
    return Math.max(...dp)
  }

  function getLongestPalindrome(A) {
    function getLength(begin, end) {
      while (begin >= 0 && end < A.length && A[begin] === A[end]) {
        begin--
        end++
      }
      return end - begin - 1
    }
    let maxLen = 1
    for (let i = 0; i < A.length - 1; i++) {
      maxLen = Math.max(maxLen, getLength(i, i), getLength(i, i + 1))
    }
    return maxLen
  }

  function restoreIpAddresses(s) {
    let res = []
    let path = []
    function traceTrack(str, count) {
      if (count === 4) {
        if (str === "") {
          res.push(path.join("."))
        }
        return
      }
      for (let i = 1; i <= 3 && i <= str.length; i++) {
        if (parseInt(str.substring(0, i)) <= 255) {
          if (i >= 2 && str[0] === "0" && str[1] === "0") return
          if (i >= 2 && str[0] === "0" && str[1] !== "0") return
          path.push(str.substring(0, i))
          traceTrack(str.substring(i, str.length), count + 1)
          path.pop()
        }
      }
    }
    traceTrack(s, 0)
    return res
  }

  function rob(nums) {
    let len = nums.length
    if (len == 1) return nums[0]
    if (len === 2) return Math.max(nums[0], nums[1])
    let dp = new Array(len).fill(0)
    dp[0] = nums[0]
    dp[1] = Math.max(nums[0], nums[1])
    for (let i = 2; i < len; i++) {
      dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1])
    }
    return Math.max(...dp)
  }

  function rob(nums) {
    let len = nums.length
    let dp1 = new Array(len + 1).fill(0)
    let dp2 = new Array(len + 1).fill(0)
    dp1[0] = 0
    dp1[1] = nums[0]
    dp2[0] = 0
    dp2[1] = 0
    for (let i = 2; i <= len; i++) {
      if (i == len) {
        dp1[i] = Math.max(dp1[i - 1], nums[i - 1])
      } else {
        dp1[i] = Math.max(dp1[i - 1], dp1[i - 2] + nums[i - 1])
      }
    }
    for (let i = 2; i <= len; i++) {
      dp2[i] = Math.max(dp2[i - 1], dp2[i - 2] + nums[i - 1])
    }
    return dp1[len] > dp2[len] ? dp1[len] : dp2[len]
  }

  function maxProfit(prices) {
    let n = prices.length
    if (n <= 1) return 0
    let minValue = prices[0]
    maxP = 0
    for (let i = 0; i < n; i++) {
      minValue = Math.min(minValue, prices[i])
      maxP = Math.max(maxP, prices[i] - minValue)
    }
    return maxP
  }

  function maxProfit(prices) {
    const n = prices.length
    if (!prices.length) return 0
    const dp = new Array(n).fill(0).map(() => new Array(5).fill(-Infinity))
    dp[0][0] = 0
    dp[0][1] = -prices[0]
    for (let i = 1; i < n; i++) {
      dp[i][0] = dp[i - 1][0]
      dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
      dp[i][2] = Math.max(dp[i - 1][2], dp[i - 1][1] + prices[i])
      dp[i][3] = Math.max(dp[i - 1][3], dp[i - 1][2] - prices[i])
      dp[i][4] = Math.max(dp[i - 1][4], dp[i - 1][3] + prices[i])
    }
    return Math.max(dp[n - 1][4], Math.max(0, dp[n - 1][2]))
  }

  function trans(s, n) {
    const arr = s.split(" ").map((item) => {
      let word = item.split("")
      word.forEach((v, index) => {
        if (v.charCodeAt(0) < v.toLowerCase().charCodeAt(0)) {
          word[index] = word[index].toLowerCase()
        } else {
          word[index] = word[index].toUpperCase()
        }
      })
      return word.join("")
    })
    return arr.reverse().join(" ")
  }

  function longestCommonPrefix(strs) {
    if (!str.length) return ""
    let res = ""
    let flag = true
    for (let i = 0; i < strs[0].length; i++) {
      const str = strs[0][i]
      for (let j = i; j < strs.length; j++) {
        if (strs[j][i] === str) {
          flag = false
          break
        } else {
          flag = true
        }
      }
      if (flag) res += str
    }
    return res
  }

  function solve(IP) {
    const arr4 = IP.split(".")
    const arr6 = IP.split(":")
    const ex4 = /^0$|^[1-9]\d{0,2}$/
    const ex6 = /^[0-9a-fA-F]{1,4}$/
    if (arr4.length === 4 && arr4.every((v) => v.match(ex4) && v < 256)) {
      return "IPv4"
    } else if (arr6.length === 8 && arr6.every((v = v > v.match(ex6)))) {
      return "IPv6"
    }
    return "Neither"
  }

  function solve(s, t) {
    let sp = s.length - 1
    let tp = t.length - 1
    let res = []
    let sum = 0
    let p = 0
    while (sp >= 0 || tp >= 0 || p !== 0) {
      let sv = sp >= 0 ? s[sp] - 0 : 0
      let tv = tp >= 0 ? t[tp] - 0 : 0
      sum = sv + tv + p
      res.unshift(sum % 10)
      p = sum >= 10 ? 1 : 0
      sp--
      tp--
    }
    return res.join("")
  }

  function merge(A, m, B, n) {
    A.length = m + n
    let p = m + n - 1
    let i = m - 1
    let j = n - 1
    while (i >= 0 && j >= 0 && p >= 0) {
      if (A[i] > B[i]) {
        A[p] = A[i]
        p--
        i--
      } else {
        A[p] = B[j]
        p--
        j--
      }
    }
    while (j >= 0) {
      A[P--] = b[J--]
    }
  }

  function judge(str) {
    let arr = str.split("")
    let newStr = arr.reverse().join("")
    return newStr === str
  }

  function merge(intervals) {
    intervals.sort((a, b) => a.start - b.start)
    const res = []
    if (intervals[0]) res.push(intervals[0])
    for (let i = 1; i < intervals.length; i++) {
      if (res[res.length - 1].end >= intervals[i].end) continue
      else if (res[res.length - 1].end >= intervals[i].start) {
        res[res.length - 1].end = intervals[i].end
      } else {
        res.push(intervals[i])
      }
    }
    return res
  }

  function minWindow(S, T) {
    let l = 0,
      r = 0
    const map = new Map()
    let lent = T.length
    let lens = S.length
    for (let i = 0; i < lent; i++) {
      map.set(T[i], map.has(T[i]) ? map.get(T[i]) + 1 : 1)
    }
    let len = map.size
    let res = ""
    while (r < lens) {
      const nowc = S[r]
      if (map.has(nowc)) {
        map.set(nowc, map.get(nowc) - 1)
        if (map.get(nowc) === 0) {
          len--
        }
      }
      while (len === 0) {
        let newStr = S.slice(l, r + 1)
        if (!res || res.length > newStr.length) res = newStr
        let nowl = S[i]
        if (map.has(nowl)) {
          map.set(nowl, map.get(nowl) + 1)
          if (map.get(nowl) === 1) {
            len++
          }
        }
        l++
      }
      r++
    }
    return res
  }

  function solve(str) {
    let j = str.length - 1
    if (j <= 1) return str
    let res = ""
    while (j >= 0) {
      res += str[j]
      j--
    }
    return res
  }

  function maxLength(arr) {
    let max = 0
    const str = []
    for (let i in arr) {
      let index = str.indexOf(arr[ii])
      if (index !== -1) {
        str.splice(0, str.indexOf(arr[i] + 1))
      }
      str.push(arr[i])
      max = Math.max(str.length, max)
    }
    return max
  }

  function maxArea(height) {
    let left = 0
    let right = height.length - 1
    let max = 0
    let area = 0
    while (left < right) {
      area = Math.min(height[left], height[right]) * (right - left)
      max = Math.max(area, max)
      if (height[left] < height[right]) {
        left++
      } else {
        right--
      }
    }
    return max
  }

  function maxWater(arr) {
    let leftMax = 0,
      rightMax = 0
    let left = 0,
      right = arr.length - 1
    let res = 0
    while (left < right) {
      leftMax = Math.max(leftMax, arr[left])
      rightMax = Math.max(rightMax, arr[right])
      if (arr[left] < arr[right]) {
        res += leftMax - arr[left]
        left++
      } else {
        res += rightMax - arr[right]
        right--
      }
    }
    return res
  }

  function candy(arr) {
    const len = arr.length
    if (len <= 1) return len
    let nums = []
    for (let i = 0; i < len; i++) {
      nums[i] = 1
    }
    for (let i = 1; i < len; i++) {
      if (arr[i] > arr[i - 1]) {
        nums[i] = nums[i - 1] + 1
      }
    }
    let res = nums[len - 1]
    for (let i = len - 2; i >= 0; i--) {
      if (arr[i] > arr[i + 1] && nums[i] <= nums[i + 1]) {
        nums[i] = nums[i + 1] + 1
      }
      res += nums[i]
    }
    return res
  }

  function minmumNumberOfHost(n, startEnd) {
    let star = []
    let end = []
    let host = 0
    for (let i = 0; i < startEnd.length; i++) {
      star.push(startEnd[i][0])
      end.push(startEnd[i][1])
    }
    star.sort((a, b) => a - b)
    end.sort((a, b) => a - b)
    for (let i = 0; i < n; i++) {
      if (star[i] >= end[0]) {
        end.splice(0, 1)
      } else {
        host++
      }
    }
    return host
  }

  function solve(n, m, a) {
    m = m % n
    return a.slice(n - m).concat(a.slice(0, n - m))
  }

  function spiralOrder(matrix) {
    const res = []
    if (!matrix.length) return res
    let left = 0
    let right = matrix[0].length - 1
    let up = 0
    let down = matrix.length - 1
    while (left <= right && up <= down) {
      for (let i = left; i <= right; i++) {
        res.push(matrix[up][i])
      }
      up++
      if (up > down) break
      for (let i = up; i <= down; i++) {
        res.push(matrix[i][right])
      }
      right--
      if (left > right) break
      for (let i = right; i >= left; i--) {
        res.push(matrix[down][i])
      }
      down--
      if (up > down) break
      for (let i = down; i >= up; i--) {
        res.push(matrix[i][left])
      }
      left++
      if (left > right) break
    }
    return res
  }

  function rotateMatrix(mat, n) {
    let tmp = []
    let k = n
    while (k--) {
      tmp.push([])
    }
    for (let i = n - 1; i >= 0; i--) {
      for (let j = 0; j < n; j++) {
        tmp[j].push(mat[i][j])
      }
    }
    return tmp
  }

  var Solution = function (capacity) {
    this.capacity = capacity
    this.m = new Map()
    this.list = new DoubleLinkedList()
  }
  function DoubleLinkedList() {
    this.head = new ListNode(null, 0, -1, null)
    this.tail = new ListNode(null, 0, -1, null)
    this.head.next = this.tail
    this.tail.pre = this.head
    this.insert = function (key, value) {
      const newNode = new ListNode(this.head, key, value, this.head.next)
      this.head.next.pre = newNode
      this.head.next = newNode
      return newNode
    }
    this.move = function (cur) {
      const pre = cur.pre
      const next = cur.next
      pre.next = next
      next.pre = pre
      cur.next = this.head.next
      cur.pre = this.head
      this.head.next.pre = cur
      this.head.next = cur
    }
    this.delete = function () {
      const deleteNode = this.tail.pre
      const pre = deleteNode.pre
      pre.next = this.tail
      this.tail.pre = pre
      deleteNode.next = deleteNode.pre = null
      return deleteNode.key
    }
  }

  function ListNode(pre, key, value, next) {
    this.pre = pre
    this.key = key
    this.value = value
    this.next = next
  }

  Solution.prototype.get = function (key) {
    const res = this.m.get(ket)
    if (res !== undefined) {
      this.list.move(res)
      return res.value
    }
    return -1
  }
  Solution.prototype.set = function (key, value) {
    const res = this.m.get(key)
    if (res !== undefined) {
      res.value = value
      this.list.move(res)
    } else {
      if (this.m.size === this.capacity) {
        const deleteKey = this.list.delete()
        this.m.delete(deleteKey)
      }
      const newNode = this.list.insert(key, value)
      this.m.set(key, newNode)
    }
  }

  function ListNode(k, v, c, l, r) {
    this.k = k
    this.v = v
    this.c = c || 1
    this.l = l
    this.r = r
  }
  function Linklist() {
    this.head = new ListNode(-1, "head")
    this.tail = new ListNode(-1, "tail")
    this.head.r = this.tail
    this.tail.l = this.head
    this.length = 0
  }
  Linklist.prototype.add = function (node) {
    let r = this.head.r
    node.r = r
    node.l = this.head
    r.l = node
    this.head.r = node
    this.length++
  }
  Linklist.prototype.delete = function (node) {
    if (node.l) {
      let l = node.l
      l.r = node.r
      node.r.l = l
    }
    this.length--
  }
  var LFUCache = function (capacity) {
    this.capacity = capacity
    this.minFreq = 1
    this.nodeMap = new Map()
    this.freqMap = new Map()
  }
  LFUCache.prototype.get = function (key) {
    if (this.capacity === 0) {
      return -1
    }
    const node = this.nodeMap.get(key)
    if (!node) return -1
    this.update(node)
    return node.v
  }
  LFUCache.prototype.update = function (node) {
    let last = this.freqMap.get(node.c)
    last.delete(node)
    if (!last.length && node.c === this.minFreq) {
      this.minFreq++
    }
    let now = this.freqMap.get(++node.c)
    if (!now) {
      now = new Linklist()
      this.freqMap.set(node.c, now)
    }
    now.add(node)
  }
  LFUCache.prototype.put = function (key, value) {
    if (this.capacity === 0) return
    let node = this.nodeMap.get(key)
    if (!node) {
      node = new ListNode(key, value)
      if (!this.freqMap.get(node.c)) {
        this.freqMap.set(node.c, new Linklist())
      }
      const nodes = this.freqMap.get(node.c)
      if (this.nodeMap.size >= this.capacity) {
        let minNodes = this.freqMap.get(this.minFreq)
        let minNode = minNodes.tail.l
        this.nodeMap.delete(minNode.k)
        minNodes.delete(minNode)
      }
      this.minFreq = 1
      this.nodeMap.set(key, node)
      nodes.add(node)
    } else {
      node.v = value
      this.update(node)
    }
  }
  function LFU(operators, capacity) {
    const cache = new LFUCache(capacity)
    const res = []
    for (let i = 0; i < operators.length; i++) {
      const opt = operators[i]
      if (opt[0] === 1) {
        cache.put(opt[1], opt[2])
      } else {
        res.push(cache.get(opt[1]))
      }
    }
  }

  ;(function () {
    console.log(123)
  })()

  let p = new Promise((resolve, reject) => {
    setTimeout(() => {
      var num = Math.ceil(Math.random() * 10)
      if (num < 5) {
        resolve(num)
      } else {
        reject("无")
      }
    }, 1000)
  })
  p.then(
    (data) => {
      console.log("resolved", data)
    },
    (err) => {
      console.log("rejected", err)
    }
  )
    .then((data) => {
      console.log(data)
    })
    .then((data) => {
      console.log(data)
    })
    .catch((err) => {
      console.log("rejected", err)
    })
  let pro1 = new Promise((resolve, reject) => {})
  let pro2 = new Promise((resolve, reject) => {})
  let pro3 = new Promise((resolve, reject) => {})
  Promise.all([pro1, pro2, pro3]).then(
    (res) => {
      console.log(res)
    },
    (err) => {
      console.log(err)
    }
  )

  Function.prototype.bind2 = function (context) {
    if (typeof this !== "function") {
      throw Error(
        "Function.prototype.bind - what is trying to be bound is not callable"
      )
    }
    let self = this
    let args = Array.prototype.slice.call(arguments, 1)
    let fNOP = function () {}
    let fBound = function () {
      let bindArgs = [].slice.call(arguments)
      return self.apply(
        this instanceof fNOP ? this : context,
        args.concat(bindArgs)
      )
    }
    fNOP.prototype = this.prototype
    fBound.prototype = new fNOP()
    return fBound
  }

  function objectFactory() {
    let obj = new Object()
    Constructor = [].shift.call(arguments)
    obj.__proto__ = Constructor.prototype
    Constructor.apply(obj, arguments)
    return obj
  }

  String.prototype.myTrim = function () {
    return this.replace(/^\s+/g, "").replace(/\s+$/g, "")
  }

  function deepClone(obj) {
    if (typeof obj === "object") {
      let result = obj instanceof Array ? [] : {}
      for (let key in obj) {
        result[key] =
          typeof result[key] === "object" ? deepClone(obj[key]) : obj[key]
      }
    } else {
      return obj
    }
  }
  const _completeDeepClone1 = (target, map = new WeakMap()) => {
    if (target === null) return target
    if (typeof target !== "object") return target
    const constructor = target.constructor
    if (/^(Function|RegExp|Date|Map|Set)$/i.test(constructor.name))
      return new constructor(target)
    if (map.has(target)) return map.get(target)
    map.set(target, target)
    const cloneTarget = Array.isArray(target) ? [] : {}
    for (prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = _completeDeepClone1(target[prop], map)
      }
    }
    return cloneTarget
  }

  function curry(fn) {
    let params = []
    const next = function (...args) {
      params = [...params, ...args]
      if (params.length === fn.length) {
        return fn.apply(fn, params)
      } else {
        return next
      }
    }
    return next
  }

  function addString(a, b) {
    let maxLength = Math.max(a.length, b.length)
    a = a.padStart(maxLength, 0)
    b = b.padStart(maxLength, 0)
    let t = 0
    let f = 0
    let sum = ""
    for (let i = maxLength - 1; i >= 0; i--) {
      t = parseInt(a[i]) + parseInt(b[i]) + f
      f = Math.floor(t / 10)
      sum = (t % 10) + sum
    }
    if (f === 1) {
      sum = "1" + sum
    }
    return sum
  }

  function flat() {
    return this.reduce((arr, cur) => arr.concat(cur), [])
  }
  function flatDeep(arr, d) {
    return d > 1
      ? arr.reduce(
          (acc, val) =>
            acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
          []
        )
      : arr.slice()
  }

  function flatStack(arr) {
    const result = []
    const stack = [].concat(arr)
    while (stack.length) {
      const val = stack.pop()
      if (Array.isArray(val)) {
        stack.push(...val)
      } else {
        result.unshift(val)
      }
    }
    return result
  }

  function debounce(fn, time) {
    let timeout = null
    return function (...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        fn.apply(fn, args)
      }, time)
    }
  }

  function throttle(fn, wait) {
    let timeout = null
    return function (...args) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          fn.apply(fn, args)
        }, wait)
      }
    }
  }

  function myReverse(str) {
    let arr = str.split("")
    let resArr = []
    arr.forEach((v) => {
      resArr.unshift(v)
    })
    return resArr.join("")
  }

  function unique(arr) {
    return Array.from(new Set(arr))
  }
  function unique1(arr) {
    let res = []
    arr.forEach((item) => {
      if (res.indexOf(item) === -1) {
        res.push(item)
      }
    })
    return res
  }

  function sliceFun() {
    return Array.prototype.slice.call(arguments)
  }

  Promise.allSettled([Promise.resolve(111), Promise.reject(333)]).then(
    (res) => {
      console.log(res)
    }
  )

  function numFormat(num) {
    num = num.toString().split(".")
    let arr = num[0].split("").reverse()
    let res = []
    arr.forEach((item, index) => {
      if (index % 3 === 0 && index !== 0) {
        res.push(",")
      }
      res.push(item)
    })
    res = res.reverse().join("")
    if (num[1]) {
      res = res + "." + num[1]
    }
  }

  function isPalindrome(x) {
    if (x < 0) {
      return false
    }
    let str = x.toString()
    return Array.from(str).reverse().join("") === str
  }

  function tmpl(str, data) {
    str = document.getElementById(str).innerHTML
    let string =
      "var p = []; p.push('" +
      str
        .replace(/[\r\t\n]/g, "")
        .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
        .replace(/<%/g, "")
        .replace(/%>/g, 'p.push(")')
    eval(string)
    return p.join("")
  }

  function isPrime(num) {
    for (let i = 2; i <= num - 1; i++) {
      if (num % i === 0) {
        return false
      }
    }
    return true
  }

  function countPrimes(n) {
    let ret = [],
      flag = 1
    if (n < 2) {
      return 0
    }
    for (let i = 1; i < n; i++) {
      flag = 2
      for (let j = 2; j <= Math.sqrt(i); j++) {
        if (i % j === 0) {
          flag = 0
          break
        }
      }
      if (flag === 2) {
        ret.push(i)
      }
    }
    return ret
  }

  Array.prototype.myMap1 = function (fn) {
    let obj = {}
    let arrSymbol = Symbol("123")
    let res = []
    obj[arrSymbol] = this
    obj[arrSymbol].forEach((item, index) => {
      res.push(fn(item, index))
    })
  }
  Array.prototype.myMap = function (fn) {
    const result = []
    let context = this
    for (let i = 0; i < context.length; i++) {
      result.push(fn(context[i], i, context))
    }
    return result
  }

  Array.prototype.myFilter = function (fn) {
    const result = []
    let context = this
    for (let i = 0; i < context.length; i++) {
      if (fn(context[i], i, context)) {
        result.push(context[i])
      }
    }
    return result
  }

  Array.prototype.myReduce = function (fn, initValue) {
    let context = this
    let result = initValue ? initValue : context[0]
    for (let i = 0; i < context.length; i++) {
      result = fn(result, context[i], context)
    }
    return result
  }

  Array.prototype.myEvery = function (fn) {
    let bool = true
    let context = this
    for (let i = 0; i < context.length; i++) {
      if (!fn(context[i], i, context)) {
        bool = false
        break
      }
    }
    return bool
  }

  Array.prototype.mySome = function (fn) {
    let context = this
    let bool = false
    for (let i = 0; i < context.length; i++) {
      if (fn(context[i], i, context)) {
        bool = true
        break
      }
    }
    return bool
  }

  Array.prototype.myFind = function (fn) {
    let result
    for (let i = 0; i < this.length; i++) {
      if (fn(context[i], i, context)) {
        result = context[i]
        break
      }
    }
    return result
  }

  Array.prototype.myFlat = function () {
    let context = this
    if (!Array.isArray(context)) {
      return
    }
    return context.reduce((acc, cur) => {
      return acc.concat(Array.isArray(cur) ? context.myFlat.call(cur) : cur)
    }, [])
  }

  function loadImg(imgs) {
    const handle = () => {
      imgs.forEach((img, index) => {
        const rect = img.getBoundClientRect()
        if (rect.top > window.innerHeight) {
          setTimeout(() => {
            img.src = img.dataset.src
          }, index * 100)
        }
      })
    }
    return handle
  }
  function loadImg1(imgs) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.intersectionRatio > 0) {
          setTimeout(() => {
            entry.target.src = entry.target.dataset.src
            entry.target.classList.add("on")
            observer.unobserve(entry.target)
          }, index * 200)
        }
      })
    })
    imgs.forEach((img) => {
      observer.observe(img)
    })
  }
  loadImg1([...document.querySelectorAll(".img1")])
  document.addEventListener(
    "scroll",
    loadImg([...document.querySelectorAll(".img2")])
  )

  function preloadImg(...imgs) {
    const imgArr = []
    for (let i = 0; i < imgs.length; i++) {
      imgArr[i] = new Image()
      imgArr[i].src = imgs[i]
    }
  }

  let myNew3 = function (context, ...args) {
    const obj = Object.create(context)
    const res = context.apply(obj, args)
    return typeof res === "object" ? res : obj
  }

  const objectFreeze1 = (object) => {
    for (let prop in object) {
      const type = Object.prototype.toString.call(object[prop])
      if (type === "[object Object]" || type === "[object Array]") {
        objectFreeze1(object[prop])
      } else {
        Object.defineProperty(object, prop, {
          writeable: false
        })
      }
    }
  }

  Object.prototype.myInstanceof = function (left, right) {
    if (typeof left === "undefined" && typeof right === "undefined") {
      return
    }
    const rPrototype = right.prototype
    while ((left = Object.getPrototypeOf(left))) {
      if (left === rPrototype) {
        return true
      }
    }
    return false
  }

  Function.prototype.myCall = function (context = window, ...args) {
    const fn = Symbol("fn")
    context[fn] = this
    let res = context[fn](...args)
    delete context[fn]
    return res
  }

  Function.prototype.myApply = function (context = window, args) {
    const fn = Symbol("fn")
    if (!Array.isArray(args)) {
      console.log("apply的第二个参数必须为数组或者类数组")
    }
    context[fn] = this
    let res = context[fn](...args)
    delete context[fn]
    return res
  }

  Function.prototype.myBind = function (context = window, ...args) {
    const fn = Symbol("fn")
    context[fn] = this
    return function (..._args) {
      return context[fn].apply(context, args.concat(_args))
    }
  }

  const typeMethod = (function () {
    const type = Object.create(null)
    const typeArr = [
      "String",
      "Number",
      "Object",
      "Array",
      "Null",
      "Undefined",
      "Boolean"
    ]
    typeArr.forEach((item) => {
      type[`is${item}`] = function (args) {
        return Object.prototype.toString.call(args) === `[object ${item}]`
      }
    })
    return type
  })()

  function memory(fn) {
    const cache = {}
    return function (...args) {
      const key = JSON.stringify(args)
      if (typeof cache[key] !== "undefined") {
        return cache[key]
      } else {
        cache[key] = fn.apply(fn, args)
        return cache[key]
      }
    }
  }

  function cycle(target) {
    const map = new WeakMap()
    function _cycle(obj) {
      if (!map.has(obj)) {
        map.set(obj, obj)
      }
      let keys = Object.keys(obj)
      for (let i = 0; i < keys.length; i++) {
        if (typeof obj[keys[i]] === "object") {
          if (map.has(obj[keys[i]])) {
            obj[keys[i]] = "$"
            continue
          } else {
            map.set(obj[keys[i]], obj[keys[i]])
          }
        }
        _cycle(obj[keys[i]])
      }
    }
    _cycle(target)
    return target
  }

  function DFSdeepClone(obj, visitedArr = []) {
    let obj = {}
    if (typeof obj === "object" && obj !== null) {
      let index = visitedArr.indexOf(obj)
      _obj = Array.isArray(obj) ? [] : {}
      if (~index) {
        _obj = visitedArr[index]
      } else {
        for (let key in obj) {
          _obj[key] = DFSdeepClone(obj[key], visitedArr)
        }
        visitedArr.push(obj)
      }
    } else if (typeof obj === "function") {
      _obj = eval("(" + obj.toString() + ")")
    } else {
      _obj = obj
    }
    return _obj
  }

  function BFSdeepClone(obj) {
    let originObj = [obj],
      copyObj = [Array.isArray(obj) ? [] : {}],
      visitedOriginArr = [],
      visitedCopyArr = []
    while (originObj.length > 0) {
      const item = originObj.shift()
      const _obj = copyObj.shift()
      visitedOriginArr.push(item)
      if (typeof item === "object" && item !== null) {
        for (let key in item) {
          const val = item[key]
          if (val.constructor === "Object") {
            const index = visitedOriginArr.indexOf(item[key])
            if (~index) {
              _obj[key] = visitedCopyArr[index]
            } else {
              _obj[key] = {}
              originObj.push(val)
              copyObj.push(_obj[key])
            }
          } else if (val.constructor === "Array") {
            _obj[key] = []
            originObj.push(val)
            copyObj.push(_obj[key])
          } else if (val.constructor === "Function") {
            _obj[key] = eval("(" + val.toString() + ")")
          } else {
            _obj[key] = val
          }
        }
        visitedCopyArr.push(_obj)
      } else if (typeof item === "function") {
        _obj = eval("(" + item.toString() + ")")
      } else {
        _obj = item
      }
    }
    return copyObj
  }

  Promise.prototype._all = function (promiselist) {
    const len = promiselist.length,
      result = []
    let count = 0
    return new Promise((resolve, reject) => {
      promiselist.forEach((item) => {
        item.then(
          (res) => {
            result.push(res)
            count++
            if (count === len) {
              resolve(result)
            }
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  }
  Promise._all([Promise.resolve(111), Promise.resolve(222)]).then((res) => {
    console.log(res)
  })

  Promise.prototype._race = function (promiselist) {
    return new Promise((resolve, reject) => {
      promiselist.forEach((item) => {
        item.then(
          (res) => {
            resolve(res)
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  }
  Promise._race([Promise.resolve(111), Promise.resolve(222)]).then((res) => {
    console.log(res)
  })
  Promise.prototype._finally = function (fn) {
    return this.then(
      (value) => {
        return Promise.resolve(fn()).then(() => {
          return value
        })
      },
      (err) => {
        return Promise.reject(fn()).catch(() => {
          return err
        })
      }
    )
  }

  function asyncToGenerator(genF) {
    return new Promise((resolve, reject) => {
      const gen = genF()
      const step = (type, args) => {
        let next
        try {
          next = gen[type](args)
        } catch (error) {
          return reject(error)
        }
        const { done, value } = next
        if (done) {
          return resolve(value)
        }
        Promise.resolve(value).then(
          (val) => step("next", val),
          (err) => step("throw", err)
        )
      }
      step("next")
    })
  }
  asyncToGenerator(function* helloWorldGenerator() {
    yield "hello"
    yield "world"
    return "ending"
  }).then((res) => {
    console.log(res)
  })

  class MyEvent {
    constructor() {
      this._event = Object.create(null)
      this.stackArr = null
      this.stackArr &&
        this.stackArr.forEach((fn, index) => {
          fn()
          if (index === this.stackArr.length - 1) {
            this.stackArr = null
          }
        })
    }
  }
  MyEvent.prototype.on = function (key, fn) {
    this._event[key] = this._event[key] || []
    return this._event[key].push(fn)
  }
  MyEvent.prototype.emit = function (key, ...payload) {
    this._event[key] &&
      this._event[key].forEach((fn) => {
        fn.apply(fn, payload)
      })
    let fn = () => this.emit(this, key, payload)
    if (!this._event[key] && !this.stackArr) {
      this.stackArr = []
      this.stackArr.push(fn)
    }
  }
  MyEvent.prototype.off = function (key, callback) {
    if (callback) {
      this._event[key] = this._event[key].filter(
        (fn) => fn !== callback && fn.c !== callback
      )
    } else {
      this._event[key] = []
    }
  }
  MyEvent.prototype.once = function (key, fn) {
    const one = (...payload) => {
      this.off(key, one)
      fn.apply(fn, payload)
    }
    one.c = fn
    this.on(key, one)
  }
  MyEvent.prototype.clearAllEvent = function () {
    Object.keys(this._event).forEach((key) => {
      this._event[key] = []
    })
  }
  const _events = new MyEvent()
  const listera = (a) => {
    console.log("发布订阅事件1", a)
  }
  const lister3 = (a) => {
    console.log("发布订阅事件3", a)
  }
  _events.on("test", listera)
  _events.on("test", lister3)

  function getSignle(fn) {
    let result
    return function (...args) {
      return result || (result = fn.apply(fn, args))
    }
  }

  const proxys = function (fn) {
    let result
    const handler = {
      construct: function () {
        if (!result) {
          result = Reflect.construct(fn, arguments)
        }
        return result
      }
    }
    return new Proxy(fn, handler)
  }
  const _prers = proxys(function (a) {
    console.log(a)
  })

  Object.prototype._create = function (object) {
    function F() {}
    F.prototype = object
    return new F()
  }

  function fatherFn(...arr) {
    this.some = "parent的this属性"
    this.params = arr
  }
  fatherFn.prototype.fatherFnSome = "parent原型方法"
  function sonFn() {
    this.obkprk1 = "child的this属性"
  }
  function inheritPrototype(son, father) {
    const fatherPrototype = Object.create(father.prototype)
    son.prototype = fatherPrototype
    son.prototype.constructor = son
    Object.setPrototypeOf(son, father)
  }

  function compose(fns) {
    return function (...args) {
      let start = fns.length - 1
      let result = [...args]
      while (start >= 0) {
        result = fns[start].apply(
          fns[start],
          Array.isArray(result) ? result : [result]
        )
        start--
      }
      return result
    }
  }
  function compose1(fns) {
    return fns.reduce(
      (a, b) =>
        (...args) =>
          a(b(...args))
    )
  }

  function asyncParallel(...fns) {
    let count = 0
    return function (...args) {
      const [cb, ...other] = args
      fns.forEach(async (fn) => {
        await fn.apply(fn, other)
        count++
        if (count === fns.length) {
          cb()
        }
      })
    }
  }

  function asyncSerial(...fns) {
    const [first, ...others] = fns
    return function (...args) {
      return others.reduce((a, b) => {
        Promise.resolve(() => a()).then(() => b(...args))
      }, first(...args))
    }
  }

  function Calculate() {
    let data = new WeakMap()
    Calculate = function () {
      data.set(this, Math.random())
    }
    Calculate.prototype.doSth = function () {
      return date.get(this)
    }
    return new Calculate()
  }

  function A() {
    let a = Math.random()
    A.prototype.getA = () => a
    this.getA = () => a
  }

  class Promise {
    constructor(executor) {
      this.status = "pending"
      this.value = undefined
      this.reason = undefined
      this.onResolvedCallbacks = []
      this.onRejectedCallbacks = []
      let resolve = (data) => {
        if (this.status === "pending") {
          this.value = data
          this.status = "resolved"
          this.onResolvedCallbacks.forEach((fn) => fn())
        }
      }
      let reject = (reason) => {
        if (this.status === "pending") {
          this.reason = reason
          this.status = "rejected"
          this.onRejectedCallbacks.forEach((fn) => fn())
        }
      }
      try {
        executor(resolve, reject)
      } catch (error) {
        reject(error)
      }
    }

    then(onFulFilled, onRejected) {
      onFulFilled = typeof onFulFilled === "function" ? onFulFilled : (y) => y
      onRejected =
        typeof onRejected === "function"
          ? onRejected
          : (err) => {
              throw err
            }
      let promise2
      if (this.status === "resolved") {
        promise2 = new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              let x = onFulFilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
      if (this.status === "rejected") {
        promise2 = new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
      if (this.status === "pending") {
        promise2 = new Promise((resolve, reject) => {
          this.onResolvedCallbacks.push(() => {
            setTimeout(() => {
              try {
                let x = onFulFilled(this.value)
                resolvePromise(promise2, x, resolve, reject)
              } catch (error) {
                reject(error)
              }
            }, 0)
          })
          this.onRejectedCallbacks.push(() => {
            setTimeout(() => {
              try {
                let x = onRejected(this.value)
                resolvePromise(promise2, x, resolve, reject)
              } catch (error) {
                reject(error)
              }
            }, 0)
          })
        })
      }
      return promise2
    }
    catch(onRejected) {
      return this.then(null, onRejected)
    }
  }
  Promise.all = function (promiseList) {
    const len = promiseList.length,
      result = []
    let count = 0
    return new Promise((resolve, reject) => {
      promiseList.forEach((item, index) => {
        item.then(
          (res) => {
            result.push(res)
            count++
            if (count === len) {
              resolve(result)
            }
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  }
  Promise.race = function (promiseList) {
    return new Promise((resolve, reject) => {
      promiseList.forEach((item) => {
        item.then(
          (res) => {
            resolve(res)
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  }
  Promise.resolve = function (value) {
    return new Promise((resolve, reject) => resolve(value))
  }
  Promise.reject = function (reason) {
    return new Promise((resolve, reject) => reject(reason))
  }
  Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
      dfd.resolve = resolve
      dfd.reject = reject
    })
    return dfd
  }

  function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError("循环引用"))
    }
    if (x !== null && (typeof x === "object" || typeof x === "function")) {
      let called = false
      try {
        let then = x.then
        if (typeof then === "function") {
          then.call(
            x,
            (y) => {
              if (called) return
              called = true
              resolvePromise(promise2, y, resolve, reject)
            },
            (r) => {
              if (called) return
              called = true
              reject(r)
            }
          )
        } else {
          resolve(x)
        }
      } catch (error) {
        if (called) {
          return
        }
        called = true
        reject(error)
      }
    } else {
      resolve(x)
    }
  }

  Promise.all = function (promiselist) {
    const len = promiselist.length,
      result = []
    let count = 0
    return new Promise((resolve, reject) => {
      promiselist.forEach((item, index) => {
        item.then(
          (res) => {
            result.push(res)
            count++
            if (count === len) {
              resolve(len)
            }
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  }

  class MyEvent {
    constructor() {
      this._event = Object.create(null)
      this.stackArr = null
      this.stackArr &&
        this.stackArr.forEach((fn, index) => {
          fn()
          if (index === this.stackArr.length - 1) {
            this.stackArr = null
          }
        })
    }
  }
  MyEvent.prototype.on = function (key, fn) {
    this._event[key] = this._event[key] || []
    this._event[key].push(fn)
    return this
  }
  MyEvent.prototype.emit = function (key, ...payload) {
    this._event[key] &&
      this._event[key].forEach((fn) => {
        fn.apply(fn, payload)
      })
    let fn = () => this.emit(this, key, payload)
    if (!this._event[key] && !this.stackArr) {
      this.stackArr = []
      this.stackArr.push(fn)
    }
  }
  MyEvent.prototype.off = function (key, callback) {
    if (callback) {
      return (this._event[key] = this._event[key].filter(
        (fn) => fn !== callback && fn.c !== callback
      ))
    }
    this._event[key] = []
  }
  MyEvent.prototype.once = function (key, fn) {
    const one = (...payload) => {
      this.off(key, one)
      fn.apply(fn, payload)
    }
    one.c = fn
    this.on(key, one)
  }
  MyEvent.prototype.clearAllEvent = function () {
    Object.keys(this._event).forEach((key) => {
      this._event[key] = []
    })
  }

  Promise.resolve(123).then(res => {
    console.log(res);
  })
})()
