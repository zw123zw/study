// 简单工厂模式
let LoginAlert = function (text) {
  this.content = text
}
LoginAlert.prototype.show = function () {
  alert(this.content)
}
let LoginConfirm = function (text) {
  this.content = text
}
LoginConfirm.prototype.show = function () {
  console.log(this.content)
}
let LoginPrompt = function (text) {
  this.content = text
}
LoginPrompt.prototype.show = function () {
  console.log(this.content)
}
let la = new LoginPrompt('欢迎回来')
la.show()
// 工厂
function sport(type, text) {
  switch (type) {
    case 'alert':
      return new LoginAlert(text)
    case 'confirm':
      return new LoginConfirm(text)
    case 'prompt':
      return new LoginPrompt(text)
    default:
      break
  }
}
let ls = sport('confirm', '注册成功')
ls.show()
function createPop(type, text) {
  let o = new Object()
  o.content = text
  o.type = type
  o.show = function () {}
  if (o.type === 'alert') {
  }
  if (o.type === 'confirm') {
  }
  if (o.type === 'prompt') {
  }
}
// 安全工厂方法
let Factory = function (type, content) {
  if (this instanceof Factory) {
    return this[type][content]
  } else {
    return new Factory(type, content)
  }
}
Factory.prototype = {
  Jave: function () {},
  Php: function () {},
  Jascript: function () {},
}

// 抽象类
let Car = function () {}
Car.prototype = {
  getPrice: function () {
    return new Error('抽象方法不能调用')
  },
  getSpeed: function () {
    return new Error('抽象方法不能调用')
  },
}

// 抽象工厂模式
let ve = function (subtype, suptype) {
  if (typeof ve[suptype] === 'function') {
    function F() {}
    F.prototype = new ve[suptype]()
    subtype.constructor = subtype
    subtype.prototype = new F()
  } else {
    throw new Error('未创建抽象类')
  }
}

// 建造者模式
// 应聘者类
let human = function (param) {
  this.skill = (param && param.skill) || '保密'
  this.hobby = (param && param.hobby) || '保密'
}
human.prototype = {
  getSkill: function () {
    return this.skill
  },
  getHobby: function () {
    return this.hobby
  },
}
// 姓名解析类
let named = function (name) {
  this.wholeName = name
  const nameIndex = name.indexOf
  if (nameIndex > -1) {
    this.firstName = name.slice(0, nameIndex)
    this.secondName = name.slice(nameIndex)
  }
}
// 期望职位类
let workd = function (work) {
  switch (work) {
    case 'code':
      this.work = '工程师'
      this.workDescript = '程序猿'
      break
    case 'UE':
      this.work = '设计师'
      this.workDescript = '设计是一种艺术'
      break
    case 'teach':
      this.work = '教师'
      this.workDescript = '分享是一种快乐'
      break
    default:
      this.work = work
      this.workDescript = '暂无职位描述'
  }
}
workd.prototype.changeWork = function (work) {
  this.work = work
}
workd.prototype.changeDescript = function (workDescript) {
  this.workDescript = workDescript
}
// 建造者
let Person = function (name, work) {
  let _person = new human()
  _person.name = new named(name)
  _person.work = new workd(work)
  return _person
}
let pp = new Person('13', 'code')
console.log(pp.skill)
console.log(pp.work)
console.log(pp.name)

// 原型模式
let loopImage = function (imgArr, container) {
  this.imgArr = imgArr
  this.container = container
}
loopImage.prototype = {
  createImage: function () {},
  changeImage: function () {},
}
let sliderimg = function (imgArr, container) {
  loopImage.call(this, imgArr, container)
}
sliderimg.prototype = new loopImage()
sliderimg.prototype.changeImage = function () {}
sliderimg.prototype.changeImageLengh = function () {
  return this.container
}
let fadeimg = function (imgArr, container, arrow) {
  loopImage.call(this, imgArr, container)
  this.arrow = arrow
}
fadeimg.prototype = new loopImage()
fadeimg.prototype.changeImage = function () {
  this.container = 123111
}
fadeimg.prototype.changeImageLengh = function () {
  return this.container
}
let faa = new fadeimg(123, 11111)
let saa = new sliderimg(123, 22222)
faa.changeImage()
console.log(faa.changeImageLengh())
console.log(saa.changeImageLengh())

