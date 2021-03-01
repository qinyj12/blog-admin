import Cookies from 'js-cookie'
// 这是保存token的名称
const TokenKey = 'blog_backend_token' // 原来是'vue_admin_template_token'

export function getToken() {
  console.log('getToken函数调用中，尝试获取cookies，cookies如下')
  console.log(Cookies.get(TokenKey))
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log('setToken函数调用中，函数接收到的参数是')
  console.log(token)
  console.log('调用Cookies.set函数，尝试保存token到cookie')
  return Cookies.set(TokenKey, token, { expires: 7 })
  // console.log('读取cookies，值为')
  // console.log(Cookies.get(TokenKey))
  // return Cookies.set(TokenKey, token) // 原版如此
}

export function removeToken() {
  console.log('清除token')
  return Cookies.remove(TokenKey)
}
