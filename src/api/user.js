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

// 这是修改用户名的接口
export function modifyUserName(name) {
  return request({
    url: 'http://127.0.0.1:5000/name/',
    method: 'post',
    params: { name }
  })
}

// 这是用户上传/修改用户头像的接口
export function uploadAvatar(formdata) {
  return request({
    url: 'http://127.0.0.1:5000/avatar/',
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data: formdata
  })
}

// 从后端查询当前用户的最新信息，然后更新前端的token
export function updateToken() {
  return request({
    url: 'http://127.0.0.1:5000/token/update',
    method: 'get',
  })
}

// 从后端查询所有用户的信息
export function getAllUser(range_start, range_end) {
  return request({
    url: 'http://127.0.0.1:5000/user/collection/list/',
    method: 'get',
    params: { range_start, range_end }
  })
}

// 根据userID从后端查询某个用户的信息
export function getIdInfo(userid) {
  return request({
    url: 'http://127.0.0.1:5000/user/id/',
    method: 'get',
    params: { userid }
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