<template>
  <div>
    <!-- 主体 -->
    <el-card>
      <!-- 搜索 添加 等功能区域-->
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="4">
          <el-input v-model="page.key_word" placeholder="请输入内容" clearable> </el-input>
        </el-col>
        <el-col :span="2.5">
          <el-button type="primary" icon="el-icon-search" @click="getPage()">查询</el-button>
        </el-col>
        <el-col :span="2.5">
          <el-button type="primary" @click="isCreate = true" class="el-icon-plus">
            添加权限</el-button>
        </el-col>
        <el-col :span="2.5">
          <el-button type="danger" @click="handleDelete_many()" class="el-icon-delete" > 批量删除</el-button>
        </el-col>
      </el-row>

      <div>
        <!-- 表格主体 区域-->
        <el-table :data="form"  style="width: 100%"  @selection-change="handleSelectionChange" row-key="id" :default-expand-all='false'  >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="id" label="编号" min-width="90">
          </el-table-column>
          <el-table-column prop="popedomname" label="操作名称" min-width="90" >
          </el-table-column>
          <el-table-column prop="path" label="path" min-width="90">
          </el-table-column>
          <el-table-column prop="method" label="请求方式" min-width="90">
          </el-table-column>
          <el-table-column label="状态" min-width="90">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" :active-value='1' active-color="#13ce66" inactive-color="#ff4949" @change='changeStatus(scope.row)'>
              </el-switch>
            </template>
          </el-table-column>
          <!-- 表单操作区域 -->
          <el-table-column fixed="right" label="操作" :width="$isPhone?'110':'150'">
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
    <el-dialog title="添加权限" :visible.sync="isCreate" width="600px" :close-on-click-modal="false" @close="close()">
      <popedomUpdate :id="0"> </popedomUpdate>
    </el-dialog>
    <!-- 弹出框【改】 -->
    <el-dialog title="编辑资料" :visible.sync="isEdit" width="600px" :close-on-click-modal="false" @close="close()">
      <popedomUpdate :id="id" :key="id"> </popedomUpdate>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "@/network/request.js";
import popedomUpdate from '@/views/system/popedom_update'
// import cardAdmin2 from '@/views/main/cardAdmin2.vue'

export default {
  components: {
    popedomUpdate,
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
        key_word:'',
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
        url: "/v0/popedom/all",
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
        url: "/v0/popedom",
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
        url: "/v0/popedom/many",
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
    async changeStatus(row) {

      let res = await request({
        url: "/v0/popedom",
        method: "put",
        data: row,
      })

      console.log(row)
    }
  },
  computed: {},
};
</script>

<style lang="less" >
</style>
