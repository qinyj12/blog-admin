<template>
    <div class="article-manage-container">
        <div class="article-manage-text">文章管理</div>

        <el-table
            :data="tableData"
            border
            class="article-table"
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
                label="作者"
                width="100"
            >
                <template slot-scope="scope">
                    <div class="table-author">
                        <!-- scope就是tableData -->
                        <img :src="scope.row.avatar" class="table-author-img"/>
                        <span class="table-author-name">{{scope.row.author}}</span>
                        <!-- <span>123</span> -->
                    </div>
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
                <template slot-scope="scope">
                    <div class="table-cover">
                        <img :src="scope.row.cover" class="table-cover-img" />
                    </div>
                </template>
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
            res.map(ArticleItem => {
                // 拿到想要的author的信息（authorData），从中找到符合articleItem.author == authorItem.id的authorData
                let _ = this.AuthorData.find(AuthorItem => {
                    return AuthorItem.id == ArticleItem.author
                })
                // 从authorItem中拿到author的头像，然后赋值给ArticleItem。ArticleItem组成了getArticle的res
                ArticleItem.avatar = _.avatar
                ArticleItem.author = _.name
            })
            // 把重新合成的res赋值给tableData
            this.tableData = res
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

    .article-table {
        width: 100%;

        .table-author {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0;
            .table-author-img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
            .table-author-name {
                margin: 0;
            }
        }
        .table-cover {
            display: flex;
            justify-content: center;
            .table-cover-img {
                width: 95%;
                margin: 0;
            }
        }
    }
}
</style>
