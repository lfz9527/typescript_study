# 环境搭建

```bash
-- 初始化项目
npm init

-- 下载相关依赖
npm install  typescript tslint -g

-- 初始化ts
tsc --init

-- 下载webpack4
npm install webpack-cli webpack-dev-server -D
npm i cross-env -D
npm i ts-loader -D
npm install typescript
```



## 配置 webpack

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  // 控制台只打印错误错误信息
  stats: "errors-only",
  entry: "./src/index.ts",
  output: {
    filename: "main.js",
  },
  resolve: {
    /**extensions扩展名选项在resolve追踪到的文件如果没有扩展名时，
     * 会尝试在其提供的扩展名选项里进行匹配。就如我们常常引入一个js文件时a.js，
     * 会直接写import 'a'而不是import 'a.js'。
     *  */
    extensions: [".js", ".ts", ".tsx"],
    /**
     * 别名配置
     */
    alias: {},
  },
  module: {
    rules: [
      {
        // 匹配后缀为ts 或者tsx的文件
        test: /\.tsx?$/,
        // 使用某些loader去处理相关文件
        use: "ts-loader",
        // 排除某些文件，不需要去处理
        exclude: /node_modules/,
      },
    ],
  },
  // 使用source-map方便代码错误定位，开发是使用，生产环境不要使用
  devtool: process.env.NODE_EVN === "development" ? "inline-source-map" : false,
  devServer: {
    // 本地开发基于dist作为根目录
    contentBase: path.join(__dirname, "dist"),
    // 关闭压缩
    compress: false,
    host: "localhost",
    port: 8089,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/template/index.html",
    }),
  ],
};

```





# 基础类型

- 布尔类型 `let bool: boolean`

- 数值类型 `let num: number`

- 字符串类型`let str : string`

- 数组类型 `let arr :[]、let arr:number[]、let arr: <Array>[]、let arr3: (number | string)[]`

- 元组类型 `let tuple: [string, number, boolean]`

- 枚举类型

  ```js
  enum Roles {
      SUPER_ADMIN = 1,  // 指定序号
      ADMIN,
      USER
  }
  ```

  

- 任何类型 `let a: any`

- void类型 `function ():viod {}`

- null `let n : null`

- undefined `let un:undefined`

- never类型 `():never =>{}`

```ts
// 布尔类型
let bool: boolean
bool = true

// 数值类型
let num: number
num = 233;
num = 0b11101
num = 0x7b


// 字符串类型
let str: string
str = 'abc'
str = `可以加上${num}`
// console.log(str)

// 数组类型
// [1,5,6]
// 写法1
let arr: number[]  // 数组arr为数字类型的数组，数组里面的值必须都是number类型
// 写法2
let arr1: Array<number>

let arr3: (number | string)[]  // 数组元素可以为字符串或者数字类型，如果去除括号，那么就表示 arr3既可以是数字，也可以是元素类型为字符串的数组


// 元组类型
let tuple: [string, number, boolean] // length长度为3，并且每个元素对应的类型

// 超过元组长度的元素，称为越界元素。
// 2.6之前，越界元素只要符合元组元素类型，也可以数组长度超出
// 2.6之后，就不能超出元组长度
tuple = ['a', 2, false]

// 枚举类型
// 默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值
enum Roles {
    SUPER_ADMIN = 1,  // 指定序号
    ADMIN,
    USER
}

console.log(Roles.SUPER_ADMIN);  // 1
console.log(Roles[1]); // SUPER_ADMIN

/**
 *  枚举编译成js
var Roles;
(function (Roles) {
    Roles[Roles["SUPER_ADMIN"] = 1] = "SUPER_ADMIN";
    Roles[Roles["ADMIN"] = 2] = "ADMIN";
    Roles[Roles["USER"] = 3] = "USER";
})(Roles || (Roles = {}));
 */

// any 任何类型(少用)
let value: any
value = '2f'
value = 23
value = true
value = []
const arr4: any[] = [1, 'sf', {}] // 数组元素类型为任意值

