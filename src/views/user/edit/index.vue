<template>
  <div class="user-container">
    <div class="user-text-small">编辑头像</div>

    <!-- 从父组件给图片剪切框传值 -->
    <ImageCropper 
      :CropWidth="'100px'" 
      :CropHeight="'100px'" 
      :UploadFunc="uploadAvatarAPI"
      :imageCutOutside="avatar"
      :TargetId="this.$route.params.UserId.toString()"
    />

    <div class="user-text-small">编辑昵称</div>
    <el-input
      v-model="nickname"
      placeholder="请输入昵称"
      suffix-icon="el-icon-user-solid"
      class="short-input"
    />
    <el-button 
      type="warning" 
      plain
      class="nickname-button" 
      :loading="NicknameLoading"
      @click="ModifyNickname"
    >
      修改昵称
    </el-button>
    <span 
      class="test-result" 
      :class="{
        'test-result-success':ifNameAvailable,
        'test-result-fail':!ifNameAvailable
      }"
    >
      {{ModifyNameResult}}
    </span>

    <div class="user-text-small">编辑电话</div>
    <el-input
      v-model="phone"
      placeholder="请输入电话号码"
      suffix-icon="el-icon-mobile-phone"
      class="short-input"
    />

    <el-button 
      type="warning" 
      plain
      class="nickname-button" 
      :loading="PhoneLoading"
      @click="ModifyPhone"
    >
      修改电话
    </el-button>
    <span 
      class="test-result" 
      :class="{
        'test-result-success':ifPhoneAvailable,
        'test-result-fail':!ifPhoneAvailable
      }"
    >
      {{ModifyPhoneResult}}
    </span>

    <div class="user-text-small">编辑权限</div>
    <el-radio-group v-model="RolesRadio"> 
      <el-radio-button label="管理员"></el-radio-button>
      <el-radio-button label="作者"></el-radio-button>
      <el-radio-button label="访客" disabled></el-radio-button>
    </el-radio-group>

    <el-button 
      type="warning" 
      plain
      class="nickname-button" 
      :loading="RoleLoading"
      @click="ModifyRole"
    >
      修改权限
    </el-button>
    <span 
      class="test-result" 
      :class="{
        'test-result-success':ifRoleAvailable,
        'test-result-fail':!ifRoleAvailable
      }"
    >
      {{ModifyRoleResult}}
    </span>

  </div>
</template>

<script>
  // import { mapGetters } from 'vuex'
  // 引入imageCropper模块
  import ImageCropper from '@/components/ImageCropper/index'
  // 引入vuex仓库 
  import store from '@/store'
  // 引入修改用户信息的接口 
  import { changeInfo } from '@/api/user'
  // 引入getIdInfo 的api
  import { getIdInfo } from '@/api/user'
  // 引入上传头像的接口
  import { uploadAvatar } from '@/api/user'
  // 引入修改用户名的接口
  import{ modifyUserName } from '@/api/user'
  // 引入修改电话的接口
  import{ modifyUserPhone } from '@/api/user'
  // 引入修改权限的接口
  import{ modifyUserRole } from '@/api/user'

  export default {
    name: 'editUser',
    data() {
        return {
            nickname: '',
            avatar: '', 
            NicknameLoading: false, // 点击按钮检测昵称可用性，按钮要显示一个loading动画
            ModifyNameResult: '', // 检测昵称可用性后的结果
            ifNameAvailable: null,
            ifPhoneAvailable: null,
            phone: '',
            PhoneLoading: false, 
            ModifyPhoneResult: '',
            RoleLoading: false,
            RolesRadio: '',
            ifRoleAvailable: null,
            ModifyRoleResult: '',
            CurrentUserDetail: {}, // 根据路由拿到当前用户的id，从api取值后赋值给CurrentUserDetail
            uploadAvatarAPI: uploadAvatar,
        }
    },
    components: {
        ImageCropper
    },
    computed: {

    },
    methods: {
        ModifyNickname() {
          this.NicknameLoading = true
          this.ModifyNameResult = ''
          // 调用api/modifyUserName，修改用户名，传参(user id, 修改后的nickname)
          modifyUserName(this.$route.params.UserId.toString(), this.nickname).then(response => {
            const { data } = response
            this.NicknameLoading = false
            this.ifNameAvailable = data.if_available
            // 如果名字可用
            if (data.if_available) {
              this.ModifyNameResult = data.result
              store.dispatch('user/updateToken')
            // 如果名字不可用
            } else {
              this.ModifyNameResult = data.result
            }
          }).catch(error => {
            this.NicknameLoading = false
          })
        },
        ModifyPhone() {
          this.PhoneLoading = true
          this.ModifyPhoneResult = ''
          // 调用api/modifyUserPhone，修改权限，传参(user id, 修改后的电话)
          modifyUserPhone(this.$route.params.UserId.toString(), this.phone).then(response => {
            const { data } = response
            this.PhoneLoading = false
            this.ifPhoneAvailable = data.if_available
            // 如果电话可用
            if (data.if_available) {
              this.ModifyPhoneResult = data.result
              store.dispatch('user/updateToken')
            // 如果电话不可用
            } else {
              this.ModifyPhoneResult = data.result
            }
          }).catch(error => {
            this.PhoneLoading = false
          })
        },
        ModifyRole() {
          this.RoleLoading = true
          this.ModifyRoleResult = ''
          // 调用api/modifyUserRole，修改权限，传参(user id, 修改后的role)
          modifyUserRole(this.$route.params.UserId.toString(), this.RolesRadio).then(response => {
            const { data } = response
            this.RoleLoading = false
            this.ifRoleAvailable = data.if_available
            // 如果权限可用
            if (data.if_available) {
              this.ModifyRoleResult = data.result
              store.dispatch('user/updateToken')
            // 如果权限不可用
            } else {
              this.ModifyRoleResult = data.result
            }
          }).catch(error => {
            this.RoleLoading = false
          })
        },

        // 获取当前编辑的用户的详情
        async getCurrentUserDetail(UserId) {
            // 如果UserId不是数字
            let _ = parseFloat(UserId).toString()
            if (_ == 'NaN') {
                if (UserId == 'add') {
                } else {
                    this.$router.push('/404')
                }
            // 如果UserId是数字
            } else {
                // 通过getIdInfo api，获取用户的昵称、头像、电话、权限，并赋值给currentUserDetail
                await getIdInfo(_).then(res => {
                    let TargetUser = res.data
                    this.CurrentUserDetail.name = TargetUser.name
                    this.CurrentUserDetail.avatar = TargetUser.avatar
                    this.CurrentUserDetail.phone = TargetUser.phone
                    this.CurrentUserDetail.roles = TargetUser.roles
                })
            }
        }
    },
    async mounted() {
        // 先根据路由，拿到当前用户的详细资料，并赋值给CurrentUserDetail
        await this.getCurrentUserDetail(this.$route.params.UserId)
        // 从CurrentUserDetail中取出avatar、name、phone等值，赋值到输入框里
        this.RolesRadio = this.CurrentUserDetail.roles
        this.nickname = this.CurrentUserDetail.name
        this.phone = this.CurrentUserDetail.phone
        this.avatar = this.CurrentUserDetail.avatar
        // 因为图像模块imageCropper和文章编辑模块是不同的模块，所以通过vuex传值
        // this.$store.dispatch('cropper/CropImage', this.CurrentUserDetail.avatar)
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