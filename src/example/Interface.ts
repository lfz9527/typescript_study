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



