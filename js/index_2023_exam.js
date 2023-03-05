// 颜色格式转换
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

// 删除数组最后一个元素
function truncate(arr) {
  const arrCopy = [...arr]
  arrCopy.pop()
  return arrCopy
  return arr.slice(0, -1)
}

// 添加元素
function prepend(arr, item) {
  return [item].concat(arr)
}

// 文件扩展名
const _getExFilename = (filename) => {
  return "." + filename.split(".").slice(-1).join("")
}

// 返回参数数字的千分位分隔符字符串
function _comma(number) {
  let str = number.toString()
  return str.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")
}
function _comma1(number) {
  let negative = ""
  if (number < 0) {
    number = Math.abs(number)
    negative = "-"
  }
  let array = parseInt(number).toString().split("").reverse()
  let res = []
  let sign = 0
  for (let i = 0; i < array.length; i++) {
    if (sign === 3) {
      res.push(",")
      sign = 0
    }
    res.push(array[i])
    sign++
  }
  return negative + res.reverse().join("")
}

// 单向绑定
document.getElementById("input").onchange = function () {
  document.getElementById("span").innerHTML = this.value
}

// 创建数组,返回一个长度为参数值并且每一项值都为参数值的数组
const _createArray = (number) => {
  return new Array(number).fill(number)
}

// 直角三角形
var triangle = document.querySelector(".triangle")
if (triangle) triangle.innerHTML = `*<br>**<br>***`

// 判断版本
const _shouldUpdate = (oldVersion, newVersion) => {
  oldVersion = oldVersion.split(".")
  newVersion = newVersion.split(".")
  for (let i = 0; i < newVersion.length; i++) {
    if (newVersion[i] > oldVersion[i]) {
      return true
    }
  }
  return false
}
const _shouldUpdate1 = (oldVersion, newVersion) => {
  let oldversion = parseInt(oldVersion.split(".").join(""))
  let newversion = parseInt(oldVersion.split(".").join(""))
  return newversion > oldversion
}

// 无重复数组
const _getUniqueNums = (start, end, n) => {
  let res = []
  while (res.length < n) {
    let num = Math.floor(Math.random() * (end - start + 1) + start)
    if (!res.includes(num)) res.push(num)
  }
  return res
}

// 数组排序
var cups = [
  { type: 1, price: 100, color: "black", sales: 3000, name: "牛客logo马克杯" },
  { type: 2, price: 40, color: "blue", sales: 1000, name: "无盖星空杯" },
  { type: 4, price: 60, color: "green", sales: 200, name: "老式茶杯" },
  { type: 3, price: 50, color: "green", sales: 600, name: "欧式印花杯" }
]
var ul = document.querySelector("ul")
var upbtn = document.querySelector(".up")
var downbtn = document.querySelector(".down")
const _listRendering = (arr) => {
  var str = ""
  arr.forEach((element) => {
    str += `<li>${element.name}</li>`
  })
  ul.innerHTML = str
}
upbtn.onclick = function () {
  var upArr = cups.sort(function (a, b) {
    return a.sales - b.sales
  })
  _listRendering(upArr)
}
downbtn.onclick = function () {
  var downArr = cups.sort(function (a, b) {
    return b.sales - a.sales
  })
  _listRendering(downArr)
}

// 新数组
const _delete = (array, index) => {
  // 补全代码
  return array.slice(0, index).concat(array.slice(index + 1))
}

// 计数器
const closure = () => {
  let num = 0
  return function () {
    num++
    return num
  }
}

// 类继承
class Human {
  constructor(name) {
    this.name = name
    this.kingdom = "animal"
    this.color = ["yellow", "white", "brown", "black"]
  }
  getName() {
    return this.name
  }
}
class Chinese extends Human {
  constructor(name, age) {
    super(name)
    this.age = age
  }
  getAge() {
    return this.age
  }
}

//  参数解析器
const _getParams = (url) => {
  return url
    .split("?")[1]
    .split("&")
    .reduce((pre, cur) => {
      const data = cur.split("=")
      pre[data[0]] = data[1]
      return pre
    }, {})
}

// 生成页码
const _createPage = (allItem, pageItem) => {
  let pages = Math.ceil(allItem / pageItem)
  let str = ""
  for (let i = 1; i <= pages; i++) {
    str += `<li>${i}</li>`
  }
  document.getElementById("ul").innerHTML = str
}
_createPage(13, 2)

// 总成绩排名
const _rank = (array) => {
  return array.sort(
    (a, b) => b.chinese + b.math + b.english - (a.chinese + a.math + a.english)
  )
}
const _searchStrIndexOf = (str, target) => {
  return str.split(target).length - 1
}

// 继承
function Human(name) {
  this.name = name
  this.kingdom = "animal"
  this.color = ["yellow", "white", "brown", "black"]
}
Human.prototype.getName = function () {
  return this.name
}
function Chinese(name, age) {
  Human.call(this, name)
  this.age = age
  this.color = "yellow"
}
Chinese.prototype = new Human()
Chinese.prototype.constructor = Chinese
Chinese.prototype.getAge = function () {
  return this.age
}

