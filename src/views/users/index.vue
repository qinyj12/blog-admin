<template>
    <div class="users-container">
        <div class="user-title">users</div>

        <el-table
            :data="tableData"
            border
            class="users-table"
        >
            <el-table-column prop="id" label="ID" width="50"></el-table-column>

            <el-table-column prop="name" label="昵称" ></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    tableData: [],
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
}
</style>