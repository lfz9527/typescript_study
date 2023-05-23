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

```js
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

```





# 枚举

```js
// 数字枚举 
const test = 1
const getIndex = () => 2
enum Status {
  Uploading = 6, // 随意指定枚举对应的数字
  Success = test,
  Failed = getIndex(), // 如果使用了计算类型的函数，则下一个枚举必须要设置初始值
  Fulled = 2,
}

// 通过两种形式获取，枚举对应的编码
console.log(Status.Uploading); // 0
console.log(Status.Failed); // 2
console.log(Status['Success']); // 1

// 反向映射
// 通过值得到字段名
console.log(Status);

// 字符串枚举
// ts 在2.4版本新增了字符串枚举
//  在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。
// 字符串枚举不能使用常量和计算值
// 不能在A枚举使用B枚举的值
enum Message {
  Error = 'Sorry,error',
  Success = 'Hallo, success',
  Failed = Error // Failed 和Error的值一样
}

console.log(Message);
/**
 *Error :  "Sorry,error"
  Failed : "Sorry,error"
  Success : "Hallo, success"
 */

console.log(Message.Error); // Sorry,error

// 异构枚举，既有数字又有字符串
// 尽量少用

enum Result {
  Failed = 0,
  Success = 'hello'
}

// 枚举成员类型，和联合枚举类型
// 当一个枚举值满足一定条件的时候，枚举的每个成员和枚举值本身都可以当做类型使用
// 满足条件：
/** 枚举值所有值或成员都是下面三种之一
 * 1.不带初始值的枚举成员 enum E { A }
 * 2、值为字符串自变量 enum E {A = 'a'}
 * 3、值为数值 enum E { A = 1/-1}
 * 
  */

enum Animas {
  Dog = 1,
  Cat = 2
}

interface Dog {
  type: Animas.Dog
}

const dog: Dog = {
  type: Animas.Dog
  // type: Animas.Cat  类型不匹配
}

// 联合枚举
enum Status {
  Off,
  On
}

interface Light {
  status: Status
}

const light: Light = {
  // status: Status.Off |  status: Status.On
  status: Status.Off
}


// const enum 使枚举成员编译成值，而不会编译成对象
const enum Animas1 {
  Dog,
  Cat
}
```



# 类型推论和兼容性

```js
// 类型推论
let myName = 'lisa'
// myName = 23 // 虽然myName 没有写类型，但是根据第一个值，ts推断该参数为string

// 如果我们没有规定类型，则ts会把它的类型推断为 （number | string)[] 类型
let arr5 = [1, 'a']
// arr5 = [2,3,false] 错误，因为ts会把它的类型推断为 （number | string)[] 类型

// 以上都是ts根据右边的值推断左边的类型


window.onmousedown = (mouseEvent) => {
  // console.log(mouseEvent.a); // 会推断出 没有a 属性
}


// 对象兼容性
interface InfoInterface {
  name: string,
  info: {
    age: number
  }
}

let infos1: InfoInterface
const infos2 = { name: 'lisa', info: { age: 23 } }
const infos3 = { age: 43 }
const infos4 = { name: 'lisa', age: 87 }

// 类型推断对于对象是深层次，并且递归的去检测
infos1 = infos2
// infos1 = infos3 报错，因为infos没有name字段
// infos1 = infos4  

// 函数兼容性

// 参数个数
let x = (a: number) => 0
let y = (b: number, c: string) => 0
y = x  // 没问题
// x = y 会报错 因为左边的参数个数少于右边的参数个数

// 参数类型
let q = (a: number) => 0
let w = (a: string) => 0
// q = w 左边的参数类型必须包含右边参数类似

// 可选参数和剩余参数

const getSum = (arr: number[], callback: (...args: number[]) => number): number => {
  return callback(...arr)
}

const sum = getSum([3, 4], (...args: number[]): number => {
  return args.reduce((a, b) => a + b, 0)
})
const sum1 = getSum([5, 6, 7,], (a: number, b: number, c: number): number => a + b + c)

console.log(sum1);

// 函数参数双向协变
let funcA = (args: number | string): void => { }
let funcB = (args: number): void => { }
// funcA = funcB 报错
funcB = funcA //只能由参数类型多的赋给参数类型稍等 

// 返回值类型
let x1 = (): string | number => 0
let y1 = (): string => 'a'
let z1 = (): boolean => false
// y1 = x1 error
x1 = y1
// x1 = z1 false

// 函数重载
function merge(arg1: number, arg2: number): number
function merge(params: string, p: string): string
function merge(arg: any, q: any) {
  return arg + q
}

merge(2, 3)
// merge(2,'2')
merge('3', '2')

function sum2(a1: number, a2: number): number
function sum2(a: any, b: any): any {
  return a + b
}

let func = merge
// func = sum2 右边缺少函数重载个数

// 枚举
enum StatusEnum {
  On,
  Off
}

// 编译器会推断出你的类型属于这个枚举
let s = StatusEnum.On
// s = 2 error

// 类
// 比较两个类的类型的值的兼容性，只比较实例的成员，类的静态成员与实例不进行比较
class AmiClass {
  public static age: number
  constructor(public name: string) { }
}

class PeoClass {
  public static age: string
  constructor(public name: string) { }
}
class FooClass {
  constructor(public name: number) { }
}

let ami: AmiClass = new AmiClass('ff')
let peo: PeoClass = new PeoClass('ee')
let foo: FooClass = new FooClass(23)
peo = ami
// peo = foo error

class ParenClass {
  private age: number = 23
  constructor() { }
}

class ChildClass extends ParenClass {
  constructor() {
    super()
  }
}

class OtherClass {
  private age: number = 23
  constructor() { }
}

const children23: ParenClass = new ChildClass() // 子类可以赋值给父类型的值
// const other:ParenClass = new OtherClass() error

// 泛型的兼容性
interface Data<T> { }
let data1: Data<number>
let data2: Data<string>
// data1 = data2 接口是空的则能赋值，如果接口里面有明确类型则不兼容

```



