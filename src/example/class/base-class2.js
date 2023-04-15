// 基础

// es5中,使用原型链继承
function Food() {
  this.type = "food"
}

Food.prototype.getType = function () {
  return this.type
}

function Vegetables(name) {
  this.name = name
}

Vegetables.prototype = new Food()

const tomato = new Vegetables("tomato")

// console.log(tomato.getType()) // food

// es6
// 类的基础
class Parent {
  constructor(name) {
    this.name = name
  }
  getName() {
    return this.name
  }

  static getStaticName() {
    return this.name
  }
}

class child extends Parent {
  constructor(name, age) {
    super(name)
    this.age = age
  }
}

const children = new child("liming", 23)
// console.log(children.getName()) // liming
// console.log(child.getStaticName()) // child this.name 指向了子类，name就是构造函数的名字
// console.log(children.getStaticName()) // 报错
// console.log(children instanceof child) // true
// console.log(children instanceof Parent) // true

// 能够获取构造函数的原型对象
// console.log(Object.getPrototypeOf(child) === Parent) // true

// super 关键字
// 当super 作为函数时，代表父类的构造函数 constructor ，只能放在子类的构造函数里面
// 当super 作为对象时，
//  作为普通方法中指向的是父类的原型对象
//  在静态方法中指向的是父类

class Parent1 {
  constructor() {
    this.type = "parent1"
  }
  getName() {
    return this.type
  }
}

Parent1.getType = () => {
  return "is parent"
}

class child1 extends Parent1 {
  constructor() {
    super()
    // super 指向父类的原型对象
    console.log("constructor: " + super.getName())
  }

  getParentName() {
    // super 指向父类的原型对象
    console.log("getParentName: " + super.getName())
  }
  getParentType() {
    // super 指向父类的原型对象而不是父类的本身
    console.log("getParentName: " + super.getType()) // 报错
  }

  static getStaticParentType() {
    // super 指向父类的本身
    console.log("getParentName: " + super.getType())
  }
}

const children1 = new child1()
// children1.getParentName()
// child1.getParentType() 报错
// child1.getStaticParentType()

class Parent2 {
  constructor() {
    this.name = "parent1"
  }
  print() {
    console.log(this.name)
  }
}

class child2 extends Parent2 {
  constructor() {
    // super 作为方法
    super()
    this.name = "child"
  }

  childPrint() {
    // super 作为对象
    super.print()
  }
}

const c2 = new child2()
c2.childPrint() // child this指向child2

// 类的prototype，__proto__
var obj = new Object()
console.log(obj.__proto__ === Object.prototype) // true

// 子类的__proto__指向父类本身
// 子类的prototype属性的__proto__指向父类的prototype属性
// 实例的__proto__属性的__proto__指向父类实例的__proto__

// Boolean
// Number
// String
// Array
// Date
// Function
// RegExp
// Error
// Object

// es5中不能允许原生的构造函数
// es6中允许继承原生构造函数

class CustomArray extends Array {
  constructor(...args) {
    super(...args)
  }
}

const customArray = new CustomArray(3)
console.log(customArray.fill("--"))
