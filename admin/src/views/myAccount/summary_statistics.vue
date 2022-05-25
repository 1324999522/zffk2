
<template>

  <div id='statistics'>

    <div class='box'>
      <div class='row1'>
        总销售额

        <span> <i class='el-icon-warning-outline'></i></span>
      </div>

      <div class='row2'>
        ¥ 126,560
      </div>

      <div class='row3'>
        周同比12% 日同比11%
      </div>
      <el-divider></el-divider>

      <div class='row4'>
        日销售额￥12,423
      </div>

    </div>

    <div class='box'>
      <div class='row1'>
        访问量
        <span> <i class='el-icon-warning-outline'></i></span>
      </div>

      <div class='row2'>
        8,846
      </div>

      <div class='row3'>
        <vChartsBar></vChartsBar>
      </div>
      <el-divider></el-divider>

      <div class='row4'>
        日访问量 1,234
      </div>

    </div>

    <div class='box'>
      <div class='row1'>
        支付笔数
        <span> <i class='el-icon-warning-outline'></i></span>
      </div>

      <div class='row2'>
        260
      </div>

      <div class='row3'>
        <vChartsLine> </vChartsLine>
      </div>
      <el-divider></el-divider>

      <div class='row4'>
        转化率 60%
      </div>

    </div>

    <div class='box'>
      <div class='row1'>
        本月销售目标
        <span> <i class='el-icon-warning-outline'></i></span>
      </div>

      <div class='row2'>
        58%
      </div>

      <div class='row3'>
        <el-progress :text-inside="true" :stroke-width="26" :percentage="58"></el-progress>
      </div>
      <el-divider></el-divider>

      <div class='row4'>
        目标销售额 ￥100000
      </div>

    </div>

  </div>

</template>

<script>
import { request } from '@/network/request.js'
import vChartsBar from './echarts/echarts-bar'
import vChartsLine from './echarts/echarts-line'
export default {
  name: 'statistics',
  components: {
    vChartsBar,
    vChartsLine,
  },
  data() {
    return {

    }
  },
  methods: {

  },
  created() {

  },
}
</script>

<style lang="less" scoped>
#statistics {
  column-count: 2 !important;
  flex-wrap: wrap;
  display: flex;
  
}

.box {
  margin: 5px;
  height: 160px;
  background-color: white;
  padding: 20px;
  line-height: 20px;
  color: var(--second_font_color);
  font-size: 14px;
  min-width: 180px;
  flex: 1;
  .row1 {
    height: 30px;
    color: var(--third_font_color);
    span {
      float: right;
      font-size: 16px;
    }
  }
  .row2 {
    height: 35px;
    font-size: 28px;
    color: var(--second_font_color);
    line-height: 30px;
  }
  .row3 {
    margin-top: 5px;
    height: 50px;
    color: var(--second_font_color);
    line-height: 35px;
  }
  .row4 {
    color: var(--second_font_color);
  }
  .el-divider--horizontal {
    margin: 11px 0 !important;
  }
}
</style>
