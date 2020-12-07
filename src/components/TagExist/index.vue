<template>
    <div class="tag-exist">
        <el-badge v-for="(item, index) in TagExist" :key="item.name" :value="item.num">
            <el-tag @click="ChooseTag(index)">{{item.name}}</el-tag>
        </el-badge>

        <el-tag v-if="TagAdded" @close="handleClose" type="success" closable :disable-transitions='true'>{{TagAdded}}</el-tag>

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

        <el-button v-if="!inputVisible && !TagAdded" class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
</template>
<script>
// 引入获取所有文章tag的api
import { GetTag } from '@/api/tag'
// 引入store
import store from '@/store'
export default {
    data() {
        return {
            TagExist: [],
            inputVisible: false,
            inputValue: '',
            TagAdded: ''
        }
    },
    mounted() {
        // 从外部api拿到已存在的tag
        GetTag().then(res => { this.TagExist = res })

        this.$watch('store.getters.TagsChoosen', function() {
            console.log('123')
        },{deep: true})
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
    methods: {
        // 点击已有tag，将这个tag保存到store仓库中
        ChooseTag(index) {
            const TagsChoosen = this.TagExist[index].name
            this.$store.dispatch('tags/ChooseTags', TagsChoosen)
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
}
</script>

<style lang="scss">
.tag-exist {
    .el-badge {
        margin-right: 20px;
        cursor: pointer;
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