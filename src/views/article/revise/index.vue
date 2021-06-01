<template>
  <div class="article-container">
    <!-- <div class="article-text">文章编辑</div> -->

    <div class="article-text">标题</div>
    <el-input
      v-model="title"
      placeholder="请输入标题"
      prefix-icon="fas fa-heading"
    />

    <div class="article-text">封面</div>
    <ImageCropper 
        :CropWidth="'360px'" 
        :CropHeight="'180px'" 
        :UploadFunc="uploadCoverAPI()"
        :TargetId="currentArticleId"
        @getImgUrl="getCoverUrl"
    />

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

    <!-- 这是用来新增tag的输入框 -->
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

    <div class="article-text">内容</div>
    <MdEditor ref="mdEditor" />

    <div class="button-area">
        <el-button>保存</el-button>
        <el-button type="primary" @click="demofunc">发布</el-button>
    </div>

  </div>
</template>

<script>
// 引入md编辑器vditor
import MdEditor from '@/components/MdEditor/index'
// 引入用el-upload和vue-cropper封装的图片裁剪上传组件
import ImageCropper from '@/components/ImageCropper/index'
// 引入tag-exist组件，这个组件也可以用在别的地方，所以单独封装
import TagExist from '@/components/TagExist/index'
// 引入store
import store from '@/store'
// 引入GetContent api，获取正文
import { GetContent } from '@/api/article'
// 引入GetArticles api，获取文章标题、封面等
import { GetArticles } from '@/api/article'
// 引入保存article的接口
import { uploadArticle } from '@/api/article'
// 引入为新文章创建cover 的接口，或者为老文章修改cover的接口
import { addCover, editCover } from '@/api/article'

export default {
    components: {
        MdEditor,
        ImageCropper,
        TagExist
    },
    data() {
        return {
            title: '', // 文章的标题
            inputVisible: false, // 文章标签
            inputValue: '', // 文章标签
            TagAdded: '', // 文章标签
            currentArticleDetail: {}, // 当前要编辑的文章详情（标题、正文、tag、cover）
            currentArticleId: '', // 当前文章的id，只有当修改旧文章时，才有有id
            coverUrl: '', // 文章封面的url，这个值是子组件imageCropper传来的
        }
    },
    methods: {
        // 判断当前页面是新增新文章，还是修改老文章。如果是修改老文章，则返回文章id
        ArticleState() {
            // 从url中拿到articleId，判断是否是新建文章
            let ArticleIdInUrl = this.$route.params.ArticleId
            // 如果articleId不是数字
            let _ = parseFloat(ArticleIdInUrl).toString()
            if (_ == 'NaN') {
                if (ArticleIdInUrl == 'new') {
                    return 'new'
                } else {
                    this.$router.push('/404')
                }
            // 如果articleId是数字
            } else {
                this.currentArticleId = ArticleIdInUrl
                return this.currentArticleId
            }
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
        },

        // 获取当前编辑的文章的详情
        async getCurrentAritlceDetail(articleId) {
            // 如果articleId不是数字
            let _ = parseFloat(articleId).toString()
            if (_ == 'NaN') {
                if (articleId == 'new') {
                    // 啥也不用管
                } else {
                    this.$router.push('/404')
                }
            // 如果articleId是数字
            } else {
                // 通过getcontent api，获取文章的正文，并赋值给currentArticleDetail
                await GetContent(articleId).then(res => {
                    this.currentArticleDetail.content = res
                })

                // 通过getarticle api，获取文章的标题、标签、cover，并赋值给currentArticleDetail
                await GetArticles().then(res => {
                    let TargetArticle = res.find(_ => {return _.id == articleId})
                    this.currentArticleDetail.title = TargetArticle.title
                    this.currentArticleDetail.tag = TargetArticle.tag
                    this.currentArticleDetail.cover = TargetArticle.cover
                })
            }
        },
        demofunc() {
            console.log(this.$refs.mdEditor.contentEditor.getValue())
            // 下一步，改造cover的传参，应该在FileStorage里面，而不是普通的键值对
            // const formData = new FormData()
            // formData.append('user_id', '0')
            // formData.append('article_title', '123')
            // formData.append('article_cover', 'cover.jpg')
            // formData.append('article_tag', 'tag')
            // formData.append('article_state', 'state')
            // formData.append('article_md', this.contentEditor.getValue())
            
            // this.uploadArticleFunc(formData)
        },
        // 引入外部api，做一个新增文章的函数
        uploadArticleFunc(data) {
            uploadArticle(data).then(resp => console.log(resp))
        },
        // 上传文章cover的函数，根据情况判断是修改当前文章cover，还是为新增文章创建cover
        uploadCoverAPI() {
            console.log('调用uploadCoverAPI')
            // 如果是新建文章，调用addCover接口
            if (this.ArticleState() == 'new') {
                console.log('判断为编辑新文章')
                return addCover
            // 如果是修改老文章，调用editCover接口
            } else {
                console.log('判断为修改老文章')
                return editCover
            }
        },
        // 用于从子组件cropper拿到cover url
        getCoverUrl(url) {
            this.coverUrl = url
        }
    },
    computed: {
        // tagChosenInStore == 保存在store仓库里的tag值
        TagChosenInStore() {
            return store.getters.TagsChoosen
        }
    },
    watch: {
        // tagChosenInStore（保存在store仓库里的tag值）变化后，把值赋给本地参数tagAdded，因为不能直接监控store仓库
        TagChosenInStore() {
            this.TagAdded = store.getters.TagsChoosen
        }
    },
    async mounted() {
        // 获取当前要编辑的文章的详情，在函数内已经把详情赋值给currentArticleDetail了
        await this.getCurrentAritlceDetail(this.$route.params.ArticleId)
        // 把文章的title、content、tag分别赋值给对应的变量
        this.value = this.currentArticleDetail.content
        this.title = this.currentArticleDetail.title
        this.TagAdded = this.currentArticleDetail.tag
        // 因为图像模块imageCropper和文章编辑模块是不同的模块，所以通过vuex传值
        this.$store.dispatch('cropper/CropImage', this.currentArticleDetail.cover)
    },

}
</script>

<style lang="scss" scoped>
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

    .button-area {
        padding: 10px 0;
        display: flex;
        justify-content: flex-end;
    }

}
</style>

