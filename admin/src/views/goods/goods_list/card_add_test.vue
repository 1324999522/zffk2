<template>
  <div id="card_add">
    <el-input v-model="cards" placeholder="导入格式:一行一条" autofocus type="textarea" :rows="10"></el-input>
    <el-button type="primary" class="sure" @click="handle_card_add()">确认上传</el-button>
  </div>
</template>

<script>
import { request } from "@/network/request.js";

export default {
  name: "card_add",
  props: ["id"],
  components: {},
  data() {
    return {
      cards: "",
    };
  },
  methods: {
    //   处理文本框里的卡密
    handleCards(cards) {
      //清除空格
      cards = cards.replace(/\ +/g, "");
      //分割为数组
      cards = cards.split(/[(\r\n)\r\n]+/);
      //清理空行
      cards = cards.filter((i) => {
        return i !== "";
      });
      let id = this.id;
      cards = cards.map(function (i) {
        return { cardNumber: i, goodId: id };
      });

      return cards;
    },
    async handle_card_add() {
      let data = this.handleCards(this.cards);
      let res = await request({
        url: "/merchant/card",
        method: 'post',
        data: {
          cards: data,
          isRepeat: false,
        },
      });
      if (res.data.code !== 0) return this.$notify({ title: '卡密上传失败', message: res.data.msg, type: 'warning' });
      this.$notify({ title: '卡密上传成功', message: res.data.msg, type: 'success', duration: 10000 });
      this.cards = ''

    },
  },
  created() {

  },
};
</script>

<style lang="less" scoped>
.sure {
  margin: 20px;
}
</style>
