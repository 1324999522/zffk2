<template>
  <div>
    <!-- 主体 -->
    <el-card>
      <!-- 搜索 添加 等功能区域-->
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="4">
          <el-input v-model="page.str" placeholder="请输入订单号" clearable> </el-input>
        </el-col>
        <el-col :span="2.5">
          <el-button type="primary" icon="el-icon-search" @click="getPage()">查询</el-button>
        </el-col>

      </el-row>

      <div>
        <!-- 表格主体 区域-->
        <el-table :data="form" style="width: 100%" >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="id" label="编号" min-width="90">
          </el-table-column>
          <el-table-column prop="createdAt" label="申请时间" min-width="90">
          </el-table-column>
          <el-table-column prop="money" label="申请金额" min-width="90">
            <template slot-scope="scope">
              {{scope.row.money.toFixed(2)}}
            </template>
          </el-table-column>
          <el-table-column prop="fee" label="手续费" min-width="90">
            <template slot-scope="scope">
              {{scope.row.fee.toFixed(2)}}
            </template>
          </el-table-column>
          <el-table-column prop="after_money" label="提现后余额" min-width="90">
            <template slot-scope="scope">
              {{scope.row.after_money.toFixed(2)}} 元
            </template>
          </el-table-column>
          <el-table-column prop="status1" label="状态" min-width="90">
            <template slot-scope="scope">
              <el-tag size="medium" v-if="scope.row.status1 === '已完成'">{{ scope.row.status1 }}</el-tag>
              <el-tag size="medium" type="danger" v-if="scope.row.status1 === '待处理'"> {{scope.row.status1 }}</el-tag>
            </template>

          </el-table-column>
        </el-table>

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
    };
  },
  created() {
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
        url: "/merchant/withdraw_record/page",
        method: 'get',
        params: this.page,
      });
      this.form = res.data.data.rows;
      this.count = res.data.data.count;
      return;
    },
    //========================== 以上是必须的方法 ======================================
  },
  computed: {},
};
</script>

<style lang="less" >
</style>
