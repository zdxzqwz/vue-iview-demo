import Vue from 'vue'
import App from './App.vue'
import router from './router'
import config from './config'
import store from './store'
import VCharts from 'v-charts'
import './plugins/axios'
import _ from 'lodash'


import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false

Vue.use(ViewUI);
Vue.use(VCharts)

Vue.prototype.$config = config;
Vue.prototype._ = _;
// 配置全局提示的时间
Vue.prototype.$Message.config({ duration: 3 })

router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    //判断页面是否是直接用地址打开，如果用地址打开，直接跳转首页
    if (from.name == null && to.path != "/" && to.path != "/login") {
        router.replace("/");
    }
    //token有效验证
    if (to.path != '/login') {
        let accessToken = sessionStorage.getItem("accessToken");  //需要验证token和账号是否有效接口
        if (!accessToken) {
            accessToken = localStorage.getItem("accessToken");  //需要验证token和账号是否有效接口
        }
        Vue.axios.get("/isvalid?token=" + accessToken).then(response => {
            ViewUI.LoadingBar.finish();
            if (response.data.data) {
                next();
            } else {
                localStorage.setItem("message", "账号已在其他区域登录，如非本人操作，请立即修改密码！");
                router.replace("/login");
            }
        });
    } else {
        next();
        ViewUI.LoadingBar.finish();
    }
});

Vue.axios.interceptors.response.use(
    function (response) {
        if (response.data.message == "token已失效") {
            router.replace("/login");
        }
        return response;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
