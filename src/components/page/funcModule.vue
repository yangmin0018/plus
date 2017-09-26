<template>
	<div class="">
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>权限管理</el-breadcrumb-item>
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
		  	  	<el-transfer v-model="selectedModul" :data="roles"  :titles="['待选模块', '已选模块']"></el-transfer>
		  </div>
		  
	</div>
	
</template>

<script>
import axios from 'axios';	
export default {
    data() {
      return {
        roles: [],
        value: '',   //选择角色
        tableData:'',
        total:'',
        selectedModul:[]   //选中的模块
      }
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
	},
    methods:{
    	//角色选择
	    roleChangeSearch(a){
	    	console.log(a)
	    },
	    submit(){
	    	console.log(this.selectedModul)
	    }
    }
  }
</script>

<style>
	.mt{margin-top: 20px;}
</style>