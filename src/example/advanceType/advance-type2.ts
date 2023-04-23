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

// unknown 3.0版本中的顶级类型
// 1.任何类型都可以赋值给unknown类型
let value1: unknown
value1 = 'a'
value1 = 213

// 2、如果没有类型断言或基于控制流的类型细化时，unknown不可以赋值给其他类型，只能赋值给any，和unknown类型
let value2: unknown
let value3: string
// value3 = value2 错误

// 3、如果没有类型断言或基于控制流的类型细化时，不能在他上面进行任何操作运算
let value4: unknown
// value4+=1 错误

// 4、unknown与任何其他类型组成的交叉类型，最后都等于其他类型
let type1: string & unknown // string 类型
let type2: number & unknown // number 类型
let type3: unknown & unknown // unknown
let type4: Array<number> & unknown  // number[]

// 5、unknown与其他类型组成的联合类型(any除外)，都等于unknown类型
let type5: string | unknown  // unknown
let type6: number | unknown  // unknown
let type7: number[] | unknown  // unknown

// 6、never类型是unknown的子类型
type type8 = never extends unknown ? true : false

// 7、keyof unknown 等于类型 never
type type9 = keyof unknown // never

// 8、只能对unknown进行等或不等操作，不能进行其他操作
// type5 === type7

// 9、unknown类型的值不能访问他的属性、作为函数调用和作为类创建实例
let value10: unknown
// value10.a 错误
// value10() 错误
// new value10() 错误

// 10、使用映射类型时，如果遍历的是unknown类型，则不会映射任何属性
type Types1<T> = {
  [P in keyof T]: number
}

type type11 = Types1<any>  // {[X:string]:number}
type type12 = Types1<unknown> // {}


// 条件类型
// T extends U ? X ? Y
type Types2<T> = T extends string ? string : number
let index: Types2<'a'>

// 分布式条件类型，当待检测的类型为联合类型时，该类型称为分布式条件类型，当实例化时，ts会自动分化成联合类型
type TypeName<T> = T extends any ? T : never
type Type3 = TypeName<string | number>

type TypeName1<T> =
  T extends string ? string :
  T extends number ? number :
  T extends boolean ? boolean :
  T extends undefined ? undefined :
  T extends () => void ? () => void :
  object

type type4 = TypeName1<Array<number>>
type type5 = TypeName1<() => void>
type type6 = TypeName1<number | boolean>

type Diff<T, U> = T extends U ? never : T
type Test = Diff<number | string | boolean, string | null> // number | boolean

type Type7<T> = {
  [K in keyof T]: T[K] extends ((newNum: string) => void) ? K : never
}[keyof T] // 索引查询，除掉所有为never属性的属性值
interface Part {
  id: number,
  name: string,
  subpart: Part[];
  undatePart(newNum: string): void
}

type Test1 = Type7<Part>


// 条件类型的类型推断 infer 关键字
// 不使用infer
type Type8<T> = T extends Array<any> ? T[number] : T
type Test2 = Type8<string[]> // string
type Test3 = Type8<number> // number

// 使用infer
type Type9<T> = T extends Array<infer U> ? U : T
type Test5 = Type9<string[]> // string
type Test6 = Type9<number[]> // number

// 预定义内置的条件类型
// Exclude
type type10 = Exclude<'a' | 2 | false, null | 'a'> // false |2

// Extract
type type13 = Extract<number | string | boolean, string> // string

// NonNullable
type type14 = NonNullable<string | number | null | undefined> // string number

// ReturnType
type type15 = ReturnType<() => string>
type type1 = ReturnType<() => void>

// InstanceType
class aClass {
  constructor() { }
}

type t1 = InstanceType<typeof aClass> // aClass
type t2 = InstanceType<any> // any
type t3 = InstanceType<never> // any