// void 类型 (没有类型)
// 标明该函数没有返回值
const consoleText = function (text: string): void {
    console.log(text);

}
// undefined可以赋给 void 类型的值
let v: void
v = undefined
// "strict": true 这里会报错
// v = null
consoleText('44')


// null和undefined 既可以是值，也可以是类型
// null和undefined是所有类型的子类型。 就是说你可以把 null和undefined赋值给number类型的变量。
let u: null
u = null
num = null
num = undefined
str = null

// never类型 永远不存在的值的类型
// 抛出错误或死循环函数的返回值为never类型，因为根本不可以有返回值
// 任意类型的子类型是never，never没有子类型。所以never可以赋值给任意值
const errorFunc = (message: string): never => {
    throw new Error(message)
}

const infiniteFunc = (): never => {
    while (true) { }
}

// let neverValue = (() => {
//     while (true) { }
// })()

// 报错
// neverValue= 23
// num = neverValue
// str = neverValue

// 对象类型 Object
let obj = {
    name: '张三'
}

let obj1 = obj
obj1.name = '2'

console.log(obj)

function getObject(obj: Object): void {
    console.log(obj)
}

getObject(obj)



// 类型断言
// string | number 联合类型中 number 不存在属性length
// 对联合类型的参数时，标明某个参数为联合类型中的某个类型
const getLength = (target: string | number): number => {
    // 方式一
    if ((<String>target).length || (<String>target).length === 0) {
        // 方式二，jsx只支持as这种形式的类型断言
        return (target as string).length
    } else {
        return target.toString().length
    }
}


```



# Symbol

## 基础

- symbol用来表示一个独一无二的值，每个symbol都是唯一的

- 在ts中symbol只能是数字或字符串

- 在js Symbol 传入对象： Symbol([object Object])

- Symbol 会调用toString 方法把数字转成字符串

- Symbol 类型不能用于运算，在ts中会报错

- Symbol 值可以转化为Boolean值，也可以通过隐式转换为布尔值

- Symbol 值可以通过toString 转为字符串，但是不会影响它本身

- 类型的属性名可以是Symbol类型

- 当用Symbol值做属性名时，这个属性就是唯一的，不会被覆盖和修改，只能通过修改s8来修改

  ```js
  const s8 = Symbol('name')
  const info2 = {
    [s8]: 'duck',
    age: 48,
    sex: '女'
  }
  ```

  

- 只能通过这种类似来汇总属性名为Symbol类型的值

  ```js
  info2[s8] = 'drink'
  ```

- `info2.s8 = 'drink' `ts 会提示你没有s8这个属性

- // 这四种方式都不能获取到对象中 属性类型为Symbol的属性
  ```js
  // for (const key in info2) {
  //   console.log(key);
  // }
  // Object.keys(info2)
  // Object.getOwnPropertyNames(info2)
  // JSON.stringify(info2)
  ```

- `console.log(Object.getOwnPropertySymbols(info2));` 只能获取对象里面的所有Symbol类型的属性名
- `console.log(Reflect.ownKeys(info2));`  能返回对象的所有属性名包括symbol类型的属性



- // Symbol有俩个静态方法

  ```js
  // Symbol.for()
  // Symbol.keyFor()
  ```

- Symbol.for() 创建的Symbol值，首先会从全局范围查找是否有相同的Symbol值，有则直接返回，没有则重新创建 

  ```js
  const a1 = Symbol.for('lion')
  const a2 = Symbol.for('lion')
  const a3 = Symbol.for('pink')
  // console.log(a1=== a2) true
  // console.log(a2=== a3) false
  
  // Symbol.keyFor() 获得通过Symbol.for() 全局注册的Symbol值
  console.log(Symbol.keyFor(a1)); // lion
  ```

- 全局范围包含当前页面，嵌套的iframe，serverWork



### es6 11 个内置的Symbol值

- Symbol.hasInstance ：Symbol.isConcatSpreadable 为false时，数组不会被扁平化
- Symbol.species：创建一个衍生对象的构造函数
- Symbol.match： 当在字符串中调用match方法时会调用这个方法
- Symbol.replace：当在字符串中调用replace方法时会调用这个方法
- 类推 Symbol.search，Symbol.split
- Symbol.iterator：指向默认迭代器的方法
-  Symbol.toPrimitive: 当对象类型转换时调用这个方法
- Symbol.toStringTag: 当调用toString时会调用返回值
- Symbol.unscopables：可以返回对象上被过滤的属性



```js
const s1 = Symbol()
console.log(s1); // Symbol()

