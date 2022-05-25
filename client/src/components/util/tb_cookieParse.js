export function cookieParse(Cookie) {
    let Cookie2 = ''
  
    let num = Cookie.indexOf('BDUSS')
    let num2 = Cookie.indexOf(';', num)
  
    let a1 = Cookie.indexOf('----')
    let username = Cookie.substring(0, a1)
  
  
    let a2 = Cookie.indexOf('----', a1 + 4)
  
    if (a2 < 1) {
        Cookie2 = Cookie.substring(a1 + 4)
    }
    let a3 = Cookie.indexOf('----', a2 + 4)
    if (a3 < 1 && a2 > 1) {
        Cookie2 = Cookie.substring(a2 + 4)
    }
    let a4 = Cookie.indexOf('----', a3 + 4)
  
  
    let BDUSS = Cookie.substring(num, num2)
    BDUSS = BDUSS.substring(6)
  
    Cookie2 = Cookie2.replace('H_WISE_SIDS=; ', '')
    if (a1 > 1 && a2 > 1 && a3 > 1 && a4 > 1) {
        let password = Cookie.substring(a1 + 4, a2)
        let emailName = Cookie.substring(a2 + 4, a3)
        let emailPass = Cookie.substring(a3 + 4, a4)
        Cookie2 = Cookie.substring(a4 + 4)
  
        Cookie2 = Cookie2.replace('H_WISE_SIDS=; ', '')
        return {
            username: username,
            password: password,
            emailName: emailName,
            emailPass: emailPass,
            Cookie2: Cookie2,
            BDUSS: BDUSS,
        }
  
    } else {
        return {
            username: username,
            Cookie2: Cookie2,
            BDUSS: BDUSS,
        }
    }
  }