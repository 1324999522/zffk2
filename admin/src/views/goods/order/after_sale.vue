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
          <el-table-column prop="createdAt" label="投诉时间" min-width="160">
          </el-table-column>
          <el-table-column prop="ordername" label="投诉订单号" min-width="120">
          </el-table-column>
          <el-table-column prop="qq" label="买家qq" min-width="90">
          </el-table-column>
          <el-table-column prop="email" label="买家邮箱号" min-width="140">
          </el-table-column>
          <el-table-column prop="type" label="投诉类型" min-width="90">
          </el-table-column>
          <el-table-column prop="reason" label="投诉原因" min-width="90">
          </el-table-column>
          <el-table-column prop="status" label="处理状态" min-width="90">
            <template slot-scope="scope">
              <el-tag size="medium" v-if="scope.row.status == 1">处理完成</el-tag>
              <el-tag size="medium" type="danger" v-if="scope.row.status == 0"> 待处理</el-tag>
            </template>
          </el-table-column>
          <!-- 表单操作区域 -->
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <template>
                <el-popconfirm style="margin-left:10px;" title="确认撤销投诉吗?" @confirm='handle_complete(scope.row)'>
                  <el-button v-show="scope.row.status == 0 || !scope.row.status" slot="reference" type="text" size="small" class="el-icon-refresh-right"> 处理完成</el-button>
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
      form: [],
      //   必须的数据
      page: {
        // 分页查询的数据
        offset: 1,
        limit: 10,
      },
      count: 20,
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
        url: "/merchant/after_sale/page",
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
        url: "/merchant/after_sale",
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
        url: "/merchant/after_sale/many",
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
    async handle_complete(row) {
      row.status = 1
      let res = await request({
        url: "/merchant/after_sale",
        method: 'put',
        data: row
      })
    }
  },
  computed: {},
};
</script>

<style lang="less" >
</style>