# 高级类型

- this类型

- 索引类型

  - 索引类型查询 keyof
  - 索引访问操作符 [ ]

- 映射类型

  - 内置类型

    -  Readonly 全部属性变为只读

       Partial 全部属性变成可选属性

       Pick  获取接口类型中的某个属性

       Record 将一个对象中的每个属性转为其他值的类型

  - 增加或移除修饰符  +-

- unknown

  - 1.任何类型都可以赋值给unknown类型
  - 2、如果没有类型断言或基于控制流的类型细化时，unknown不可以赋值给其他类型，只能赋值给any，和unknown类型
  - 3、如果没有类型断言或基于控制流的类型细化时，不能在他上面进行任何操作运算
  - 4、unknown与任何其他类型组成的交叉类型，最后都等于其他类型
  - 5、unknown与其他类型组成的联合类型(any除外)，都等于unknown类型
  - 6、never类型是unknown的子类型
  - 7、keyof unknown 等于类型 never
  - 8、只能对unknown进行等或不等操作，不能进行其他操作
  - 9、unknown类型的值不能访问他的属性、作为函数调用和作为类创建实例
  - 10、使用映射类型时，如果遍历的是unknown类型，则不会映射任何属性

- 条件类型

  - 分布式条件类型
    - 当待检测的类型为联合类型时，该类型称为分布式条件类型，当实例化时，ts会自动分化成联合类型
  - 条件类型的类型推断 infer 关键字
  - 预定义内置的条件类型
    - Exclude
    - Extract
    - NonNullable
    - ReturnType
    - InstanceType

