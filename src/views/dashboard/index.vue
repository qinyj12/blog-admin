<template>
  <div class="dashboard-container">
    <div class="dashboard-text">你好 {{ name }}</div>
    <div class="dashboard-text-small">头像修改</div>

    <!-- 从父组件给图片剪切框传值 -->
    <ImageCropper 
      :CropWidth="'100px'" 
      :CropHeight="'100px'" 
      :UploadFunc="uploadAvatarAPI"
      :TargetId="usid.toString()"
    />

    <div class="dashboard-text-small">昵称修改</div>
    <el-input
      v-model="nickname"
      placeholder="请输入昵称"
      suffix-icon="el-icon-user-solid"
      class="nickname-input"
    />
    <el-button 
      type="warning" 
      plain
      class="nickname-button" 
      :loading="InputLoading"
      @click="ModifyNickname"
    >
      确认修改
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
    
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  // 引入imageCropper模块
  import ImageCropper from '@/components/ImageCropper/index'
  // 引入vuex仓库 
  import store from '@/store'
  // 引入修改用户名的接口 
  import { modifyUserName } from '@/api/user'
  // 引入上传头像的接口
  import { uploadAvatar } from '@/api/user'
  export default {
    name: 'Dashboard',
    data() {
      return {
        nickname: '',
        InputLoading: false, // 点击按钮检测昵称可用性，按钮要显示一个loading动画
        ModifyNameResult: '', // 检测昵称可用性后的结果
        ifNameAvailable: null, // 昵称的可用性（后端返回结果）
        uploadAvatarAPI: uploadAvatar
      }
    },
    components: {
      ImageCropper
    },
    computed: {
      ...mapGetters([
        'name', // 用vuex的mapgetters方法，拿到从getters.js中暴露出来的参数
        'avatar',
        'usid'
      ])
    },
    methods: {
      ModifyNickname() {
        this.InputLoading = true
        this.ModifyNameResult = ''
        // 调用api/modifyUserName，修改用户名
        modifyUserName(this.usid, this.nickname).then(response => {
          const { data } = response
          this.InputLoading = false
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
          this.InputLoading = false
        })
      },
    },
    mounted() {
      this.nickname = this.name

      // 检测有没有成功给vuex赋值
      // setTimeout(() => {
      //   // console.log(store.getters.CroppedImage)
      // }, 100);
    },
  }

</script>

<style lang="scss" scoped>
  .dashboard {

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

  .dashboard-text-small {
    font-size: 20px;
    margin: 30px 0 10px 0;
  }

  // 昵称输入框
  .nickname-input {
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