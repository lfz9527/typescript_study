// 命名空间 
namespace Validation {
  export const isLetterReg = /^[A-Za-z]+$/
  export const checkLetter = (text: string) => {
    return isLetterReg.test(text)
  }
}