// 单例模式
let ming = {
  g: function (id) {
    return document.getElementById(id)
  },
  css: function (id, key, value) {
    return (this.g(id).style[key] = value)
  },
}
let AUitl = (function () {
  let conf = {
    MAX_NUM: 100,
    MIN_NUM: 1,
    COUNT: 10,
  }
  return {
    Util: {
      utilA: function () {},
    },
    Tool: {
      toola: function () {},
    },
    Ajax: {
      ajaxa: function () {},
    },
    Others: {
      othersa: function () {},
    },
    static: {
      getMax: function () {
        return conf.MAX_NUM
      },
    },
  }
})()
console.log(AUitl.static.getMax())
let lazySingle = (function () {
  let instance = null
  let Single = function () {
    return {
      publicM: function () {},
      publicC: 123,
    }
  }
  return function () {
    if (!instance) {
      instance = Single()
    }
    return instance
  }
})()
console.log(lazySingle().publicC)

// 外观模式
let addEvent = function (id, type, fn) {
  let dom = document.getElementById(id)
  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false)
  } else if (dom.attachEvent) {
    dom.attachEvent('on' + type, fn)
  } else {
    dom['on' + type] = fn
  }
}
let getEvent = function (event) {
  return event || window.event
}
let getTarget = function (e) {
  return getEvent(e).target || getEvent(e).srcElement
}
let preventDefault = function (e) {
  if (getEvent(e).preventDefault) {
    getEvent(e).preventDefault()
  } else {
    e.returnValue = false
  }
}

// 适配器模式
let $ = (function () {
  return function () {}
})()
let sa = {}
sa.g = function (id) {
  return $(id).get(0)
}
sa.on = function (id, type, fn) {
  let dom = typeof id === 'string' ? $('#' + id) : $(id)
  dom.on(type, fn)
}
let doSome = function (options) {
  let _options = {
    name: '123',
    age: 123,
    sex: 1,
  }
  Object.keys(_options).forEach(key => {
    _options[key] = options[key] || _options[key]
  })
}

// 代理模式
let count = (function () {
  let img = document.createElement('img')
  return function () {
    let str =
      '//img1.2125.com/2017begin/img/h001/h25/img202004141526598c1790.jpg'
    img.setAttribute('src', str)
    document.body.append(img)
  }
})()
count()

// 装饰者模式
let decorator = function (id, fn) {
  let input = document.getElementById(id)
  if (!input) {
    let dom = document.createElement('div')
    dom.innerHTML = '测试'
    document.body.appendChild(dom)
    input = dom
  }
  if (typeof input.onclick === 'function') {
    let oldClick = input.onclick
    input.onclick = function () {
      oldClick()
      fn()
    }
  } else {
    input.onclick = fn
  }
}
decorator('tel_input', function () {
  console.log('测试一下')
})
decorator('email_input', function () {
  console.log('测试二下')
})

// 桥接模式
let changeColorbg = function (dom, color, bg) {
  dom.style.color = color
  dom.style.background = bg
}
document.getElementsByTagName('div')[0].onmouseover = function () {
  changeColorbg(this, '#333', '#f5f5f5')
}
let pspeed = function (x, y) {
  this.x = this.xthis.y = y
}
pspeed.prototype.run = function () {
  console.log('跑')
}
let pcolor = function (color) {
  this.color = color
}
pcolor.prototype.draw = function () {
  console.log('绘制')
}
let pspeek = function (word) {
  this.word = word
}
pspeek.prototype.run = function () {
  console.log('说话')
}
let Ball = function (x, y, color) {
  this, (speed = new pspeed(x, y))
  this.color = new pcolor(color)
}
Ball.prototype.init = function () {
  this.color.draw()
  this.speed.run()
}
let people = function (x, y, word) {
  this.speed = new pspeed(x, y)
  this.word = new pspeek(word)
}
people.prototype.init = function () {
  this.speed.run()
  this.word.run()
}

