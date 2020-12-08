<template>
    <div class="article-manage-container">
        <div class="article-manage-text">文章管理</div>

        <el-table
            :data="tableData"
            border
            style="width: 100%"
        >
            <el-table-column
                prop="id"
                label="ID"
                width="50"
            >
            </el-table-column>

            <el-table-column
                prop="title"
                label="标题"
            >
            </el-table-column>
            
            <el-table-column
                prop="author"
                label="作者"
                width="150"
            >
            </el-table-column>
            
            <el-table-column
                prop="time"
                label="时间"
                width="150"
            >
            </el-table-column>
            
            <el-table-column
                prop="cover"
                label="封面图"
                width="200"
            >
            </el-table-column>
            <!-- 怎么在这里加入按钮，点击查看封面图呢？或者直接以图片形式显示封面图 -->
            <!-- 然后用户旁边还要能显示头像 -->
        </el-table>

    </div>
</template>
<script>
import { GetArticles } from '@/api/article'
export default {
    data() {
        return {
            tableData: []
        }
    },
    mounted() {
        GetArticles().then(res => {this.tableData = res})
    },
}
</script>

<style lang="scss" scoped>
.article-manage-container {
    margin: 30px;

    * {
        margin-top: 10px;
    }

    .article-manage-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
