<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                                    <el-menu-item :index="item.index">
                                        <i :class="item.icon"></i>{{ item.title }}
                                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'readme',
                        title: '我的管理系统'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: 'userCtrl',
                        title: '用户管理'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '3',
                        title: '权限管理',
                        subs: [
                        	{
                                index: 'roleCtrl',
                                title: '角色管理'
                           },
                            {
                                index: 'funcModule',
                                title: '功能模块'
                            },
                            {
                                index: 'selectUser',
                                title: '选择用户'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '4',
                        title: '应用管理',
                        subs: [
                            {
                              index: 'contorl',
                              title: '控件管理'
                            },
//                          {
//                            index: 'kaoqin',
//                            title: '考勤配置'
//                          },
                            {
                              index: 'noticeCtrl',
                              title: '公告管理'
                            },
                            {
                              index: 'projectCtrl',
                              title: '项目管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'processConfig',
                        title: '审批流程'
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'gather',
                        title: '统计汇总'
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #FCFCFC;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
