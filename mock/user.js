// 这是定义登录用户的两种角色：admin-token, editor-token，似乎也只用于下文定义的本地api
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

// 下面的方法不懂，但似乎是作为本地url把接口暴露出来，供前端在本地调用的，而不是去请求远程后端接口
module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    // config应该是get方法传入的参数，如"xxx/vue-admin-template/user/info?token=admin-token"
    response: config => {
      const { token } = config.query
      // user是本文件定义的{admin-token, editor-token}
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info,
      }
    }
  },

  // 修改用户信息
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'post',
    response: config => {
      const { token } = config.query
      // user是本文件定义的{admin-token, editor-token}
      const info = users[token]

      if (!info) {
        return {
          code: 50008,
          message: '修改失败，当前登录信息错误。'
        }
      }

      return {
        code: 20000,
        data: '用户信息修改成功'
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
