// 沒有 class 的es5时
function Point(x, y) {
  this.x = x
  this.y = y
}

Point.prototype.getPosition = function () {
  return "{" + this.x + "," + this.y + "}"
}

var p1 = new Point(1, 3)
console.log(p1 instanceof Point)
console.log(p1)
console.log(p1.getPosition())

var p2 = new Point(2, 4)
console.log(p2.getPosition())

// es6中方式
class Points {
  constructor(x, y) {
    this.x = x
    this.y = y
    // 如果构造函数的返回值为对象，比如数组，对象，那么new Points 时
    // 等于是执行一个普通的函数，而不再是初始化对象
    // return { a: 1 }
  }

  getPosition() {
    return `{${this.x},${this.y}}`
  }
}

var cp1 = new Points(1, 3)
// console.log(cp1.getPosition())
// console.log(cp1 instanceof Points)
console.log(cp1.hasOwnProperty("x")) // true
console.log(cp1.hasOwnProperty("getPosition")) // false getPosition 不属于cp1的自有属性
console.log(cp1.__proto__.hasOwnProperty("getPosition")) // true 这说明 这个方法属于通过原型继承过来的

// set get 关键字
// es5
var info = {
  _age: 18,
  set age(newValue) {
    if (newValue > 18) {
      console.log("老了")
    } else {
      console.log("年轻")
    }
  },
  get age() {
    console.log("你问我年龄干嘛")
    return this._age
  },
}

console.log(info.age) // 18
info.age = 15

class Es6info {
  constructor(age) {
    this._age = age
  }
  set age(newVal) {
    console.log("newVal====>", newVal)
    this._age = newVal
  }
  get age() {
    return this._age
  }
}
const infos = new Es6info(23)
console.log(infos.age) // 23

// function 两种形式定义
const f1 = function () {}
function f2() {}

// class 两种形式定义
class c1 {
  constructor() {}
}

// 类名为 c2
const c2 = class {
  constructor() {}
}

// 静态方法
// es6 class 里面通过static 关键字表示静态方法
class staFunc {
  // z = 0 // 也可以直接写在外面 ，也可以写在constructor 函数里面
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  getPosition() {
    return `x=${this.x},y=${this.y}`
  }

  static getClassName() {
    return staFunc.name
  }
}
console.log(staFunc.getClassName()) // staFunc
const cClass = new staFunc(2, 3)
// cClass.getClassName() false 应为静态方法不能被继承

class staFunc1 {
  constructor() {
    this.x = 0
  }
}
staFunc1.y = 23 // 通过这种方式可以设置静态属性
const s1 = new staFunc1()
// console.log(s1.y) undefined

// 将私有方法移出模块
// 如果模块没有导出_func2 模块外面是拿不到_func2
const _func2 = () => {}
class staFunc2 {
  func1() {
    _func2.call(this)
  }
}

const s2 = new staFunc2()
// s2._func2() 会报错，

// 利用Symbol类型的唯一性
// 如果模块没有导出 _func3 模块外面是拿不到 _func3
const _func3 = Symbol("func1")
export default class staFunc3 {
  static [_func3]() {}
}

function abs() {
  // new.target 可以判断此函数是否为new ，还是作为方法直接调用
  // 如果是new调用
  console.log(new.target)
}
const abs1 = new abs()

class staFunc4 {
  constructor() {
    // 同理 es6也一样
    console.log(new.target)
  }
}
const staFunc5 = new staFunc4()

class Parent {
  constructor() {
    // 如果此类被继承的话，子类实例化时，这里会打印出子类
    if (new.target === Parent) {
      throw new Error("不能实例化")
    }
    console.log("Parent===>", new.target)
  }
}

// 父类实例时
const Parents = new Parent()

class child extends Parent {
  constructor() {
    super()
    console.log("child======", new.target)
  }
}

// const children = new child()
