<template>
    <div class="users-container">
        <div class="user-title">users</div>

        <el-table :data="tableData" border class="users-table">
            <el-table-column prop="id" label="ID" width="50"></el-table-column>
            <el-table-column prop="name" label="昵称" width="150"></el-table-column>
            <el-table-column prop="avatar" label="头像" width="100">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" class="user-avatar-img" />
                </template>
            </el-table-column>
            <el-table-column prop="roles" label="权限" width="150">
                <template slot-scope="scope">
                    <div class="jurisdiction-box">
                        <i :class="scope.row.roles == '管理员'? 'fas fa-user-shield' : 'fas fa-user-lock'" class="jurisdiction-icon"></i>
                        <span>{{scope.row.roles}}</span>
                    </div>

                </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="signup_time" label="加入日期"></el-table-column>
            <!-- <el-table-column prop="articleNum" label="博客数量" width="100"></el-table-column> -->
            <el-table-column prop="operation" label="操作" width="80">
                <template slot-scope="scope">
                    <el-button @click="ViewUser(scope.row)" type="text">查看</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="userTotalNum"
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
import { getAllUser } from '@/api/user'
export default {
    data() {
        return {
            tableData: [],
            userTotalNum: 0, // 用户总量，初始值0
            NumPerPage: 2, // 每个分页显示的数量
            rangeStart: 0, // 每次从后端拿的取值范围，即取[0:2]个user
            rangeEnd: 2, // 每次从后端拿的取值范围，即取[0:2]个user
        }
    },
    methods: {
        ViewUser(UserDetail) {
            this.$router.push({name: 'User', params: {UserId: UserDetail.id}})
        },
        // 获取文章作者
        TransJson(val) {
            return eval('(' + val + ')')
        },

        async GetUserInRange(range_start, range_end) {
            return await getAllUser(range_start, range_end)
        },
        // 点击下一页
        async nextClick() {
            this.rangeStart = this.rangeStart + this.NumPerPage
            this.rangeEnd = this.rangeEnd + this.NumPerPage
            const res = await this.GetUserInRange(this.rangeStart, this.rangeEnd)
            this.tableData = TransJson(res.data.userInRange)
        },
        // 点击下一页
        async preClick() {
            this.rangeStart = this.rangeStart - this.NumPerPage
            this.rangeEnd = this.rangeEnd - this.NumPerPage
            const res = await this.GetUserInRange(this.rangeStart, this.rangeEnd)
            this.tableData = this.TransJson(res.data.userInRange)
        },
        // 点击具体某一页码
        async handleCurrentChange(val) {
            this.rangeStart = val * this.NumPerPage - this.NumPerPage
            this.rangeEnd = val * this.NumPerPage
            const res = await this.GetUserInRange(this.rangeStart, this.rangeEnd)
            this.tableData = this.TransJson(res.data.userInRange)
        }
    },
    async mounted() {
        const res = await this.GetUserInRange(this.rangeStart, this.rangeEnd)
        this.userTotalNum = res.data.totalNum
        this.tableData = this.TransJson(res.data.userInRange)
        
    },
    
}
</script>

<style lang="scss" scoped>
.users-container {
    margin: 30px;
    .user-title {
        font-size: 30px;
        line-height: 46px;
        margin: 50px 0 50px 0;
        display: flex;
        align-items: center;
    }

    .user-title:before {
      content: '';
      display: inline-block;
      box-sizing: border-box;
      height: 30px;
      border-left: 10px solid rgb(25, 221, 196);
      margin-right: 10px;
    }

    .user-avatar-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .jurisdiction-box {
        .jurisdiction-icon {
            margin-right: 5px;
        }
    }
}
</style>

<style lang="scss">
.el-table td, .el-table th {
    text-align: center;
}
</style>