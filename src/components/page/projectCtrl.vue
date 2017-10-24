<template>
	<div class="">
		<div class="crumbs">
			
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 应用管理</el-breadcrumb-item>
                <el-breadcrumb-item>项目管理</el-breadcrumb-item>
            </el-breadcrumb>
            
        </div>
		
		<el-table
	    ref="multipleTable"
	    :data="tableData"
	    tooltip-effect="dark"
	    style="width: 100%">
	    
	    <el-table-column
	    	align='center'
	      prop="projectId"
	      label="序号"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	    	align='center'
	      prop="nickName"
	      label="创建人"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	    	align='center'
	      prop="beginTime"
	      label="创建时间"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	    	align='center'
	      prop="projectName"
	      label="项目标题"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	    	align='center'
	      prop="projectTarget"
	      label="项目目标"
	      min-width="120">
	    </el-table-column>
	    <el-table-column 
	    	align='center'
	      label="完成状态"
	      min-width="120">
	      <template scope="scope">
	      	<span style="color:#2ba245;">已发布</span>
	      </template>
	    </el-table-column>
	    <el-table-column 
	    	align='center'
	      prop="handle"
	      label="操作"
	      min-width="120">
	       <template scope="scope">
		        <el-button
		          size="small"
		          @click="handleEdit(scope.$index, scope.row)">查看</el-button>
		        <el-button
		          size="small"
		          type="danger"
		          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	  <el-dialog
		  :title="title"
		  :visible.sync="dialogVisible"
		  size="tiny">
		  <span>{{content}}</span>
		  <span slot="footer" class="dialog-footer">
			    <!--<el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
		  </span>
	   </el-dialog>
	   
	   
	</div>
</template>

<script>
	
	import axios from 'axios';
	export default {
    data() {
      return {
        
        value: '',
        value1: '',
        tableData: [],
        multipleSelection: [],
        dialogVisible: false,
        content:'',
        title:''
      }
    },
    mounted(){
    	axios.get('http://52.80.81.221:12345/admin/project/?pageNum=1&pageSize=10').then( res =>{
    		console.log(res)
    		this.tableData = res.data.data.list;
		});
    },
    methods: {
    	handleEdit(index, row){
    		this.dialogVisible = true;
    		this.content = row.projectDesc;
    		this.title = row.projectName;
    		 console.log(index, row);
    	},
    	handleDelete(index, row){
    		 console.log(index, row);
    		 this.$confirm('此操作将永久删除该条项目, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          showClose:false,
		      closeOnClickModal:false,
	          type: 'warning'
	        }).then(() => {
	          axios.delete('http://52.80.81.221:12345/admin/project/?projectId='+row.projectId).then(res=>{
    			console.log(res);
				this.tableData.splice(index,1);
    			this.$message.success('删除成功!');
    		  })
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
	.tab_select{
		margin-bottom: 20px;
	}
	
</style>