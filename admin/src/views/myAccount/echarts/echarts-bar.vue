<template>
  <div>

    <div id="bar">

    </div>

  </div>
</template>


<script>

import { request } from "@/network/request.js";
import echarts from './echarts';
export default {

  data() {
    return {
      option: {
        xAxis: {
          type: 'category',
          show: false,
        },
        textStyle: {
          fontSize: 20,
        },
        color: this.$main_color,
        yAxis: {
          type: 'value',
          show: false,
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          barCategoryGap: '50%',
        }],
        grid: { x: 0, y: 0, x2: 0, y2: 0 }
      }


    }
  },

  async created() {

  },
  mounted() {
    var chartDom = document.getElementById('bar');
    var myChart = echarts.init(chartDom);
    myChart.setOption(this.option);
  },
  methods: {


  },
}
</script>

<style lang="less" scoped>
#bar {
  height: 50px;
  // background-color: black;
}
</style>
