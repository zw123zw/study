export interface Point1 {
    x: number;
    y: number;
}

export interface Point2 {
    x: number;
    y: number;
    z: number;
}

export interface equalData {
    [proName: string]: number | string;
}

export type Idis = {
    id: string;
    display: string;
}

export interface MsgLog {
    log: (msg: string | number) => void
}

export class Point implements MsgLog {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
    add(a: number, b: number) {
        return a + b
    }
    log(msg: string | number) {
        console.log(msg);
    }
}

export class Point2D extends Point {
    z: number
    constructor(x: number, y: number, z: number) {
        super(x, y)
        this.z = z
    }
    add(a: number, b: number, c?: number) {
        const num = super.add(a, b)
        return num + Number(c)
    }
}

export class Something {
    static a = 0
    constructor() {
        Something.a++
    }
}

export class FooBase {
    public x: number;
    protected y: number;
    private z: number;
    constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }
}

export class Foo {
    constructor(public x: number) { }
}

class Adder {
    constructor(public a: number) { }
    add(b: number) {
        return this.a + b
    }
}

export class Child extends Adder {
    callAdd(b: number): number {
        return this.add(b)
    }
}

interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

interface IteratorResult<T> {
    done: boolean;
    value: T
}

export class FrameComponent {
    constructor(public name: string) { }
}

export class Frame implements Iterator<FrameComponent>{
    private pointer = 0

    constructor(public name: string, public components: FrameComponent[]) { }

    public next(): IteratorResult<FrameComponent> {
        if (this.pointer < this.components.length) {
            return {
                done: false,
                value: this.components[this.pointer++]
            }
        } else {
            return {
                done: true,
                value: this.components[0]
            }
        }
    }
}

export type StrOrNum = string | number

export enum CardSuit {
    Clubs,
    Diamonds,
    Hearts,
    Speades
}

export enum Tristate {
    False = 'false',
    True = 'True',
    Unknow = 'Unknow'
}

export function padding(all: number): Record<string, number>;
export function padding(toBottom: number, ltoBottom: number): Record<string, number>;
export function padding(a: number, b?: number, c?: number, d?: number): Record<string, number>;
export function padding(a: number, b?: number, c?: number, d?: number): Record<string, number> {
    if (b === undefined && c === undefined && d === undefined) {
        b = c = d = a
    } else if (c === undefined && d === undefined) {
        c = a
        d = b
    }
    return {
        top: a,
        right: b as number,
        bottom: c as number,
        left: d as number
    }
}


export type LongHand = {
    (a: number): number
}

export type ShortHand = (a: number) => number

type FooR = {
    bar: number;
    bas: number;
}

export type readFoo = Readonly<FooR>

export class Person {
    firstName = '111'
    lastNameL = '222'

    get fullName() {
        return this.firstName + this.lastNameL
    }
}

export class Queue<T> {
    private data: T[] = []
    push = (item: T) => this.data.push(item)
    pop = (): T | undefined => this.data.shift()
}

export function tsReserse<T>(item: T[]): T[] {
    const toReturn: T[] = []
    for (let i = item.length - 1; i >= 0; i--) {
        toReturn.push(item[i])
    }
    return toReturn
}

export interface loadUserResponse {
    user: {
        name: string;
        email: string;
    }
}

export const getJson = <T>(config: { url: string; headers?: { [key: string]: string } }): Promise<T> => {
    return new Promise((reslove, reject) => {
        const res = {
            name: 'yuzi'
        }
        reslove(res as unknown as T)
    })
}

type Adderle = (number: { a: number; b: number }) => number
export function isTake(adderle: Adderle) {
    return adderle({ a: 100, b: 200 })
}

type TwoFun = (a: number, b: number) => number
export const twoFunNum: TwoFun = (a: number, b: number) => {
    return a * b
}

type IndexString = 'a' | 'b' | 'c'
export type FromIndex = { [x in IndexString]?: string }

export interface NestedCSS {
    color: string;
    nest?: {
        [select: string]: NestedCSS
    }
}

export type Pointt = {
    x: number;
    y: number;
    moveBy(dx: number, dy: number): void
}

export interface Listener<T> {
    (event: T): any
}

export interface Disposable {
    dispose(): any
}

export class TypedEvent<T>{
    private listeners: Listener<T>[] = []
    private listenerOncer: Listener<T>[] = []
    public on = (listeners: Listener<T>): Disposable => {
        this.listeners.push(listeners)
        return {
            dispose: () => {
                this.off(listeners)
            }
        }
    }
    public off = (listeners: Listener<T>) => {
        const callbackIndex = this.listeners.indexOf(listeners)
        if (callbackIndex > -1) {
            this.listeners.splice(callbackIndex, 1)
        }
    }
    public once = (listeners: Listener<T>): void => {
        this.listeners.push(listeners)
    }
    public emit = (event: T) => {
        this.listeners.forEach(item => item(event))
        this.listenerOncer.forEach(item => item(event))
        this.listenerOncer = []
    }
    public pipe = (te: TypedEvent<T>): Disposable => {
        return this.on(e => te.emit(e))
    }
}