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
            添加配置</el-button>
        </el-col>
        <el-col :span="2.5">
          <el-button type="danger" @click="handleDelete_many()" class="el-icon-plus">批量删除</el-button>
        </el-col>
      </el-row>

      <div>
        <!-- 表格主体 区域-->
        <el-table :data="form" border style="width: 100%" stripe @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="id" label="id" min-width="90">
          </el-table-column>
          <el-table-column prop="system_configname" label="配置名称" min-width="90">
          </el-table-column>
          <el-table-column prop="data_type" label="数据类型" min-width="90">
          </el-table-column>
          <el-table-column prop="key" label="key" min-width="90">
          </el-table-column>
          <el-table-column prop="value" label="value" min-width="90">
          </el-table-column>

          <!-- 表单操作区域 -->
          <el-table-column fixed="right" label="操作" width="205">
            <template slot-scope="scope">
              <el-button @click="handleUpdate(scope.$index, scope.row)" type="text" size="small" class="el-icon-edit">编辑</el-button>
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
      <systemConfigUpdate :id="0"> </systemConfigUpdate>
    </el-dialog>
    <!-- 弹出框【改】 -->
    <el-dialog title="编辑资料" :visible.sync="isEdit" width="600px" :close-on-click-modal="false" @close="close()">
      <systemConfigUpdate :id="id" :key="id"> </systemConfigUpdate>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "@/network/request.js";
import systemConfigUpdate from '@/components/config/system_config_update'
// import cardAdmin2 from '@/views/main/cardAdmin2.vue'

export default {
  components: {
    systemConfigUpdate,
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
        url: "/v0/system_config/all",
        method: 'get',
        params: this.page,
      });
      this.form = res.data.data.rows;
      this.count = res.data.data.count;
      this.$store.state.system_config = this.form
      console.log(this.$store.state.getConfig('system_first_color'))


    },
    // 改
    handleUpdate(index, row) {
      this.id = row.id;
      this.isEdit = true;
    },
    // 删
    async handleDelete(index, row) {
      let res = await request({
        url: "/v0/system_config",
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
        url: "/v0/system_config/many",
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