// 判断斐波那契数组
const _isFibonacci = (array) => {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

// 判断质数
Number.prototype._isPrime = function (num) {
  if (num < 2) return false
  if (num % 2 === 0 || num % 3 === 0 || num % 5 === 0) {
    return false
  }
  return true
}

//  验证是否是身份证
const _isCard = (number) => {
  let regx = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return regx.test(number)
}

// Symbol
const _symbolKey = (array) => {
  let obj = {}
  for (item of array) {
    let key = Symbol(item)
    obj[key] = item
  }
  return obj
}

// 相同的Set
const _isSameSet = (s1, s2) => {
  if (s1.size !== s2.size) return false
  return [...s1].every((v) => s2.has(v))
}

// Proxy计数器
let count = 0
const _proxy = (object) => {
  let proxy = new Proxy(object, {
    get: function (target, propKey) {
      if (propKey in target) {
        count++
      } else {
        count--
      }
    }
  })
  return proxy
}

// 监听对象
function Observe(target) {
  if (typeof target !== "object" || target === null) {
    return target
  }
  for (let key in target) {
    defineReactive(target, key, target[key])
  }
}
function defineReactive(target, key, value) {
  Object.defineProperty(target, key, {
    get: function () {
      return value
    },
    set: function (newVal) {
      if (newVal !== value) {
        value = newVal
        _render(ul)
      }
    }
  })
}

// 字体高亮
var text = document.querySelector(".text")
var search = document.querySelector("input")
const btn = document.querySelector("button")
var article = String(text.innerText) //保存原文本
btn.onclick = () => {
  let key = new String(search.value)
  let newV = article.replace(
    new RegExp(key, "g"),
    `<b style="background-color:yellow">${key}</b>`
  )
  text.innerHTML = newV
}

// 虚拟DOM
const _createElm = (vnode) => {
  let { tag, props, children, text } = vnode
  if (typeof tag === "string") {
    vnode.el = document.createElement(tag)
    _setAttr(vnode.el, props)
    vnode.el.appendChild(document.createTextNode(text))
    children.forEach((child) => {
      vnode.el.appendChild(_createElm(child))
    })
  } else {
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}
const _setAttr = (elem, attrs) => {
  for (key in attrs) {
    elem.setAttribute(key, attrs[key])
  }
}

// 查找重复元素
function duplicates(arr) {
  const copyArr = new Set()
  const res = new Set()
  for (let item of arr) {
    if (copyArr.has(item)) {
      res.add(item)
    }
    copyArr.add(item)
  }
  return [...res]
}

//  检查重复字符串
function containsRepeatingLetter(str) {
  return /([a-zA-Z])\1/.test(str)
}

// 判断是否符合指定格式
function matchesPattern(str) {
  return /^\d{3}-\d{3}-\d{4}$/.test(str)
}

// 判断是否符合 USD 格式
function isUSD(str) {
  return /^\$\d{1,3}(,\d{3})*(\.\d{2})*$/.test(str)
}

// 替换链接
// 该DOM元素内会给出一段随机文本，可能包含一些链接，比如https://www.baidu.com，或者 www.baidu.com?from=onlineExam，如果出现链接文本，请给该链接文本加上链接标签，用户点击后能直接在新窗口中打开该链接。
// 请完成 link 函数，完成该功能
// 1、container只有纯文本内容，不包含其他dom元素
// 2、识别所有以http://、https://或者www.开始的链接
// 3、所有www.开头的链接，默认使用 http 协议
// 4、所有链接在新窗口打开
function link() {
  const elm = document.querySelector("#jsContainer")
  let reg =
    /(https?:\/\/)?(www\.\w+(\.(com|cn))*([?]\w+=\w*(&\w+=\w*)*)?(#\w+)?)/g
  elm.innerHTML = elm.innerHTML.replace(reg, function (...args) {
    if (args[1]) {
      return `<a target="_blank" href="${args[1]}${args[2]}">${args[0]}</a>`
    } else {
      return `<a target="_blank" href="http://${args[2]}">${args[0]}</a>`
    }
  })
}

// 快速排序
const _quickSort = (array) => {
  let len = array.length
  if (len <= 1) return array
  let first = array[0]
  let left = []
  let right = []
  for (let i = 1; i < len; i++) {
    if (array[i] < first) {
      left.push(array[i])
    } else {
      right.push(array[i])
    }
  }
  left = _quickSort(left)
  right = _quickSort(right)
  left.push(first)
  return left.concat(right)
}

// 全排列---回溯
const _permute = (string) => {
  const res = []
  const backtrace = (path) => {
    if (path.length === string.length) {
      res.push(path)
      return
    }
    for (const item of string) {
      if (path.includes(item)) continue
      backtrace(path + item)
    }
  }
  backtrace("")
  return res
}

// 深拷贝
const _completeDeepClone = (target, map = new Map()) => {
  if (target === null) return target
  if (typeof target !== "object") return target
  const constructor = target.constructor
  if (/^(Function|RegExp|Date|Map|Set)$/i.test(constructor.name))
    return new constructor(target)
  if (map.has(target)) return map.get(target)
  map.set(target, true)
  const cloneTarget = Array.isArray(target) ? [] : {}
  for (prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = _completeDeepClone(target[prop], map)
    }
  }
  return cloneTarget
}

// promise实现，红色三秒打印一次、绿色两秒打印一次、黄色一秒打印一次
function red() {
  console.log("red")
}
function green() {
  console.log("green")
}
function yellow() {
  console.log("yellow")
}
function light(time, name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      name()
      resolve()
    }, time)
  })
}
function step() {
  Promise.resolve()
    .then(() => {
      return light(3000, red)
    })
    .then(() => {
      return light(2000, green)
    })
    .then(() => {
      return light(1000, yellow)
    })
    .then(() => {
      return step()
    })
}
