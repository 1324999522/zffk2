<template>
  <div>

    <div id="bar2">

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

        },
        textStyle: {
          fontSize: 20,
        },
        color: this.$main_color,
        yAxis: {
          type: 'value',

        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          barCategoryGap: '50%',
        }],
        grid: { x: 50, y: 50, x2: 50, y2: 50 }
      }


    }
  },

  async created() {

  },
  mounted() {
    var chartDom = document.getElementById('bar2');
    var myChart = echarts.init(chartDom);
    myChart.setOption(this.option);
  },
  methods: {


  },
}
</script>

<style lang="less" scoped>
#bar2 {
  height: 300px;
  // background-color: black;
}
</style>