// 组合模式
class CFolder {
  constructor(name) {
    this.name = name
    this.files = []
  }
  add(file) {
    this.files.push(file)
  }
  scan() {
    this.files.forEach(f => {
      f.scan()
    })
  }
}
class CFile {
  constructor(name) {
    this.name = name
  }
  add() {
    throw new Error('不能添加文件')
  }
  scan() {
    console.log('开始扫描文件:', this.name)
  }
}
let mFolder = new CFolder('目录1')
let mFolder1 = new CFolder('目录2')
mFolder.add(new CFile('文件1'))
mFolder1.add(new CFile('文件2'))
mFolder.scan()
mFolder1.scan()
let znews = function () {
  this.children = []
  this.element = null
}
znews.prototype = {
  init: function () {
    throw new Error('重写方法')
  },
  add: function () {
    throw new Error('重写方法')
  },
  getElement: function () {
    throw new Error('重写方法')
  },
}
let zcontainer = function (id, parent) {
  znews.call(this)
  this.id = id
  this.parent = parent
  this.init()
}
zcontainer.prototype = new znews()
zcontainer.prototype.init = function () {
  this.element = document.createElement('ul')
  this.element.id = this.id
}
zcontainer.prototype.add = function (child) {
  this.children.push(child)
  this.element.appendChild(child.getElement())
  return this
}
zcontainer.prototype.getElement = function () {
  return this.element
}
zcontainer.prototype.show = function () {
  this.parent.appendChild(this.element)
}
let zitem = function (id) {
  znews.call(this)
  this.id = id
  this.init()
}
zitem.prototype = new znews()
zitem.prototype.init = function () {
  this.element = document.createElement('li')
  this.element.id = this.id
}
zitem.prototype.add = function (child) {
  this.children.push(child)
  this.element.appendChild(child.getElement())
  return this
}
zitem.prototype.getElement = function () {
  return this.element
}
let znewsimg = function (url, text) {
  znews.call(this)
  this.url = url
  this.text = text
  this.init()
}
znewsimg.prototype = new znews()
znewsimg.prototype.init = function () {
  this.element = document.createElement('a')
  this.element.innerHTML = this.text
  this.element.href = this.href
}
znewsimg.prototype.add = function (child) {
  this.children.push(child)
  this.element.appendChild(child.getElement())
  return this
}
znewsimg.prototype.getElement = function () {
  return this.element
}
let nnewc = new zcontainer('news_ul', document.body)
nnewc
  .add(new zitem('nomal').add(new znewsimg('123', '333')))
  .add(new zitem('normal2').add(new znewsimg('1231', '66')))
  .show()

// 享元模式
let flyweight = (function () {
  const created = []
  function create() {
    let div = document.createElement('div')
    document.getElementById('fly_container').appendChild(div)
    created.push(div)
    return div
  }
  return {
    getDiv: function () {
      if (created.length < 5) {
        return create()
      } else {
        let div = created.shift()
        created.push(div)
        return div
      }
    },
  }
})()
for (let i = 0; i < 5; i++) {
  flyweight.getDiv().innerHTML = i
}

