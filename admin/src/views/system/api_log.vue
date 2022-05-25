<template>
  <div>
    <!-- 主体 -->
    <el-card>
      <!-- 搜索 添加 等功能区域-->
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="4">
          <el-input v-model="page.str" placeholder="请输入内容" clearable> </el-input>
        </el-col>
        <el-col :span="2.5">
          <el-button type="primary" icon="el-icon-search" @click="getPage()">查询</el-button>
        </el-col>
        <el-col :span="2.5">
          <el-button type="danger" @click="handleDelete_many()" class="el-icon-delete"> 批量删除</el-button>
        </el-col>
      </el-row>

      <div>
        <!-- 表格主体 区域-->
        <el-table :data="form" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="id" label="编号" width="90">
          </el-table-column>
          <!-- <el-table-column prop="user.id" label="用户ID" min-width="90">
          </el-table-column>
          <el-table-column prop="user.username" label="用户名" min-width="90">
          </el-table-column> -->
          <!-- <el-table-column prop="popedom.popedomname" label="操作名称" min-width="90">
          </el-table-column> -->
          <el-table-column prop="path" label="请求地址" min-width="120">
          </el-table-column>
          <el-table-column prop="method" label="请求方式" min-width="90">
            <template slot-scope="scope">
              {{scope.row.method.toLocaleUpperCase()}}
            </template>
          </el-table-column>
          <el-table-column prop="ip" label="ip" min-width="130">
          </el-table-column>
          <el-table-column prop="createdAt" label="请求时间" min-width="130">
          </el-table-column>
          <el-table-column prop="time_consuming" label="请求时间" min-width="80">
            <template slot-scope="scope">
              {{(scope.row.time_consuming/1000).toFixed(2)}} 秒

            </template>
          </el-table-column>
          <el-table-column prop="result" label="状态码" min-width="80">
            <template slot-scope="scope">
              {{scope.row.code}}
            </template>
          </el-table-column>
          <el-table-column prop="result" label="结果" min-width="200">
            <template slot-scope="scope">
              {{scope.row.result}}
            </template>
          </el-table-column>
          <!-- 表单操作区域 -->
          <el-table-column fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small" class="el-icon-delete">删除</el-button>

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
    <!-- 弹出框【增】 -->
    <el-dialog title="添加客户" :visible.sync="isCreate" width="600px" :close-on-click-modal="false" @close="close()">
      <apiLogUpdate :id="0"> </apiLogUpdate>
    </el-dialog>
    <!-- 弹出框【改】 -->
    <el-dialog title="编辑资料" :visible.sync="isEdit" width="600px" :close-on-click-modal="false" @close="close()">
      <apiLogUpdate :id="id" :key="id"> </apiLogUpdate>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "@/network/request.js";
import apiLogUpdate from '@/views/system/api_log_update'
// import cardAdmin2 from '@/views/main/cardAdmin2.vue'

export default {
  components: {
    apiLogUpdate,
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
        where: {},
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
        url: "/v0/api_log/all",
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
    },
    // 删
    async handleDelete(index, row) {
      let res = await request({
        url: "/v0/api_log",
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
        url: "/v0/api_log/many",
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
