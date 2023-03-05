(function (window, $) {
	// 工程模式
	function createPerson(name, age, job) {
		var o = new Object();
		o.name = name;
		o.age = age;
		o.job = job;
		o.sayName = function () {
			console.log(this.name)
		}
		return o
	}
	var person1 = createPerson('Nicholas', 29, 'Software Engineer');
	var person2 = createPerson('Greg', 27, 'Doctor');
	person1.sayName()

	// 构造函数模式n
	function Person(name, age, job) {
		this.name = name;
		this.age = age;
		this.job = job;
		this.sayName = function () { //每次实例化都创建了一次，不划算
			console.log(this.name)
		}
	}
	Person.prototype = { //将函数定义转到原型对象上，函数只是一个指针，这样就共享了一个指向函数的指针,但是这样做后constructor就改变了
		constructor: Person,
		name: '123',
		sayAge: function () {
			console.log(this.age)
		}
	}

	var person1 = new Person('Nicholas', 29, 'Software Engineer');
	var person2 = new Person('Greg', 27, 'Doctor');
	person1.sayName()
	person1.sayAge.call(person2) //call() 方法是javaScript中每个函数原型链上的方法，

	console.log(person1.constructor == Person)
	console.log(Person instanceof Object) //左侧对象的原型链中是否存在右侧的原型
	console.log(person1 instanceof Person)
	console.log(person1.__proto__) //指向构造函数的原型对象(prototype)

	var o = {}
	Person.call(o, 'Nicholas', 29, 'Software Engineer') //函数调用，改变this的指向
	o.sayName()

	console.log(Object.getPrototypeOf(person1) == Person.prototype) //ES6的getPrototypeOf方法返回__proto__的值，也就是构造函数的原型对象
	console.log(person1.hasOwnProperty('name'))
	console.log('name' in person1)

	function SpecialArray() {
		const values = new Array();
		values.push.apply(values, arguments); //借用构造函数
		values.toPipedString = function () {
			return this.join('|');
		}
		return values
	}
	var colors = new SpecialArray('red', 'blue', 'green');
	console.log(colors.toPipedString())

	function SuperType() {
		this.prototype = true
	}
	SuperType.prototype.getSuerValue = function () {
		return this.prototype
	}

	function SubType() {
		this.suproperty = false
	}
	SubType.prototype = new SuperType();
	SubType.prototype.getSubValue = function () {
		return this.suproperty
	}
	SubType.prototype.getSuerValue = function () {
		return false
	}
	var instance = new SubType()
	var instance1 = new SuperType()
	console.log(instance.getSuerValue())
	console.log(instance1.getSuerValue())
	console.log(instance instanceof Object)
	console.log(instance instanceof SubType)
	console.log(instance instanceof SuperType)
	console.log(Object.prototype.isPrototypeOf(instance))
	console.log(Object.prototype.isPrototypeOf(SubType))
	console.log(Object.prototype.isPrototypeOf(SuperType))

	function Super1(name) {
		this.colors = ['red', 'blue', 'green']
		this.name = name
	}

	function Suber1() {
		Super1.call(this, 'hello') //借用构造函数，经典继承，即在子类构造函数中调用超类型构造函数，而且还可以传参
		this.age = 29
	}
	var s1 = new Suber1()
	s1.colors.push('black')
	var s2 = new Suber1()
	console.log(s1.colors)
	console.log(s2.colors)
	console.log(s1.name)
	console.log(s2.name)
	console.log(s1.age)
	console.log(s2.age)

	function Super2(name) { //组合继承，也就是原型继承和借用构造函数继承的组合方式，使用原型链实现对原型属性的继承，使用借用构造函数实现对实例属性的继承
		this.name = name;
		this.colors = ['red', 'blue', 'green']
	}

	Super2.prototype.sayName = function () {
		console.log(this.name)
	}

	function Suber2(name, age) {
		Super2.call(this, name)
		this.age = age;
	}

	Suber2.prototype = new Super2()
	Suber2.prototype.constructor = Suber2
	Suber2.prototype.sayAge = function () {
		console.log(this.age)
	}
	var s3 = new Suber2('Nic', 29);
	s3.colors.push('black')
	var s4 = new Suber2('Greg', 27)
	console.log(s3.colors)
	console.log(s4.colors)
	console.log(s3.name)
	console.log(s4.name)
	console.log(s3.age)
	console.log(s4.age)
	s3.sayAge()
	s4.sayAge()

	function Objectfuc(o) { //原型式继承，从创建一个临时的构造函数，然后把传入的对象作为这个构造函数的原型，然后返回这个临时构造函数的一个新实例
		function F() { }
		F.prototype = o;
		return new F()
	}

	var s5 = {
		name: 'NichLAS',
		friends: ['Shelby', 'Court', 'Van']
	}
	var s6 = {
		name: 'Greg',
		friends: ['Shelby', 'Court', 'Van']
	}

	var anoth1 = Objectfuc(s5)
	var anoth2 = Objectfuc(s6)
	console.log(anoth1.name)
	console.log(anoth2.name)

	var s7 = Object.create(s6, {
		name: {
			value: '石头'
		}
	})
	console.log(s7.name)

	function Objectfuc1(o) { //寄生式继承
		var clone = Objectfuc(o);
		clone.sayHi = function () {
			console.log('hi')
		}
		return clone
	}
	var s8 = Objectfuc1(s6)
	s8.sayHi()

	function Objectfuc2(Suber2, Super2) { //寄生组合式继承
		var prototype = Objectfuc(Super2.prototype)
		prototype.constructor = Suber2;
		Suber2.prototype = prototype
	}
	Objectfuc2(Suber2, Super2); //实现寄生组合式继承,把两个Suber2和Super2联系起来

	function createFunctions() { //匿名函数
		var result = new Array();
		for (var i = 0; i < 10; i++) {
			result[i] = (function (i) {
				return function () {
					return i
				}
			})(i)
		}
		return result
	}
	const result1 = createFunctions()
	console.log(result1[3]())

	window.name = 'The Window' //这里必须写成window，不然声明的全局变量就不是在window中，这样当调用匿名函数时，this指向window就取不到全局变量了
	var Objectfuc3 = {
		name: 'My Object',
		getName: function () {
			return function () {
				return this.name
			}
		}
	}
	console.log(Objectfuc3.getName()())

	var data1 = {
		name: '123'
	}
	var data2 = data1 //js中数据传递方式是值传递，这里只不过是保存的一个指向对象的指针，将指针进行值传递
	data2.name = 'name'
	console.log(data1, data2)

	function assignHandler() {
		var element = document.getElementById('someElemet')
		var id = element.id //这样也不能解决内存泄漏问题，因为闭包中引用了包含函数的整个活动对象,只有将element设置为null
		element.onclick = function () {
			alert(id)
			element = null //解决内存泄漏
		}
	}
	// assignHandler();

	window.namezw = 123;

	function outputNumber(count) {
		this.namezw = 321
		this.setName = function () {
			return function () {
				console.log(this.namezw)
			}
		}
	}
	var out = new outputNumber()
	out.setName()()

	function Func3(name) {
		var funname = 10 //私有属性
		function private() { //私有方法
			return false
		}
		this.publicFunc = function () { //匿名函数，特权方法---能够访问私有变量和私有函数的公有方法
			console.log(name)
			console.log(private())
		}

		this.setName = function () {
			name = 'seer'
		}
	}
	var fun3new = new Func3('2222')
	fun3new.publicFunc()
	fun3new.setName()
	fun3new.publicFunc()

	var privateVable = 10 //私有变量
	function privateFun3() { //私有函数
		privateVable++;
		return privateVable
	}
	var Myobject = function () {
		this.privateVable = 11
	}
	Myobject.prototype.publicMethond = function () { //公有方法，特权方法
		return privateFun3()
	}
	var pri = new Myobject()
	console.log(pri.publicMethond())

	var name1 = ''
	var Person3 = function (value) {
		name1 = value
	}
	Person3.prototype.getName = function () {
		return name1
	}
	Person3.prototype.setName = function (value) {
		name1 = value
	}
	var person4 = new Person3('Nicholas')
	console.log(person4.getName())
	person4.setName('zhangwei')
	console.log(person4.getName())
	var person5 = new Person3('Michael')
	console.log(person5.getName())
	console.log(person4.getName())

	var singleton = function () {
		var privateAble = 10;

		function privateFun4() {
			return false
		}
		return { //特权方法---能够访问私有变量和私有函数的公有方法
			publicProperty: true,
			publicMethod: function () {
				privateAble++;
				return privateFun4()
			}
		}
	}

	var age1 = 29;
	console.log(window.age1);

	console.log(self) // self始终指向window
	console.log(window.frames)
	window.moveTo(100, 100)
	console.log(window.screenLeft)
	console.log(window.screenTop)
	console.log(window.innerWidth)
	console.log(window.innerHeight)
	window.resizeTo(100, 100)
	$('#someElemet').on('click', function () {
		window.weoxWin = window.open('http://www.baidu.com', 'wroxWindow',
			"height=400,width=400,location=yes,menubar=yes,resizable=yes")
		window.weoxWin.resizeTo(500, 500)
		window.weoxWin.moveTo(100, 100)
		window.weoxWin.opener = null //在单独的进程运行标签页,告诉浏览器新创建的标签页不需要与打开它的标签页通信
		try {
			if (window.weoxWin == null) {
				console.log('浏览器阻止了弹出窗口')
			}

		} catch (error) {
			console.log('浏览器阻止了弹出窗口')
		}
	})
	$('#someElemet1').on('click', function () {
		window.weoxWin.close()
	})

	function hasPlugin(name) {
		name = name.toUpperCase()
		for (var i = 0; i < navigator.plugins.length; i++) {
			if (navigator.plugins[i].name.toUpperCase().indexOf(name) > -1) {
				return true
			}
		}
		return false;
	}
	console.log(hasPlugin('PDF'))

	function hasIEPlugin(name) {
		try {
			new ActiveXObject(name)
			return true
		} catch (error) {
			return false
		}
	}
	console.log(hasIEPlugin('Flash'))
	// navigator.plugins.refresh(true) //是否重新刷新页面，否则只更新plugins集合

	console.log($('#someElemet1').prop("outerHTML"))
	console.log(document.implementation.hasFeature('MouseEvents', '2.0'))

	$('.test').on('click', function (event) {
		console.log(event.target.id)
	})

	var drawing = document.getElementById('drawing');
	if (drawing.getContext) {
		var content = drawing.getContext('2d');
		content.fillStyle = '#ff0000';
		content.fillRect(10, 10, 50, 50);

		content.fillStyle = 'rgba(0,0,255,.5)';
		content.fillRect(30, 30, 50, 50);
		content.clearRect(40, 40, 10, 10);

		content.beginPath();
		content.arc(100, 100, 99, 0, 2 * Math.PI, false);

		content.moveTo(194, 100);
		content.arc(100, 100, 94, 0, 2 * Math.PI, false);

		content.moveTo(100, 100);
		content.lineTo(100, 15);
		content.moveTo(100, 100);
		content.lineTo(35, 100);
		content.stroke();

		content.font = "bold 50px"
		content.fillText('12', 100, 20, 50)

		// 生成图片
		var imgURL = drawing.toDataURL('image/png');
		var image = document.createElement('img');
		image.src = imgURL;
		document.body.appendChild(image)

		// 取得原始图像数据
		var imageData = content.getImageData(10, 5, 50, 50)
		console.log(imageData)
	}

	// 捕获异常
	try {
		// 抛出异常
		throw new Error("some bad happened");
	} catch (error) {
		console.log(error)
	}

})(window, jQuery) //这里用globalThis代替window，因为在node中顶层对象是globalThis而不是window