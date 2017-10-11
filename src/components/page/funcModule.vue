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
		  <el-button @click="submit">保存</el-button>
		  <div class="remark mt">
		  	  	<el-transfer v-model="selectedModul" :data="moduls"  :titles="['待选模块', '已选模块']"></el-transfer>
		  </div>
		  
	</div>
	
</template>

<script>
import axios from 'axios';	
export default {
    data() {
      return {
        roles: [],   //有所角色
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
			var getRole = res.data.data;
			for(var i=0;i<getRole.length;i++){
				var obj = {};
				obj.key = getRole[i].id;
				obj.label = getRole[i].description;
				this.roles.push( obj );
			}
		});
		//功能选择
		axios.get('http://52.80.81.221:12345/admin/pms/resource').then( res =>{
			console.log(res)
			var getRole = res.data.data;
			for(var i=0;i<getRole.length;i++){
				var obj = {};
				obj.key = getRole[i].id;
				obj.label = getRole[i].name;
				this.moduls.push( obj );
			}
		});
	},
    methods:{
    	//角色选择
	    roleChangeSearch(a){
	    	this.roleId = a;
	    	console.log(this.roleId)
	    },
	    submit(){
	    	if(!this.roleId){
	    		this.$message.error('请选择角色!');
	    		return false;
	    	}else if(this.selectedModul.length==0){
	    		this.$message.error('请选择配置功能!');
	    		return false;
	    	}
	    	this.modulId = this.selectedModul.join(',');
	    	console.log( this.modulId);
	    	
	    	var obj = {resIds:this.modulId};
	    	axios({
    			method: 'POST',
    			url:'http://52.80.81.221:12345/admin/pms/role/'+this.roleId+'/AddResource',
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
    			data:obj
    		}).then( res =>{
    			this.$message('设置成功！');
				console.log(res)
			})	
	    }
    }
  }
</script>

<style>
	.mt{margin-top: 20px;}
</style>