import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login。调用store里的login函数
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // trim()是掐头去尾删掉空格
      // 从api/user调用login方法
      login({ username: username.trim(), password: password }).then(response => {
        console.log('调用login方法，把账密传到后盾，尝试匹配')
        console.log('成功匹配，拿到的response(包含token)是')
        console.log(response)
        const { data } = response
        console.log('读取response中的token，token为')
        console.log(data.token)
        console.log('调用set_token函数，把token保存到store.token')
        // 对于token的格式，前端要求的应该是{code:20000, data: {toke:xxxx}}
        commit('SET_TOKEN', data.token)
        console.log('调用setToken函数')
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info，调用store里的getinfo函数
  getInfo({ commit, state }) {
    console.log('store.user.getInfo：getInfo正在调用中')
    return new Promise((resolve, reject) => {
      console.log('store.user.getInfo：开始调用api/user/getInfo，传入参数')
      console.log(state.token)
      // 调用getInfo函数，传入参数token给后端解密
      getInfo(state.token).then(response => {
        console.log('store.user.getInfo：api/user/getInfo调用成功，response是')
        console.log(response)
        // response包含[code:20000, data:{avatar,introduction,name,roles}]
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        // 返回值必须包含name和avatar，即{name:xxx, avatar:xxx}
        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        console.log('store.user.getInfo：出错', error)
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      console.log('调用resetToken()')
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

