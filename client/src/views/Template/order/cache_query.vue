<template>

  <div id="cache_query">
    <homeTopPc v-if="!$isPhone">
      <template v-slot:right>
        <el-button icon="el-icon-search" type="primary" @click="$router.push('/order')">查询订单</el-button>
      </template>
    </homeTopPc>

    <div class="cache_query">

      <van-nav-bar v-if="$isPhone" title="浏览器缓存查询订单"  left-arrow @click-left="$router.back()" @click-right="$router.push('/cache_query')" :border='false' />

      <div v-show="!$isPhone">
        <el-row :gutter="2">
          <div>
            <el-col v-for="order in orders" :key="order.id" :order='order' :span="12">

              <orderItem :order='order' :key="order.id"> </orderItem>

            </el-col>
          </div>
        </el-row>
      </div>
    </div>

    <div v-show="$isPhone">
      <div v-for="order in orders" :key="order.id">
        <orderItem :order='order' :key="order.id"> </orderItem>
      </div>
    </div>

  </div>
</template>

<script>
import { request } from '@/network/request.js'
import orderItem from '@/views/Template/order/order_item'
import homeTopPc from '@/views/children/home_top_pc'
import navbar from '@/components/public/navbar'
export default {
  name: 'cache_query',
  components: {
    orderItem,
    homeTopPc,
    navbar
  },
  data() {
    return {
      orders: [],
      page: {
        // 分页查询的数据
        offset: 1,
        limit: 30,
      },
    }
  },
  methods: {

  },
  async created() {
    this.page.ordernames = JSON.parse(localStorage.getItem('names'))
    let res = await request({
      url: '/client/order/page',
      method: 'post',
      data: this.page,
    })
    this.orders = res.data.data.rows
  },
}
</script>

<style lang="less" >
#cache_query {
  background-color: rgb(245, 245, 245);
  min-height: 100%;
  min-width: 100%;
  .van-nav-bar__content {
    background-color: rgb(245, 245, 245) !important;
  }

}

</style>
