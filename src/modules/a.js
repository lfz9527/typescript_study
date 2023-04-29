// ES6模块化

// 方式一
// export const name = "lisa"
// export const age = 34
// export const address = "shenzheng"

// 方式二
const age = 23
const name = "lisa"
const address = "shenzheng"

// 导出常量
export { age, name, address }

// 导出函数
export function get() {}

// 导出类
export class A {}

// 别名as 关键字
function set() {}
class B {}
const b = ""
export { set as Set, B as bClass, b as bValue }

// Es6 export 导出不能是一个具体的值
// export 'lisa' 错误
// const name = 'lo'
// export name 错误