```js
// this类型，1.7版本新增this
class Counters {
  constructor(public count: number = 0) { }
  public add(value: number) {
    this.count += value
    return this
  }
  public subtract(value: number) {
    this.count -= value
    return this
  }
}

let count1 = new Counters(1)
console.log(count1.add(2).subtract(2)); // 链式调用

// 父类返回了this，继承的子类也能调用，父类的方法
class PowCounter extends Counters {
  constructor(public count: number = 0) {
    super(count)
  }
  pow(value: number) {
    this.count = this.count ** value
    return this
  }
}

let powCounter = new PowCounter(2)
console.log(powCounter.pow(3).add(23));


// 索引类型
// 索引类型查询
// keyof 索引类型查询操作符
interface InfoInterAdvanced {
  name: string;
  age: number;
}

let infoProp: keyof InfoInterAdvanced
infoProp = 'name'
infoProp = 'age'
// infoProp = 'sex' error
// keyof T 获取T里面所以的属性名组成的一个联合类型
//  K extends keyof T K的类型只能是T里面的所有属性名组成的字符串的联合类型
function getValue<T, K extends keyof T>(obj: T, name: K[]): T[K][] {
  return name.map(n => obj[n])
}

const infoObj = {
  name: 'lisa',
  age: 23
}

let infoValue: (string | number)[] = getValue(infoObj, ['name', 'age',])
console.log(infoValue); // ['lisa',23]

// 索引访问操作符
// [] 
type NameTypes = InfoInterAdvanced['name'] // NameType 就是string 类型

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]
}

interface Objs<T> {
  // [key: number]: T
  [key: string]: T
}

let keys: keyof Objs<number> // keys 的类型是这个接口里面所有属性名的类型

const objs1: Objs<number> = {
  age: 23
}

let keys1: Objs<number>['name'] // number

interface Type {
  a: number;
  b: never;
  c: string;
  d: undefined;
  e: null;
  f: object
}

let types: Type[keyof Type] // 它会返回类型不为 never null undefined的属性的属性名

// 映射类型
// 旧类型生成新类型
interface info1 {
  age: number;
  name: string;
  sex: number | string;
}

// 创建一个新接口使age 变成可读
// interface ReadonlyInfo {
//   // readonly age: number 如果数量少，则可以赋值，如果数量多就不行了
// }

type ReadonlyInfo<T> = {
  // 类似 for in 
  readonly [P in keyof T]?: T[P]
}

type ReadonlyInfo1 = ReadonlyInfo<info1>

// readonlyInfo的属性都是只读属性
let readonlyInfo: ReadonlyInfo1 = {
  age: 23,
  name: 'lisa',
  sex: 1
}

// Ts中有些内置类型，一次设为已读，或者可选， 
// Readonly 全部属性变为只读
// Partial 全部属性变成可选属性
// Pick  获取接口类型中的某个属性
// Record 将一个对象中的每个属性转为其他值的类型

// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P]
// }

//Pick
type one = Pick<info1, 'name'> // type one = { name: string }

interface Info2 {
  age: number;
  name: string;
  address: string;
}

let info2s: Info2 = {
  age: 23,
  name: 'lisa',
  address: '深圳'
}

function picks<T, K extends keyof T>(obj: T, key: K[]): Pick<T, K> {
  let res: any = {}
  key.map((k): void => {
    res[k] = obj[k]
  })
  return res
}

const nameAgeAddress = picks(info2s, ['name', 'age'])

// Record
function mapObj<K extends string | number, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U> {
  let res: any = {}
  for (const key in obj) {
    res[key] = f(obj[key])
  }
  return res
}

const names = { 0: 'hello', 1: 'work', 2: 'length' }
const lengths = mapObj(names, (s) => s.length)
console.log(lengths);

// 同态：两个相同类型的代数结构之间的结构保持映射
// readonly pick 是同态的 record不是同态的

// 用映射类型进行推断

type Proxy<T> = {
  get(): T;
  set(value: T): void
}

type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>
}

function proxify<T>(obj: T): Proxify<T> {
  let result = {} as Proxify<T>
  for (const key in obj) {
    result[key] = {
      get: () => obj[key],
      set: (value) => obj[key] = value
    }
  }

  return result
}

let props = {
  name: 'lisa',
  age: 23
}

let proxyProps = proxify(props)
proxyProps.name.set('li')
console.log(proxyProps.name.get()); // li

// 由映射类型推断出原始类型
function unproxify<T>(t: Proxify<T>): T {
  let result = {} as T
  for (const key in t) {
    result[key] = t[key].get()
  }
  return result
}

console.log(unproxify(proxyProps));

// 增加或移除修饰符
// + - 作为前缀指定增加或删减

type removeReadonlyInfo2<T> = {
  -readonly [P in keyof T]-?: T[P]
}

type Info1WithoutReadonly = removeReadonlyInfo2<ReadonlyInfo1>

// keyof 在2.9版本的升级
const stringIndex = 'a'
const numberIndex = 1
const symbolIndex = Symbol()
type Objs2 = {
  [stringIndex]: string,
  [numberIndex]: number,
  [symbolIndex]: symbol,
}

type keysType = keyof Objs2
let keyVal: keysType = 'a'
keyVal = 1
keyVal = symbolIndex

type ReadonlyTypes<T> = {
  readonly [P in keyof T]: T[P]
}

let objs3: ReadonlyInfo<Objs2> = {
  a: 'aa',
  1: 23,
  [symbolIndex]: Symbol(),
}
// objs3.a = 2 只读属性

// 元组和数组的映射类型
// 在3.1版本中 映射会生成新的元组和数组，不会生成新的类型
type MapToPromise<T> = {
  [K in keyof T]: Promise<T[K]>
}

type Tuple = [number, string, boolean]
type PromiseTuple = MapToPromise<Tuple>
let tuple1: PromiseTuple = [
  new Promise((res, rej) => res(1)),
  new Promise((res, rej) => res('1')),
  new Promise((res, rej) => res(false)),
]

console.log(tuple1);

// unknown 3.0版本中的顶级类型
// 1.任何类型都可以赋值给unknown类型
let value1: unknown
value1 = 'a'
value1 = 213

// 2、如果没有类型断言或基于控制流的类型细化时，unknown不可以赋值给其他类型，只能赋值给any，和unknown类型
let value2: unknown
let value3: string
// value3 = value2 错误

// 3、如果没有类型断言或基于控制流的类型细化时，不能在他上面进行任何操作运算
let value4: unknown
// value4+=1 错误

// 4、unknown与任何其他类型组成的交叉类型，最后都等于其他类型
let type1: string & unknown // string 类型
let type2: number & unknown // number 类型
let type3: unknown & unknown // unknown
let type4: Array<number> & unknown  // number[]

// 5、unknown与其他类型组成的联合类型(any除外)，都等于unknown类型
let type5: string | unknown  // unknown
let type6: number | unknown  // unknown
let type7: number[] | unknown  // unknown

// 6、never类型是unknown的子类型
type type8 = never extends unknown ? true : false

// 7、keyof unknown 等于类型 never
type type9 = keyof unknown // never

// 8、只能对unknown进行等或不等操作，不能进行其他操作
// type5 === type7

// 9、unknown类型的值不能访问他的属性、作为函数调用和作为类创建实例
let value10: unknown
// value10.a 错误
// value10() 错误
// new value10() 错误

// 10、使用映射类型时，如果遍历的是unknown类型，则不会映射任何属性
type Types1<T> = {
  [P in keyof T]: number
}

type type11 = Types1<any>  // {[X:string]:number}
type type12 = Types1<unknown> // {}


// 条件类型
// T extends U ? X ? Y
type Types2<T> = T extends string ? string : number
let index: Types2<'a'>

// 分布式条件类型，当待检测的类型为联合类型时，该类型称为分布式条件类型，当实例化时，ts会自动分化成联合类型
type TypeName<T> = T extends any ? T : never
type Type3 = TypeName<string | number>

type TypeName1<T> =
  T extends string ? string :
  T extends number ? number :
  T extends boolean ? boolean :
  T extends undefined ? undefined :
  T extends () => void ? () => void :
  object

type type4 = TypeName1<Array<number>>
type type5 = TypeName1<() => void>
type type6 = TypeName1<number | boolean>

type Diff<T, U> = T extends U ? never : T
type Test = Diff<number | string | boolean, string | null> // number | boolean

type Type7<T> = {
  [K in keyof T]: T[K] extends ((newNum: string) => void) ? K : never
}[keyof T] // 索引查询，除掉所有为never属性的属性值
interface Part {
  id: number,
  name: string,
  subpart: Part[];
  undatePart(newNum: string): void
}

type Test1 = Type7<Part>


// 条件类型的类型推断 infer 关键字
// 不使用infer
type Type8<T> = T extends Array<any> ? T[number] : T
type Test2 = Type8<string[]> // string
type Test3 = Type8<number> // number

// 使用infer
type Type9<T> = T extends Array<infer U> ? U : T
type Test5 = Type9<string[]> // string
type Test6 = Type9<number[]> // number

// 预定义内置的条件类型
// Exclude
type type10 = Exclude<'a' | 2 | false, null | 'a'> // false |2

// Extract
type type13 = Extract<number | string | boolean, string> // string

// NonNullable
type type14 = NonNullable<string | number | null | undefined> // string number

// ReturnType
type type15 = ReturnType<() => string>
type type1 = ReturnType<() => void>

// InstanceType
class aClass {
  constructor() { }
}

type t1 = InstanceType<typeof aClass> // aClass
type t2 = InstanceType<any> // any
type t3 = InstanceType<never> // any

```





