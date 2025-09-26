// 数组去重
function uniqueArray(arr) {
  return [...new Set(arr)];
}

function uniqueArray(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

function unqiueArray(arr) {
  return arr.reduce((acc, cur) => {
    if (!acc.includes(cur)) {
      acc.push(cur);
    }
    return acc;
  }, []);
}

// 将数字每千分位用逗号隔开
function numToLocaleString(num) {
  return num.toLocaleString();
}

function numToLocaleString(num) {
  num = num.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(num)) {
    num = num.replace(pattern, "$1,$2");
    return num;
  }
}

// 防抖（Debounce）
function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// 节流（Throttle）
function throttle(func, wait) {
  let inThrottle;
  return function () {
    const context = this;
    const args = arguments;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, wait);
    }
  };
}

// 手写promise
function MyPromise(executor) {
  this.status = "pending";
  this.value = undefined;
  this.reason = undefined;
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  const resolve = (value) => {
    if (this.status !== "pending") return;
    this.status = "fulfilled";
    this.value = value;
    this.onFulfilledCallbacks.forEach((callback) => callback());
  };

  const reject = (reason) => {
    if (this.status !== "pending") return;
    this.status = "rejected";
    this.reason = reason;
    this.onRejectedCallbacks((callback) => callback());
  };

  try {
    executor(resolve, reject);
  } catch (error) {
    reject(error);
  }
}
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  // 观察者模式的实现
  return new MyPromise((resolve, reject) => {
    const handleFulfilled = () => {
      try {
        const result = onFulfilled(this.value);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    const handleRejected = () => {
      try {
        const result = onRejected(this.reason);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    if (this.state === "fulfilled") {
      setTimeout(handleFulfilled, 0);
    } else if (this.state === "rejected") {
      setTimeout(handleRejected, 0);
    } else {
      // pending状态，注册观察者
      this.onFulfilledCallbacks.push(() => setTimeout(handleFulfilled, 0));
      this.onRejectedCallbacks.push(() => setTimeout(handleRejected, 0));
    }
  });
};
MyPromise.resolve = function (value) {
  return new MyPromise((resolve) => {
    resolve(value);
  });
};
MyPromise.reject = function (reason) {
  return new MyPromise((_, reject) => {
    reject(reason);
  });
};

MyPromise.all = function (promises) {
  return new MyPromise((resolve, reject) => {
    const results = [];
    let count = 0;
    if (promises.length === 0) {
      resolve(results);
      return;
    }
    promises.forEach((promise, index) => {
      MyPromise.resolve(promise).then((value) => {
        results[index] = value;
        count++;
        if (count === promises.length) {
          resolve(results);
        }
      }, reject);
    });
  });
};

MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    promises.forEach((promise) => {
      MyPromise.resolve(promise).then(resolve, reject);
    });
  });
};

MyPromise.allSettled = function (promises) {
  return new MyPromise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument must be an array"));
    }
    const results = new Array(promises.length);
    let settledCount = 0;
    const checkSettled = () => {
      settledCount++;
      if (settledCount === promises.length) {
        resolve(results);
      }
    };
    if (promises.length === 0) {
      return resolve(results);
    }
    promises.forEach((promise, index) => {
      MyPromise.resolve(promise).then(
        (value) => {
          results[index] = { status: "fulfilled", value };
          checkSettled();
        },
        (reason) => {
          results[index] = { status: "rejected", reason };
          checkSettled();
        }
      );
    });
  });
};

MyPromise.any = function (promises) {
  return new MyPromise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Argument must be an array"));
    }
    const errors = new Array(promises.length);
    let rejectedCount = 0;
    if (promises.length === 0) {
      return reject(new AggregateError([], "All promises were rejected"));
    }
    promises.forEach((promise, index) => {
      MyPromise.resolve(promise).then(resolve, (error) => {
        errors[index] = error;
        rejectedCount++;
        if (rejectedCount === promises.length) {
          reject(new AggregateError(errors, "All promises were rejected"));
        }
      });
    });
  });
};

