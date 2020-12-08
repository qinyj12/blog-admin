<template>
    <div class="tag-exist">
        <el-badge v-for="(item, index) in TagExist" :key="item.name" :value="item.num">
            <el-tag @click="ChooseTag(index)">{{item.name}}</el-tag>
        </el-badge>
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
            TagExist: []
        }
    },
    mounted() {
        // 从外部api拿到已存在的tag
        GetTag().then(res => { this.TagExist = res })

        this.$watch('store.getters.TagsChoosen', function() {
            console.log('123')
        },{deep: true})
    },
    methods: {
        // 点击已有tag，将这个tag保存到store仓库中
        ChooseTag(index) {
            const TagsChoosen = this.TagExist[index].name
            this.$store.dispatch('tags/ChooseTags', TagsChoosen)
        },
    },
}
</script>

<style lang="scss">
.tag-exist {
    display: inline-block;

    .el-badge {
        margin-right: 20px;
        cursor: pointer;
    }
}
</style>