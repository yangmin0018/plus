<template>
	<div id="newAdd">
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>新增用户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
		<div class="btn">
			<el-button @click="submite">确定</el-button>
			<router-link to="/userCtrl"><el-button>取消</el-button></router-link>
		</div>
		<el-form :label-position="labelPosition" :rules="rules" class="addperson" label-width="80px" :model="formLabelAlign">
		  <el-form-item label="姓名" prop="name">
		    <el-input v-model="formLabelAlign.name"></el-input>
		  </el-form-item>
		   <el-form-item label="性别" >
		    <el-select v-model="formLabelAlign.gender" >
		      <el-option label="男" value=true></el-option>
		      <el-option label="女" value=false></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="手机号码" prop="phone">
		    <el-input v-model.number="formLabelAlign.phone"></el-input>
		  </el-form-item>
		  <el-form-item label="所属部门" prop="orgId">
		    <el-select v-model="formLabelAlign.orgId">
		    	<el-option
			      v-for="item in options"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="职务">
		    <el-input v-model="formLabelAlign.orgTitle"></el-input>
		  </el-form-item>
		  <el-form-item label="邮箱">
		    <el-input v-model="formLabelAlign.email"></el-input>
		  </el-form-item>
		 
		   <el-form-item label="添加角色" class="remark">
		   	<el-transfer v-model="selectedRoles" :data="roles"  :titles="['待选角色', '已选角色']"></el-transfer>
		   </el-form-item>
		</el-form>
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  size="tiny">
		  <span>新用户添加成功!<br>请继续添加或进行其他操作。</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
      return {
      	dialogVisible:false,
      	options:'',
      	roles: [],          //获取的所有角色
      	selectedRoles:[],   //选中的角色
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          gender: '',
          roleIds:'',       //选中的角色(字符串)
          phone:'',
          orgTitle:'',
          orgId:'',
          email:''
//        password: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          orgId: [
            { required: true, message: '请选择部门', trigger: 'blur' }
          ],
          phone:[
            { required: true, message: '请输入手机号码'},
            { type: 'number', message: '电话必须为数字'}
          ]
        }
      };
    },
    mounted(){
		axios.get('/admin/pms/role').then( res =>{
			var getRole = res.data.data;
			for(var i=0;i<getRole.length;i++){
				var obj = {};
				obj.key = getRole[i].id;
				obj.label = getRole[i].description;
				this.roles.push( obj );
			}
		});
		axios.get('/admin/node').then( res =>{
			this.options = res.data.data ;
		})	
	},
    methods:{
    	submite(){
    		this.formLabelAlign.roleIds = this.selectedRoles.join(',');
    		if(this.formLabelAlign.name==''||this.formLabelAlign.phone==''||this.formLabelAlign.orgId==''){
    				this.$message.error('带*号项必填！请补全信息！');
    				return false;
    		}
    		
    		axios({
    			method: 'POST',
    			url:'/admin/user/save',
    			transformRequest: [function(data) {
					let ret = ''
					for(let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
						return ret
					}],
				headers:{
					'Content-Type': 'application/x-www-form-urlencoded'
				},
    			data:this.formLabelAlign
    		}).then( res =>{
				console.log(res)
				this.dialogVisible = true;
				this.selectedRoles = [];
				this.formLabelAlign ={
								        name: '',
								        gender: '',
								        roleIds:'',
								        phone:'',
								        orgTitle:'',
								        orgId:'',
								        email:''
								//      password: '',
								     }
				})	
    	}
    }
  }
</script>

<style>
	.btn{
		border-bottom: 1px solid #E4E4E4;
		padding-bottom: 10px;
		margin-bottom: 20px;
	}
	form{
		width: 80%;
		overflow: hidden;
	}
	.addperson>div{
		width: 50%;
		float: left;
	}
	.addperson .remark{
		width: 100%;
	}
</style>