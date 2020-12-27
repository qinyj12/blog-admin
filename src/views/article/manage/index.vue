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
            
            <!-- <el-table-column
                prop="author"
                label="作者"
                width="150"
            >
            </el-table-column> -->

            <el-table-column
                prop="image"
                label="作者"
                width="100"
            >
                <template slot-scope="scope">
                    <!-- scope就是tableData -->
                    <img :src="scope.row.author" min-width="40" height="40" />
                    <!-- <span>123</span> -->
                </template>
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

            <el-table-column
                prop="operation"
                label="操作"
                width="80"
            >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text">查看</el-button>
                </template>
            </el-table-column>

            <!-- 怎么在这里加入按钮，点击查看封面图呢？或者直接以图片形式显示封面图 -->
            <!-- 然后用户旁边还要能显示头像 -->
        </el-table>

    </div>
</template>
<script>
// 引入get article的api
import { GetArticles } from '@/api/article'
// 引入ArticleAuthor 的ap
import { ArticleAuthor } from '@/api/author'
export default {
    data() {
        return {
            // 这是el-table里的数据
            tableData: [],
            // 这是用来存储author的对象
            AuthorData: []
        }
    },
    async mounted() {
        // 先把api临时定义的author信息获取了，并赋值
        await this.GetAuthor()

        GetArticles().then(res => {
            // getarticle只能拿到author的id，要再拿到author的其他信息
            let a = res.map(ArticleItem => {
                // 拿到想要的author的信息（authorData），从中找到符合articleItem.author == authorItem.id的authorData
                let _ = this.AuthorData.find(AuthorItem => {
                    return AuthorItem.id == ArticleItem.author
                })
                // 从authorItem中拿到author的头像，然后赋值给ArticleItem。ArticleItem组成了getArticle的res
                ArticleItem.author = _.avatar
            })
            // 把重新合成的res赋值给tableData
            this.tableData = res
            console.log(this.tableData)
        })
    },
    methods: {
        // 点击查看文章
        handleClick(value) {
            console.log(value)
        },
        // 获取文章作者
        async GetAuthor() {
            this.AuthorData = await ArticleAuthor()
        }
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
