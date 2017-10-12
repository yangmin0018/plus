<template>
	<div>
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 权限管理</el-breadcrumb-item>
            	<el-breadcrumb-item>角色管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="tab_select">
		 	<div class="btn">
				<el-button @click="dialogFormVisible=true">新增</el-button>
				<el-button @click="deleteRole">删除</el-button>
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
	      align='center'
	      type="selection"
	      width="55">
	    </el-table-column>
	    <el-table-column
	      align='center'
	      prop="id"
	      label="序号"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	    	align='center'
	      prop="description"
	      label="角色名称"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	      align='center'
	      prop="memberCount"
	      label="用户数"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	    	align='center'
	      prop="orgTitle"
	      label="修改时间"
	      min-width="120">
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
		<el-dialog title="新增角色" :close-on-click-modal=false :visible.sync="dialogFormVisible">
		  <el-form :model="form">
		    <el-form-item label="角色描述" :label-width="formLabelWidth">
		      <el-input v-model="form.role" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="角色名称" :label-width="formLabelWidth">
		      <el-input v-model="form.description" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="是否可用" :label-width="formLabelWidth">
		        <el-radio class="radio" v-model="form.available" label=true>是</el-radio>
  				<el-radio class="radio" v-model="form.available" label=false>否</el-radio>
		      
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cancel">取 消</el-button>
		    <el-button type="primary" @click="submit">确 定</el-button>
		  </div>
		</el-dialog>
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
        selectedRow:[],
        total:0,
        currentPage:1,   //分页的 当前页
        dialogFormVisible: false,
        form: {
          role: '',
          description: '',
          available: ''
        },
        formLabelWidth: '120px'
      }
    },
    mounted(){
    	axios.get('http://52.80.81.221:12345/admin/pms/role').then( res =>{
    		this.tableData = res.data.data;
    		this.total = res.data.data.length;
			console.log(res)
		});
    },
    methods:{
    	handleCurrentChange(){},
    	choiceAll(allRow){
    		this.selectedRow = allRow;
    	},
    	choiceRow(row){
    		this.selectedRow = row;
    		console.log(row)
    	},
    	deleteRole(){
    		if(this.selectedRow.length > 1){
	          	this.$message({
		          message: '不可同时删除多个',
		          type: 'warning'
		        });
		        return false;
	       };
	       if(this.selectedRow.length < 1){
	       		this.$message({
		          message: '请选择角色！',
		          type: 'warning'
		        });
		        return false;
	       };
    		this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning',
	          showClose:false,
	          closeOnClickModal:false
	       }).then(() => {
	          axios.delete('http://52.80.81.221:12345/admin/pms/role/'+this.selectedRow[0].id).then(
	          	res=>console.log(res)
	          );
	          this.$message({
	            type: 'success',
	            message: '删除成功!'
	          });
	         //找到tableData里面对应的数据删除
	          for(var i=0;i<this.tableData.length;i++){
	          		if( this.selectedRow[0].id == this.tableData[i].id ){
	          			var index = this.tableData.indexOf( this.tableData[i] );
	          			this.tableData.splice(index,1);
	          			return false;
	          		}
	          }
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
    	},
    	submit(){
    		this.form.available = this.form.available == 'true'?true:false;
    		
    		axios({
     			method: 'POST',
     			url:'http://52.80.81.221:12345/admin/pms/role/add',
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
    			data:this.form
    		}).then(res =>{
    			this.tableData.push(res.data.data)
    			console.log(res)
    		})
			console.log(this.form)
			this.form = {
				          role: '',
				          description: '',
				          available: ''
				        };
    		this.dialogFormVisible = false;
    	},
    	cancel(){
    		this.dialogFormVisible = false;
    		this.form = {
				          role: '',
				          description: '',
				          available: ''
				        };
    	}
    }
}
</script>

<style>
.tab_select{
	margin-bottom: 20px;
}
</style>