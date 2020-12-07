<template>
  <div class="article-container">
    <div class="article-text">文章编辑</div>
    <mavon-editor
      v-model="value"
      class="mavon-editor"
      @save="save"
      @change="change"
    />
    <div class="function-area">
      <el-button>保存</el-button>
      <el-button type="primary">发布</el-button>
    </div>

    <!-- <div class="article-text">预览</div>
        <div class="markdown-body" v-html="render"></div> -->

    <div class="article-text">标题</div>
    <el-input
      v-model="title"
      placeholder="请输入标题"
      prefix-icon="fas fa-heading"
    />

    <div class="article-text">封面</div>
    <ImageCropper />

    <div class="article-text">类型</div>
    <TagExist />

  </div>
</template>

<script>
// 引入用el-upload和vue-cropper封装的图片裁剪上传组件
import ImageCropper from '@/components/ImageCropper/index'
// 引入tag-exist组件，这个组件也可以用在别的地方，所以单独封装
import TagExist from '@/components/TagExist/index'

export default {
    components: {
        ImageCropper,
        TagExist
    },
    data() {
        return {
            value: '', // mavon-editor的原内容
            render: '', // mavon-editor渲染后的内容
            title: '', // 文章的标题
        }
    },
    methods: {
        // mavon-editor 点击保存按钮
        save(value, render) {
            alert('save')
        },
        // mavon-editor 修改后触发
        change(value, render) {
            this.render = render
        }
    }
}
</script>

<style lang="scss" scoped>
// 引入font-awesome
@import url('https://cdn.bootcdn.net/ajax/libs/font-awesome/5.9.0/css/all.min.css');
// 引入mavon-editor的样式，对应的css标签是class="markdown-body"
@import '../../../node_modules/mavon-editor/dist/css/index.css';
.article-container {
    margin: 30px;

    .article-text {
        font-size: 30px;
        line-height: 46px;
        margin: 50px 0 10px 0;
        display: flex;
        align-items: center;
    }

    .article-text:before {
        content: '';
        display: inline-block;
        box-sizing: border-box;
        height: 30px;
        border-left: 10px solid rgb(25, 221, 196);
        margin-right: 10px;
    }

    .function-area {
        margin-top: 10px;
        text-align: right;
    }

}
</style>