// 浅拷贝（Shallow Copy）
function shallowCopy(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  return Object.assign({}, obj);
}

// 深拷贝（Deep Copy）
function deepCopy(obj, hash = new WeakMap()) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj);
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  if (hash.has(obj)) {
    return hash.get(obj);
  }

  let newObj = Array.isArray(obj) ? [] : {};
  hash.set(obj, newObj);

  for (let key in obj) {
    if (obj.hasOwnPropery(key)) {
      newObj[key] = deepCopy(obj[key], hash);
    }
  }

  return newObj;
}

// 手写 new 操作符
function myNew(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);
  return result instanceof Object ? result : obj;
}

// 函数柯里化
function curry(fn) {
  if (typeof fn !== "function") {
    throw new Error("fn必须是函数");
  }

  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

// 实现AJAX请求，使用Promise封装AJAX请求
function ajaxRequest(url, method = "GET", data = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true); // 设置请求头

    if (method === "POST") {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }

    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.responseText);
      } else {
        reject(new Error(this.statusText));
      }
    };

    xhr.onerror = function () {
      reject(new Error("Network Error"));
    };

    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  });
}

// 交换a,b的值，不能用临时变量
function exchangeNum(a, b) {
  a = a + b;
  b = a - b;
  a = a - b;
}

function exchangeNum(a, b) {
  [a, b] = [b, a];
}

// 数组元素求和
function sumArray(arr) {
  return arr.reduce((acc, cur) => acc + cur, 0);
}

// 实现数组的扁平化
function flattenArray(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flattenArray(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

function flattenArray(arr) {
  return arr.reduce(
    (acc, cur) =>
      Array.isArray(cur) ? [...acc, ...flattenArray(cur)] : [...acc, cur],
    []
  );
}

function flattenArray(arr) {
  return arr.flat(Infinity);
}

// 实现 add(1)(2)(3)
function add(start) {
  let sum = start || 0;
  function innerAdd(num) {
    sum += num;
    return innerAdd;
  }
  innerAdd.toString = function () {
    return sum;
  };

  return innerAdd;
}

// 实现类数组转化为数组
function toArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike);
}

function toArray(arrayLike) {
  return [...arrayLike];
}

function toArray(arrayLike) {
  return Array.from(arrayLike);
}

// 将js对象转化为树形结构
function buildTree(items, parentId = null) {
  let tree = [];
  for (let i in items) {
    if (items[i].parentId === parentId) {
      const children = buildTree(items, items[i].id);
      if (children.length) {
        items[i].children = children;
      }
      tree.push(items[i]);
    }
  }
  return tree;
}

// 红灯亮4秒 绿灯亮3秒 黄灯亮2秒
let redLight = document.getElementById("red");
let greenLight = document.getElementById("green");
let yellowLight = document.getElementById("yellow");

// 交通灯时序配置
const LIGHT_TIMING = {
  red: 4000, // 红灯亮4秒
  green: 3000, // 绿灯亮3秒
  yellow: 2000, // 黄灯亮2秒
};

let currentLight = "red";
function runTrafficLight() {
  // 先关闭所有灯
  redLight.style.opacity = 0;
  greenLight.style.opacity = 0;
  yellowLight.style.opacity = 0;

  switch (currentLight) {
    case "red":
      redLight.style.opacity = 1;
      setTimeout(() => {
        currentLight = "green";
        runTrafficLight();
      }, LIGHT_TIMING.red);
      break;

    case "green":
      greenLight.style.opacity = 1;
      setTimeout(() => {
        currentLight = "yellow";
        runTrafficLight();
      }, LIGHT_TIMING.green);
      break;

    case "yellow":
      yellowLight.style.opacity = 1;
      setTimeout(() => {
        currentLight = "red";
        runTrafficLight();
      }, LIGHT_TIMING.yellow);
      break;
  }
}

