import Vue from 'vue';
import App from './App';
import router from './router';
import axios from '../node_modules/axios';
import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/ww-blue/index.css';
import "babel-polyfill";

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
//线上地址
//axios.defaults.baseURL = 'http://52.80.82.20:8080';
//测试地址
axios.defaults.baseURL = 'http://52.80.81.221:12345';

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