const s2 = Symbol()
console.log(s2); // Symbol()
// console.log(s1 === s2); false

const s3 = Symbol('llf')
const s4 = Symbol('llf')
// console.log(s3=== s4); false
// 所以symbol() 值是唯一的

// const s5 = Symbol({ a: 'f' })  TS2345: Argument of type '{ a: string; }' is not assignable to parameter of type 'string | number'.
// 在ts中symbol只能是数字或字符串
// 在js Symbol 传入对象： Symbol([object Object])
// Symbol 会调用toString 方法把数字转成字符串

const s6 = Symbol(1)
const s7 = Symbol(2)
// console.log(s6+s7); 
// Symbol 类型不能用于运算，在ts中会报错

console.log(s4.toString());//Symbol(llf) 字符串
console.log(s4);  //Symbol(llf)  symbol类型
console.log(Boolean(s4)); //true
console.log(!s4); // true

/*
  Symbol 值可以通过toString 转为字符串，但是不会影响它本身
  Symbol 值可以转化为Boolean值，也可以通过隐式转换为布尔值
 */

// 类型的属性名可以是Symbol类型


let prop = 'name'
const info = {
  [prop]: 'lion'
}
// console.log(info);

// 当用Symbol值做属性名时，这个属性就是唯一的，不会被覆盖和修改，只能通过修改s8来修改
const s8 = Symbol('name')
const info2 = {
  [s8]: 'duck',
  age: 48,
  sex: '女'
}

// 只能通过这种类似来汇总属性名为Symbol类型的值
info2[s8] = 'drink'
// info2.s8 = 'drink' ts 会提示你没有s8这个属性

console.log('info2===>', info2); // {Symbol(name): 'duck'}


// 这四种方式都不能获取到对象中 属性类型为Symbol的属性
// for (const key in info2) {
//   console.log(key);
// }
// Object.keys(info2)
// Object.getOwnPropertyNames(info2)
// JSON.stringify(info2)

console.log(Object.getOwnPropertySymbols(info2)); // 只能获取对象里面的所有Symbol类型的属性名

console.log(Reflect.ownKeys(info2));  // 能返回对象的所有属性名包括symbol类型的属性



// Symbol有俩个静态方法
// Symbol.for()
// Symbol.keyFor()

// Symbol.for() 创建的Symbol值，首先会从全局范围查找是否有相同的Symbol值，有则直接返回，没有则重新创建
// 全局范围包含当前页面，嵌套的iframe，serverWork
const a1 = Symbol.for('lion')
const a2 = Symbol.for('lion')
const a3 = Symbol.for('pink')
// console.log(a1=== a2) true
// console.log(a2=== a3) false

// Symbol.keyFor() 获得通过Symbol.for() 全局注册的Symbol值
console.log(Symbol.keyFor(a1)); // lion

// es6 11 个内置的Symbol值
/**
 * Symbol.hasInstance
 */

const sym = {
  [Symbol.hasInstance](argu) {
    console.log('argu===>', argu);
  }
}
console.log({ a: 'a' } instanceof <any>sym);  // {a: 'a'} false


// Symbol.isConcatSpreadable 为false时，数组不会被扁平化
const array: number[] = [1, 2]
console.log([].concat(array, [5, 2])); //  [1, 2, 5, 2]
console.log(array[Symbol.isConcatSpreadable]); // 默认返回undefined
array[Symbol.isConcatSpreadable] = false
console.log(array[Symbol.isConcatSpreadable]); // false
console.log([].concat(array, [5, 2])); // [Array(2), 5, 2]


