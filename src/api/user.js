import request from '@/utils/request'
// 这是login的post方法，从后端拿到加密后的token
export function login(data) {
  return request({
    url: 'http://127.0.0.1:5000/login/',
    // url:'/vue-admin-template/user/login', //这是原版接口，用来调用本地定义的接口
    method: 'post',
    data
  })
}

// 这是login的get方法，把前端的token传递给后端解析
export function getInfo(token) {
  return request({
    url: 'http://127.0.0.1:5000/login/',
    // url: '/vue-admin-template/user/info', //这是原版接口，用来调用本地定义的接口
    method: 'get',
    params: { token }
  })
}

// 这是检测用户名可用性的接口
export function ifNameAvailable(name) {
  return request({
    url: 'http://127.0.0.1:5000/name/availability',
    method: 'get',
    params: { name }
  })
}

// 这是用户上传/修改用户名的接口
export function upLoadAvatar(avatar) {
  return request({
    url: 'http://127.0.0.1:5000/avatar/',
    method: 'post',
    // headers: {'Content-Type': 'multipart/form-data'},
    // data: avatar
    // 似乎blob是个二进制文件，后端无法接收
    data: Buffer.from(avatar)
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function changeInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'post',
    params: { token }
  })
}