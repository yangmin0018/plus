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
		<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
		  <el-form-item label="姓名">
		    <el-input v-model="formLabelAlign.name"></el-input>
		  </el-form-item>
		   <el-form-item label="性别">
		    <el-select v-model="formLabelAlign.gender" >
		      <el-option label="男" value=true></el-option>
		      <el-option label="女" value=false></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="手机号码">
		    <el-input v-model.number="formLabelAlign.phone"></el-input>
		  </el-form-item>
		  <!--<el-form-item label="密码">
		    <el-input v-model="formLabelAlign.password"></el-input>
		  </el-form-item>-->
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
		  <!--<el-form-item label="备注" class="remark">
			   <el-input
				  type="textarea"
				  :rows="3"
				  placeholder="请输入内容">
				</el-input>
		  </el-form-item>-->
		   <el-form-item label="添加角色" class="remark">
		   	<el-transfer v-model="selectedRoles" :data="roles"  :titles="['待选角色', '已选角色']"></el-transfer>
		   </el-form-item>
		</el-form>
	</div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
      return {
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
        }
      };
    },
    mounted(){
		axios.get('http://52.80.81.221:12345/admin/pms/role').then( res =>{
			var getRole = res.data.data;
			for(var i=0;i<getRole.length;i++){
				var obj = {};
				obj.key = getRole[i].id;
				obj.label = getRole[i].description;
				this.roles.push( obj );
			}
		});
		axios.get('http://52.80.81.221:12345/admin/node').then( res =>{
			this.options = res.data.data ;
		})	
	},
    methods:{
    	submite(){
    		this.formLabelAlign.roleIds = this.selectedRoles.join(',');
    		axios({
    			method: 'POST',
    			url:'http://52.80.81.221:12345/admin/user/save',
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
	form>div{
		width: 50%;
		float: left;
	}
	.remark{
		width: 100%;
	}
</style>