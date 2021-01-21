<template>
  <div class="user-container">
    <div class="user-text-small">编辑头像</div>

    <!-- 从父组件给图片剪切框传值 -->
    <ImageCropper :CropWidth="'100px'" :CropHeight="'100px'" />

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
      @click="TestNickname"
    >
      检测可用性
    </el-button>
    <span 
      class="test-result" 
      :class="{
        'test-result-success':TestNameResult=='可用！',
        'test-result-fail':TestNameResult=='不可用！'
      }"
    >
      {{TestNameResult}}
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
      @click="TestPhone"
    >
      检测可用性
    </el-button>
    <span 
      class="test-result" 
      :class="{
        'test-result-success':TestPhoneResult=='可用！',
        'test-result-fail':TestPhoneResult=='不可用！'
      }"
    >
      {{TestPhoneResult}}
    </span>

    <div class="user-text-small">编辑权限</div>
    <el-radio-group v-model="JurisdictionRadio">
      <el-radio-button label="管理员"></el-radio-button>
      <el-radio-button label="作者"></el-radio-button>
      <el-radio-button label="访客" disabled></el-radio-button>
    </el-radio-group>

    <div class="submit-button">
      <el-button type="primary" @click="SaveInfo">保存更改</el-button>
    </div>
    

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  // 引入imageCropper模块
  import ImageCropper from '@/components/ImageCropper/index'
  // 引入vuex仓库 
  import store from '@/store'
  // 引入修改用户信息的接口 
  import { changeInfo } from '@/api/user'
  // 引入ArticleAuthor 的api
import { ArticleAuthor } from '@/api/author'

  export default {
    name: 'Dashboard',
    data() {
        return {
            nickname: '',
            NicknameLoading: false, // 点击按钮检测昵称可用性，按钮要显示一个loading动画
            TestNameResult: '', // 检测昵称可用性后的结果
            phone: '',
            PhoneLoading: false, 
            TestPhoneResult: '',
            JurisdictionRadio: '',
            CurrentUserDetail: {} // 根据路由拿到当前用户的id，从api取值后赋值给CurrentUserDetail

        }
    },
    components: {
        ImageCropper
    },
    computed: {

    },
    methods: {
        TestNickname() {
            this.NicknameLoading = true
            this.TestNameResult = ''
            setTimeout(() => {
                this.NicknameLoading = false
                this.TestNameResult = '不可用！'
            }, 1000);
        },
        TestPhone() {
            this.PhoneLoading = true
            this.TestPhoneResult = ''
            setTimeout(() => {
                this.PhoneLoading = false
                this.TestPhoneResult = '不可用！'
            }, 1000);
        },
        // 保存用户信息
        SaveInfo() {
            changeInfo(store.getters.token).then(res => console.log(res))
        },

        // 获取当前编辑的文章的详情
        async getCurrentUserDetail(UserId) {
            // 如果UserId不是数字
            let _ = parseFloat(UserId).toString()
            if (_ == 'NaN') {
                if (UserId == 'new') {
                    // 啥也不用管
                } else {
                    this.$router.push('/404')
                }
            // 如果UserId是数字
            } else {
                // 通过ArticleAuthor api，获取用户的昵称、头像、电话、权限，并赋值给currentUserDetail
                await ArticleAuthor().then(res => {
                    let TargetUser = res.find(_ => {return _.id == UserId})
                    this.CurrentUserDetail.name = TargetUser.name
                    this.CurrentUserDetail.avatar = TargetUser.avatar
                    this.CurrentUserDetail.phone = TargetUser.phone
                    this.CurrentUserDetail.jurisdiction = TargetUser.jurisdiction
                })
            }
        }
    },
    async mounted() {
        // 先根据路由，拿到当前用户的详细资料，并赋值给CurrentUserDetail
        await this.getCurrentUserDetail(this.$route.params.UserId)
        // 从CurrentUserDetail中取出avatar、name、phone等值，赋值到输入框里
        this.JurisdictionRadio = this.CurrentUserDetail.jurisdiction
        this.nickname = this.CurrentUserDetail.name
        this.phone = this.CurrentUserDetail.phone
        // 因为图像模块imageCropper和文章编辑模块是不同的模块，所以通过vuex传值
        this.$store.dispatch('cropper/CropImage', this.CurrentUserDetail.avatar)
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