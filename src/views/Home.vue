<template>
  <div class="home">TypeScript开始</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  Point1,
  Point2,
  Idis,
  Point,
  Point2D,
  Something,
  FooBase,
  Foo,
  Child,
  Frame,
  FrameComponent,
  StrOrNum,
  CardSuit,
  Tristate,
  padding,
  LongHand,
  ShortHand,
  readFoo,
  Person,
  Queue,
  tsReserse,
  loadUserResponse,
  getJson,
  isTake,
  twoFunNum,
  FromIndex,
  NestedCSS,
  Pointt,
} from "./home";
import { Big } from "big.js";

@Component
export default class Home extends Vue {
  point1: Point1 = { x: 123, y: 123 };
  point2: Point2 = { x: 1, y: 2, z: 3 };

  list: Array<Idis> = [
    {
      id: "123",
      display: "456",
    },
  ];

  name(data: Point2): void {
    console.log(data);
  }

  mapData(): void {
    console.log(this.list.map((i) => i.id));
    this.list.map((item, index) => {
      console.log(item, index);
    });
  }

  annotation(): { a: number; b?: number } {
    return {
      a: 1,
      b: 2,
    };
  }

  match(): void {
    let foo = new Big("1.111111111");
    console.log(foo);
  }

  point() {
    const num = new Point(1, 2);
    console.log(num, num.add(num.x, num.y));
    const num1 = new Point2D(1, 2, 3);
    console.log(num1, num1.add(num1.x, num1.y, num1.z));
    num.log("zhang");
  }

  toSomething() {
    const s1 = new Something();
    const s2 = new Something();
    console.log(Something.a);
  }

  toFooBase() {
    const foo = new FooBase(1, 2, 3);
    console.log(foo.x);
  }

  toFoo() {
    const foo = new Foo(1);
    console.log(foo.x);
  }

  toChild() {
    const child = new Child(123);
    console.log(child.callAdd(123));
  }

  toRest() {
    function foo(x: number, y: number, z: number) {
      console.log(x + y + z);
    }
    const args: [number, number, number] = [1, 2, 3];
    foo.apply(null, args);
    foo(...args);
  }

  toFrame() {
    let frame = new Frame("Door", [
      new FrameComponent("top"),
      new FrameComponent("bottom"),
      new FrameComponent("left"),
      new FrameComponent("right"),
    ]);
    const frame1 = frame.next();
    const frame2 = frame.next();
    const frame3 = frame.next();
    const frame4 = frame.next();
    console.log(frame1);
    console.log(frame2);
    console.log(frame3);
    console.log(frame4);
  }

