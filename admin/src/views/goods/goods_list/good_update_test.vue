<template>
  <div id="form-update">
    <el-form ref="form" :model="form" label-position='left' label-width="90px" size="medium" class='form'>
      <!-- 表单内容区域 -->
      <p v-if="form.is_proxy_good && this.id !== 0" style="margin-bottom:25px;font-size:16px;">此商品代理成本价{{(form.pr_good.cost).toFixed(2)}}元</p>
      <el-row :gutter="0" class='content'>

        <el-form-item label="商品名称">
          <el-input v-model="form.goodname" placeholder="请输入商品名称"></el-input>
        </el-form-item>

        <el-form-item label="销售价格">
          <el-input v-model="form.price" placeholder="请输入销售价格"></el-input>
        </el-form-item>

        <el-form-item label="商品分类">
          <el-select v-model="form.goodTypeId" placeholder="请选择商品分类">
            <el-option v-for="item in good_types" :key="item.id" :label="item.good_typename" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

      </el-row>
      <!-- 折叠 -->
      <el-collapse class='collapse' v-model="activeNames" accordion>
        <el-collapse-item title="商品描述" name="2">
          <el-input v-model="form.describe" type="textarea" rows="3" placeholder="请输入商品描述"></el-input>
        </el-collapse-item>
        <el-collapse-item title="使用说明" name="3">
          <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        </el-collapse-item>
        <el-collapse-item title="批发设置" name="4">

          <div v-for="(wholesale,index) in form.wholesales" :key="index" class='wholesale'>
            <el-row>
              <el-col :span='9'>
                第{{index+1}}组:买家购买满
              </el-col>
              <el-col :span='8'>
                <el-input size="small" v-model="wholesale.count" placeholder="请输入数量"></el-input>
              </el-col>
              <el-col class='text_2' :span='4'> 件</el-col>

            </el-row>

            <el-row style="margin-top:10px;">
              <el-col class='text_2' :span='4'> 单价</el-col>
              <el-col :span="8">
                <el-input size="small" v-model="wholesale.price" placeholder="请输入销售价格"></el-input>
              </el-col>
              <el-col class='text_2' :span='4'> 元</el-col>
              <el-col :span='6'>
                <el-button @click="handle_delete_wholesale(index)" size="mini" plain type="danger">删除</el-button>
              </el-col>

            </el-row>

          </div>

          <div>
            <el-button @click="handle_create_wholesale()" style="margin-top:10px;" class="el-icon-circle-plus-outline" type="primary" size="medium" plain>
              添加一组
            </el-button>

            <el-checkbox style="margin-left:50px;" v-model="form.wholesale_open" :true-label='1' :false-label='0'>开启批发</el-checkbox>
          </div>

        </el-collapse-item>
      </el-collapse>
      <!-- 表单操作区域 -->
      <el-form-item style="margin-top:20px;" size="large">
        <el-button style="float:right;" type="primary" @click="id === 0?create():update()">保存</el-button>
        <el-button style="float:right;margin-right:15px;">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { request } from "@/network/request.js";
import wangEditor from '@/components/wangEditor'
export default {
  components: {
    wangEditor,
  },
  props: ["id", "pr_good"],
  data() {
    return {
      form: {},
      good_types: [],
      activeNames: '0'
    };
  },
  created() {
    this.getGoodtype()

    if (this.id === 0) return
    this.getById();
  },
  mounted() {
    if (this.pr_good) {
      this.pr_good.goodTypeId = null
      this.form = this.pr_good
      this.form.pr_id = this.pr_good.id
      this.form.is_proxy_good = 1
      delete this.form.id
    }
  },
  methods: {
    // 获取
    async getById() {
      let res = await request({
        url: "/merchant/good",
        method: "get",
        params: {
          id: this.id,
        },
      });
      this.form = res.data.data;
    },
    // 编辑
    async update() {
      this.form.pr_id = 30
      let res = await request({
        url: "/merchant/good",
        method: "put",
        data: this.form,
      });
    },
    // 添加
    async create() {
      let res = await request({
        url: "/merchant/good",
        method: "post",
        data: this.form,
      });
    },
    // =================
    // 获取商品分类
    async getGoodtype() {
      let res = await request({
        url: "/merchant/good_type/all",
        method: "get",
      });
      this.good_types = res.data.data;
    },
    // 添加一组批发
    handle_create_wholesale() {
      this.form.wholesales.push({ count: 0, price: 0 })
    },
    handle_delete_wholesale(index) {
      this.form.wholesales.splice(index, index)
    }
  },
};
</script>

<style lang="less" scoped>
.el-divider--horizontal {
  margin: 10px 0 !important;
}

.content {
  max-height: 500px;
}

.wholesale {
  font-size: 14px !important;
  color: var(--second_font_color);
  margin-bottom: 15px;
  .text_2 {
    text-align: center;
  }
}
</style>