// Symbol.species
// 创建一个衍生对象的构造函数

class C extends Array {
  constructor(...args) {
    super(...args)
  }
  static get [Symbol.species]() {
    return Array
  }
  getName() {
    return 'panda'
  }
}
const c = new C(1, 5, 2)
const a = c.map(v => v + 1)
// console.log(a);
// console.log(a instanceof C); // false 如果去掉 Symbol.species 那么 它为true
// console.log(a instanceof Array); // true


// Symbol.match
// 当在字符串中调用match方法时会调用这个方法
const d = {
  [Symbol.match](string) {
    console.log(string.length); // 2
  }
}

console.log('add'.match(<RegExp>d));

// Symbol.replace
// 当在字符串中调用replace方法时会调用这个方法

// 类推 Symbol.search，Symbol.split

// Symbol.iterator
// 指向默认迭代器的方法

const array1 = [1.5, 8, 5,]
const iterator = array1[Symbol.iterator]()
console.log(iterator); // Array Iterator {}
console.log(iterator.next()); // {value: 1.5, done: false}
console.log(iterator.next()); // {value: 8, done: false}
console.log(iterator.next()); // {value: 5, done: false}
console.log(iterator.next()); // {value: undefined, done: true}

// Symbol.toPrimitive
let obj3: unknown = {
  // 当对象类型转换时调用这个方法
  [Symbol.toPrimitive](type) {
    console.log('type==>', type); // number string
  }
}
// const res = (<number>obj3)++  // 字符串自增 转换为隐式类型
const res = `abc${obj3}`
console.log(res); // abc undefined

// Symbol.toStringTag
let obj4: unknown = {
  // 当调用toString时会调用返回值，
  // [Symbol.toStringTag]: '自定义'
  get [Symbol.toStringTag]() {
    return '还是自定义'
  }
}

console.log(obj4.toString()); // [object 自定义]
console.log(obj4.toString()); // [object 还是自定义]


// Symbol.unscopables 可以返回对象上被过滤的属性
const obj5 = {
  a: 'a',
  b: 'b'
}

// with(obj5){
//   console.log(a); // a
//   console.log(b); // b 
// }

console.log(Array.prototype[Symbol.unscopables]);

```



# 接口

 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。 

## 基本用法

```js
interface NameInfo {
  firstName: string,
  secondName: string
}

// 使用接口
const getFullName = ({ firstName, secondName }: NameInfo): string => {
  return `${firstName}${secondName}`
}
```



## 可选属性

```js
interface ArrInter {
  0: number,
  readonly 1: string  // 只读元素标识
}
```



## 可索引类型

```js
interface RoleDic {
  [id: number]: string // 属性名必须是number类型
}

// 属性名典定义为string类型
interface RoleDic1 {
  [id: string]: string
}
```



## 接口继承

```js
interface people {
  sex: string
}

interface user1 extends people {
  age: number,
}
```



## 混合类型接口

3.1版本之前需要借助命名空间来说实现，之后支持使用混合类型接口直接给函数添加属性，

```js
interface Counter {
  (): void,
  count: number
}

const getCounter = (): Counter => {
  const c = () => { c.count++ }
  c.count = 0
  return c
}
```



```js
//  基本用法

// const getFullName = ({ firstName, secondName }) => {
//   return `${firstName}${secondName}`
// }
// 传入参数类型错误，会返回错误的值
// console.log(
//   getFullName({
//     firstName: 23,
//     secondName: 'fail'
//   }
//   ));

interface NameInfo {
  firstName: string,
  secondName: string
}

// 使用接口
const getFullName = ({ firstName, secondName }: NameInfo): string => {
  return `${firstName}${secondName}`
}

// 不使用接口
// const getFullName = ({ firstName, secondName }: { firstName: string, secondName: string }): string => {
//   return `${firstName}${secondName}`
// }

getFullName({
  firstName: 'free',
  secondName: 'more'
})

