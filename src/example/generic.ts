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
