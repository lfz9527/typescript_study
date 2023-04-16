// TS中的类
class Point {
  public x: number
  public y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public getPosition() {
    return `{${this.x}, ${this.y}}`
  }
}

const point = new Point(1, 4)
console.log(point);

class Parent {
  private age: number
  public name: string
  protected sex: string
  static weight: string = '45kg'
  protected constructor(name: string, age: number, sex: string) {
    this.name = name
    this.age = age
    this.sex = sex
  }
  private getPrivateName() {
    return this.name
  }

  protected getSex() {
    return this.sex
  }
  static getWeight() {
    return this.weight
  }
}

// 继承
class child extends Parent {
  constructor(name: string, age: number, sex: string) {
    super(name, age, sex)
    this.name = name
    // console.log(super.age); 子类中也不能调用父类的私有属性
    console.log(super.getSex()); // 子类可以调用父类的保护属性
  }
}

// pubic  公共方法修饰符 默认所有属性和方法都为公共方法

// private 私有方法修饰符
/**
 * 私有属性或方法不能自身类调用，实例也不能调用，基础的子类也不能调用父类的私有属性或方法
 */

// const p = new Parent('李华', 23, '女') 构造函数 使用protected 关键字后，父类不能创建实例
// console.log(p.getSex()); 实例不能调用雷电 保护属性

const children = new child('韩梅梅', 23, '女')
// console.log(p.getPrivateName()); 报错，私有方法和私有属性不能被实例调用
// console.log(Parent.age); 私有属性在类也不能直接调用

// protected 保护类关键字
/** 
 * 只允许基础的子类调用，不允许实例调用类的保护方法或属性
 */


// readonly
/** 
 * 使用 readonly关键字将属性设置为只读的
 */

class userInfo {
  readonly name: string
  constructor(name: string) {
    this.name = name
  }
}

// static 静态属性
/**
 * 只有类本身能够使用，类的实例不能使用
 */


const user = new userInfo('lisa')
console.log(user);
// user.name = 'fff' 因为name 是只读属性，不能修改

// 参数属性
// 构造函数的参数 直接填写关键字，可以参数直接赋值，省略了this.x =  x
class A {
  constructor(readonly name: string) { }
}

const ac = new A('class')
console.log(ac); // {}，如果加了参数属性则直接赋值 {ac: 'class}

class Info {
  name: string
  age?: number
  private _infoStr: string
  constructor(name: string, age?: number, public sex?: string) {
    this.name = name
    this.age = age
  }

  get infoStr() {
    return `姓名：${this._infoStr}`
  }
  set infoStr(value) {
    console.log('setter' + value);
    this._infoStr = value

  }
}

// const info1 = new Info('李华')
// console.log(info1); //  {sex: undefined, name: '李华', age: undefined}

// const info12 = new Info('韩梅梅', 32)
// console.log(info12); // {sex: undefined, name: '韩梅梅', age: 32}

// const info123 = new Info('山姆', 34, '男')
// console.log(info123); //  {sex: '男', name: '山姆', age: 34}

// 存储器
const info4 = new Info('lisa', 23, 'women')
info4.infoStr = 'str223'
console.log(info4.infoStr);

console.log(info4);

// 抽象类
// abstract 关键字
// ts 2.0以后 abstract 关键字不仅可以标记 类方法还能标记类中定义的属性和存储器
abstract class People {
  abstract _name: string
  constructor(public name: string) { }
  abstract printName(): void
  abstract get insideName(): string
  abstract set insideName(value: string) // 不能标记返回值类型
}

// const people = new People() 抽象类不能实例化

// 非抽象类“Man”不会实现继承自“People”类的抽象成员“printName”
class Man extends People {
  _name: string
  insideName: string
  constructor(name: string) {
    super(name)
  }

  printName(): void {
    console.log(this.name);
  }
}

const man = new Man('lisa')
man.printName()
man.insideName = '34'
console.log(man.insideName);

// 补充

// 接口
// 接口检测 是检测该类的实例属性类型
interface FoodInterFace {
  type: string,
}

// 类上使用接口
class foodClass implements FoodInterFace {
  type: string
  // type: string // 正常
  // static type: string // 会报错，因为类的静态属性只能类调用，实例不能调用，所以会报错
}

// 接口继承类
class B {
  protected name: string
}

interface I extends B { }

// D继承了I接口，I接口继承B类
// B类中含有 保护属性
// 所以D 需要继承B类，因为 保护类只有继承的子类的实例才能有该属性
class D extends B implements I {
  name: string
}

const DC = new D()
DC.name = 'sf'
// console.log(DC);

// 在泛型中使用类类型
// 函数 参数为一个类，而返回值是一个类的实例
const create = <T>(C: new () => T): T => {
  return new C()
}

class infos {
  age: number = 34
  constructor() { }
}

console.log(create<infos>(infos)); //infos {}
console.log(create<infos>(infos).age); // 34
// console.log(create<infos>(infos).name); // 没有name属性会 报错