// 可选属性

// 属性后面加问号意味着，这个参数可以不写
interface Vegetables {
  color?: string,
  type: string,
  // [prop: string]: any // 属性名是字符串类型，属性值是任意类型，并且个数不限
}

// 如果没有限制则两个参数为必填项,并且只能填两个参数
const getVegetables = ({ color, type }: Vegetables): string => {
  return `A ${color ? color + ':' : ''}${type} `
}

// 也可以利用类型兼容性，跳过，参数个数限制
const vegetablesValue = {
  color: 'red',
  type: 'apple',
  size: 123
}
console.log(getVegetables(vegetablesValue));

// 可读属性
interface ArrInter {
  0: number,
  readonly 1: string  // 只读元素标识
}
let readonlyArr: ArrInter = [1, '43']
console.log(readonlyArr[1]); // 成功
// readonlyArr[1] = 32 失败，因为数组下标为1 的元素为只读元素，不能修改

// 定义一个函数参数的接口
// interface AddFunc {
//   (num1: number, num2: number): number
// }
// 或者使用类型别名，参数为number类型，返回值为number类型
type AddFunc = (num1: number, num2: number) => number
// const add: AddFunc = (n1, n2) => n1 + n2

// 可索引类型
// 属性名定义为number类型
interface RoleDic {
  [id: number]: string // 属性名必须是number类型
}

const role: RoleDic = {
  // 'a': 'fx' 错误，因为接口规定了属性名必须是number类型
  23: 'fx'
}

// 属性名典定义为string类型
interface RoleDic1 {
  [id: string]: string
}

const role1: RoleDic1 = {
  as: 'super',
  12: 'admin', // 如果定了的属性值是字符串类型，写数字也是运行的，因为会被toString转换为字符串
}

// 当属性名 的值是一样时，不管你是number类型还是string 类型，会被最后一个覆盖
// const role2 = {
//   '223': 'a',
//   223: 'b'
// }
// console.log(role2)  { 223: 'b'}

// 接口继承
interface people {
  sex: string
}

interface user1 extends people {
  age: number,
}

interface user2 extends people {
  age: number,
}

const user1: user1 = {
  age: 23,
  sex: '男'
}

const user2: user2 = {
  age: 23,
  sex: '女'
}

// 混合类型接口,3.1版本之前需要借助命名空间来说实现，之后支持使用混合类型接口直接给函数添加属性，
let count = 0
const countAdd = () => count++
countAdd()
countAdd()
console.log(count);

interface Counter {
  (): void,
  count: number
}

const getCounter = (): Counter => {
  const c = () => { c.count++ }
  c.count = 0
  return c
}

const counter: Counter = getCounter()
counter()
console.log(counter.count); // 1

```





# 函数

```js
// 普通函数
// function add(arg1: number, arg2: number): number {
//   return arg1 + arg2
// }

// 箭头函数
// const add = (arg1: number, arg2: number): number => arg1 + arg2

// 定义一个函数，形参类型为number，返回值为number
let add: (x: number, y: number) => number

add = (arg1: number, arg2: number): number => arg1 + arg2
add = (arg1, arg2) => arg1 + arg2

// 会报错因为函数已经规定了参数都为number类型
// add = (arg1: string, arg2: number) => arg1 + arg2

let arg3 = 3
add = (arg1: number, arg2: number): number => arg1 + arg2 + arg3 // arg3的类型不需要定义在函数类型里


// 常规接口
interface Add {
  (x: number, y: number): number
}
// 类型别名
// type Add = (x: number, y: number) => number
type isString = string
let addFunc: Add
addFunc = (arg1: number, arg2: number): number => arg1 + arg2

// 参数
// 可选参数
// addFunc = (arg1, arg2, arg3) => arg1 + arg2 + (arg3 ? arg3 : 0) 会报错，因为规定了参数个数为2，且必填

type AddFunction = (x: number, y: number, z?: number) => number
let addFunction: AddFunction