// 用Promise实现图片的异步加载
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = url;
  });
}

// 实现发布-订阅模式
class PunSub {
  constructor() {
    this.listeners = [];
  }

  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(
        (itemCallback) => itemCallback !== callback
      );
    }
  }

  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data));
    }
  }
}

// 封装异步的fetch，使用async await方式来使用
async function fetchData(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error("error", res.status);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

// 实现双向数据绑定
class Dep {
  constructor() {
    this.subs = [];
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  notify() {
    this.subs.forEach((sub) => sub.update());
  }
}

class Watcher {
  constructor(data, key, callback) {
    this.data = data;
    this.key = key;
    this.callback = callback;
    this.value = this.getValue();
  }

  getValue() {
    Dep.target = this;
    const value = this.data[this.key]; // 触发 getter，收集依赖
    Dep.target = null;
    return value;
  }

  update() {
    const newValue = this.data[this.key];
    if (newValue !== this.value) {
      this.value = newValue;
      this.callback(newValue);
    }
  }
}

class Vue {
  constructor(data) {
    this.data = data;
    Object.keys(data).forEach((key) => {
      this[key] = this._proxyData(key);
    });
    this._initWatch();
  }

  _initWatch() {
    this._watchers = [];
    const updateCallback = () => {
      console.log("更新");
    };
    Object.keys(this.data).forEach((key) => {
      this._watchers.push(new Watcher(this.data, key, updateCallback));
    });
  }

  _proxyData(key) {
    return new Proxy(this.data[key], {
      get(target, prop) {
        if (Dep.target) {
          const dep = target.__dep__ || (target.__dep__ = new Dep());
          dep.addSub(Dep.target);
        }
        return Reflect.get(target, prop);
      },
      set(target, prop, value) {
        const result = Reflect.set(target, prop, value);
        const dep = target.__dep__;
        if (dep) {
          dep.notify();
        }
        return result;
      },
    });
  }
}

// 实现简单路由
const routes = {
  "/": function () {
    document.getElementById("content").textContent = "Home Page";
  },
  "/about": function () {
    document.getElementById("content").textContent = "about Page";
  },
  "/concat": function () {
    document.getElementById("content").textContent = "concat Page";
  },
};

function initRoute() {
  const hash = window.location.hash.substr(1);
  if (routes[hash]) {
    routes[hash]();
  } else {
    routes["/"]();
  }
}

// map原理
Array.prototype.myMap = function (fn) {
  const result = [];
  let context = this;
  for (let i = 0; i < context.length; i++) {
    result.push(fn(context[i], i, context));
  }
  return result;
};

// filter原理
Array.prototype.myFilter = function (fn) {
  const result = [];
  let context = this;
  for (let i = 0; i < context.length; i++) {
    if (fn(context[i], i, context)) {
      result.push(context[i]);
    }
  }
  return result;
};

// reduce原理
Array.prototype.myReduce = function (fn, initValue) {
  let context = this;
  let result = initValue ? initValue : context[0];
  for (let i = 0; i < context.length; i++) {
    result = fn(result, context[i], context);
  }
  return result;
};

// every原理
Array.prototype.myEvery = function (fn) {
  let bool = true;
  let context = this;
  for (let i = 0; i < context.length; i++) {
    if (!fn(context[i], i, context)) {
      bool = false;
      break;
    }
  }
  return bool;
};

// some原理
Array.prototype.mySome = function (fn) {
  let context = this;
  let bool = false;
  for (let i = 0; i < context.length; i++) {
    if (fn(context[i], i, context)) {
      bool = true;
      break;
    }
  }
  return bool;
};

// find原理
Array.prototype.myFind = function (fn) {
  let context = this;
  let result;
  for (let i = 0; i < context.length; i++) {
    if (fn(context[i], i, context)) {
      result = context[i];
      break;
    }
  }
  return result;
};

// flat原理
Array.prototype.myFlat = function () {
  let context = this;
  if (!Array.isArray(context)) {
    return;
  }
  return context.reduce((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? context.myFlat.call(cur) : cur);
  }, []);
};

// instanceof原理
Object.prototype.myInstanceof = function (left, right) {
  if (typeof left === "undefined" && typeof right === "undefined") {
    return;
  }
  const rPrototype = right.prototype;
  while ((left = Object.getPrototypeOf(left))) {
    if (left === rPrototype) {
      return true;
    }
  }
  return false;
};

// Object.create原理
Object.prototype.myCreate = function (object) {
  function F() {}
  F.prototype = object;
  return new F();
};

// call原理
Function.prototype.myCall = function (context = window, ...args) {
  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;
  let res = context[fnSymbol](...args);
  delete context[fnSymbol];
  return res;
};

// apply原理
Function.prototype.myApply = function (context = window, args) {
  const fnSymbol = Symbol("fn");
  if (!Array.isArray(args)) {
    console.warn("apply的第二个参数必须为数组或者类数组");
  }
  context[fnSymbol] = this;
  let res = context[fnSymbol](...args);
  delete context[fnSymbol];
  return res;
};
_myCall.myApply({ a: 111 }, [222, 333]);

// bind原理
Function.prototype.myBind = function (context = window, ...args) {
  const fnSymbol = Symbol("fn");
  context[fnSymbol] = this;
  return function (..._args) {
    return context[fnSymbol].apply(context, args.concat(_args));
  };
};

// 数据类型判断
function isType(data, type) {
  return Object.prototype.toString.call(data) === `[object ${type}]`;
}

// 自记忆函数---当下次调用时，如果遇到相同的参数，就直接返回缓存中的数据
function memory(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (typeof cache[key] !== "undefined") {
      console.log("自记忆函数，返回缓存中的数据");
      return cache[key];
    } else {
      cache[key] = fn.apply(fn, args);
      return cache[key];
    }
  };
}

