<template>

  <div id="order_item">

    <van-cell-group inset>
      <van-cell :title="order.goodname +' x '+order.count" is-link @click="jump_query(order.ordername)">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #label>
          <div>订单编号：{{order.ordername}}</div>
          支付方式：{{order.payMode}}
          | 单价：￥{{order.orderPrice/order.count}}
          | 总价：￥{{order.orderPrice}}
          <div>
            创建时间：{{order.createdAt}} | 付款状态：

            <van-tag type="warning" v-if="order.status=='未支付'">{{order.status}}</van-tag>
            <van-tag type="success" v-if="order.status=='已支付'">{{order.status}}</van-tag>

          </div>
        </template>
      </van-cell>
    </van-cell-group>

  </div>
</template>

<script>
import { request } from '@/network/request.js'

export default {
  props: {
    order: Object,
  },
  name: 'order_item',
  components: {

  },
  data() {
    return {

    }
  },
  methods: {
    jump_query(ordername) {
      this.$router.push({
        name: 'order',
        params: {
          ordername: ordername
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
#order_item {
  margin-bottom: 8px;
}
</style>