// 模板方法模式
let createAlert = function (data) {
  if (!data) {
    return
  }
  this.content = data.content
  this.panel = document.createElement('div')
  this.closeBtn = document.createElement('div')
  this.panel.className = 'alert'
  this.pconfirm = document.createElement('div')
  this.pconfirm.innerHTML = data.confirm || '确认'
}
createAlert.prototype = {
  init: function () {
    this.panel.appendChild(this.pconfirm)
    this.show()
  },
  show: function () {
    this.panel.style.display = 'block'
  },
  bindEvent: function () {
    this.closeBtn.onclick = function () {
      this.hide()
    }
  },
}
let rughtAlert = function (data) {
  createAlert.call(this, data)
  this.titleNode = data.titleNode
}
rughtAlert.prototype = new createAlert()
rughtAlert.prototype.init = function () {
  this.panel.insertBefore(this.titleNode)
  createAlert.prototype.init.call(this)
}
rughtAlert.prototype.bindEvent = function () {
  createAlert.prototype.bindEvent.call(this)
  this.fail()
}

// 观察者模式
let Observer = (function () {
  let _message = {}
  return {
    regist: function (type, fn) {
      _message[type] =
        typeof _message[type] === 'undefined' ? [fn] : _message[type].push(fn)
    },
    fire: function (type, args) {
      if (!_message[type]) {
        return
      }
      _message[type].forEach(fn => {
        fn.call(this, { type, args })
      })
    },
    remove: function (type, fn) {
      if (_message[type] instanceof Array) {
        _message[type].forEach((fn, index) => {
          _message[type].splice(index, 1)
        })
      }
    },
  }
})()

Observer.regist('test', function (e) {
  console.log(e)
})
Observer.fire('test', { msg: 123 })

// 状态模式
let resultState = (function () {
  let states = {
    state0: function () {},
    state1: function () {},
    state2: function () {},
    state3: function () {
      console.log('state3state3state3')
    },
    state4: function () {},
  }
  let show = function (res) {
    return states['state' + res] && states['state' + res]()
  }
  return {
    show,
  }
})()
resultState.show(3)
let marryState = (function () {
  let _current = {}
  let states = {
    jump: function () {
      console.log('跳跃')
    },
    move: function () {
      console.log('移动')
    },
    shoot: function () {
      console.log('射击')
    },
    squat: function () {
      console.log('蹲下')
    },
  }
  let Actons = {
    changeState: function () {
      let arg = arguments
      _current = {}
      for (const item of arg) {
        _current[item] = true
      }
      return this
    },
    goes: function () {
      Object.keys(_current).forEach(key => {
        states[key] && states[key]()
      })
      return this
    },
  }
  return Actons
})()
marryState
  .changeState('jump', 'shoot')
  .goes()
  .changeState('move')
  .goes()
  .changeState('squat', 'move', 'jump')
  .goes()

// 策略模式
let priceSt = (function () {
  let st = {
    return30: function () {
      console.log('3折')
    },
    return30: function () {
      console.log('3折')
    },
    return30: function () {
      console.log('3折')
    },
    return30: function () {
      console.log('3折')
    },
  }

  return function (alporitem, price) {
    return st[alporitem](price)
  }
})()

// 职责链模式
let sendData = function (data, dataType, dom) {
  let xhr = new XMLHttpRequest()
  let url = 'getData.php?mod=userInfo'
  xhr.onload = function (event) {
    if (xhr.status >= 200 && xhr.status < 300) {
      dealData(xhr.responseText, dataType, dom)
    }
  }
  xhr.open('get', url, true)
  xhr.send()
}
let dealData = function (data, dataType, dom) {
  switch (dataType) {
    case 'sug':
      return createSug(data, dom)
    case 'val':
      return createVal(data, dom)
    default:
      break
  }
}
let createSug = function (data, dom) {
  dom.parent.getElementsByTagName('ul')[0].innerHTML = data
}
let createVal = function (data, dom) {
  dom.parent.getElementsByTagName('ul')[0].innerHTML = data
}

// 命令模式
let viewCommand = (function () {
  let _html = ''
  let Actions = {
    create: function (data, view) {
      data += data[view]
    },
    display: function (container, data, view) {
      if (data) {
        this.create(data, view)
      }
      document.getElementById(container).innerHTML = _html
      _html = ''
    },
  }
  return function excute(msg) {
    Actions[msg.command].call(Actions, msg.param)
  }
})()
viewCommand({
  command: 'create',
  param: {
    data: 132,
    view: 321,
  },
})

