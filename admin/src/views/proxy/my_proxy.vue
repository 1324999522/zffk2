<template>
  <div>
    <!-- 主体 -->
    <el-card>
      <!-- 搜索 添加 等功能区域-->
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="4">
          <el-input v-model="page.str" placeholder="请输入代理商名称" clearable> </el-input>
        </el-col>
        <el-col :span="2.5">
          <el-button type="primary" icon="el-icon-search" @click="getPage()">查询</el-button>
        </el-col>
        <el-col :span="2.5">
          <el-button type="primary" @click="isCreate = true" class="el-icon-plus">
            添加代理</el-button>
        </el-col>

      </el-row>

      <div>
        <!-- 表格主体 区域-->
        <el-table :data="form">
          <!-- <el-table-column type="selection" width="55"> </el-table-column> -->

          <el-table-column prop="proxy_merchants_name" label="代理商名称" min-width="140">
          </el-table-column>
          <el-table-column prop="Sales_today" label="今日销售额" min-width="90">
            <template slot-scope="scope">
              {{scope.row.Sales_today || 0}} 元
            </template>
          </el-table-column>
          <el-table-column prop="Sales_total" label="历史销售额" min-width="90">
            <template slot-scope="scope">
              {{scope.row.Sales_total || 0}} 元
            </template>
          </el-table-column>
          <el-table-column prop="Sales_count" label="销售卡数" min-width="90">
            <template slot-scope="scope">
              {{scope.row.Sales_count || 0}} 张
            </template>
          </el-table-column>
          <el-table-column prop="goods_count" label="已代理商品" min-width="90">
            <template slot-scope="scope">
              {{scope.row.goods_count || 0}}
            </template>
          </el-table-column>
          <el-table-column prop="proxy_discount" label="代理折扣" min-width="90">
            <template slot-scope="scope">
              {{scope.row.proxy_discount}} 折
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="加入时间" min-width="165">
          </el-table-column>
          <!-- 表单操作区域 -->
          <el-table-column fixed="right" label="操作" :width="$isPhone?'110':'180'">
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

    <!-- 弹出框【增】 -->
    <el-dialog title="添加代理商" :visible.sync="isCreate" width="400px" :close-on-click-modal="false" @close="close()">
      <myProxyUpdate :id="0"> </myProxyUpdate>
    </el-dialog>
    <!-- 弹出框【改】 -->
    <el-dialog title="编辑资料" :visible.sync="isEdit" width="400px" :close-on-click-modal="false" @close="close()">
      <myProxyUpdate :id="id" :key="id"> </myProxyUpdate>
    </el-dialog>

  </div>
</template>

<script>
import { request } from "@/network/request.js";
import myProxyUpdate from '@/views/proxy/my_proxy_update'
// import cardAdmin2 from '@/views/main/cardAdmin2.vue'

export default {
  components: {
    myProxyUpdate,
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
        url: "/merchant/proxy/page",
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
        url: "/merchant/proxy",
        method: 'delete',
        data: { id: row.id },
      });
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
