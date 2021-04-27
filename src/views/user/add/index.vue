<template>
  <div class="user-container">

    <div class="user-text-small">编辑昵称</div>
    <el-input
      v-model="nickname"
      placeholder="请输入昵称"
      class="short-input">
      <i slot="suffix" class="el-input__icon fas fa-user"></i>
    </el-input>
    <el-button 
      type="warning" 
      plain
      class="nickname-button" 
      :loading="NicknameLoading"
      @click="TestNickName"
    >
      检测可用性
    </el-button>
    <span 
      class="test-result" 
      :class="{
        'test-result-success':ifNameAvailable,
        'test-result-fail':!ifNameAvailable
      }"
    >
      {{TestNameResult}}
    </span>

    <div class="user-text-small">编辑密码</div>
    <el-input
      class="short-input"
      placeholder="请输入初始密码"
      v-model="password">
      <i slot="suffix" class="el-input__icon fas fa-key"></i>
    </el-input>
    <span 
      class="test-result" 
      :class="{
        'test-result-success':ifPasswdAvailable,
        'test-result-fail':!ifPasswdAvailable
      }"
    >
      {{TestPasswdResult}}
    </span>

    <div class="user-text-small">编辑权限</div>
    <el-radio-group v-model="RolesRadio"> 
      <el-radio-button label="管理员"></el-radio-button>
      <el-radio-button label="作者"></el-radio-button>
      <el-radio-button label="访客" disabled></el-radio-button>
    </el-radio-group>
    <span 
      class="test-result" 
      :class="{
        'test-result-success':ifRoleAvailable,
        'test-result-fail':!ifRoleAvailable
      }"
    >
      {{TestRoleResult}}
    </span>
    
    <div class="user-text-small">
      <el-button 
        type="success"
        plain
        :loading="ConfirmLoading"
        @click="ConfirmAdd"
      >
        确定
      </el-button>
    </div>

  </div>
</template>

<script>
  // 引入检测用户名可用性的接口
  import { testUserName } from '@/api/user'
  // 新增用户的接口
  import { createUser } from '@/api/user'
  export default {
    name: 'addUser',
    data() {
        return {
            nickname: '',
            avatar: '', 
            NicknameLoading: false, // 点击按钮检测昵称可用性，按钮要显示一个loading动画
            ifNameAvailable: null, 
            ifPasswdAvailable: null,
            ifRoleAvailable: null,
            TestNameResult: '', // 检测昵称可用性后的结果
            TestPasswdResult: '',
            TestRoleResult: '',
            password: '',
            RolesRadio: '',
            ConfirmLoading: false
        }
    },
    methods: {
      TestNickName() {
        this.NicknameLoading = true
        testUserName(this.nickname).then(response => {
          const { data } = response
          this.NicknameLoading = false
          this.ifNameAvailable = data.if_available
          // 如果名字可用
          if (data.if_available) {
            this.TestNameResult = data.result
          // 如果名字不可用
          } else {
            this.TestNameResult = data.result
          }
        }).catch(error => {
          this.NicknameLoading = false
        })
      },
      ResultAlert(message) {
        this.$alert(message, '结果', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push({name: 'UsersList'})
          }
        });
      },
      ConfirmAdd() {
        this.TestNameResult = ''
        this.TestPasswdResult = ''
        this.TestRoleResult = ''
        testUserName(this.nickname).then(resp => {
          const { data } = resp
          this.ifNameAvailable = data.if_available
          // 如果名字不可用
          if (!data.if_available) {
            this.ifNameAvailable = false
            this.TestNameResult = data.result
          // 如果密码不可用
          } else if (this.password.length < 6) {
            this.ifPasswdAvailable = false
            this.TestPasswdResult = '密码太短'
          // 如果权限不可用（不在列表里）
          } else if (['管理员', '作者'].indexOf(this.RolesRadio) == -1) {
            this.ifPasswdAvailable = false
            this.TestRoleResult = '权限不可用'
          // 如果都可用
          } else {
            createUser(this.nickname, this.password, this.RolesRadio).then(r => {
              const { data } = r
              this.ResultAlert(data.result)
            })
          }
        })
      }
    },
  }

</script>

<style lang="scss" scoped>
  .user {

    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
      margin: 50px 0 50px 0;
      display: flex;
      align-items: center;
    }

    &-text:before {
      content: '';
      display: inline-block;
      box-sizing: border-box;
      height: 30px;
      border-left: 10px solid rgb(25, 221, 196);
      margin-right: 10px;
    }
  }

  .user-text-small {
    font-size: 20px;
    margin: 30px 0 10px 0;
  }

  .short-input {
    width: 200px;
  }
  .nickname-button {
    margin-left: 10px;
  }

  .test-result {
    margin-left: 10px;
  }
  .test-result-success {
    color: green
  }
  .test-result-fail {
    color: red
  }

  // 确认按钮
  .submit-button {
    margin: 30px 0;
  }
</style>