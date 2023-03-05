(function () {
    var b = 123
    function foo(a) {
        var b = a * 12

        function bar(c) {
            console.log(b);
        }

        bar(b * 3)
    }

    foo(2)
    console.log(b);

    console.log(cc);
    var cc = 11

    dd = 123
    console.log(dd);
    var dd;

    var ee;
    console.log(ee);
    ee = 3

    foc()

    var foc;

    function foc() {
        console.log(1);
    }

    foc = function () {
        console.log(2);
    }

    function fqq() {
        var a = 123

        function foo() {
            console.log(a);
        }

        foo()
    }

    fqq()

    function fcc() {
        var c = 222

        function fgg() {
            console.log(c);
        }

        fgg()
    }

    fcc()

    function see() {
        setTimeout(() => {
            console.log('see');
        }, 0);
    }
    see()

    for (var i = 0; i < 5; i++) {
        (function (i) {
            setTimeout(function () {
                console.log(i);
            }, i * 100);
        })(i)
    }

    for (let i = 0; i < 5; i++) {
        setTimeout(function () {
            console.log(i);
        }, i * 100 + 500);
    }

    function cool(id) {
        function change() {
            publicApi.iden2 = iden2
        }

        function iden1() {
            return id
        }

        function iden2() {
            return ++id
        }

        var publicApi = {
            change,
            iden1
        }

        return publicApi
    }

    var _cool = cool(333)
    console.log('iden', _cool.iden2);
    _cool.change()
    console.log('iden', _cool.iden2());

    var myModules = (function () {
        var modules = {}

        function define(name, deps, impl) {
            for (let i = 0; i < deps.length; i++) {
                deps[i] = modules[deps[i]]
            }
            modules[name] = impl.apply(impl, deps)
        }

        function get(name) {
            return modules[name]
        }

        return {
            get,
            define
        }
    })()

    myModules.define('foo', [], function () {
        function hello() {
            return 'let me'
        }

        return {
            hello
        }
    })

    function too() {
        console.log(this.at);
    }
    at = 123
    too()

    function obo() {
        console.log(this.a);
    }
    var objo = {
        a: 1,
        foo: obo
    }
    objo.foo()

    function dfoo() {
        console.log(this.a);
    }

    var obj2 = {
        a: 42,
        foo: dfoo
    }

    var obj1 = {
        id: 'awsome',
        a: 2,
        obj2: obj2
    }

    obj1.obj2.foo() // 42

    function foe(el) {
        console.log(el, this.id);
    }

    [1, 2, 3].forEach(foe, obj1);

    function fee() {
        return (a) => {
            console.log(this.a);
        }
    }

    var bee1 = {
        a: 88
    }
    var bee2 = {
        a: 99
    }
    var bee = fee.call(bee1)
    bee.call(bee2)

    var aa = '123'
    var aas = new String('123')
    console.log(aa instanceof String);
    console.log(aas instanceof String);

    var myObj = {
        [Symbol('myName')]: 'hello'
    }
    console.log(myObj);

    var obj3 = Object.assign({}, obj1, { name: 'zw' })
    console.log(obj3);

    console.log(Object.getOwnPropertyDescriptor(obj3, 'name'));

    Object.defineProperty(obj3, 'a', {
        value: 'zwzw',
        writable: false,
        configurable: false,
        enumerable: true
    })
    console.log(obj3.a);
    obj3.a = 'zw123'
    console.log(obj3.a);

    var objj = {
        get a() {
            console.log('getter', 2);
            return this._a_
        },
        set a(value) {
            this._a_ = value * 3
        }
    }
    console.log(Object.getOwnPropertyDescriptor(objj, 'a'));
    objj.a
    objj.a = 3
    console.log(objj._a_);

    class Goo {
        age = 12

        constructor(name) {
            this.name = name
        }

        getName() {
            return this.name
        }
    }

    class Voo extends Goo {
        area = 'china'

        constructor(name) {
            super(name)
        }

        getName() {
            return `${this.name}---${this.age}岁`
        }
    }

    var _goo = new Goo('zw234')
    console.log(_goo.name);
    var _voo = new Voo('test')
    console.log(_voo.getName());

    const Baa = function () {
        console.log(333);
    }
    function Bab() { }
    function Bac() { }
    Bab.prototype = Object.create(Baa.prototype)
    Bac.prototype = Object.create(Bab.prototype)
    let bac = new Bac()
    console.log(Baa.prototype.isPrototypeOf(bac));
    console.log(Bab.prototype.isPrototypeOf(bac));
    console.log(Bac.prototype.isPrototypeOf(bac));
    console.log(Baa.prototype);

    console.log(typeof Math.abs);
    console.log(Number.isInteger(23));
    console.log(Object.is(12, 23));

    let _s = new String('123')
    console.log(Object.getPrototypeOf(_s), typeof _s);
    console.log(JSON.stringify({ a: 123, b: 321 }, null, 3));

    let an = 678
    let bn = an.toString()
    console.log(bn);
    console.log(parseFloat('23.11'));

    let _pro = new Promise((resolve) => {
        setTimeout(() => {
            resolve('Promise返回')
        }, 2000);
    })

    _pro.then(res => {
        console.log(res);
    })
    Promise.resolve('promise123').then(res => {
        console.log(res);
    })

    for (const iterator of [1, 2, 3]) {
        console.log(iterator);
    }

    function asyPro() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('123123')
            }, 2000);
        })
    }

    async function asy() {
        const value = await asyPro()
        console.log('333', value);
    }
    asy()
})();
