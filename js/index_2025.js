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
  const promise2 = new MyPromise((resolve, reject) => {
    if (this.status === "fulfilled") {
      setTimeout(() => {
        try {
          const result = onFulfilled(this.value);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, 0);
    } else if (this.status === "rejected") {
      setTimeout(() => {
        try {
          const result = onRejected(this.reason);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, 0);
    } else {
      this.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          try {
            const result = onFulfilled(this.value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
      this.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            const result = onRejected(this.reason);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    }
  });

  return promise2;
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
