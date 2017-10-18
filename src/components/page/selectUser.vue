<template>
	<div class="">
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>选择用户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
		<div class="tab_select">
		 <el-select v-model="value" @change="roleChangeSearch" placeholder="请选择角色">
		    <el-option
		      v-for="item in roles"
		      :key="item.key"
		      :label="item.label"
		      :value="item.key">
		    </el-option>
		  </el-select>
		  <el-button @click="save">添加保存</el-button>
		  <el-button @click="deleteRole">移除角色</el-button>
		<div class="fr">
		   <el-select v-model="value1" @change="valChangeSearch" placeholder="按部门查找">
		    <el-option
		      v-for="item in org"
		      :key="item.id"
		      :label="item.name"
		      :value="item.id">
		    </el-option>
		  </el-select>
		</div>  
		</div>
		<el-table
	    ref="multipleTable"
	    :data="tableData"
	    @selection-change="choiceRow"
	    @select-all="choiceAll"
	    tooltip-effect="dark"
	    style="width: 100%">
	    <el-table-column
	    	align="center"
	      type="selection"
	      width="55">
	    </el-table-column>
	    <el-table-column
	    	align="center"
	      prop="userId"
	      label="序号"
	      min-width="55">
	      
	    </el-table-column>
	    <el-table-column
	    	align="center"
	      prop="name"
	      label="姓名"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	    	align="center"
	      prop="orgName"
	      label="所属部门"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	    	align="center"
	      prop="orgTitle"
	      label="职务"
	      min-width="120">
	    </el-table-column>
	    <el-table-column 
	    	align="center"
	      prop="status"
	      label="状态"
	      min-width="120">
	      <template scope="scope">
		      	<span v-if="scope.row.status" style="color: gainsboro">禁用</span>
		      	<span v-else style="color: #2ba245;">激活</span>
		  </template>
	    </el-table-column>
	  </el-table>
	  <div class="pagination">
            <el-pagination
            		small
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :current-page="currentPage"
                    :total="total">
            </el-pagination>
    </div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
    data() {
      return {
        roles: [],
        org: [],
        value: '',   //选择角色
        value1: '',  //选择部门
        tableData:[],
        multipleSelection: [],
        pageSize:'10',
        selectedRow:'',
        total:0,
        currentPage:1   //分页的 当前页
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
		axios.get('http://52.80.81.221:12345/admin/node').then( res =>{
			this.org = res.data.data;
		});
		axios.get('http://52.80.81.221:12345/admin/node/1/users?pageNum=1&pageSize=10').then( res =>{
			
			this.total = res.data.data.total;
			this.tableData = res.data.data.list;
		})
	},
     methods: {
     	save(){
     		if( !this.value ){
     			this.$message.error('请选择角色');
     		}else if( !this.selectedRow ){
     			this.$message.error('请选择用户');
     		}else{
     		var uids='';
     		for(var i=0;i<this.selectedRow.length;i++){
     			uids +=','+ this.selectedRow[i].userId
     		}
     		uids = uids.slice(1);
     		axios({
     			method: 'POST',
     			url:'http://52.80.81.221:12345/admin/pms/role/'+this.value+'/BatchOP',
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
    			data:{uids:uids,op:0}
     		}).then( res =>{
     			this.$message.success('角色添加成功！');
     			this.$refs.multipleTable.clearSelection();
     			console.log(res)
     		})
     		}
     	},
     	deleteRole(){
     		if( !this.value ){
     			this.$message.error('请选择角色');
     		}else if( !this.selectedRow ){
     			this.$message.error('请选择用户');
     		}else{
     		var uids='';
     		for(var i=0;i<this.selectedRow.length;i++){
     			uids +=','+ this.selectedRow[i].userId
     		}
     		uids = uids.slice(1);
     		axios({
     			method: 'POST',
     			url:'http://52.80.81.221:12345/admin/pms/role/'+this.value+'/BatchOP',
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
    			data:{uids:uids,op:1}
     		}).then( res =>{
     			this.$message.success('角色移除成功！');
     			this.$refs.multipleTable.clearSelection();
     			console.log(res)
     		})
     		}
     	},
     	choiceAll(selection){
     		this.selectedRow = selection;
     	},
     choiceRow(selection){
     	this.selectedRow = selection;
     },
     handleCurrentChange(val){
        this.currentPage = val;
        this.getData(val);  
     },
    getData(val){
        let self = this;
        if(!this.value1){
        	axios.get('http://52.80.81.221:12345/admin/node/1/users?pageNum='+val+'&pageSize='+self.pageSize).then( res => {
            	this.tableData = res.data.data.list;
            	this.total = res.data.data.total;
        	})
        	return false;
        };
        axios.get('http://52.80.81.221:12345/admin/node/'+this.value1+'/users?pageNum='+val+'&pageSize='+self.pageSize).then( res => {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
        })
    },
    //部门选择
    valChangeSearch(){
    	axios.get('http://52.80.81.221:12345/admin/node/'+this.value1+'/users?pageNum=1&pageSize=10').then( res =>{
			this.tableData = res.data.data.list;
			this.total = res.data.data.total;
			this.currentPage =1;
		})
    },
    //角色选择
    roleChangeSearch(res){
			console.log(res)
    }
    }
  }
</script>

<style>
	.tab_select{
		margin-bottom: 20px;
	}
	.el-button+.el-button {
	    margin-left: 0;
	}
	.fr{float:right}
</style>