// 命名空间
var Validation
;(function (Validation) {
  Validation.isLetterReg = /^[A-Za-z]+$/
  Validation.checkLetter = function (text) {
    return Validation.isLetterReg.test(text)
  }
})(Validation || (Validation = {}))
// 命名空间
var Validation
;(function (Validation) {
  Validation.isNumberReg = /^[0-9]+$/
  Validation.checkNumber = function (text) {
    return Validation.isNumberReg.test(text)
  }
})(Validation || (Validation = {}))
// // 方式一：结构并可以部分引入
// import { name } from './a'
// // 引入全部，并设置别名为 a
// import * as a from './a'
// // 解构引入，并设置别名
// import { name as aName } from './a'
// // 有副作用的导入,只执行文件的逻辑，但是外部拿不到文件内部的方法等
// import './a'
// console.log(name);
// // 接口看不到
// console.log(a);
// // 如果文件有 export default 可以直接导出
// // import Cname from './c'
// // console.log(Cname);
// // ts为了兼容 comonJs 和 AMD 不同规范的问题
// // 引入导出为export = xx 的文件
// import Cname = require('./c')
// console.log(Cname);
// // 引入moment
// // 方式一
// import moment = require('moment');
// console.log(moment()); // 返回的是一个hook
// // 方式二
// import * as moments from 'moment'
// console.log(moments); // 返回的是一个对象
// 使用命名空间
// 标记使用的命名空间
// 如果不通过webpack进行编译。通过tsc进行编译则直接通过下面的方式进行引入
/// <reference path="./letter-validation.ts"/>
/// <reference path="./number-validation.ts"/>
// tsc --outFile src/index.js src/tsModules/index.ts
// outFile 导出的文件
var isLetter = Validation.checkLetter("sfs")
var isNumber = Validation.checkNumber("3433")
console.log(isLetter)
console.log(isNumber)
console.log(Validation)
// 命名空间名字相同，最终会合并成一个对象