// 访问者模式
let bindEvent = function (dom, type, fn) {
  dom.attachEvent('on' + type, fn)
}
let bindEventIE = function (dom, type, fn, data) {
  dom.attachEvent('on' + type, function (e) {
    fn.call(dom, e, data)
  })
}
let Visitor = (function () {
  return {
    splice: function () {
      let args = Array.prototype.splice.call(arguments, 1)
      return Array.prototype.splice.apply(arguments[0], args)
    },
    pop: function () {
      return Array.prototype.pop.apply(arguments[0])
    },
  }
})()

// 中介者模式
let Mediator = (function () {
  let _msg = {}
  return {
    register: function (type, actios) {
      if (typeof _msg[type] !== 'undefined') {
        _msg[type].push(actios)
      } else {
        _msg[type] = [actios]
      }
    },
    send: function (type) {
      _msg[type].forEach(item => {
        item && item()
      })
    },
  }
})()
Mediator.register('demo', function () {
  console.log('11')
})
Mediator.register('demo', function () {
  console.log('22')
})
Mediator.send('demo')

// 备忘录模式
let PageUp = (function () {
  let cache = {}
  let showPage = function (page, data) {
    console.log(page, data)
  }
  return function (page, fn) {
    if (cache[page]) {
      showPage(page, cache[page])
      fn && fn()
    } else {
      // 请求
      let data = [1, 2, 3]
      cache[page] = data
      showPage(page, cache[page])
      fn && fn()
    }
  }
})()
PageUp(1, () => {
  console.log(11111)
})

// 迭代器模式
let iteror = function (items1, container1) {
  let container = container1 && document.getElementById(container1)
  let items = container.getElementsByTagName(items1)
  let length = items.length
  let index = 0
  return {
    first: function () {
      index = 0
      return items[index]
    },
    seconde: function () {
      index = length
      return items[index]
    },
    pre: function () {
      if (--index > 0) {
        return items[index]
      } else {
        index = 0
        return null
      }
    },
    next: function () {
      if (++index < length) {
        return items[index]
      } else {
        index = length - 1
        return null
      }
    },
    get: function (num) {
      index = num
      return items[num]
    },
  }
}

// 解释器模式
let getSub = (function (node) {
  node = {
    previous: false,
    prev: 1,
  }
  if (node.previous) {
    let name = ''
    let sibling = node.prev
    if (sibling) {
      return name
    }
  }
})()

// 链式模式
let AA = function () {}
let BB = function () {
  return AA
}
BB = AA.prototype = {
  length: 2,
  size: function () {
    return this.length
  },
}

// 委托模式
let ulon = function (e) {
  let tar = e.target || e.srcElement
  if (tar.nodeName.toLowerCase() === 'li') {
    tar.style.backgroundColor = 'grey'
  }
}

// 数据访问对象模式
let BascLocalStorge = function (preId, timeSign) {
  this.preId = preId
  this.timeSign = timeSign
}
BascLocalStorge.prototype = {
  status: {
    SUCCESS: 0,
    FAIL: 1,
    TIMEOUT: 2,
  },
  storage: function () {
    return localStorage || window.localStorage
  },
  get: function (key) {
    let status = this.status.SUCCESS
    this.storage.getItem(key)
    cb && cb(this, status, key)
  },
  set: function (key, value, cb, time) {
    let status = this.status.SUCCESS
    let time1 = new Date(time).getTime()
    this.storage.setItem(key, value, time1)
    cb && cb(this, status, key, value)
  },
  remove: function () {},
}

// 节流模式
let throttle = function(){
  let isClear = arguments[0], fn;
  if(typeof isClear === 'boolean'){
    fn = arguments[1]
    clearTimeout(fn._throttleId)
  }else{
    fn = isClear
    let params = arguments[1]  
    fn._throttleId = setTimeout(() => {
      fn.apply(p .context, p.args)
    }, 1000);
  }
}