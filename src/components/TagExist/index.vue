<template>
    <div class="tag-exist">
        <el-badge v-for="(item, index) in TagExist" :key="item.tag" :value="item.num">
            <el-tag @click="ChooseTag(index)">{{item.tag}}</el-tag>
        </el-badge>
    </div>
</template>
<script>
// 引入统计tag频次的接口
import { getTags } from '@/api/article'

export default {
    data() {
        return {
            TagExist: []
        }
    },
    mounted() {
        // 从外部api拿到已存在的tag，传入的值代表统计频次的最大范围
        getTags(6).then(resp => {
            const { data } = resp
            this.TagExist = data
        })
        
        this.$watch('store.getters.TagsChoosen', function() {
            console.log('123')
        },{deep: true})
    },
    methods: {
        // 点击已有tag，将这个tag保存到store仓库中
        ChooseTag(index) {
            const TagsChoosen = this.TagExist[index].tag
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