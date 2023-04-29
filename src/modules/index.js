// import 处于模块顶层的任意位置，不能存在块级作业域里
// import 静态编译，编译的时候已经引入
import A from "./a"
import { time } from "./b"

// 方式一 通过解构赋值的方式导入
import { age, name, address } from "./c"

// 导入也可以通过as 关键字设置别名
// import { age as ages, name, address } from "./c"
// 引入结构的值如果不是对象，赋值会报错
// ages = 2 错误

// 如果结构出来的是对象，则可赋值不会报错
import { info } from "./c"
info.age = 23
console.log(info)

// setInterval(() => {
//   console.log(time)
// }, 2000)

// 当映入js文件时，js文件里面的代码都会执行
import "./d"

// import 有提升效果，所以在引入前，使用引入的内容也是允许的 ，但是为了代码规范，建议import 写在上面
getName()
import { getName } from "./e"

// import 引入的内容的名字，必须一开始就要写好，因为编译是执行的，所以不能写成动态的去计算
// import { 'get' + 'name'} from './e' error

// import 与 export 都不能在块作用域中执行
// 多个import导出最终会合并，成为一个import，只会执行一次 import
