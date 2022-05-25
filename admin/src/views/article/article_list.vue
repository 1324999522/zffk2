<template>
  <div>
    <!-- 主体 -->
    <el-card>
      <!-- 搜索 添加 等功能区域-->
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="8">
          <el-input v-model="page.str" placeholder="请输入订单号" clearable> </el-input>
        </el-col>
        <el-col :span="2.5">
          <el-button type="primary" icon="el-icon-search" @click="getPage()">查询</el-button>
        </el-col>
        <el-col :span="2.5">
          <el-button type="primary" @click="isCreate = true" class="el-icon-plus">
            添加角色</el-button>
        </el-col>
        <el-col :span="2.5">
          <template>
            <el-popconfirm title="确认删除选中行吗?" @confirm='handleDelete_many()'>
              <el-button slot="reference" type="danger" class="el-icon-plus">批量删除</el-button>
            </el-popconfirm>
          </template>
        </el-col>
      </el-row>

      <div>
        <!-- 表格主体 区域-->
        <el-table :data="form" style="width: 100%" stripe @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="id" label="id" min-width="90">
          </el-table-column>
          <el-table-column prop="power" label="权限" min-width="90">
          </el-table-column>
          <el-table-column prop="title" label="文章标题" min-width="90">
          </el-table-column>
          <el-table-column prop="content" label="文章内容" min-width="90">
          </el-table-column>
          <!-- 表单操作区域 -->
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="handleUpdate(scope.$index, scope.row)" type="text" size="small" class="el-icon-edit">编辑</el-button>
              <template>
                <el-popconfirm style="margin-left:10px;" title="确认删除吗?" @confirm='handleDelete(scope.$index, scope.row)'>
                  <el-button slot="reference" type="text" size="small" class="el-icon-delete">删除</el-button>
                </el-popconfirm>
              </template>

            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100, 500]" :page-size="page.limit" layout="total, sizes,prev, pager, next,jumper" :total="count" style="margin-top: 20px">
          </el-pagination>
        </div>
      </div>
    </el-card>

  </div>
</template>

<script>
import { request } from "@/network/request.js";
// import cardAdmin2 from '@/views/main/cardAdmin2.vue'

export default {
  components: {

  },
  data() {
    return {
      id: null,
      form: [],
      //   必须的数据
      page: {
        // 分页查询的数据
        offset: 1,
        limit: 10,
      },
      count: 20,
      isCreate: false,
      isEdit: false,
      selection_rows: [],
    };
  },
  created() {
    this.page.where = this.$route.params;
    this.getPage();
  },
  methods: {
    // 分页查询方法
    handleSizeChange(val) {
      this.page.limit = val;
      this.getPage();
    },
    handleCurrentChange(val) {
      this.page.offset = val;
      this.getPage();
    },
    // 查
    async getPage() {
      let res = await request({
        url: "/merchant/article/page",
        method: 'get',
        params: this.page,
      });
      this.form = res.data.data.rows;
      this.count = res.data.data.count;
      return;
    },
    // 改
    handleUpdate(index, row) {
      this.id = row.id;
      this.isEdit = true;
      this.$router.push({
        name: 'article_create',
        params: {
          id: row.id
        }
      })
    },
    // 删
    async handleDelete(index, row) {
      let res = await request({
        url: "/merchant/article",
        method: 'delete',
        data: { id: row.id },
      });
      this.getPage();
    },
    // 多选
    handleSelectionChange(rows) {
      this.selection_rows = rows.map(i => i.id)
    },
    // 批量删除
    async handleDelete_many() {
      let res = await request({
        url: "/merchant/article/many",
        method: 'delete',
        data: {
          id: this.selection_rows,
        },
      })
      this.getPage();
    },
    // 关闭弹框 回调 重新请求数据
    close() {
      this.getPage();
    },
    //========================== 以上是必须的方法 ======================================
  },
  computed: {},
};
</script>

<style lang="less" >
</style>
