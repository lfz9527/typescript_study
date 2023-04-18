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
