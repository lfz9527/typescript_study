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





