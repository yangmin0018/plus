<template>
	<div id="newAdd">
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户修改</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
		<div class="btn">
			<el-button @click="submite">确定</el-button>
			<router-link to="/userCtrl"><el-button @click="cancel">取消</el-button></router-link>
		</div>
		<el-form :label-position="labelPosition" class="addperson" label-width="80px" :model="formLabelAlign">
		  <el-form-item label="姓名">
		    <el-input v-model="formLabelAlign.name"></el-input>
		  </el-form-item>
		   <el-form-item label="性别">
		    <el-select v-model="formLabelAlign.gender" >
		      	<el-option
			      v-for="item in genderOptions"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="手机号码">
		    <el-input v-model.number="formLabelAlign.phone"></el-input>
		  </el-form-item>
		  <el-form-item label="所属部门">
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
		   	<el-transfer v-model="selectedRoles" @change="handleChange" :data="roles"  :titles="['待选角色', '已选角色']"></el-transfer>
		   </el-form-item>
		</el-form>
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  size="tiny">
		  <span>用户修改成功!</span>
		  <span slot="footer" class="dialog-footer">
		    <router-link to="/userCtrl">
		    	<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		    </router-link>
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
          email:'',
          userId:''
        },
        genderOptions:[
        	{
        		value:true,
        		label:'男'
        	},
        	{
        		value:false,
        		label:'女'
        	}
        ]
      };
    },
    mounted(){
    	
//  	console.log(JSON.parse(localStorage.getItem('personM')))
    	this.formLabelAlign = localStorage.getItem('personM')?JSON.parse(localStorage.getItem('personM')):{};
		//请求角色数据
		axios.get('http://52.80.81.221:12345/admin/pms/role').then( res =>{
			var getRole = res.data.data;
			for(var i=0;i<getRole.length;i++){
				var obj = {};
				obj.key = getRole[i].id;
				obj.label = getRole[i].description;
				this.roles.push( obj );
			}
		});
		//请求部门数据
		axios.get('http://52.80.81.221:12345/admin/node').then( res =>{
			this.options = res.data.data ;
			console.log(this.options)
		})	
		//请求用户拥有的角色数据
		axios.get('http://52.80.81.221:12345/admin/pms/'+this.formLabelAlign.userId+'/role').then( res =>{
			console.log(res)
			for(var i=0;i<res.data.data.length;i++){
				this.selectedRoles.push(res.data.data[i]['roleId'])
			}
		})	
	},
    methods:{
    	cancel(){
    		//清空本地存储数据
			localStorage.setItem('personM','');
    	},
    	//穿梭框选择时发送添加删除请求
    	handleChange(value, direction, movedKeys){
    		console.log(value, direction, movedKeys);
    		if(direction=='right'){
	    		axios({
	    			method: 'POST',
	    			url:'http://52.80.81.221:12345/admin/pms/user/'+this.formLabelAlign.userId+'/BatchOP',
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
	    			data:{roleIds:movedKeys,op:0}
	    		}).then( res =>{
	    			this.$message('设置成功！');
					console.log(res)
					//提交之后，重新获取最新数据更新 this.rolesAll
					axios.get('http://52.80.81.221:12345/admin/pms/role').then( res =>{
						this.rolesAll = res.data.data;
						console.log(res)
					});
				})	
	    	}else if(direction=='left'){
	    		axios({
	    			method: 'POST',
	    			url:'http://52.80.81.221:12345/admin/pms/user/'+this.formLabelAlign.userId+'/BatchOP',
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
	    			data:{roleIds:movedKeys,op:1}
	    		}).then( res =>{
	    			this.$message('设置成功！');
					console.log(res)
					//提交之后，重新获取最新数据更新 this.rolesAll
					axios.get('http://52.80.81.221:12345/admin/pms/role').then( res =>{
						this.rolesAll = res.data.data;
						console.log(res)
					});
				})	
	    	}
    	},
    	//保存提交
    	submite(){
			this.$confirm('此操作将修改当前用户信息, 是否继续?', '提示', {
	          	confirmButtonText: '确定',
	          	cancelButtonText: '取消',
	          	type: 'warning',
	          	closeOnClickModal:false,
	          	showClose:false
	       }).then(() => {
	        	//删除暂时不用传的数据
				delete this.formLabelAlign.status
				delete this.formLabelAlign.updatedTime
				delete this.formLabelAlign.avatar
				delete this.formLabelAlign.roleLevel
				delete this.formLabelAlign.birthday
				delete this.formLabelAlign.intro
				delete this.formLabelAlign.location
				delete this.formLabelAlign.nickName
				delete this.formLabelAlign.qq
				delete this.formLabelAlign.wechat
				delete this.formLabelAlign.orgName
				
				console.log(this.formLabelAlign)
	    		axios({
	    			method: 'POST',
	    			url:'http://52.80.81.221:12345/admin/user/save/',
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
					this.selectedRoles = [];
					this.formLabelAlign ={
									        name: '',
									        gender: '',
									        phone:'',
									        orgTitle:'',
									        orgId:'',
									        email:'',
									        userId:''
									     }
					//清空本地存储数据
					localStorage.setItem('personM','');
					this.dialogVisible = true
					});
	        }).catch(() => {
	          	this.$message({
	            type: 'info',
	            message: '已取消删除'
	          	});          
	        });
			
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