# ES6 和Nodejs中的模块



# 模块和命名空间



# 声明合并



| 声明类型          | 创建了命名空间 | 创建了类型 | 创建了值 |
| ----------------- | :------------: | :--------: | :------: |
| Namespace         |       √        |            |    √     |
| Class             |                |     √      |    √     |
| Enum              |                |     √      |    √     |
| interface         |                |     √      |          |
| TypeAlias类型别名 |                |     √      |          |
| Function          |                |            |    √     |
| Variable          |                |            |    √     |

```js
interface InfoInter {
  name: string
}

interface InfoInter {
  age: number
}

let infoInter: InfoInter
// 两个同名的接口。会合并成一个接口，
// 所以infoInter属性必须包含两个字段
// infoInter = { // 报错
//   age: 23
// } 

// 多个同名接口定义的非函数类型的成员。命名应该不重复的，如果重复了类型应该相同，反之会报错
interface a {
  s: number
  getTel(n: number): number
}
interface a {
  // s: string  // 错误
  s: number
  getTel(n: string): string
}

// 函数成员都会被当成函数的重载，合并时，函数成员在后面的优先级最高
let ac1: a = {
  s: 23,
  getTel(t: any): any {
    if (typeof t === 'string') return t.length
    return String(t)
  }
}

console.log(ac1.getTel(333));

// 两个同名命名空间，会合并
namespace Validation {
  const numberReg = /^[0-5]$/  // 没有export 出去的在其他同名的空间里是找不到的
  export const checkNumber1 = () => { }
}
namespace Validation {
  // console.log(numberReg); // 没有
  export const checkString2 = () => { }
}


// 不同类型合并

// 命名空间和类的合并
// 要求同名的类和命名空，要求类的定义必须在命名空间的前面，最后合并的结果是一个包含一些以命名空间导出内容为静态属性的类型

class Validations1 {
  constructor() { }
  checkType() { }
}

namespace Validations1 {
  export const numberReg = /^[0-5]$/
}
// 在类型 Validations1 中有numberReg
console.log(Validations1.numberReg); // /^[0-5]$/

// 命名空间和函数
function countUp() {
  countUp.count++
}
namespace countUp {
  export let count = 0
}

console.log(countUp.count); // 0
countUp()
console.log(countUp.count);// 1
countUp()
console.log(countUp.count);// 2
countUp()


enum Color {
  red,
  green,
  blue
}

namespace Colors {
  export const yellow = 3
}

console.log(Colors); // 枚举只有yellow = 3 没有3= yellow

```



