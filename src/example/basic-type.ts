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