// 实现斐波那契数列
function fibonacciRecursive(n) {
  if (n <= 1) {
    return n;
  } else {
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
  }
}

function fibonacciRecursive(n) {
  let a = 0,
    b = 1,
    tmp;
  if (n === 0) return a;
  if (n === 1) return b;
  for (let i = 2; i <= n; i++) {
    tmp = a + b;
    a = b;
    b = tmp;
  }
  return b;
}

function fibonacciDynamicProgramming(n) {
  let dp = new Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// 字符串出现的不重复最长长度
// 滑动窗口（Sliding Window）技术。下面是一个使用滑动窗口算法实现
function slidingWindow(s) {
  let start = 0;
  let maxLength = 0;
  let seen = new Set();
  for (let end = 0; end < s.length; end++) {
    while (seen.has(s[end])) {
      seen.delete(s[start]);
      start++;
    }
    seen.add(s[end]);
    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}

// 使用 setTimeout 实现 setInterval
function mySetInterval(callback, delay) {
  callback();
  const intervalId = setTimeout(() => {
    clearTimeout(intervalId);
    mySetInterval(callback, delay);
    callback();
  }, delay);
}

// 快速排序
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  // 选择基准元素（这里选择中间元素）
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr[pivotIndex];

  const left = [];
  const right = [];

  // 分区操作
  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) continue;

    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  // 递归排序并合并
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 最长递增子序列-一个整数数组 nums，找到其中一组最长递增子序列的值
function lengthOfLIS(nums) {
  if (!nums || nums.length === 0) return 0;

  const dp = new Array(nums.length).fill(1);
  let maxLength = 1;

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxLength = Math.max(maxLength, dp[i]);
  }

  return maxLength;
}

function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log("从缓存中获取结果");
      return cache.get(key);
    }

    console.log("计算新结果");
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
