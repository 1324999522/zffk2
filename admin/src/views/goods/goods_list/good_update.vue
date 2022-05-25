<template>

  <el-card id="good_update">
    <el-form ref="form" :model="form" label-position='left' label-width="90px" size="medium" class='form'>
      <!-- 表单内容区域 -->
      <el-row :gutter="0" class='content'>
        <el-form-item label="商品名称">
          <el-input v-model="form.goodname" placeholder="请输入商品名称" ref="good_update_input"></el-input>
        </el-form-item>

        <el-form-item label="销售价格">
          <el-input v-model="form.price" placeholder="请输入销售价格/元"></el-input>
          <p v-if="form.is_proxy_good && this.id" class='form-item-bottom'>此商品代理成本价 {{(form.pr_good.cost).toFixed(2)}} 元</p>
        </el-form-item>

        <el-form-item label="商品分类">
          <el-select v-model="form.goodTypeId" placeholder="请选择商品分类">
            <el-option v-for="item in good_types" :key="item.id" :label="item.good_typename" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品描述">
          <el-input v-model="form.describe" type="textarea" rows="3" placeholder="请输入商品描述"></el-input>
        </el-form-item>

        <div class='show_more_seting'>
          <el-checkbox v-model="high_seting" >显示更多高级设置</el-checkbox>
        </div>

        <div v-show="high_seting">

          <el-form-item label="显示顺序">
            <el-input v-model="form.sort" placeholder="请输入商品描述"></el-input>
          </el-form-item>

          <el-form-item label="使用说明">
            <el-input v-model="form.use_explain" type="textarea" rows="3" placeholder="请输入使用说明"></el-input>
            <p class='form-item-bottom'>商品使用说明会在买家购买完成后展示，不填则不显示</p>
          </el-form-item>

          <el-form-item v-if="id && !form.is_proxy_good" label="批发设置">

            <div>

              <el-checkbox v-model="form.wholesale_open" :true-label='1' :false-label='0'>开启批发</el-checkbox>

              <p class='form-item-bottom'>设置批发价格，例如当买家买满5件则商品单价变成5元</p>

            </div>

          </el-form-item>

          <div v-if="form.wholesale_open && !pr_good" class='wholesale'>
            <div v-for="(wholesale,index) in form.wholesales" :key="index" class='wholesale_item'>
              <el-row :gutter="5" type="flex">
                <p> {{index+1}}，满</p>
                <el-input size="small" v-model="wholesale.count" placeholder="请输入数量"></el-input>件
                <el-input size="small" v-model="wholesale.price" placeholder="请输入销售价格"></el-input>元
                <el-button @click="handle_delete_wholesale(index)" size="small" type="text" class="el-icon-delete wholesale_delete"> 删除</el-button>
              </el-row>

            </div>
            <div v-if="id && !form.is_proxy_good">
              <el-button @click="handle_create_wholesale()" style="margin-top:10px;" class="el-icon-circle-plus-outline" type="primary" size="medium" plain>
                添加一组
              </el-button>
            </div>
          </div>

          <el-form-item label="限购设置" class='limit_buy' v-if="!form.is_proxy_good">
            <div class='limit_buy_div'>
              <p>(最少购买)</p>
              <el-input v-model="form.limit_buy_count_less" placeholder="输入整数"></el-input>
            </div>
            <div class='limit_buy_div'>
              <p>(最多购买)</p>
              <el-input v-model="form.limit_buy_count" placeholder="输入整数"></el-input>
            </div>

          </el-form-item>

          <el-form-item label="发卡顺序" v-if="!form.is_proxy_good">
            <el-radio-group v-model="form.take_card_rand" :size="$isPhone?'small':',medium'">
              <el-radio :label="0" border>先卖旧卡</el-radio>
              <el-radio :label="1" border>随机发卡</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="售完下架">
            <el-radio-group v-model="form.sold_out" :size="$isPhone?'small':',medium'">
              <el-radio :label="1" border>开启</el-radio>
              <el-radio :label="0" border>关闭</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="服务费支付">
            <el-radio-group v-model="form.service_charge" :size="$isPhone?'small':',medium'">
              <el-radio :label="0" border>卖家承担</el-radio>
              <el-radio :label="1" border>买家承担</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="允许代理" v-if="!form.is_proxy_good">
            <el-radio-group v-model="form.allow_proxy" :size="$isPhone?'small':',medium'">
              <el-radio :label="1" border>开启</el-radio>
              <el-radio :label="0" border>关闭</el-radio>
            </el-radio-group>

          </el-form-item>
        </div>

      </el-row>

      <!-- 表单操作区域 -->
      <el-form-item style="margin-top:20px;" size="large">
        <el-button class='save' type="primary" @click="!(id)?create():update()">保 存</el-button>
        <!-- <el-button style="float:right;margin-right:15px;">取消</el-button> -->
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { request } from "@/network/request.js";
import wangEditor from '@/components/wangEditor'
export default {
  components: {
    wangEditor,
  },
  data() {
    return {
      form: {
        wholesales: [],
        allow_proxy: 1,
        service_charge: 0,
        sold_out: 0,
        take_card_rand: 0,
      },
      good_types: [],
      activeNames: '0',
      id: null,
      pr_good: null,
      high_seting: true,
    };
  },
  created() {

    let { id, pr_good } = this.$route.params
    this.id = id
    this.pr_good = pr_good

    this.getGoodtype()

    if (!this.id) return
    this.getById();
  },
  mounted() {
    // 商品名称输入框获取焦点
    if (!this.$isPhone) this.$refs.good_update_input.focus()
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

<style lang="less" >
#good_update {
  .save {
    width: 100%;
  }
  .el-radio {
    margin-right: 0px !important;
  }
  .form {
    max-width: 500px;
  }

  .wholesale {
    margin-bottom: 25px;
    line-height: 30px;
    color: var(--second_font_color);
    .wholesale_item {
      margin-bottom: 10px;
    }
    .el-input {
      width: 60px;
      margin: 0px 10px;
    }
    .wholesale_delete {
      margin-left: 10px;
    }
  }
  .limit_buy {
    .limit_buy_div {
      display: flex;
      color: var(--third_font_color);
      p {
        width: 120px;
      }
      input {
        width: 100px;
      }
    }
  }
  .show_more_seting {
    background-color: #f5f8ff;
    padding: 15px;
    margin-bottom: 20px;

    .el-checkbox__label {
      color: var(--third_font_color) !important;
    }
  }
}
.pc {
  #good_update {
    .el-radio {
      margin-right: 20px !important;
    }
  }
  .limit_buy {
    .el-form-item__content {
      display: flex;
    }
  }
}
.phone {
  .limit_buy {
    .limit_buy_div:nth-child(2) {
      margin-top: 10px;
    }
  }
}
</style>
