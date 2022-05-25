import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'vant/lib/index.css';
import { Uploader } from 'vant';
import { Button } from 'vant';

// 富文本编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// npm i v-charts echarts@4.9.0 -S



Vue.use(Button);
Vue.use(Uploader);
Vue.use(ElementUI);






Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')








