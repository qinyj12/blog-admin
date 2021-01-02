<template>
  <div class="dashboard-container">
    <div class="dashboard-text">你好 {{ name }}</div>
    <div class="dashboard-text">头像修改</div>

    <ImageCropper />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  // 引入imageCropper模块
  import ImageCropper from '@/components/ImageCropper/index'

  export default {
    name: 'Dashboard',
    components: {
      ImageCropper
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    }
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
    }
  }

</style>
