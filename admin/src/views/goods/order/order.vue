<template>
  <div>
    <!-- 主体 -->
    <el-card>
      <!-- 搜索 添加 等功能区域-->
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="4">
          <el-select v-model="page.is_proxy_order" placeholder="请选择状态" @change="getPage()">
            <el-option v-for="item in [{name:'我的订单',value:0},{name:'代理商订单',value:1}]" :key="item.value" :label="item.name" :value="item.value"></el-option>

          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="page.str" placeholder="请输入订单号" clearable> </el-input>
        </el-col>
        <el-col :span="2.5">
          <el-button type="primary" icon="el-icon-search" @click="getPage()">查询</el-button>
        </el-col>

        <el-col :span="2.5">
          <el-button type="primary" @click="is_screen = !is_screen" class="el-icon-arrow-down">
            筛选</el-button>
        </el-col>
      </el-row>
      <!-- 第二行 -->
      <transition name="el-zoom-in-center">

        <el-row v-show="is_screen" :gutter="25" style="margin-bottom: 20px">

          <el-col :span="3">
            <el-select v-model="good_type_id" placeholder="请选择分类" @change="get_goods()">
              <el-option v-for="item in good_types" :key="item.id" :label="item.good_typename" :value="item.id"></el-option>
            </el-select>
          </el-col>

          <el-col :span="3">
            <el-select v-model="page.good_id" placeholder="请选择商品" @change="getPage()">
              <el-option v-for="item in goods" :key="item.id" :label="item.goodname" :value="item.id"></el-option>
            </el-select>
          </el-col>

          <el-col :span="3">
            <el-select v-model="page.payMode" placeholder="支付方式" @change='getPage()'>
              <el-option label="手动提卡" value="手动提卡"></el-option>
              <el-option label="支付宝" value="支付宝"></el-option>
            </el-select>
          </el-col>

          <el-col :span="3">
            <el-select v-model="page.status" placeholder="支付状态" @change='getPage()'>
              <el-option label="已支付" value="已支付"></el-option>
              <el-option label="未支付" value="未支付"></el-option>
            </el-select>
          </el-col>

          <el-col :span="7.5">
            <div class="block">
              <el-date-picker v-model="page.createdAt" @change='handleDateTime()' :picker-options="pickerOptions" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span="2.5">
            <el-button type="primary" class='el-icon-refresh' @click="cleanAllOption()">
              清空条件</el-button>
          </el-col>

        </el-row>

      </transition>

      <div>
        <!-- 表格主体 区域-->
        <el-table :data="form" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <!-- <el-table-column type="index" width="50"> </el-table-column> -->
          <!-- <el-table-column prop="id" label="id" width="70" align='center'>
          </el-table-column> -->
          <!-- <el-table-column type="expand" >
            <template slot-scope="props">
              <el-descriptions>
                <el-descriptions-item label="订单号">{{props.row.ordername}}</el-descriptions-item>
                <el-descriptions-item label="购买数量">{{props.row.count}}</el-descriptions-item>
                <el-descriptions-item label="支付方式">{{props.row.payMode}}</el-descriptions-item>
                <el-descriptions-item label="应发卡密">{{props.row.payMode}}</el-descriptions-item>
                <el-descriptions-item label="已发卡密">{{props.row.payMode}}</el-descriptions-item>
                <el-descriptions-item label="订单状态">{{props.row.payMode}}</el-descriptions-item>
                <el-descriptions-item label="备注">

                  <el-tag size="small">学校</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
              </el-descriptions>
            </template>
          </el-table-column> -->

          <el-table-column prop="createdAt" label="创建时间" width="160" align='center'>
            <template slot-scope="scope">{{ scope.row.createdAt.replace(new Date().getFullYear()+'-','') }} </template>
          </el-table-column>
          <el-table-column prop="name" label="订单编号" min-width="170" align='center' :show-overflow-tooltip="true">
            <template slot-scope="scope">

              <el-link v-if="scope.row.status === '未支付'" type="info" :underline="false">{{ scope.row.ordername }}</el-link>
              <el-link v-if="scope.row.status === '已支付'" type="primary" :underline="false">{{ scope.row.ordername }}</el-link>

            </template>
          </el-table-column>
          <!-- <el-table-column prop="goodClassifyName" label="分类名称" min-width="110" align='center' >
          </el-table-column> -->
          <el-table-column prop="goodName" label="商品名称" min-width="140" align='center'>
          </el-table-column>
          <el-table-column v-if="page.is_proxy_order==1" prop="count" label="代理商名称" min-width="120" align='center'>
            <template slot-scope="scope">
              {{ scope.row.proxy_merchants_name }}
            </template>
          </el-table-column>
          <el-table-column prop="count" label="购买数量" min-width="90" align='center'>
            <template slot-scope="scope">
              {{ scope.row.count }} 件
            </template>
          </el-table-column>
          <el-table-column prop="orderPrice" label="订单总价" min-width="90" align='center'>
            <template slot-scope="scope"> {{ scope.row.orderPrice.toFixed(2) }} 元 </template>
          </el-table-column>
          <!-- <el-table-column v-if="page.is_proxy_order==1" prop="orderPrice" label="订单分成" min-width="90" align='center'>
            <template slot-scope="scope"> {{ (scope.row.pr_real_get_money || 0.00).toFixed(2) }} 元 </template>
          </el-table-column>
          <el-table-column prop="orderPrice" :label="page.is_proxy_order==0?'订单分成':'代理商分成'" min-width="90" align='center'>
            <template slot-scope="scope"> {{ scope.row.real_get_money.toFixed(2)  }} 元 </template>
          </el-table-column> -->
          <el-table-column prop="payMode" label="支付方式" min-width="100" align='center'>
            <template slot-scope="scope">
              <div class='payMode'>
                <div v-if="scope.row.payMode == `支付宝`"> <i class="alipay iconfont icon-zhifubao"> </i> {{scope.row.payMode}} </div>
                <div v-if="scope.row.payMode == `微信支付`"> <i class="wechatpay iconfont icon-weixinzhifu"> </i> {{scope.row.payMode}}</div>
                <div v-if="scope.row.payMode == `QQ钱包`"> <i class="qqWallet iconfont icon-qq"> </i> {{scope.row.payMode}}</div>

              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="ip" label="购买者信息" min-width="130" align='center'>
          </el-table-column> -->
          <el-table-column prop="status" label="支付状态" min-width="90" align='center'>
            <template slot-scope="scope">
              <el-tag size="medium" v-if="scope.row.status === '已支付'">{{ scope.row.status }}</el-tag>
              <el-tag size="medium" type="info" v-if="scope.row.status === '未支付'"> {{scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column v-if="false" prop="status" label="发货状态" min-width="90" align='center'>
            <template slot-scope="scope">
              <el-tag effect="dark" size="medium" v-if="scope.row.sendCardStatus === '已发货'">{{ scope.row.sendCardStatus }}</el-tag>
              <el-tag effect="dark" size="medium" type="info" v-if="scope.row.sendCardStatus === '未发货'"> {{scope.row.sendCardStatus }}</el-tag>
            </template>
          </el-table-column>
          <!-- 表单操作区域 -->
          <el-table-column fixed="right" label="操作" width="80" align='center'>
            <template slot-scope="scope">
              <el-button v-if="false" @click="handleDelete(scope.$index, scope.row)" type="text" size="mini">删除</el-button>

              <el-popconfirm v-if="scope.row.sendCardStatus === '未发货'" title="确认补单吗?" @confirm='handle_manual(scope.$index, scope.row)'>
                <el-button slot="reference" type="text" size="small">补单 </el-button>
              </el-popconfirm>
              <el-button v-if="scope.row.sendCardStatus === '已发货'" type="text" size="small">查看卡密 </el-button>

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
      <orderUpdate :id="0"> </orderUpdate>
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
        is_proxy_order: 0,
        good_id: null,
      },
      count: 20,
      isCreate: false,
      isEdit: false,
      selection_rows: [],
      is_screen: false,
      pickerOptions: [],
      good_types: [],
      goods: [],
      good_type_id: null,
    };
  },
  created() {
    // this.page.where = this.$route.params;
    this.getPage();
    this.get_good_types()
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
      this.page.goodId = this.good_id
      let res = await request({
        url: "/merchant/order/page",
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
        url: "/merchant/order",
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
        url: "/merchant/order/many",
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
    async handle_manual(index, row) {
      let res = await request({
        url: '/merchant/order/manual',
        method: 'get',
        params: {
          id: row.id
        }
      })
      this.getPage()
    },
    async get_good_types() {

      let res = await request({
        url: '/merchant/good_type/all',
        method: 'get',
      })
      this.good_types = res.data.data
    },
    async get_goods() {
      this.$store.state.is_loading = false
      let res = await request({
        url: '/merchant/good/all',
        method: 'get',
        params: {
          goodTypeId: this.good_type_id,
        }
      })
      this.$store.state.is_loading = true
      this.goods = res.data.data
      //   this.page.goodTypeId = this.goods[0].goodTypeId
    },
    // 清空筛选条件
    cleanAllOption() {
      this.page = {
        offset: 1,
        limit: 10,
        is_proxy_order: 0,
      }
      this.getPage()


    }
  },
  computed: {},
};
</script>

<style lang="less" >
.payMode {
  text-align: center;
  .alipay {
    color: #00bbee;
    font-size: 22px;
    margin-right: 5px;
    vertical-align: -8%;
  }
  .wechatpay {
    color: #00c250;
    font-size: 20px;
    margin-right: 5px;
    vertical-align: -8%;
  }
  .qqWallet {
    color: #414141;
    font-size: 22px;
    margin-right: 5px;
    vertical-align: -8%;
  }
}
</style>
