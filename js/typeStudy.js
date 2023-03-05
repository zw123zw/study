var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var a = 123;
var b = false;
console.log(a);
function alertName(a1, b1) {
    console.log('123');
    console.log(a1 + b1);
}
var u = undefined;
var bd = Boolean(1);
var someData;
someData = 123;
someData = '321';
var myFvar;
myFvar = 123;
myFvar = 'seven';
function getLength(something) {
    something = [1, 2];
    console.log(something);
    return something.toString().length;
}
var people = {
    name: '123',
    age: 321,
    high: 175
};
var fibonacci = [1, 2, 3];
var fi2 = [1, 3];
function sum(x, y) {
    console.log(x + y);
    return x + y;
}
var mySearch = function () {
    console.log(123);
    return 100;
};
function buildName(firstName, lastName, secondName) {
    if (secondName === void 0) { secondName = '123'; }
    return firstName + lastName + secondName;
}
console.log(buildName('2', '3'));
function reverse(x) {
    if (typeof x === 'number') {
        return x;
    }
    else if (typeof x === 'string') {
        return x.split('').join('-');
    }
}
function isFish(animal) {
    if (typeof animal.swim === 'function') {
        return true;
    }
    return false;
}
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.code = 1;
        return _this;
    }
    return ApiError;
}(Error));
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    function HttpError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.statusCode = 200;
        return _this;
    }
    return HttpError;
}(Error));
function isApiError(error) {
    if (typeof error.code === 'number') {
        return true;
    }
    else if (error instanceof HttpError) {
        return false;
    }
    return false;
}
;
window.foo = 1;
var animad = {
    name: '123',
    run: function () {
        console.log(123);
    }
};
animad.run();
jQuery('123').aa();
var e = new Error('123');
var bt = new Boolean(1);
var rd = /[a-z]/;
function getNameFn(n) {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
var tom = ['123', 1];
console.log(0 /* Days['Sun'] */ === 0);
var Aclass = /** @class */ (function () {
    function Aclass(name) {
        this.name = name;
    }
    Object.defineProperty(Aclass.prototype, "name", {
        get: function () {
            return 'Jack';
        },
        set: function (value) {
            console.log('setter: ' + value);
        },
        enumerable: false,
        configurable: true
    });
    Aclass.prototype.sayHi = function () {
        return "My Name is ".concat(this.name);
    };
    Aclass.isAnimal = function (a) {
        return a instanceof Aclass;
    };
    return Aclass;
}());
var AclassChild = /** @class */ (function (_super) {
    __extends(AclassChild, _super);
    function AclassChild(name) {
        return _super.call(this, name) || this;
    }
    AclassChild.prototype.sayHi = function () {
        return 'Meow, ' + _super.prototype.sayHi.call(this);
    };
    return AclassChild;
}(Aclass));
var aclasser = new AclassChild('zw');
console.log(aclasser.sayHi());
var Car = /** @class */ (function () {
    function Car(name) {
        this.name = name;
    }
    Car.prototype.alert = function () {
        console.log(123);
    };
    Car.prototype.lightOn = function () {
        console.log(123);
    };
    Car.prototype.lightOff = function () {
        console.log(123);
    };
    return Car;
}());
function createArray(length, value) {
    return value;
}
createArray(3, 'lll');