addFunction = (arg1, arg2, arg3) => arg1 + arg2 + (arg3 || 0) // 成功
console.log(addFunction(1, 3, 5)); // 9

addFunction = (arg1, arg2) => arg1 + arg2 + (arg3 || 0) // 成功
console.log(addFunction(1, 3)); // 7

// 默认值。ts可以校验出默认值的类型
addFunction = (x, y = 4) => x + y

// 参数数量不定，任意数量参数
// es6以前 用arguments
// function getVal() {
//   console.log(arguments); // [2,3]

// }
// getVal(2, 3)

// es6 使用args
function getVal(...args) {
  console.log(args); // [2,3]

}
getVal(2, 3)

// ts 中可以使用es6的方式，但是不能使用es5的方式
// const handleData = (arg1: number,...args: number[]) => {}

// 函数重载
// 函数重载只能使用function来定义,不能使用接口和类型别名定义函数重载
function handleData(x: string): string[] // 函数重载
function handleData(x: number): number[] // 函数重载
function handleData(x: any): any {
  if (typeof x === 'string') return x.split('')
  return x.toString().split('').map(v => Number(v))
}

// console.log(handleData('abc').map(v => v.toFixed()));
// console.log(handleData(223).map(v => v.length()));

```



# 泛型

```js
// 泛型基础使用
// const getArray = (value: any, times: number = 5): any[] => {
//   return new Array(times).fill(value)
// }

// // 丢失了类型的约束
// getArray(2, 5).map(v => v.length) //  [undefined, undefined, undefined, undefined, undefined]

// <T> 泛型，如果value 是什么乐西。返回值就是什么类型
const getArray = <T>(value: T, times: number = 5): T[] => {
  return new Array(times).fill(value)
}

getArray<number>(2, 5).map(v => v.toFixed) //  会报错，因为类型检测

// 泛型变量
// <T> T可以是任何值，T用得比较多 也可以明确类型 <string,number>
const getArray1 = <T, U>(param1: T, param2: U, time: number): Array<[T, U]> => {
  return new Array(time).fill([param1, param2])
}

console.log(getArray1(1, '34', 3).forEach(item => {
  console.log(item[0]);
  console.log(item[1]);
  return item
}));

// 通过泛型定义函数变量
let getArray2: <T> (arg: T, timer: number) => Array<T>
getArray2 = (arg, items) => {
  return new Array(items).fill(arg)
}
// getArray2(4, 4).map(v => v.length)

// 通过类型别名，泛型定义类型
type GetArray = <T> (arg: T, timer: number) => Array<T>
const getArray3: GetArray = (v, i) => {
  return new Array(i).fill(v)
}

// 通过接口，泛型定义类型'
interface GetArrayInter {
  <T>(arg: T, time: number): T[],  // 方式一 
  <T>(arg: any, time: number): Array<T>, // 方式二
}

// 泛型也可以定义在接口，接口里面都可以使用这个泛型
interface GetArrayInter1<T> {
  (arg: T, time: number): T[],  // 方式一 
  (arg: any, time: number): Array<T>, // 方式二
  array: T[]
}

// 泛型变量限制
interface ValueWithLength {
  length: number
}

const getArr = <T extends ValueWithLength>(arg: T, items): T[] => {
  return new Array(items).fill(arg)
}
getArr([3, 5], 3)
// getArr(23,4) // number 类型没有 length 属性
getArr('23', 2)

// 在泛型属性中使用类型约束
// a keyof b ,a是b 中的属性
const getProp = <T, K extends keyof T>(obj: T, prodName: K) => {
  return obj[prodName]
}

const objs = {
  a: 'a',
  b: 'b'
}

getProp(objs, 'a')
// getProp(objs, 'f') // 因为没有f属性，所以会报错

console.log(getProp(objs, 'a'));

```



# 类

## es6和es5代码实现方式

```js
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

```



## set和get关键字

```js
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
```



## 定义形式

```js
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
```



## 静态方法

```js
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

```



## 继承

```js
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

```



## TS中的类





# 枚举