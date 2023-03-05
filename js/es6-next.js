(function () {
    let a = 123;
    console.log(a);
    console.log(`wqewqewq2131${1 + 1 + a}`);
    console.log(`\`1231231\`22`);

    function isNew() {
        if (this instanceof isNew) {
            console.log('通过new调用');
        } else {
            console.log('不是通过new调用');
        }
    }
    new isNew();
    console.log(isNew.prototype);
    console.log(isNew.prototype.constructor[Symbol.hasInstance]);
    console.log(isNew.prototype[Symbol.toStringTag]);

    const af = () => 1 + 1;
    console.log(af());

    console.log(+0 === -0);
    console.log(NaN === NaN);
    console.log(Object.is(+0, -0));
    console.log(Object.is(NaN, NaN));

    function mixin(re, su) {
        Object.keys(su).forEach(function (key) {
            re[key] == su[key];
        });

        return re;
    }

    var res = {},
        sup = {
            get name() {
                console.log(111);
                return 'file.js';
            },
            set name(val) {
                console.log(222);
                this.value = val;
            },
        };
    Object.assign(res, sup);

    console.log(Object.getOwnPropertyDescriptor(res, 'name'));
    console.log(Object.getPrototypeOf(res));
    sup.name;
    sup.name = 'hello';

    var obj = {
        a: 1,
        0: 1,
        c: 1,
        1: 1,
        b: 1,
        2: 1,
    };
    console.log(Object.getOwnPropertyNames(obj).join(''));

    let { name, type, title } = {
        name: ';123',
        type: 333,
    };
    console.log(name, title);

    let {
        loc: { start },
    } = {
        loc: {
            start: {
                name: ';123',
                type: 333,
            },
        },
    };
    console.log(start);

    let { type: type1, foo: foo1 = 'fooo' } = { type: 123 };
    console.log(type1, foo1);

    let [, , tColor] = ['red', 'green', 'blue'];
    console.log(tColor);

    let [f, [s]] = ['red', ['green', 'blue']];
    console.log(f, s);

    let [f1, s1] = ['red', ['green', 'blue']];
    console.log(f1, s1);

    let colors = [1, 2, 3].concat();
    let [...colors1] = [1, 2, 3].reverse();
    console.log(colors, colors1);

    let firstName = Symbol();
    let person = {};
    person[firstName] = 123;
    console.log(person[firstName]);
    console.log(typeof firstName);

    let lastName = Symbol('define创建');
    Object.defineProperties(person, {
        [lastName]: {
            value: '123123',
            writable: false,
        },
    });
    console.log(person);

    let uid = Symbol.for('uid');
    person[uid] = '123';
    let uid1 = Symbol.for('uid');
    console.log(person[uid]);
    console.log(uid1 === uid);
    console.log(Symbol.keyFor(uid1));

    console.log(Object.getOwnPropertySymbols(person));

    console.log(Symbol.prototype);

    let se = new Set([1, 1, 2, '2']);
    se.add('1');
    se.add(2);
    console.log(se);
    console.log(se.size);
    se.add(2);
    console.log(se.size);

    let see = new WeakSet();
    let seeKey = { 2: 2 };
    see.add(seeKey);
    console.log(see.has(seeKey));
    seeKey = null;
    console.log(see.has(seeKey));

    let mp = new Map([
        ['b', 123],
        ['c', 332],
    ]);
    mp.set('a', 123);
    console.log(mp, mp.get('a'));
    mp.forEach((value, key) => {
        console.log(value, key);
    });

    var Person = (function () {
        var pda = new WeakMap(),
            pid = 0;

        function person(name) {
            pda.set(this, { name });

            person.prototype.getName = function () {
                return pda.get(this);
            };
        }

        return person;
    })();
    let _person = new Person('1321name');
    console.log(_person._id);
    console.log(_person.getName());

    function* creIear(items) {
        for (let i = 0, len = items.length; i < len; i++) {
            yield items[i] + 1;
        }
    }
    let creIearer = creIear([1, 2, 3]);
    console.log(creIearer.next());
    console.log(creIearer.next());
    console.log(creIearer.next());
    console.log(creIearer.next());
    console.log([2, 3, 4][Symbol.iterator]);
    let aTest = 111;
    aTest = 222;
    aTest = 333;

    for (let v of [1, 2, 3]) {
        console.log(v);

        let maop = new Map([
            ['a', 1],
            ['b', 2],
            ['c', 33],
        ]);
        for (let [key, val] of maop) {
            console.log(key, val);
        }
    }

    let clooect = {
        items: [],
        *[Symbol.iterator]() {
            for (let item of this.items) {
                yield item;
            }
        },
    };
    clooect.items.push(1);
    clooect.items.push(2);
    clooect.items.push(3);
    for (let x of clooect.items) {
        console.log(x);
    }

    for (let v of mp) {
        console.log(v);
    }

    let pro = Promise.resolve('123');
    let proc = Promise.reject('123');
    pro.then((res) => {
        console.log(res);
    });
    proc.catch((err) => {
        console.log(err);
    });

    let eachArr = [1, 2, 3];
    eachArr.forEach((item, index) => {
        eachArr[index] = item + 1;
    });
    console.log(eachArr);

    window.onrejectionhandled = function (event) {
        console.log(event, 'reject错误抛出未被捕获');
    };

    let rejected = Promise.reject(new Error('sdsadsa')).catch((err) => {
        console.log(err);
    });

    let p1 = new Promise((resolve, rejiect) => {
        resolve(123);
    });

    p1.then((res) => {
        console.log(res);
        return 456;
    }).then((res) => {
        console.log(res);
    });

    let target = {};
    let proxy = new Proxy(target, {
        set: function (trapTarget, key, value, receiver) {
            if (!trapTarget.hasOwnProperty(key)) {
                if (isNaN(value)) {
                    console.warn('属性值必须是数字');
                }
            }

            return Reflect.set(trapTarget, key, value, receiver);
        },
        has: function (trapTarget, key) {
            if (key === 'value') {
                return false;
            } else {
                return Reflect.has(trapTarget, key);
            }
        },
    });

    proxy.id = 123;
    proxy.idd = 'DSADSA';

    console.log('value' in proxy);

    console.log(Object.getPrototypeOf(1));
    try {
        console.log(Reflect.getPrototypeOf(1));
    } catch (error) {
        console.warn(error);
    }
})();
