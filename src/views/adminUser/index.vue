<template>
  <div class="more-container">
    <div class="top">
      <el-button type="primary" class="add-admin">添加管理员</el-button>
    </div>
    <div class="list-wrap">
      <el-table :data="listData" style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="name" label="名字"></el-table-column>
        <el-table-column prop="permission" label="权限名称"></el-table-column>
        <el-table-column prop="disabled" label="是否启用"></el-table-column>
        <el-table-column label="操作">
          <template #defalute="{ row }">
            <el-button size="small">编辑</el-button>
            <el-button
              :type="row.disabled == 0 ? 'danger' : 'success'"
              size="small"
              @click="handleBind(row)"
            >
              禁用
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        listData: [],
      };
    },
    computed() {},
    created() {},
    methods: {
      _getAdminUserList() {},
      handleBind() {},
    },
  };
</script>

<style lang="scss" scoped>
  .more-container {
    .top {
      .add-admin {
        border-radius: 5p;
      }
    }
    .list-wrap {
      margin-top: 20px;
    }
  }
</style>
