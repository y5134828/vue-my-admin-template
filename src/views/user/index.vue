<template>
  <div class="more-container">
    <el-row>
      <el-col>
        <el-form :inline="true" :model="searchForm" class="search-modal">
          <el-form-item>
            <el-input
              v-model="searchForm.keyword"
              placeholder="请输入名字"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="searchForm.phone"
              placeholder="请输入电话号"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleSearch">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="tab-wrap">
      <el-table
        v-loading="userListLoading"
        :data="userList"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="ID"
          align="center"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="用户名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="电话号码"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="ip"
          label="注册ip"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="channel"
          label="渠道"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="keyword"
          label="关键词"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="loginTime"
          label="登录时间"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="registeTime"
          label="注册时间"
          align="center"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="220">
          <template #default="{ row }">
            <el-button size="small">查看</el-button>
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
      <el-pagination
        background
        hide-on-single-page
        layout="prev, pager, next"
        :page-count="totlePage"
        @current-change="handlePaginateChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import { getUserList } from "@/api/userMock";
  export default {
    data() {
      return {
        searchForm: {
          keyword: "",
          phone: "",
        },
        userListLoading: true,
        totlePage: 1,
        userList: [],
      };
    },
    created() {
      console.log(this.$route);
      this._getUserList();
    },
    mounted() {},
    methods: {
      _getUserList: async function (val) {
        let res = await getUserList();
        setTimeout(() => {
          this.userList = res.data.userlist;
          this.totlePage = res.data.totlePage;
          this.userListLoading = false;
        }, 500);
      },
      handleSearch() {
        if (!this.searchForm["phone"] && !this.searchForm["keyword"]) {
          this.$baseMessage("请输入关键词", "warning");
          return false;
        }
        this.userListLoading = true;
        this._getUserList();
      },
      handlePaginateChange(val) {
        this.userListLoading = true;
        let res = this._getUserList(val);
      },
      handleBind(row) {
        console.log(row);
      },
    },
  };
</script>

<style lang="scss" scoped></style>
