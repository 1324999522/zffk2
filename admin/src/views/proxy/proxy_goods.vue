<template>
  <div>

    <!-- 主体 -->
    <el-card>

      <div v-if="merchants.length != 0" class='merchants_box'>
        <myCardList :data='merchants'> </myCardList>
      </div>

      <!-- 搜索 添加 等功能区域-->
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="4">
          <el-input v-model="page.str" placeholder="请输入商品名称" clearable> </el-input>
        </el-col>
        <el-col :span="2.5">
          <el-button type="primary" icon="el-icon-search" @click="getPage()">查询</el-button>
        </el-col>

      </el-row>

      <el-empty v-if="form.length==0" description="暂无可代理商品"></el-empty>

      <div v-if="form.length!=0">
        <!-- 表格主体 区域-->
        <el-table :data="form" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column prop="goodname" label="商品名称" min-width="180">
          </el-table-column>
          <el-table-column prop="price" label="成本价格" min-width="90">
            <template slot-scope="scope">
              {{ (scope.row.price * scope.row.proxy_discount * 0.1).toFixed(2) }} 元
            </template>
          </el-table-column>
          <el-table-column prop="noUse" label="剩余库存" min-width="90">
            <template slot-scope="scope">
              {{ scope.row.noUse }} 件
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" label="更新时间" min-width="165">
          </el-table-column>
          <!-- 表单操作区域 -->
          <el-table-column fixed="right" label="操作" :width="$isPhone?'90':'150'">
            <template slot-scope="scope">
              <el-button v-if="!scope.row.is_create" @click="handleCreate(scope.$index, scope.row)" type="primary" size="mini">立即添加</el-button>
              <el-tag v-if="scope.row.is_create" type="info">已添加</el-tag>
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
import goodUpdate from '@/views/goods/goods_list/good_update'
import myCardList from '@/components/my/my_card_list'
// import cardAdmin2 from '@/views/main/cardAdmin2.vue'

export default {
  components: {
    goodUpdate,
    myCardList,
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
      merchants: [],
    };
  },
  created() {
    this.page.where = this.$route.params;
    this.getPage();
    this.getMerchants()
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
        url: "/merchant/proxy/goods/page",
        method: 'get',
        params: this.page,
      });
      this.form = res.data.data.rows;
      this.count = res.data.data.count;
    },
    // 改
    handleUpdate(index, row) {
      this.id = row.id;
      this.isEdit = true;
    },
    // 删
    async handleDelete(index, row) {
      let res = await request({
        url: "/merchant/role",
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
        url: "/merchant/role/many",
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
    handleCreate(index, row) {
      this.$router.push({
        name: 'good_update',
        params: {
          pr_good: row,
        }
      })
    },
    // 获取上家列表
    async getMerchants() {
      let res = await request({
        url: "/merchant/proxy/merchant/all",
        method: 'get',
      });
      this.merchants = res.data.data
    },
  },
  computed: {},
};
</script>

<style lang="less" >
</style>
