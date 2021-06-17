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
        :UploadFunc="uploadCoverAPI"
        :TargetId="currentArticleId"
        :imageCutOutside='coverUrl'
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
    <MdEditor ref="mdEditor" :setDefaultValue="fatherValue"/>

    <div class="button-area">
        <el-button @click="SaveFunc">保存</el-button>
        <el-button type="primary" @click="PublishFunc">发布</el-button>
    </div>

  </div>
</template>

<script>
// 用vuex的mapgetters方法，拿到从getters.js中暴露出来的参数
import { mapGetters } from 'vuex'
// 引入md编辑器vditor
import MdEditor from '@/components/MdEditor/index'
// 引入用el-upload和vue-cropper封装的图片裁剪上传组件
import ImageCropper from '@/components/ImageCropper/index'
// 引入tag-exist组件，这个组件也可以用在别的地方，所以单独封装
import TagExist from '@/components/TagExist/index'
// 引入store
import store from '@/store'
// 引入GetArticleById api，获取文章信息
import { GetArticleById } from '@/api/article'
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
            content: '',  // 文章的正文
            fatherValue: this.giveValueToMdEditor
        }
    },
    methods: {
        async giveValueToMdEditor() {
            /* getCurrentAritlceDetail函数是用来获取当前文章信息的，然后赋值给页面的各个值里。
            之所以要写在giveValueToMdEditor函数里，是因为这个函数是作为prop传值给子组件vditor的，以此来定义vditor输入框的初始值。
            如果把getCurrentAritlceDetail放在别的地方执行（比如mounted），那giveValueToMdEditor就来不及获取到文章信息，
            也就无法把值传送给子组件vditor。 */ 
            await this.getCurrentAritlceDetail(this.$route.params.ArticleId)
            /* giveValueToMdEditor函数返回一个promise，这样才能在子组件vditor里等待promise执行完成、
            也就是文章的各个信息都获取完毕后，再加载子组件vditor的其他元素。 */
            return new Promise(resolve => {
                resolve(
                    {value: this.content}
                )                    

            })
            // return new Promise(resolve => {
            //     setTimeout(() => {
            //         resolve(console.log('father done'))
            //     }, 2000);
            // })
        },
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
                // 通过GetArticleById api，获取文章信息（用第二个参数true判断是否需要正文）
                await GetArticleById(articleId, true).then(res => {
                    // 然后把各个值赋值给对应的字段
                    const {data} = res
                    this.title = data.title
                    this.coverUrl = data.cover
                    this.TagAdded = data.tag
                    this.content = data.content

                    // 还没设置编辑文章的上传函数
                })
            }
        },
        // 在上传之前保证各项参数的合法性
        EnsureLegitimacy() {
            // 判断usid正不正常
            if (this.usid !== null && this.usid !== '') {
                // 判断 title是否合法（不为空，长度大于等于6）
                if (this.title && this.title.length >= 6) {
                    // 判断coverUrl是否为空
                    if (this.coverUrl) {
                        // 判断tag是否合法（不为空，不含空）
                        if (this.TagAdded && this.TagAdded.indexOf(' ') == -1) {
                            // 判断文章内容是否为空
                            if (this.$refs.mdEditor.contentEditor.getValue().length >= 10) {
                                return {result: true}
                            } else {
                                return {result: false, message:'文章内容不得少于100个字符'}
                            }
                        } else {
                            return {result: false, message:'文章标签不合法'}
                        }
                    } else {
                        return {result: false, message:'文章封面为空'}
                    }
                } else {
                    return {result: false, message:'文章标题不合法'}
                }
            } else {
                return {result: false, message:'用户信息错误'}
            }
        },
        // 延迟跳转文章发布页的函数
        JumpToArticlesManagementPage(time) {
            setTimeout(() => {
                this.$router.push('/articles/index')
            }, time);
        },
        PublishFunc() {
            // 还要判断当前文章是修改还是新增

            // 如果通过参数合法性判断
            const result = this.EnsureLegitimacy()
            // 以下为新增文章
            if (result.result) {
                const formData = new FormData()
                formData.append('user_id', this.usid)
                formData.append('article_title', this.title)
                formData.append('article_cover', this.coverUrl)
                formData.append('article_tag', this.TagAdded)
                formData.append('article_state', 'published')
                formData.append('article_md', this.$refs.mdEditor.contentEditor.getValue())
                this.uploadArticleFunc(formData, 2000)
                this.JumpToArticlesManagementPage(2000)
            } else {
                this.$message.error(result.message)
            }
        },
        // 保存文章的方法
        SaveFunc() {
            // this.content = 'save'
            // this.JumpToArticlesManagementPage(1000)
        },
        // 引入外部api，做一个新增文章的函数
        uploadArticleFunc(data, time) {
            uploadArticle(data).then(resp => {
                console.log(resp)
                this.$message({
                    message: '文章上传成功！将于' + time/1000 + '秒后跳转文章管理页',
                    type: 'success',
                    duration: time

                })
                // 上传成功后，跳转xx
                // 首先要判断是否上传成功
            })
        },
        // 上传文章cover的函数，根据情况判断是修改当前文章cover，还是为新增文章创建cover
        uploadCoverAPI(formdata) {
            console.log('调用uploadCoverAPI')
            // 如果是新建文章，调用addCover接口
            if (this.ArticleState() == 'new') {
                console.log('判断为编辑新文章')
                return addCover(formdata)
            // 如果是修改老文章，调用editCover接口
            } else {
                console.log('判断为修改老文章')
                return editCover(formdata)
            }
        },
        // 用于从子组件cropper拿到cover url，也就是说 子=>父，非父=>子
        getCoverUrl(url) {
            this.coverUrl = url
        }
    },
    computed: {
        // tagChosenInStore == 保存在store仓库里的tag值
        TagChosenInStore() {
            return store.getters.TagsChoosen
        },
        // 用vuex的mapgetters方法，拿到从getters.js中暴露出来的参数
        ...mapGetters([
            'usid' // 拿到保存在vuex中的user_id
        ])
    },
    watch: {
        // tagChosenInStore（保存在store仓库里的tag值）变化后，把值赋给本地参数tagAdded，因为不能直接监控store仓库
        TagChosenInStore() {
            this.TagAdded = store.getters.TagsChoosen
        }
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

