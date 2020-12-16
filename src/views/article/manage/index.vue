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
import { ArticleAuthor } from '@/api/user'
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
            
            res.map(Articleitem => {
                let _ = this.AuthorData.find(Authoritem => {
                    return Authoritem.id == Articleitem.author
                    
                })
                console.log(_)

                // _就是查找到到的与article所对应的author id相等的author信息，下一步要做的就是拿到_以后，怎么组合到原来的数据（tableData）里去，可以用省略号的语法
            })


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
}
</style>
