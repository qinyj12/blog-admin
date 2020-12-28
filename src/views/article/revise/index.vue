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

    <div class="article-text">标签</div>
    <TagExist />

    <!-- 这是新增后的tag -->
    <el-tag 
        v-if="TagAdded" 
        @close="handleClose" 
        type="success" 
        closable 
        :disable-transitions='true'
    >
        {{TagAdded}}
    </el-tag>

    <!-- 这是用来新增的tag的输入框 -->
    <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
    >
    </el-input>

    <!-- 这是用来新增tag的按钮 -->
    <el-button 
        v-if="!inputVisible && !TagAdded" 
        class="button-new-tag" 
        size="small" 
        @click="showInput"
    >
        +新增标签
    </el-button>

  </div>
</template>

<script>
// 引入用el-upload和vue-cropper封装的图片裁剪上传组件
import ImageCropper from '@/components/ImageCropper/index'
// 引入tag-exist组件，这个组件也可以用在别的地方，所以单独封装
import TagExist from '@/components/TagExist/index'
// 引入store
import store from '@/store'

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
            inputVisible: false, // 文章标签
            inputValue: '', // 文章标签
            TagAdded: '' // 文章标签
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
        },

        // 只有新增的标签是closable的，点击close后调用的函数
        handleClose() {
            // 清空store仓库的状态，即清除点击已有tag后保存到仓库里的状态
            this.$store.dispatch('tags/ChooseTags', '')
            // 清空本地储存的tagadded状态
            this.TagAdded = ''
        },

        // 用来判断是显示el-input还是el-tag
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        // 新增tag（而不是从已有tag中选择）后调用的函数
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                // 此处是手动输入的tag名
                this.TagAdded = inputValue
            }
            this.inputVisible = false;
            this.inputValue = '';
        }
    },
    computed: {
        TagChosenInStore() {
            return store.getters.TagsChoosen
        }
    },
    watch: {
        TagChosenInStore() {
            this.TagAdded = store.getters.TagsChoosen
        }
    },
}
</script>

<style lang="scss" scoped>
// 引入font-awesome
@import url('https://cdn.bootcdn.net/ajax/libs/font-awesome/5.9.0/css/all.min.css');
// 引入mavon-editor的样式，对应的css标签是class="markdown-body"
@import '../../../../node_modules/mavon-editor/dist/css/index.css';
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

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

}
</style>

