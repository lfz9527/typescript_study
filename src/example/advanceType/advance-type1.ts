// 交叉类型
// & 符号 交叉类型是将多个类型合并为一个类型
const mergeFunc = <T, U>(arg: T, arg1: U): T & U => {
  let result = <T & U>{};
  (<{} & U>result) = Object.assign((<{}>arg), arg1)
  return result
}

mergeFunc({ a: 'a' }, { b: 'b' })

// 联合类型
// type1 | type2 | type3 表示类型可以为这三个type中的任意一个
const getLenFunc = (content: string | number): number => {
  if (typeof content === 'string') return content.length
  return content.toString().length
}

console.log(getLenFunc('12344'));

// 类型保护
const valueList = ['val', 123]

const getRandomValue = () => {
  const number = Math.random() * 10
  if (number < 5) return valueList[0]
  return valueList[1]
}
// 需要运行时才知道结果,因为ts不知道你具体会返回哪种类型的值，所以ts会提示你
// 通过类型保护或类型断言进行区分
const item = getRandomValue()
if ((item as string)) {
  // 通过类型断言，缺点多个地方，都要断言，
  console.log((item as string).length);
} else {
  console.log((item as number).toFixed());
}

// 类型保护
// 方式一 isString函数
function isString(value: number | string): value is string {
  return typeof value === 'string'
}
// if (isString(item)) {
// 方式二 typeof
if (typeof item === 'string') {
  console.log(item.length);
} else {
  console.log(item.toFixed());

}

// 方式三 instanceof
class CreteByClass {
  public age = 18
  constructor() { }
}

class CreteByClass2 {
  public name = 'dd'
  constructor() { }
}

function getRandomClass() {
  return (Math.random() < 0.5) ? new CreteByClass() : new CreteByClass2()
}

const item1 = getRandomClass()
if (item1 instanceof CreteByClass) {
  console.log(item1.age);
} else {
  console.log(item1.name);
}


// null 和 undefined
// 任何类型的子类型，ts会将null 和undefined 区别对待
// string | null / string | undefined / string | null | undefined 这是三种不同的类型
const sumFunc = (x: number, y?: number) => {
  return x + (y || 0)
}

// 类型保护和类型断言
const getLenFunction = (value: string | null): number => {
  // 方法一
  // if(value === null) return 0
  // return value.length
  // 方法二，通过隐式转换
  return (value || '').length
}

const getSpliceStr = (value: number | null): string => {
  function getRes(prefix: string) {
    // 这里如果不处理会报错,因为value可能为null,null是没有toFixed 方法
    // 如果编译器不能够去除 null或 undefined，你可以使用类型断言手动去除。 语法是添加 !后缀： value!从 value的类型里去除了 null和 undefined：
    return prefix + value!.toFixed().toString()
  }
  value = value || 0.1
  return getRes('lisa')
}
console.log(getSpliceStr(null)); // lisa0


// 类型别名
// type 关键字定义别名
type TypeString = string
let str2: TypeString

type PositionType<T> = { x: T, y: T }
const position1: PositionType<number> = {
  x: 2,
  y: 3
}
const position2: PositionType<string> = {
  x: '2',
  y: '3'
}

type children<T> = {
  Current: T,
  child?: children<T> // 可以把本身当做类型进行定义
}
// 只能在对象属性中引入类型别名自己
let cc: children<string> = {
  Current: '1',
  child: {
    Current: '2',
    child: {
      Current: '3',
    }
  }
}

type Alias = {
  num: number
}
interface Inter {
  num: number
}

let _alias: Alias = {
  num: 234
}
let _inter: Inter = {
  num: 23
}
_alias = _inter // 类型兼容的


// 什么时候用类型别名，什么时候用接口
// 当定义的类型要用于拓展，即使要是与implement修饰的时候要用接口
// 当无法通过接口，要使用联合类型或元组类型的时候用类型别名

// 字符串字面量类型 
type Name = 'lisa'
const name1: Name = 'lisa' // 类型为字符串自变量 lisa类型 如果等于别的字符串会报错

// 多个字符串自变量构成的联合类型
type Direction = 'north' | 'east' | 'south' | 'west'
function getDirection(direction: Direction): string {
  return direction.substring(0, 1)
}

console.log(getDirection('east'));

// 数字字面量
// 与字符串差不多，都是指定类型为一个值
type age = 23
interface InterAge {
  age: age,
  name: string
}

const _info: InterAge = {
  age: 23, // 值只能是23
  name: '34'
}

// 枚举成员类型

// 可辨识联合
/**
 * 可辨识联合两要素
 * 1. 具有普通的单例类属性
 * 2. 一个类型别名包含了哪些类型的联合
 */

interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}
type Shape = Square | Rectangle | Circle
function getArea(s: Shape): number {
  switch (s.kind) {
    case 'square':
      return s.size * s.size
    case 'rectangle':
      return s.height * s.width
    case 'circle':
      return Math.PI * s.radius ** 2 // ES7的幂运算符
  }
}

console.log(getArea({ kind: "square", size: 23, }));

// 完整性检查
// 1.利用tsconfig.json中strictNullChecks并且指定一个返回值类型，但是要考虑兼容性
// 2.利用返回值类型never

function assertNever(value: never): never {
  throw new Error('Unexpected object:' + value)
}

function getArea1(s: Shape): number {
  switch (s.kind) {
    case 'square':
      return s.size * s.size
    case 'rectangle':
      return s.height * s.width
    case 'circle':
      return Math.PI * s.radius ** 2 // ES7的幂运算符
    default: return assertNever(s) // 如果不齐全则会报错 类型“Circle”的参数不能赋给类型“never”的参数
  }
}
