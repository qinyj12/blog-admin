<template>
  <div class="dashboard-container">
    <div class="dashboard-text">你好 {{ name }}</div>
    <div class="dashboard-text">头像修改</div>

    <!-- 从父组件给图片剪切框传值 -->
    <ImageCropper :CropWidth="'200px'" :CropHeight="'200px'" />

    <div class="dashboard-text">昵称修改</div>
    <el-input
      v-model="nickname"
      placeholder="请输入昵称"
      suffix-icon="el-icon-user-solid"
      class="nickname-input"
    />
    <el-button 
      type="primary" 
      class="nickname-button" 
      :loading="InputLoading"
      @click="TestNickname"
    >
      检测可用性
    </el-button>
    <span 
      class="test-result" 
      :class="{
        'test-result-success':TestResult=='可用！',
        'test-result-fail':TestResult=='不可用！'
      }"
    >
      {{TestResult}}
    </span>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  // 引入imageCropper模块
  import ImageCropper from '@/components/ImageCropper/index'

  import store from '@/store'

  export default {
    name: 'Dashboard',
    data() {
      return {
        nickname: '',
        InputLoading: false, // 点击按钮检测昵称可用性，按钮要显示一个loading动画
        TestResult: '', // 检测昵称可用性后的结果
      }
    },
    components: {
      ImageCropper
    },
    computed: {
      ...mapGetters([
        'name', // 用vuex的mapgetters方法，拿到从getters.js中暴露出来的参数
        'avatar',
      ])
    },
    methods: {
      TestNickname() {
        this.InputLoading = true
        this.TestResult = ''
        setTimeout(() => {
          this.InputLoading = false
          this.TestResult = '不可用！'
        }, 1000);
      }
    },
    mounted() {
      this.nickname = this.name

      this.$store.dispatch('article/ReviseArticle', {ArticleCover: this.avatar})

      setTimeout(() => {
        // console.log(store.getters.ArticleRevising)
      }, 100);
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
      margin: 50px 0 10px 0;
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
</style>