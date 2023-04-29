// 命名空间 
namespace Validation {
  export const isNumberReg = /^[0-9]+$/
  export const checkNumber = (text: string) => {
    return isNumberReg.test(text)
  }
}