  toPromise() {
    const _pro = new Promise((reslove, reject) => {
      reslove(1);
      reject(2);
    });
    _pro
      .then((res) => {
        console.log(res);
        return 456;
      })
      .then((res) => {
        console.log(res);
        return Promise.reject(222);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toIsecond() {
    const iSecond = (): Promise<string> => {
      return new Promise((reslove) => {
        setTimeout(() => {
          reslove("hello");
        }, 500);
      });
    };

    Promise.resolve(123)
      .then((res) => {
        return iSecond();
      })
      .then((res) => {
        console.log(res);
      });
  }

  loadItem(id: number): Promise<{ id: number }> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ id: id });
      }, 1000);
    });
  }

  toLoadOne() {
    this.loadItem(1)
      .then((res) => {
        console.log(res);
        return this.loadItem(2);
      })
      .then((res) => {
        console.log(res);
      });
  }

  toLoadTwo() {
    Promise.all([this.loadItem(1), this.loadItem(2)]).then((res) => {
      console.log(res);
    });
  }

  toInfi() {
    function* infi() {
      var i = 5;
      while (i > 0) {
        console.log(i);
        yield i--;
      }
    }

    const iteror = infi();
    let i = 2;
    while (i > 0) {
      iteror.next();
      i--;
    }
  }

  async toAsycFoo() {
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("async111");
          resolve(123);
        }, 1000);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async toDrama(): Promise<void> {
    function delay(mill: number, count: number): Promise<number> {
      return new Promise((resole, reject) => {
        setTimeout(() => {
          resole(count);
        }, mill);
      });
    }
    for (let i = 0; i < 5; i++) {
      console.log(await delay(500, i));
    }
  }

  toReverse() {
    function reverseFun<T>(items: T[]): T[] {
      const toreturn: T[] = [];
      items.reverse().map((item) => {
        toreturn.push(item);
      });
      return toreturn;
    }
    console.log(reverseFun([1, 2, 3]));
    console.log(reverseFun(["1", "2", "3"]));
  }

  toExtend() {
    function extend1<T, U>(first: T, second: U): T & U {
      const result = {} as T & U;
      for (let id in first) {
        (result as T)[id] = first[id];
      }
      for (let id in second) {
        (result as U)[id] = second[id];
      }
      return result;
    }
    const x = extend1({ a: "hello" }, { b: 1 });
    console.log(x.a, x.b);
  }

  toTuple() {
    let tom: [string, number] = ["Tom", 25];
    tom.push(12312);
    tom.push("male");
    console.log(tom);
  }

  toType() {
    let sample: StrOrNum;
    sample = 666;
    console.log(sample);
  }

  toCardSuit() {
    let Card = CardSuit.Hearts;
    console.log("enum--->", Card);
    Card = 10;
    console.log("enum--->", Card);
  }

  toTristate() {
    console.log(Tristate.True);
    console.log(Tristate["True"]);
  }

  toFooFunc(bar: number, bas = "hello"): void {
    console.log(bar + "---" + bas);
  }

  toPadding() {
    console.log(padding(1));
    console.log(padding(1, 2));
    console.log(padding(1, 2, 3, 4));
  }

  toTypeFun() {
    const fun1: LongHand = (a: number) => {
      return a;
    };
    const fun2: ShortHand = (a: number) => {
      return a;
    };
    console.log(fun1);
    console.log(fun2);
  }

  toStrEnum<T extends string>(o: Array<T>): { [K in T]: K } {
    return o.reduce((res, key) => {
      res[key] = key;
      return res;
    }, Object.create(null));
  }

  toFooRead() {
    const readObj = (config: {
      readonly bar: number;
      readonly bas: number;
    }) => {
      return config;
    };
    let config = { bar: 111, bas: 222 };
    config = readObj(config);
    config.bar = 333;
    console.log(config);

    const foo1 = { bar: 111, bas: 222 };
    const foo2: readFoo = { bar: 111, bas: 222 };
    console.log(foo2.bar);
  }

  toPerson() {
    const person = new Person();
    console.log(person.fullName);
  }

  toQueue() {
    const queue = new Queue<number>();
    queue.push(123);
    console.log(queue.pop());
  }

  toReserse() {
    const sample = [1, 2, 3];
    let reversed = tsReserse(sample);
    console.log(reversed);
    reversed[0] = 6;
    console.log(reversed);
  }

  toGetJson() {
    getJson<loadUserResponse>({
      url: "111",
      headers: { token: "123" },
    }).then((res) => {
      console.log(res);
    });
  }

  toIsTake() {
    isTake(({ a, b }) => {
      console.log(a + b);
      return a + b;
    });
  }

  toTwoFunNum() {
    console.log(twoFunNum(10, 10));
  }

  toObj() {
    let obj = {
      toString() {
        return "hello";
      },
    };
    let foo: any = {};
    foo[obj.toString()] = "word";
    console.log(foo);
    const foo1: { [propName: number]: string } = {};
    foo1["h"] = "w";
    foo1["w"] = "w";
    console.log(foo1["w"]);
  }

  toFromIndex() {
    const bad: FromIndex = { a: "1", b: "2" };
    console.log(bad);
  }

  toNestedCSS() {
    const example: NestedCSS = {
      color: "red",
      nest: {
        ".subclass": {
          color: "blue",
        },
      },
    };
    console.log(example);
  }

  toPointt(a) {
    const p: Pointt = {
      x: 10,
      y: 100,
      moveBy(dx, dy) {
        this.x += dx;
        this.y += dy;
      },
    };
    p.moveBy(10, 10);
    console.log(p.x, p.y);
    console.log(a);
  }

  async mounted() {
    this.name(this.point2);
    this.mapData();
    this.annotation();
    this.match();
    this.point();
    this.toSomething();
    this.toFooBase();
    this.toFoo();
    this.toChild();
    this.toRest();
    this.toFrame();
    this.toPromise();
    this.toIsecond();
    this.toLoadOne();
    this.toLoadTwo();
    this.toInfi();
    await this.toAsycFoo();
    await console.log("async222");
    await this.toDrama();
    this.toReverse();
    this.toExtend();
    this.toTuple();
    this.toType();
    this.toCardSuit();
    this.toTristate();
    this.toFooFunc(123);
    this.toFooFunc(123, "zw");
    this.toPadding();
    this.toTypeFun();
    console.log(this.toStrEnum(["st", "at", "gt"]));
    this.toFooRead();
    this.toPerson();
    this.toQueue();
    this.toReserse();
    this.toGetJson();
    this.toIsTake();
    this.toTwoFunNum();
    this.toObj();
    this.toFromIndex();
    this.toNestedCSS();
    this.toPointt(1);
  }
}
</script>
