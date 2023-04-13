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

