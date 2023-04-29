namespace Shapes {
  export namespace Polygons {
    export class Tran { }
    export class Squire { }
  }
}

// 深层次嵌套命名空间 取别名
import polygons = Shapes.Polygons
let Tran = new polygons.Tran()


// TS如何解析模块
// 相对导入
  // '/'：根目录
  //  './': 当前目录
  // '../': 上一级目录