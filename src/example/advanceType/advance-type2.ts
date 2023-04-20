// this类型，1.7版本新增this
class Counters {
  constructor(public count: number = 0) { }
  public add(value: number) {
    this.count += value
    return this
  }
  public subtract(value: number) {
    this.count -= value
    return this
  }
}

let count1 = new Counters(1)
console.log(count1.add(2).subtract(2)); // 链式调用

// 父类返回了this，继承的子类也能调用，父类的方法
class PowCounter extends Counters {
  constructor(public count: number = 0) {
    super(count)
  }
  pow(value: number) {
    this.count = this.count ** value
    return this
  }
}

let powCounter = new PowCounter(2)
console.log(powCounter.pow(3).add(23));


// 索引类型
// 索引类型查询
// keyof 索引类型查询操作符
interface InfoInterAdvanced {
  name: string;
  age: number;
}

let infoProp: keyof InfoInterAdvanced
infoProp = 'name'
infoProp = 'age'
// infoProp = 'sex' error
// keyof T 获取T里面所以的属性名组成的一个联合类型
//  K extends keyof T K的类型只能是T里面的所有属性名组成的字符串的联合类型
function getValue<T, K extends keyof T>(obj: T, name: K[]): T[K][] {
  return name.map(n => obj[n])
}

const infoObj = {
  name: 'lisa',
  age: 23
}

let infoValue: (string | number)[] = getValue(infoObj, ['name', 'age',])
console.log(infoValue); // ['lisa',23]

// 索引访问操作符
// [] 
type NameTypes = InfoInterAdvanced['name'] // NameType 就是string 类型

function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]
}

interface Objs<T> {
  // [key: number]: T
  [key: string]: T
}

let keys: keyof Objs<number> // keys 的类型是这个接口里面所有属性名的类型

const objs1: Objs<number> = {
  age: 23
}

let keys1: Objs<number>['name'] // number

interface Type {
  a: number;
  b: never;
  c: string;
  d: undefined;
  e: null;
  f: object
}

let types: Type[keyof Type] // 它会返回类型不为 never null undefined的属性的属性名

// 映射类型
// 旧类型生成新类型
interface info1 {
  age: number;
  name: string;
  sex: number | string;
}

// 创建一个新接口使age 变成可读
// interface ReadonlyInfo {
//   // readonly age: number 如果数量少，则可以赋值，如果数量多就不行了
// }

type ReadonlyInfo<T> = {
  // 类似 for in 
  readonly [P in keyof T]?: T[P]
}

type ReadonlyInfo1 = ReadonlyInfo<info1>

// readonlyInfo的属性都是只读属性
let readonlyInfo: ReadonlyInfo1 = {
  age: 23,
  name: 'lisa',
  sex: 1
}

// Ts中有些内置类型，一次设为已读，或者可选， 
// Readonly 全部属性变为只读
// Partial 全部属性变成可选属性
// Pick  获取接口类型中的某个属性
// Record 将一个对象中的每个属性转为其他值的类型

// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P]
// }

//Pick
type one = Pick<info1, 'name'> // type one = { name: string }

interface Info2 {
  age: number;
  name: string;
  address: string;
}

let info2s: Info2 = {
  age: 23,
  name: 'lisa',
  address: '深圳'
}

function picks<T, K extends keyof T>(obj: T, key: K[]): Pick<T, K> {
  let res: any = {}
  key.map((k): void => {
    res[k] = obj[k]
  })
  return res
}

const nameAgeAddress = picks(info2s, ['name', 'age'])

// Record
function mapObj<K extends string | number, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U> {
  let res: any = {}
  for (const key in obj) {
    res[key] = f(obj[key])
  }
  return res
}

const names = { 0: 'hello', 1: 'work', 2: 'length' }
const lengths = mapObj(names, (s) => s.length)
console.log(lengths);

// 同态：两个相同类型的代数结构之间的结构保持映射
// readonly pick 是同态的 record不是同态的

// 用映射类型进行推断

type Proxy<T> = {
  get(): T;
  set(value: T): void
}

type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>
}

function proxify<T>(obj: T): Proxify<T> {
  let result = {} as Proxify<T>
  for (const key in obj) {
    result[key] = {
      get: () => obj[key],
      set: (value) => obj[key] = value
    }
  }

  return result
}

let props = {
  name: 'lisa',
  age: 23
}

let proxyProps = proxify(props)
proxyProps.name.set('li')
console.log(proxyProps.name.get()); // li

// 由映射类型推断出原始类型
function unproxify<T>(t: Proxify<T>): T {
  let result = {} as T
  for (const key in t) {
    result[key] = t[key].get()
  }
  return result
}

console.log(unproxify(proxyProps));

// 增加或移除修饰符
// + - 作为前缀指定增加或删减

type removeReadonlyInfo2<T> = {
  -readonly [P in keyof T]-?: T[P]
}

type Info1WithoutReadonly = removeReadonlyInfo2<ReadonlyInfo1>

// keyof 在2.9版本的升级
const stringIndex = 'a'
const numberIndex = 1
const symbolIndex = Symbol()
type Objs2 = {
  [stringIndex]: string,
  [numberIndex]: number,
  [symbolIndex]: symbol,
}

type keysType = keyof Objs2
let keyVal: keysType = 'a'
keyVal = 1
keyVal = symbolIndex

type ReadonlyTypes<T> = {
  readonly [P in keyof T]: T[P]
}

let objs3: ReadonlyInfo<Objs2> = {
  a: 'aa',
  1: 23,
  [symbolIndex]: Symbol(),
}
// objs3.a = 2 只读属性

// 元组和数组的映射类型
// 在3.1版本中 映射会生成新的元组和数组，不会生成新的类型
type MapToPromise<T> = {
  [K in keyof T]: Promise<T[K]>
}

type Tuple = [number, string, boolean]
type PromiseTuple = MapToPromise<Tuple>
let tuple1: PromiseTuple = [
  new Promise((res, rej) => res(1)),
  new Promise((res, rej) => res('1')),
  new Promise((res, rej) => res(false)),
]

console.log(tuple1);

// unknown

// 条件类型