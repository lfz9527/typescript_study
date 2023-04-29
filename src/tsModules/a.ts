// ts 文件还能导出接口和类型别名

// 导出接口
export interface FuncInterface {
  (arg: number): string
  name: string
}

export class TClass {
  constructor() { }
}

class classD {
  constructor() { }
}
export {
  classD
}

// 导出别名
export {
  classD as Assail
}

// 在A文件中把引入的B文件导出
export * from './b'
// 导出B文件部分内容
export { name } from './b'
// 别名
export { name as bName } from './b'
