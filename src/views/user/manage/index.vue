<template>
    <div class="users-container">
        <div class="user-title">users</div>

        <el-table :data="tableData" border class="users-table">
            <el-table-column prop="id" label="ID" width="50"></el-table-column>
            <el-table-column prop="nickName" label="昵称" width="150"></el-table-column>
            <el-table-column prop="avatar" label="头像" width="100">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" class="user-avatar-img" />
                </template>
            </el-table-column>
            <el-table-column prop="jurisdiction" label="权限" width="150">
                <template slot-scope="scope">
                    <div class="jurisdiction-box">
                        <i :class="scope.row.jurisdiction == 'admin'? 'fas fa-user-shield' : 'fas fa-user-lock'" class="jurisdiction-icon"></i>
                        <span>{{scope.row.jurisdiction}}</span>
                    </div>

                </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="addTime" label="加入日期"></el-table-column>
            <el-table-column prop="recentlyActive" label="最近活跃"></el-table-column>
            <el-table-column prop="articleNum" label="博客数量" width="100"></el-table-column>
            <el-table-column prop="operation" label="操作" width="80">
                <template slot-scope="scope">
                    <el-button @click="ViewUser(scope.row)" type="text">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [
                {
                    id: '0', 
                    nickName: 'dog', 
                    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80', 
                    jurisdiction: 'admin',
                    phone: '17611595223',
                    addTime: '2021-01-20', 
                    recentlyActive: '2021-01-20', 
                    articleNum: '1'
                },
                {
                    id: '1', 
                    nickName: 'cat', 
                    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80', 
                    jurisdiction: 'guest',
                    phone: '13552501767',
                    addTime: '2020-11-01', 
                    recentlyActive: '2020-11-01', 
                    articleNum: '2'
                },
            ],
        }
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