<template>
	<div class="">
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 应用管理</el-breadcrumb-item>
                <el-breadcrumb-item>项目管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
		<!--<div class="tab_select">
		 	<div class="btn">
				<el-button @click="submite">新增</el-button>
				<el-button>取消</el-button>
			</div>
		</div>
		<div class="tab_select">
		 <el-select v-model="value" placeholder="请选择">
		    <el-option
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
		   <el-select v-model="value1" placeholder="请选择">
		    <el-option
		      v-for="item in options1"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
		  </el-select>
		  <el-button>保存</el-button>
		</div>-->
		<el-table
	    ref="multipleTable"
	    :data="tableData"
	    tooltip-effect="dark"
	    style="width: 100%"
	    @selection-change="handleSelectionChange">
	    
	    <el-table-column
	    	align='center'
	      prop="appdataId"
	      label="序号"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	    	align='center'
	      prop="name"
	      label="姓名"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	    	align='center'
	      prop="createTime"
	      label="创建时间"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	    	align='center'
	      prop="data.title"
	      label="公告标题"
	      min-width="120">
	    </el-table-column>
	    <el-table-column 
	    	align='center'
	      label="发布状态"
	      min-width="120">
	      <template scope="scope">
	      	<span style="color: greenyellow;">已发布</span>
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
        options: [{
          value: '选项1',
          label: '系统管理员 '
        }],
        options1: [{
          value: '选项1',
          label: '销售二部 '
        }],
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
    	axios.get('http://52.80.81.221:12345/admin/statics/2?pageNum=1&pageSize=10').then( res =>{
    		for(var i=0;i<res.data.data.list.length;i++){
    			var aa = JSON.parse(res.data.data.list[i].data);
    			res.data.data.list[i].data = aa;
    		}
    		this.tableData = res.data.data.list;
    		
			console.log(res)
		});
    },
    methods: {
    	handleEdit(index, row){
    		this.dialogVisible = true;
    		this.content = row.data.content;
    		this.title = row.data.title;
    		 console.log(index, row);
    	},
    	handleDelete(index, row){
    		 console.log(index, row);
    	},
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      submite(){}
    }
  }
</script>

<style>
	.tab_select{
		margin-bottom: 20px;
	}
	
</style>