let a: number = 123
let b: boolean = false
console.log(a)

function alertName(a1: string, b1: number): void {
  console.log('123')
  console.log(a1 + b1)
}

let u: undefined = undefined
let bd: boolean = Boolean(1)

let someData
someData = 123
someData = '321'

let myFvar: number | string
myFvar = 123
myFvar = 'seven'

function getLength(something: string | number | number[]): number {
  something = [1, 2]
  console.log(something)
  return something.toString().length
}

interface Person {
  name: string
  age: number
  sex?: string
  readonly high: number
  [propName: string]: any
}
let people: Person = {
  name: '123',
  age: 321,
  high: 175,
}

let fibonacci: number[] = [1, 2, 3]
interface NumberArray {
  [index: number]: number
}
let fi2: NumberArray = [1, 3]

function sum(x: number, y: number): number {
  console.log(x + y)
  return x + y
}
interface SearchFun {
  (x: number, y: number): number
}
let mySearch: SearchFun = function () {
  console.log(123)
  return 100
}
function buildName(
  firstName: string,
  lastName?: string,
  secondName: string = '123'
): string {
  return firstName + lastName + secondName
}
console.log(buildName('2', '3'))

function reverse(x: number): number
function reverse(x: string): string
function reverse(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return x
  } else if (typeof x === 'string') {
    return x.split('').join('-')
  }
}

interface Cat {
  name: string
  run(): void
}
interface Flash {
  name: string
  swim(): void
}
function isFish(animal: Cat | Flash): boolean {
  if (typeof (animal as Flash).swim === 'function') {
    return true
  }
  return false
}

class ApiError extends Error {
  code: number = 1
}
class HttpError extends Error {
  statusCode: number = 200
}
function isApiError(error: Error): boolean {
  if (typeof (error as ApiError).code === 'number') {
    return true
  } else if (error instanceof HttpError) {
    return false
  }
  return false
}
;(window as any).foo = 1

interface Anima {
  name: string
}
interface AnimaChild extends Anima {
  run(): void
}
let animad: Anima | AnimaChild = {
  name: '123',
  run() {
    console.log(123)
  },
}
animad.run()

jQuery('123').aa()
let e: Error = new Error('123')
let bt: Boolean = new Boolean(1)
let rd: RegExp = /[a-z]/

type namet = string
type namef = () => string
type nametf = namet | namef
function getNameFn(n: nametf): namet {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}
let tom: [string, number] = ['123', 1]

const enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}
console.log(Days['Sun'] === 0)

class Aclass {
  constructor(name) {
    this.name = name
  }

  get name() {
    return 'Jack'
  }

  set name(value) {
    console.log('setter: ' + value)
  }

  sayHi() {
    return `My Name is ${this.name}`
  }

  static isAnimal(a) {
    return a instanceof Aclass
  }
}
class AclassChild extends Aclass {
  constructor(name) {
    super(name)
  }
  sayHi() {
    return 'Meow, ' + super.sayHi()
  }
}
let aclasser = new AclassChild('zw')
console.log(aclasser.sayHi())

interface Alarm {
  alert(): void
}
interface Light {
  lightOn(): void
  lightOff(): void
}
class Car implements Alarm, Light {
  name: string
  constructor(name) {
    this.name = name
  }
  alert() {
    console.log(123)
  }
  lightOn() {
    console.log(123)
  }
  lightOff() {
    console.log(123)
  }
}

interface Lengthwise {
  length: number
}
function createArray<T extends Lengthwise>(length: number, value: T): T {
  return value
}
createArray(3, 'lll')
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}
