<template>
    <div class="header">
        <div class="logo">后台管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/name.png">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
	import axios from 'axios';	
    export default {
        data() {
            return {
                username:''
            }
        },
        mounted(){
	        let user = localStorage.getItem('ms_username');
	        if(user){
	        	axios.get('/admin/user/?pageNum=1&pageSize=1&query='+user).then( res =>{
		    		console.log(res);
		    		this.username = res.data.data.list[0].name;
	    	});}else{
            	this.$router.push('/login');
            }
        },
        methods:{
            handleCommand(command) {
                if(command == 'loginout'){
//                  localStorage.removeItem('ms_password')
                    localStorage.removeItem('ms_username')
                    localStorage.removeItem('ms_userId')
                    this.$router.push('/login');
                }
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
