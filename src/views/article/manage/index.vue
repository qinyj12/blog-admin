<template>
    <div class="article-manage-container">
        <div class="article-manage-text">文章管理</div>

        <el-table :data="tableData" border class="article-table">
            <el-table-column prop="id" label="ID" width="50"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column label="作者" width="80">
                <template slot-scope="scope">
                    <div class="table-author">
                        <!-- scope就是tableData -->
                        <img :src="scope.row.user_avatar" class="table-author-img"/>
                        <span class="table-author-name">{{scope.row.user_name}}</span>
                        <!-- <span>123</span> -->
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="create_time" label="时间" width="150"></el-table-column>
            
            <el-table-column prop="cover" label="封面图" width="200">
                <template slot-scope="scope">
                    <div class="table-cover">
                        <img :src="scope.row.cover" class="table-cover-img" />
                    </div>
                </template>
            </el-table-column>

            <el-table-column label="状态" width="80">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.state == '已发布' ? 'success' : 'warning'" disable-transitions>
                        {{scope.row.state}}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="operation" label="操作" width="60">
                <template slot-scope="scope">
                    <el-button @click="ViewArticle(scope.row)" type="text">查看</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="articleTotalNum"
                :page-size="2"
                :hide-on-single-page="true"
                @next-click="nextClick"
                @prev-click="preClick"
                @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { getAllArticle } from '@/api/article'
export default {
    data() {
        return {
            tableData: [],
            articleTotalNum: 0, // 用户总量，初始值0
            NumPerPage: 2, // 每个分页显示的数量
            rangeStart: 0, // 每次从后端拿的取值范围，即取[0:2]个user
            rangeEnd: 2, // 每次从后端拿的取值范围，即取[0:2]个user
        }
    },
    methods: {
        ViewArticle(ArticleDetail) {
            this.$router.push({name: 'Article', params: {ArticleId: ArticleDetail.id}})
        },
        // 这是用来转换json格式的函数
        TransJson(val) {
            return eval('(' + val + ')')
        },
        async GetArticleInRange(range_start, range_end) {
            return await getAllArticle(range_start, range_end)
        },
        // 点击下一页
        async nextClick() {
            this.rangeStart = this.rangeStart + this.NumPerPage
            this.rangeEnd = this.rangeEnd + this.NumPerPage
            const res = await this.GetArticleInRange(this.rangeStart, this.rangeEnd)
            this.tableData = TransJson(res.data.articleInRange)
        },
        // 点击下一页
        async preClick() {
            this.rangeStart = this.rangeStart - this.NumPerPage
            this.rangeEnd = this.rangeEnd - this.NumPerPage
            const res = await this.GetArticleInRange(this.rangeStart, this.rangeEnd)
            this.tableData = this.TransJson(res.data.articleInRange)
        },
        // 点击具体某一页码
        async handleCurrentChange(val) {
            this.rangeStart = val * this.NumPerPage - this.NumPerPage
            this.rangeEnd = val * this.NumPerPage
            const res = await this.GetArticleInRange(this.rangeStart, this.rangeEnd)
            this.tableData = this.TransJson(res.data.articleInRange)
        }
    },
    async mounted() {
        const res = await this.GetArticleInRange(this.rangeStart, this.rangeEnd)
        this.articleTotalNum = res.data.totalNum
        this.tableData = this.TransJson(res.data.articleInRange)
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
        margin: 50px 0 10px 0;
        display: flex;
        align-items: center;
    }
    .article-manage-text:before {
        content: '';
        display: inline-block;
        box-sizing: border-box;
        height: 30px;
        border-left: 10px solid rgb(25, 221, 196);
        margin-right: 10px;
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
                border-radius: 5px;
            }
        }
    }
}
</style>


<style lang="scss">
.el-table td, .el-table th {
    text-align: center;
}
</style>