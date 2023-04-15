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
