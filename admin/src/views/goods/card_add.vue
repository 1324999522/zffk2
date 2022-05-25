<template>
  <el-card id="card_add">
    <div class="card_add">
      <el-row :gutter="10" class='card_add_top'>
        <el-col :span="6">
          <el-select v-model="good_type_id" placeholder="请选择分类" @change="get_goods()">
            <el-option v-for="item in good_types" :key="item.id" :label="item.good_typename" :value="item.id"></el-option>
          </el-select>
        </el-col>

        <el-col :span="6">
          <el-select v-model="good_id" placeholder="请选择商品">
            <el-option v-for="item in goods" :key="item.id" :label="item.goodname" :value="item.id"></el-option>
          </el-select>
        </el-col>

      </el-row>
      <el-input v-model="cardNumbers" placeholder="导入格式:一行一条" autofocus type="textarea" :rows="10" ref='card_add_input'></el-input>

      <el-row :gutter="10" style="margin-top:20px;">
        <el-col :span="6">
          <el-checkbox v-model="card_unique" :true-label='1' :false-label='0'>去除输入框中重复卡密</el-checkbox>
        </el-col>
        <el-col :span="6">
          <el-checkbox v-model="value" :true-label='1' :false-label='0'>本次添加的卡密优先卖</el-checkbox>
        </el-col>
      </el-row>

      <el-button type="primary" class="sure" @click="handle_card_add()">确认上传</el-button>
    </div>

  </el-card>
</template>

<script>
import { request } from "@/network/request.js";

export default {
  name: "card_add",
  components: {},
  data() {
    return {
      cardNumbers: "",
      value: null,
      card_unique: true,
      good_types: [],
      goods: [],
      good_type_id: null,
      good_id: null,
    };
  },
  async created() {
    if (this.$route.params.good) this.good_id = this.$route.params.good.id
    await this.get_good_types()
    this.get_goods()
  },
  mounted() {
    if (!this.$isPhone) this.$refs.card_add_input.focus()

  },
  methods: {
    //   处理文本框里的卡密
    handlecardNumbers(cardNumbers) {
      //清除空格
      cardNumbers = cardNumbers.replace(/\ +/g, "");
      //分割为数组
      cardNumbers = cardNumbers.split(/[(\r\n)\r\n]+/);
      //清理空行
      cardNumbers = cardNumbers.filter((i) => {
        return i !== "";
      });
      return cardNumbers;
    },
    async handle_card_add() {
      let cardNumbers = this.handlecardNumbers(this.cardNumbers);
      if (this.card_unique) cardNumbers = this.unique(cardNumbers)

      let res = await request({
        url: "/merchant/card",
        method: 'post',
        data: {
          cardNumbers: cardNumbers,
          isRepeat: false,
          goodId: this.good_id,
        },
      });
      if (res.data.code !== 0) return this.$notify({ title: '卡密上传失败', message: res.data.msg, type: 'warning' });
      this.$notify({ title: '卡密上传成功', message: res.data.msg, type: 'success', duration: 10000 });
      this.cardNumbers = ''

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
      this.goods = res.data.data
      //   this.page.goodTypeId = this.goods[0].goodTypeId
    },
    unique(arr) {
      return Array.from(new Set(arr))
    }
  }
  
};
// var obj1 = document.getElementsByClassName('dobest_input')
// console.log( obj1[0].value)
// console.log( obj1[1].value)
// Piscesgulang2
// VM29:3 ldjsjw199620
// 641316339@qq.com
// ssm19921031
// sd6926
// VM60:3 tsc199774

</script>

<style lang="less" scoped>
.card_add {
  max-width: 800px;
}
.sure {
  margin-top: 20px;
}
.card_add_top {
  margin-bottom: 20px;
}
</style>
