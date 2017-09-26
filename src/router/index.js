import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/userCtrl',
                    component: resolve => require(['../components/page/userCtrl.vue'], resolve)     
                },
                {
                    path: '/newAdd',
                    component: resolve => require(['../components/page/newAdd.vue'], resolve)     
                },
                {
                    path: '/funcModule',
                    component: resolve => require(['../components/page/funcModule.vue'], resolve)     
                },
                {
                    path: '/selectUser',
                    component: resolve => require(['../components/page/selectUser.vue'], resolve)     
                },
                {
                    path: '/contorl',
                    component: resolve => require(['../components/page/contorl.vue'], resolve)
                },
                {
                    path: '/roleCtrl',
                    component: resolve => require(['../components/page/roleCtrl.vue'], resolve)     
                },
                {
                    path: '/kaoqin',
                    component: resolve => require(['../components/page/kaoqin.vue'], resolve)
                },
                {
                    path: '/processConfig',
                    component: resolve => require(['../components/page/processConfig.vue'], resolve)
                },
                {
                    path: '/noticeCtrl',
                    component: resolve => require(['../components/page/noticeCtrl.vue'], resolve)
                },
                {
                    path: '/projectCtrl',
                    component: resolve => require(['../components/page/projectCtrl.vue'], resolve)
                },
                {
                    path: '/gather',
                    component: resolve => require(['../components/page/gather.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
