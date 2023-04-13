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
