<template>
  <div>
    <!-- 主体 -->
    <el-card class="card">
      <!-- 搜索 添加 等功能区域-->
      <el-row :gutter="20" style="margin-bottom: 10px">
        <el-col :span="4">
          <el-select v-model="good_type_id" placeholder="请选择分类" @change="get_goods()">
            <el-option v-for="item in good_types" :key="item.id" :label="item.good_typename" :value="item.id"></el-option>
          </el-select>
        </el-col>

        <el-col :span="4">
          <el-select v-model="page.goodId" placeholder="请选择商品" @change="getPage()">
            <el-option v-for="item in goods" :key="item.id" :label="item.goodname" :value="item.id"></el-option>
          </el-select>
        </el-col>

        <el-col :span="2.5">
          <el-button type="primary" @click="card_export()" class="el-icon-danger" size='medium'>
            导出当前卡密</el-button>
        </el-col>

        <el-col :span="2.5">
          <el-button type="primary" @click="handleCopyCard()" size='medium'>
            复制选中卡密</el-button>
        </el-col>
        <el-col :span="4">
          <el-select v-model="page.status" placeholder="请选择状态" @change="getPage();" size='medium'>
            <el-option v-for="item in [{label:'销售中',value:1},{label:'已卖出',value:0}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2.5">
          <el-button type="danger" @click="handleDelete_many()" class="el-icon-delete" size='medium'>
            批量删除</el-button>
        </el-col>

      </el-row>
      <!-- 第二行 -->
      <el-row v-if="page.goodId" :gutter="20" style="margin-bottom: 15px">

        <el-col :span="4">
          <el-input v-model="card_take_count" placeholder="请输入提卡数量" size='medium'>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="handleCardTake()" class="el-icon-plus" size='medium'>
            提取卡密</el-button>
        </el-col>
      </el-row>

      <div>
        <!-- 表格主体 区域-->
        <el-table :data="form" style="width: 100%" size='medium' @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <!-- <el-table-column type="index" width="50"> </el-table-column> -->
          <!-- <el-table-column prop="id" label="id" align='center' min-width="70">
          </el-table-column> -->
          <el-table-column prop="createdAt" label="添加时间" min-width="140" align='center' :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="cardNumber" label="卡密信息" min-width="350" align='center' :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="goodname" label="商品名称" min-width="130" align='center' :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column v-if="page.status == 0" prop="updatedAt" label="卖出时间" width="140" align='center' :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column prop="status" label="销售状态" width="90" align='center'>
            <template slot-scope="scope">
              <el-tag size="medium" v-if="scope.row.status == 1">销售中</el-tag>
              <el-tag size="medium" type="info" v-if="scope.row.status == 0">已卖出</el-tag>
            </template>
          </el-table-column>
          <!-- 表单操作区域 -->
          <el-table-column fixed="right" label="操作" width="80" align='center'>
            <template slot-scope="scope">
              <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size='medium' class="el-icon-delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 20, 50, 100, 500]" :page-size="page.limit" layout="total, sizes,prev, pager, next,jumper" :total="count" style="margin-top: 20px">
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
  components: {},
  data() {
    return {
      form: [],
      //   必须的数据
      page: {
        // 分页查询的数据
        offset: 1,
        limit: 5,
        status: 1,
        ordername: '',
      },
      count: 20,
      good: {},
      isCreate: false,
      isEdit: false,
      card_take_count: null,
      orderName: "",
      selection_rows: [],
      selection_ids: [],
      isCopyCard: false,
      copyCardBuy: '',
      good_types: [],
      goods: [],
      good_type_id: null,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    };
  },
  async created() {
    if (this.$route.params.good) this.page.goodId = this.$route.params.good.id

    await this.getPage();
    this.get_good_types()
    this.get_goods()

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
        url: "/merchant/card/page",
        method: 'get',
        params: this.page,
      });

      this.form = res.data.data.rows;

      this.count = res.data.data.count;

    },

    // 删
    async handleDelete(index, row) {
      let res = await request({
        url: "/merchant/card",
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
    // 提取卡密
    async handleCardTake() {
      let res = await request({
        url: "/merchant/order/hand/takeCard",
        data: {
          count: Number(this.card_take_count),
          goodId: this.page.goodId,
          orderPrice: this.good.price * this.card_take_count,
        },
      });
      if (res.data.code !== 0) return this.$notify({ title: '提取卡密失败', message: res.data.msg, type: 'error', duration: 20000 });
      this.$notify({ title: '提取卡密成功', message: `本次提卡数量${this.card_take_count},价值${this.good.price * this.card_take_count} 元,订单号${res.data.data.ordername}`, type: 'success', duration: 20000 });
      this.page.ordername = res.data.data.ordername;
      this.handle_query()
    },
    // 点击查询订单
    handle_query() {
      //   this.cleanAllOption()
      this.page.status = 0
      this.getPage()
    },
    // 多选
    handleSelectionChange(rows) {
      this.selection_rows = rows
      // 2021/9/8  多选批量删除与复制混淆
      this.selection_ids = rows.map(i => i.id)
    },
    // 批量删除
    async handleDelete_many() {
      let res = await request({
        url: "/merchant/card/many",
        method: 'delete',
        data: {
          id: this.selection_ids
        },
      })
      this.getPage();
    },
    // 卡密导出
    async card_export() {
      let res = await request({
        url: '/merchant/card/export',
        method: 'get',
        params: {
          status: this.page.status,
          goodId: this.page.goodId
        }
      })
      if (res.data.code === 0) {
        window.location.href = res.data.data
        this.$notify({ title: '导出卡密', message: `${this.good.name}${res.data.body.count}个 ${res.data.body.status} 导出成功 已为你自动下载`, type: 'success', duration: 20000 })
      }
    },
    // 复制卡密
    handleCopyCard() {
      this.copyCardBuy = ''
      if (this.selection_rows == '') {
        this.$message.error('请选择要复制的卡密！')
        return
      }
      console.log(this.selection_rows)
      //   this.isCopyCard = true
      this.selection_rows.forEach((i) => {
        let str = i.cardNumber.replace(/[\r\n]/g, '') //清除换行
        str = str.replace(/\ +/g, '') //清除空格
        this.copyCardBuy = this.copyCardBuy.concat(str + '\n')
      })

      this.copy(this.copyCardBuy)
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
          is_proxy_good: true,
        }
      })
      this.$store.state.is_loading = true
      this.goods = res.data.data
      //   this.page.goodTypeId = this.goods[0].goodTypeId
    },
    copy(Copytext) {
      let textarea = document.createElement('textarea');
      // input.setAttribute('readonly', 'readonly');
      textarea.value = Copytext
      document.body.appendChild(textarea);
      textarea.select();
      // input.setSelectionRange(0, 9999);
      document.execCommand('Copy')
      if (document.execCommand('Copy')) this.$message.success('复制成功');
      textarea.remove();
    },
    // 清空筛选条件
    cleanAllOption() {
      this.page = {
        offset: 1,
        limit: 5,
        status: 1,
        ordername: "",
      }
    }
  },
  computed: {},
};
</script>

<style lang="less" scoped>
.card {
  margin-bottom: 30px;
  .el-table__body-wrapper {
    font-size: 12px !important;
  }
}
</style>
