(function () {
	let a = 1;
	var b = 1;
	console.log(a, b)

	for (let i = 0; i < 10; i++) {
		var j = 10;
	}
	console.log(typeof i, j)

	//如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算
	var _arr = [];
	for (var i = 0; i < 10; i++) {
		(function (i) {
			_arr[i] = function () {
				return i
			}
		})(i)
	}
	console.log(_arr[6]())

	for (let i = 0; i < 3; i++) {
		let i = 'abc';
		console.log(i)
	}

	// var命令会发生“变量提升”现象，即变量可以在声明之前使用，值为undefined
	console.log(foo)
	var foo = 123
	// let命令改变了语法行为，它所声明的变量一定要在声明后使用
	let bar = 123
	console.log(bar)

	// 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响
	var tmp = '123'
	if (true) {
		let tmp = '234';
		console.log(tmp)
	}

	function barFunc(x = 2, y = x) {
		return [x, y]
	}
	console.log(barFunc())

	// 第一种场景，内层变量可能会覆盖外层变量
	var tmp = new Date()
	var fTmp = function () {
		console.log(tmp)
		if (false) {
			var tmp = 'hello'
		}
	}()

	// 块级作用域
	function f1() {
		let n = 1;
		if (true) {
			let b = 2;
		}
		console.log(n)
	}
	f1()

	// ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用
	if (true) {
		function f2() {
			console.log(222)
		}
	}
	f2()

	// const声明一个只读的常量。一旦声明，常量的值就不能改变。
	const PI = 3.1415
	console.log(PI)

	// const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。
	const fooc = {}
	fooc.a = 1
	fooc.b = 2
	console.log(fooc)

	// 对象冻结，应该使用Object.freeze方法
	const fooo = Object.freeze({})
	fooo.prop = 2;
	console.log(fooo)

	// 将对象彻底冻结的函数
	var constantize = (obj) => {
		Object.freeze(obj)
		Object.keys(obj).forEach((key, i) => {
			if (typeof obj[key] == 'object') {
				constantize(obj[key])
			}
		})
	}
	const obj1 = {
		a: {
			c: 100
		},
		b: 2345
	}
	obj1.a.c = 200
	console.log(obj1)
	constantize(obj1)
	obj1.a.c = 300
	console.log(obj1)

	// 顶层对象
	window.wina = 12
	var wina = 23
	console.log(window.wina)
	var getGlobal = function () {
		if (typeof self !== 'undefined') {
			return self
		}
		if (typeof window !== 'undefined') {
			return window
		}
		if (typeof global !== 'undefined') {
			return global
		}
	}
	console.log(getGlobal(), globalThis)

	// 数组解构
	let [a1, b1, c1] = [1, 2, 3]
	console.log(a1, b1, c1)
	let [q, [
		[w], r
	]] = [4, [
		[5], 6
	]]
	console.log(q, w, r)
	let [, , barr] = ['a', 'b', 'c']
	console.log(barr)
	let [x1, , z1] = [1, 3, 5]
	console.log(x1, z1)
	let [head, ...tail] = [1, 3, 5, 6, 7]
	console.log(head, tail)
	// 如果解构不成功，变量的值就等于undefined。
	let [x2, y2, ...z2] = ['a']
	console.log(x2, y2, z2)
	let [foo1] = []
	let [foo2, foo3] = [1]
	console.log(foo1, foo3)
	// 不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功
	let [x3, y3] = [1, 2, 3]
	console.log(x3, y3)
	let [a2, [b2], c2] = [1, [2, 3], 4]
	console.log(a2, b2, c2)
	// 如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错
	try {
		let [foo4] = undefined
	} catch (e) {
		//TODO handle the exception
		console.log(e)
	}
	// 对于 Set 结构，也可以使用数组的解构赋值
	let [a3, b3, c3] = new Set(['1', '2', '3'])
	console.log(c3)

	// 解构赋值允许指定默认值。注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效
	let [foo5 = 13] = [undefined]
	let [foo6 = 14] = [null]
	console.log(foo5, foo6)

	// 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值
	let [x4 = function () {
		console.log(123)
	}] = []
	console.log(x4)

	var k = l,
		l = 123
	console.log(k, l)

	let [m = 1, n = m] = [3]
	console.log(m, n)
	let [m1 = n1, n1 = 3] = [2,]
	console.log(m1, n1)
	try {
		let [m2 = n2, n2 = 3] = [, 5]
	} catch (e) {
		console.log(e)
	}

	let {
		abc,
		def
	} = {
		abc: 123,
		def: 456
	}
	console.log(abc, def)

	let {
		cos,
		sin,
		log
	} = Math
	console.log(cos, sin, log)

	// 如果变量名与属性名不一致
	let {
		bar1: bar2
	} = {
		bar1: 123
	}
	console.log(bar2)

	// 解构也可以用于嵌套结构的对象
	let obj2 = {
		p: ['hello', {
			y: 'world'
		}]
	}
	let {
		p,
		p: [p1, {
			y: p2
		}]
	} = obj2
	console.log(p1, p2, p)
	let node = {
		loc: {
			start: {
				line: 1,
				colum: 2
			}
		}
	}
	let {
		loc,
		loc: {
			start
		},
		loc: {
			start: {
				line
			}
		}
	} = node
	console.log(loc, start, line)

	const obj3 = {}
	const obj4 = {
		foo7: 123
	}
	Object.setPrototypeOf(obj3, obj4)
	const {
		foo7
	} = obj3
	console.log(foo)

	// 对象的解构也可以指定默认值。
	var {
		a4 = 100
	} = {}
	console.log(a4)
	const {
		a5,
		b5 = 1000
	} = {
		a5: 10
	}
	console.log(a5, b5)
	const {
		x5: y5 = 3
	} = {}
	console.log(y5)
	const {
		x6: y6 = 13
	} = {
		x6: 10
	}
	console.log(y6)
	// 默认值生效的条件是，对象的属性值严格等于undefined。
	var {
		x7 = 19
	} = {
		x7: undefined
	}
	console.log(x7)
	var {
		x8 = 199
	} = {
		x8: null
	}
	console.log(x8)

	// 如果要将一个已经声明的变量用于解构赋值,为 JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题
	let x10;
	({
		x10
	} = {
		x10: 133
	})
	console.log(x10)

	let arr1 = [1, 2, 3]
	let {
		0: first,
		1: two,
		2: third
	} = arr1
	console.log(first, two, third)

	let [s, t, g] = 'stg'
	console.log(s)
	let {
		length: len
	} = 'hello'
	console.log(len)

	let {
		toString: str
	} = 123
	console.log(str === Number.prototype.toString)

	// 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错
	try {
		let {
			prop: x
		} = undefined
	} catch (e) {
		//TODO handle the exception
		console.log(e)
	}

	// 函数参数的解构赋值
	function add([a, b]) {
		return a + b
	}
	console.log(add([1, 3]));
	console.log([
		[1, 2],
		[3, 4]
	].map(([a, b]) => a + b))

	// 函数参数的解构也可以使用默认值
	function move({
		x = 111,
		y = 222
	} = {
			x: 123,
			y: 456
		}) {
		return [x, y]
	}
	console.log(move({
		x: 3,
		y: 8
	}))
	console.log(move({
		x: 3
	}))
	console.log(move({}))
	console.log(move())

	console.log([1, undefined, 3].map((a = 'yes') => a))

	// 函数参数的默认值
	function ajax(url, {
		async = false,
		beforeSend = function () { },
		cache = true,
		complete = function () { },
		crossDomain = false,
		global = true
	} = {}) {
		console.log(cache, global)
	}
	ajax('', {
		cache: false
	})

	// 任何部署了 Iterator 接口的对象，都可以用for...of循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便
	const map = new Map()
	map.set('first', 'hello')
	map.set('two', 'world')
	for (let [key, value] of map) {
		console.log(key + ' is ' + value)
	}

	// 字符的 Unicode 表示法
	console.log('\u0061')
	console.log('\u20BB7')
	console.log('\u{20BB7}')
	console.log('\u{41}\u{42}\u{43}')
	let hello = 123
	console.log('hell\u{6F}');
	for (let codePoint of 'foo') {
		console.log(codePoint)
	}
	console.log(JSON.stringify('\u{D834}')) // ""\\uD834""
	let x9 = 1,
		y9 = 2;
	console.log(`${x9} + ${y9} = ${x9 + y9}`)
	console.log(`hello, ${'world'}`)

	console.log(String.fromCharCode(0x20BB7))
	console.log(String.fromCodePoint(0x20BB7))
	console.log(String.raw`Hi\n${2 + 3}!`)
	let _codePointAt = '𠮷a';
	console.log(_codePointAt.codePointAt(0)) // 134071

	var ss = 'hello,world!'
	console.log(ss.startsWith('hello'))
	console.log(ss.endsWith('!'))
	console.log(ss.includes('hello'))
	console.log('x'.repeat(3))
	console.log('x'.padStart(6, 'ab'))
	console.log('x'.padStart(5))
	console.log('09-12'.padStart(10, 'YYYY-MM-DD'))
	console.log('aabbccc'.replaceAll('b', '_'))

	// 在 ES5 中，RegExp构造函数的参数
	var regex = new RegExp('xyz', 'i');
	// 等价于
	var regex = /xyz/i;

	console.log(2 ** 2 ** 2)
	console.log(typeof (123n * 456n))
	console.log(BigInt(123))

	// ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。
	function wlog(x, y = 100) {
		console.log(x, y)
	}
	wlog(1, 2)
	wlog(1)

	// 参数默认值的位置
	//通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。
	// 例一
	function f3(x = 1, y) {
		console.log([x, y]);
	}
	f3() // [1, undefined]
	f3(2) // [2, undefined]
	f3(undefined, 1) // [1, 1]
	// 例二
	function f4(x, y = 5, z) {
		console.log([x, y, z]);
	}
	f4() // [undefined, 5, undefined]
	f4(1) // [1, 5, undefined]
	f4(1, undefined, 2) // [1, 5, 2]

	// 指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真
	console.log((function (a) { }).length)

	// 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域
	// 函数参数赋值，从左往右
	function f6(x, y = x) {
		console.log(y)
	}
	f6(3)

	// 函数的作用域，闭包，暂时性死区的原因
	let fee = 'hello';

	function baf(fun = () => fee) {
		let fee = 'world'
		console.log(fun())
	}
	baf()

	var xx = 2

	function foox(xx, yy = function () {
		xx = 3
	}) {
		xx = 4
		yy()
		console.log(xx)
	}
	foox()

	// ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
	function rest(...arr) {
		console.log(arguments, arr)
	}
	rest(1, 2, 3, 4)

	// Function构造函数返回的函数实例，name属性的值为anonymous。
	console.log((new Function()).name)

	function fpp() { }
	console.log(fpp.bind({}).name)
	console.log((function () { }).bind({}).name)


	// 使用注意点
	//箭头函数有几个使用注意点。
	// （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
	// （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
	// （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
	// （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
	// 上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。

	var fll = (a, b) => a + b
	console.log(fll(1, 2))

	console.log([1, 2, 3].map(item => item * item))
	console.log([11, 5, 19].sort((a, b) => b - a))

	id = 123

	function settime() {
		setTimeout(() => {
			return this.id
		}, 100);
	}
	settime()
	settime.call({
		id: 456
	})

	function fkk() {
		return () => {
			return () => {
				return () => {
					console.log(this.id)
				}
			}
		}
	}
	var fkkkk = fkk.call({
		id: 111
	})
	fkkkk.call({
		id: 1
	})()()

	const plus1 = a => a + 1;
	const mult2 = a => a * 2;
	console.log(mult2(plus1(5)))

	function currying(fn, n) {
		return function (m) {
			return fn.call(this, m, n);
		};
	}

	function tailFactorial(n, total) {
		if (n === 1) return total;
		return tailFactorial(n - 1, n * total);
	}
	const factorial = currying(tailFactorial, 1);
	console.log(factorial(5)) // 120
	console.log(factorial, toString())

	// 扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列
	console.log(...[1, 2, 3])

	var arr3 = [1, 2, 3],
		arr4 = [4, 5, 6]
	Array.prototype.push.apply(arr3, arr4)
	console.log(arr3)
	let arr5 = [1, 2, 3],
		arr6 = [4, 5, 6]
	arr5.push(...arr6)
	console.log(arr5)
	console.log(new Date(...[2015, 1, 1]))

	let arr9 = [1, 2, 3],
		arr7 = [4, 5, 6],
		arr8 = [];
	arr8 = arr8.concat(arr9, arr7)
	console.log(arr8)
	console.log([...'hello'])

	let mapp = new Map([
		[1, 'one'],
		[2, 'two'],
		[3, 'third'],
	])
	console.log(...mapp.keys())

	let arrlikes = {
		'0': 'a',
		'1': 'b',
		'2': 'c',
		'length': 3
	}
	console.log(Array.from(arrlikes))
	console.log(Array.from([1, 2, 3], (x) => x * x))
	console.log(Array.from([1, , 2, , 3], (x) => x || 0))
	console.log(Array.of(1, 2, 3))
	console.log([].slice.call(1, 2, 3))
	console.log([1, 2, 3, 4, 5].copyWithin(0, 3))
	console.log([1, 2, 3, 4, 6].find((value, index, arr) => value > 3))

	function f(v) {
		return v > this.age;
	}
	let person = {
		name: 'John',
		age: 20
	};
	console.log([10, 12, 26, 15].find(f, person)); // 26
	console.log([NaN].indexOf(NaN))
	console.log([NaN].findIndex(y => Object.is(NaN, y)))
	console.log([1, 2, 3].fill('7'))
	console.log(new Array(3).fill(0))

	// 注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象
	let arra = new Array(3).fill({
		name: 'hello'
	})
	arra[0].name = 'world'
	console.log(arra)
	for (let index of ['a', 'b', 'c'].keys()) {
		console.log(index)
	}
	for (let index of ['a', 'b', 'c'].values()) {
		console.log(index)
	}
	for (let [key, value] of ['a', 'b', 'c'].entries()) {
		console.log(key, value)
	}
	console.log([1, 2, 3].includes(2))
	console.log([NaN].includes(NaN))

	console.log([1, 2, [3, 4, [2, 6]]].flat(Infinity))
	console.log([1, 2, 5].flatMap((x) => [
		[x * 2]
	]))

	console.log(0 in [, , ,])
	console.log(0 in [undefined, undefined, undefined])

	const arrs = [
		'peach',
		'straw',
		'apple',
		'spork'
	];
	const stableSorting = (s1, s2) => {
		if (s1[0] < s2[0]) return -1;
		return 1;
	};

	console.log(arrs.sort(stableSorting))

	const feed = 'hell'
	const deed = {
		feed
	}
	console.log(deed)

	const o = {
		func() {
			console.log(111)
		}
	}
	console.log(o.func)

	let proty = 'foo'
	let objs = {
		[proty]: 'hello',
		['a' + 'bc']: 'wworld'
	}
	console.log(objs)

	let objh = {
		['h' + 'ello']() {
			return 'hi';
		}
	};
	console.log(objh.hello()) // hi

	let oob = {
		foo: 123
	}
	console.log(Object.getOwnPropertyDescriptor(oob, 'foo'))
	console.log(Object.getOwnPropertyNames(oob))

	const ow = Object.create({ x: 1, y: 2 });
	ow.z = 3;

	let { x, ...newObj } = ow;
	let { y, z } = newObj;
	console.log(x, y, z)
})()
