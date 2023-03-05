;(function () {
  let checkObject = {
    checkNmae: function () {},
    checkEmail: function () {},
    checkPhone: function () {},
  }
  console.log(checkObject)

  let checkObj = function () {
    this.checkNmae = function () {}
    this.checkEmail = function () {}
    this.checkPhone = function () {}
  }
  checkObj.prototype.checkNmaep = function () {}
  checkObj.prototype.checkEmailp = function () {}
  checkObj.prototype.checkPhonep = function () {}
  let a = new checkObj()
  console.log(a.checkNmae)
  console.log(a.checkPhonep)

  //   创建对象，避免变量污染
  Function.prototype.addMethod = function (name, fn) {
    // this[name] = fn
    this.prototype[name] = fn
    return this
  }
  let meth = function () {}
  meth
    .addMethod('checkName', function () {
      console.log(111)
      return this
    })
    .addMethod('checkEmail', function () {
      console.log(222)
      return this
    })
  let methObj = new meth()
  methObj.checkName().checkEmail()
  console.log(meth.prototype)
  console.log(Function.prototype.addMethod)

  let Book = function (name, id) {
    var name = {}
    function checkId() {}
    // 特权方法
    this.getName = function () {}
    this.setName = function () {}
    this.setName(name)
  }
  // 静态方法
  Book.isChina = function () {}
  // 公有方法
  Book.prototype = {
    isBook: false,
  }
  let nBook = new Book()
  console.log(Book.isChina)
  console.log(nBook.isChina)

  // 闭包
  let closureBook = function () {
    var bookNum = 0
    function checkNum(name) {}
    return function (newId, newName, newPrice) {
      var name, price
      this.name = newName
      this.price = newPrice
      this.getNmae = function () {
        return name
      }
      this.getPrice = function () {
        return price
      }
    }
  }

  // 检察长
  let BBook = function (name, id) {
    if (this instanceof BBook) {
      this.name = name
      this.id = id
    } else {
      return new BBook(name, id)
    }
  }
  let sbbok = BBook(123, 1211)
  console.log(sbbok.name, sbbok.id)

  // 类式继承
  function SupBook() {
    this.bvalue = true
  }
  SupBook.prototype.getValue = function () {
    return this.bvalue
  }
  function subBook() {
    this.sValue = false
  }
  subBook.prototype = new SupBook()
  subBook.prototype.getSubValue = function () {
    return this.sValue
  }
  let subb = new subBook()
  console.log(subb.getSubValue)
  console.log(subb.getValue)
  console.log(subb instanceof subBook)
  console.log(subb instanceof SupBook)
  console.log(subBook instanceof SupBook)
  console.log(subBook.prototype instanceof SupBook)

  // 构造函数继承
  function supBBook(id) {
    this.books = [1, 2, 3]
    this.id = id
  }
  supBBook.prototype.showBooks = function () {
    return this.books
  }
  function subBbOK(id) {
    supBBook.call(this, id)
  }
  // 组合继承
  subBbOK.prototype = new supBBook()
  let aboos1 = new subBbOK(123)
  let aboos2 = new subBbOK(11)
  console.log(aboos1.books)
  console.log(aboos2.books)
  console.log(aboos1.showBooks())

  // 原型式继承
  function inprotoObj(o) {
    function F() {}
    F.prototype = o
    return new F()
  }
  // 寄生式模式
  let bookss = {
    name: '12',
    ahe: 123,
  }
  function createBooks() {
    let o = new inprotoObj(bookss)
    o.getNme = function () {}
    return o
  }
  console.log(createBooks().name)

  // 寄生组合式继承
  function inherPrto(subclass, supclass) {
    let p = inprotoObj(supclass.prototype)
    p.constructor = subclass
    subclass.prototype = p
  }

  // 多继承
  let mix = function () {
    let i = 1,
      len = arguments.length,
      target = arguments[0]
    for (; i < len; i++) {
      let arg = arguments[i]
      for (let key in arg) {
        target[key] = arg[key]
      }
    }
    return target
  }
  console.log(mix({}, { name: '123' }, { age: 123 }))

  // 多态
  function Add() {
    function zero() {
      return 10
    }
    function one(num) {
      return num + 10
    }
    function two(num1, num2) {
      return num1 + num2
    }
    this.add = function () {
      let arg = arguments,
        len = arg.length
      switch (len) {
        case 0:
          return zero()
        case 1:
          return one(arg[0])
        case 2:
          return two(arg[0], arg[1])
        default:
          break
      }
    }
  }
  let Aadd = new Add()
  console.log(Aadd.add())
  console.log(Aadd.add(1))
  console.log(Aadd.add(1, 6))
})()
