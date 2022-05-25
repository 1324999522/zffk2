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
        <el-table :data="form" style="width: 100%">
          <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
          <el-table-column prop="id" label="编号" width="100">
          </el-table-column>
          <el-table-column prop="username" label="用户名" min-width="90">
          </el-table-column>
          <el-table-column prop="createdAt" label="申请时间" min-width="90">
          </el-table-column>
          <el-table-column prop="money" label="申请金额" min-width="90">
            <template slot-scope="scope">
              {{scope.row.money.toFixed(2)}} 元
            </template>
          </el-table-column>
          <el-table-column prop="fee" label="手续费" min-width="90">
            <template slot-scope="scope">
              {{scope.row.fee.toFixed(2)}} 元
            </template>
          </el-table-column>
          <el-table-column prop="after_money" label="提现后余额" min-width="90">
            <template slot-scope="scope">
              {{scope.row.after_money.toFixed(2)}} 元
            </template>
          </el-table-column>
          <el-table-column prop="status1" label="状态" min-width="90">
            <template slot-scope="scope">
              <el-tag size="medium" type="success" v-if="scope.row.status1 === '已完成'">{{ scope.row.status1 }}</el-tag>
              <el-tag size="medium" type="danger" v-if="scope.row.status1 === '待处理'"> {{scope.row.status1 }}</el-tag>
            </template>
          </el-table-column>

          <!-- 表单操作区域 -->
          <el-table-column fixed="right" label="操作" width="90">
            <template slot-scope="scope">
              <template>
                <el-button v-show="scope.row.status == 0 || !scope.row.status" slot="reference" type="text" size="small" class="el-icon-refresh-right" @click="is_handle_withdraw = true;withdraw=scope.row"> 处理完成</el-button>
              </template>

            </template>
          </el-table-column>
        </el-table>

      </div>
    </el-card>

    <el-dialog title="提示" :visible.sync="is_handle_withdraw" width="400px">
      <el-form ref="form" :model="withdraw" label-width="80px">
        <el-form-item label="付款方式" size="medium">
          <el-input v-model="withdraw.payMode" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="流水号">
          <el-input v-model="withdraw.payNumber" placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="is_handle_withdraw = false">取 消</el-button>
        <el-button type="primary" @click="is_handle_withdraw = false;update()">确 定</el-button>
      </span>
    </el-dialog>

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
      is_handle_withdraw: false,
      withdraw: {}
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
        url: "/v0/withdraw_record/page",
        method: 'get',
        params: this.page,
      });
      this.form = res.data.data.rows;
      this.count = res.data.data.count;
      return;
    },
    //==========================  ======================================
    // 查
    async update() {
      let res = await request({
        url: "/v0/withdraw_record",
        method: 'put',
        data: this.withdraw,
      });
    },
  },
  computed: {},
};
</script>

<style lang="less" >
</style>
