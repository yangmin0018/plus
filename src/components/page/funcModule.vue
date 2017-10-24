<template>
	<div class="">
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>功能模块</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
		 <el-select v-model="value" @change="roleChangeSearch" placeholder="请选择角色">
		    <el-option
		      v-for="item in roles"
		      :key="item.key"
		      :label="item.label"
		      :value="item.key">
		    </el-option>
		 </el-select>
		  <div class="remark mt">
		  	  	<el-transfer v-model="selectedModul" @change="handleChange" :data="moduls"  :titles="['待选模块', '已选模块']"></el-transfer>
		  </div>
		  
	</div>
	
</template>

<script>
import axios from 'axios';	
export default {
    data() {
      return {
        roles: [],   //有所角色 key和lable
        rolesAll:'',  //所有角色的所有信息
        value: '',   //选择角色
        tableData:'',
        total:'',
        moduls:[],      //所有功能模块
        selectedModul:[],   //选中的模块ID
        roleId:''        //选中角色的ID
       }
    },
    mounted(){
    	//角色选择
		axios.get('http://52.80.81.221:12345/admin/pms/role').then( res =>{
			
			this.rolesAll = res.data.data;
			for(var i=0;i<this.rolesAll.length;i++){
				var obj = {};
				obj.key = this.rolesAll[i].id;
				obj.label = this.rolesAll[i].description;
				this.roles.push( obj );
			}
			console.log(res)
		});
		//功能选择
		axios.get('http://52.80.81.221:12345/admin/pms/resource').then( res =>{
			console.log(res)
			var getRole = res.data.data;
			for(var i=0;i<getRole.length;i++){
				var obj = {};
				obj.key = getRole[i].id;
				obj.label = getRole[i].name;
				obj.disabled = true;
				this.moduls.push( obj );
			}
		});
	},
    methods:{
    	//角色选择
	    roleChangeSearch(a){
	    	this.roleId = a;
	    	console.log(this.roleId);
	    	for(var i=0;i<this.moduls.length;i++){
	    		delete this.moduls[i].disabled;
	    	}
	    	for(var i=0;i<this.rolesAll.length;i++){
	    		if(this.rolesAll[i].id == a){
	    			this.selectedModul = this.rolesAll[i].resourceIdLst;
	    			console.log(this.moduls)
	    			console.log(this.selectedModul)
	    			return false;
	    		}
	    	}
	    },
	    handleChange(value, direction, movedKeys){
	    	console.log(value, direction, movedKeys);
	    	if(direction=='right'){
	    		axios({
	    			method: 'POST',
	    			url:'http://52.80.81.221:12345/admin/pms/role/'+this.roleId+'/BatchResourceOp',
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
	    			data:{resIds:movedKeys,op:0}
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
	    			url:'http://52.80.81.221:12345/admin/pms/role/'+this.roleId+'/BatchResourceOp',
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
	    			data:{resIds:movedKeys,op:1}
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
	    }
    }
  }
</script>

<style>
	.mt{margin-top: 20px;}
</style>