# 装饰器

```ts
// 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。 
// 装饰器使用 @expression这种形式，expression求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。

// 普通装饰器
function setProp(target) {
  //...
}
// @setProp

// 装饰器工厂
// function color(value: string) { // 这是一个装饰器工厂
//   return function (target) { //  这是装饰器
//       // do something with "target" and "value"...
//   }
// }
// @color

// 装饰器组合
// @f @g x

// @f
// @g
// x

// 对同一个目标可以引用多个装饰器
// 如果装饰器为装饰器工厂，则顺序从上到下，前往后
// 如果是直接的装饰器，则顺序为从下往上，后往前
// @setProp()
// @setAge
// @setName
// targe

function setName() {
  console.log('get setName');
  return (target) => {
    console.log('setName');

  }
}


function setAge() {
  console.log('get setAge');
  return (target) => {
    console.log('setAge');
  }
}

@setName()
@setAge()  // get setName  get setAge setAge setName 
class Person {
  constructor() { }
}


// 类装饰器，在类声明前声明
// 类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
let sign = null
function setNames(name: string) {
  return (target: new () => any) => {
    sign = target
    console.log(target, name);
  }
}

@setNames('lisa')
class ClassDes {
  constructor() { }
}
console.log(sign === ClassDes); // true
console.log(sign === ClassDes.prototype.constructor); // true

// 通过装饰器修改原型
function addName(constructor: new () => void) {
  constructor.prototype.name = "ts123"
}

@addName
class ClassD { }
interface ClassD {
  name: string
}
const cd = new ClassD()
console.log(cd.name);


// 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。
// 注意  如果你要返回一个新的构造函数，你必须注意处理好原来的原型链。 在运行时的装饰器调用逻辑中 不会为你做这些。
function classDecorator<T extends { new(...args: any[]): {} }>(target: T) {
  return class extends target {
    newProperty = 'new property'
    hello = 'override'
  }
}

@classDecorator
class Greeter {
  property = 'property'
  hello: string
  constructor(m: string) {
    this.hello = m
  }
}

// 装饰器返回的类替换了定义的类
let greeter = new Greeter('world')
console.log(greeter);


// 方法装饰器
// 用来处理类中的方法
// 它可以用来处理方法的属性描述符，可以处理方法的定义
// 当做函数调用
// 包含三个参数
// 参数一：如果装饰静态成员时，则是类的构造函数；如果修饰类的实例成员，则是类的原型对象
// 参数二：成员的名字
// 参数三：成员属性描述符


// 属性描述符
// configurable
// writeable
// enumerable

interface DesObj {
  [key: string]: string,
}
var desObj: DesObj = {
  age: '23'
}
Object.defineProperty(desObj, 'name', {
  value: 'lisa',
  writable: false,
  configurable: true,
  enumerable: false,
})


desObj.name = 'ff' // 不可写，所以修改失败，
console.log(desObj.name);

for (const key in desObj) {
  console.log(key); // 只遍历了一个可枚举属性属性

}


function Enumerable(bool: boolean): any {
  return (targe: any, propertyName: string, desc: PropertyDescriptor) => {
    // console.log(targe, propertyName, desc);
    // desc.enumerable = bool
    return {
      value() {
        return 'not age'
      },
      enumerable: bool
    }
  }
}

class ClassF {
  constructor(public age: number) { }

  @Enumerable(false)
  public getAge() {
    return this.age
  }
}
const classF = new ClassF(43)
console.log(classF.getAge()); // not age

function enumerable1(bool: boolean) {
  return (targe: any, propertyName: string, desc: PropertyDescriptor) => {
    desc.enumerable = bool
  }
}


class ClassG {
  private _name: string
  constructor(name: string) {
    this._name = name
  }

  @enumerable1(false) // get set 只需要添加一个相同的装饰器
  get name() {
    return this._name
  }

  set name(name) {
    this._name = name
  }
}

const classG = new ClassG('lisa')
for (const key in classG) {
  console.log('classGKey', key);
}


// 属性装饰器
// 声明在属性的声明之前，他有两个参数，和方法装饰器前两个参数一样 


function printPropertyName(t: any, propertyName: string) {
  console.log(t, propertyName);
}

class ClassH {
  @printPropertyName
  public name: string
  constructor() { }
}


// 参数装饰器
// 三个参数，前两个参数与方法装饰器一样
// 参数一：如果装饰静态成员时，则是类的构造函数；如果修饰类的实例成员，则是类的原型对象
// 参数二：成员的名字
// 参数三：参数在参数列表的索引 
// 参数装饰器的返回值会被忽略

function required(t: any, propertyName: string, index: number) {
  console.log(`修饰的是${propertyName}的第${index + 1}个参数`);

}

class ClassQ {
  public name: string = 'LISA'
  age: number = 23
  getInfo(prefix: string, @required infoType: string): any {
    return prefix + ' ' + this[infoType]
  }
}

interface ClassI {
  [k: string]: number | string | Function
}

const classQ = new ClassQ()
console.log(classQ.getInfo('嘿嘿', 'age'));

```



# Mixins混入

```ts
// 对象混入，类混入
interface mix {
  a: string
}

interface mix1 {
  b: number
}

let Ma: mix = {
  a: 'sf'
}

let Mb: mix1 = {
  b: 34
}
// 对象的混入
let Ab = Object.assign(Ma, Mb)
console.log(Ab);

// 类的混入
class Aa {
  isA: boolean
  funcA() { }
}
class Bb {
  isB: boolean
  funcB() { }
}

class ClassAB implements Aa, Bb {
  constructor() { }
  isA: boolean
  isB: boolean
  funcA(): void {

  }
  funcB(): void {

  }
}

function mixins(base: any, from: any[]) {
  from.forEach(f => {
    Object.getOwnPropertyNames(f.prototype).forEach(key => {
      console.log(key);
      base.prototype[key] = f.prototype[key]

    })
  })
}

mixins(ClassAB, [Aa, Bb])
const ab = new ClassAB()
console.log(ab);

```



# 其他更新



# 声明文件



# ts.config.json 配置详情

