<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:rgba(255,255,255,0.6);">Tips : 用户名和密码必填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
	import axios from 'axios';
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted(){
        	this.ruleForm.username = localStorage.getItem('ms_username');
        	this.ruleForm.password = localStorage.getItem('ms_password');
        },
        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                    	axios.post('http://52.80.81.221:12345/admin/validate?username='+this.ruleForm.username+'&password='+this.ruleForm.password).then( res=>{
                    		console.log(res)
                    		if(res.data.data != null){
                    			console.log('成功登录');
	                    		localStorage.setItem('ms_password',self.ruleForm.password);
	                    		localStorage.setItem('ms_username',self.ruleForm.username);
	                    		localStorage.setItem('ms_userId',res.data.data.userId);
		                        self.$router.push('/readme');
                    		}else{
                    			alert(res.data.resultMsg)
                    		}
                    	});
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin: -160px 0 0 -150px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>