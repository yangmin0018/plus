<template>
	<div class="">
		<div class="crumbs">
            <el-breadcrumb separator="/">
            	<el-button @click="addProject" type="success" class="fr">新增公告</el-button>
                <el-breadcrumb-item><i class="el-icon-date"></i> 应用管理</el-breadcrumb-item>
                <el-breadcrumb-item>公告管理</el-breadcrumb-item>
            </el-breadcrumb>
       </div>
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
	      label="公告标题"
	      min-width="120">
	      <template scope="scope">
	      	<span>{{scope.row.data[0].value}}</span>
	      </template>
	    </el-table-column>
	    <el-table-column 
	    	align='center'
	      label="发布状态"
	      min-width="120">
	      <template scope="scope">
	      	<span style="color: #2ba245;">已发布</span>
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
	  		<el-pagination class="fr"
            		small
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :current-page="currentPage"
                    :total="total">
            </el-pagination>
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
	   
	   <!--新增项目弹框-->
	   <el-dialog title="新增公告" :visible.sync="dialogFormVisible">
		  <el-form :model="noticData">
		    <el-form-item label="公告标题" :label-width="formLabelWidth">
		      <el-input v-model="noticData.noticTitle" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="公告内容" :label-width="formLabelWidth">
		      <el-input type="textarea" :rows="4" v-model="noticData.noticContent" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="上传附件" :label-width="formLabelWidth">
				<form >
				    <input id="file" name="filename" type="file" @click="submitFile"/>
				</form>
				
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
	import $ from 'jquery';
	import axios from 'axios';
	export default {
    data() {
      return {
        currentPage:1,  //分页的 当前页
        total:0,
        value: '',
        value1: '',
        tableData: [],
        multipleSelection: [],
        dialogVisible: false,
        content:'',
        title:'',
        dialogFormVisible:false,
        formLabelWidth:'120px',
        noticData:{
        	noticTitle:'',
        	noticContent:'',
        	fujian:''
        }
      }
    },
    mounted(){
    	this.pubilcNoticRes();
    },
    methods: {
    	pubilcNoticRes(){
    		axios.get('/admin/statics/7?pageNum=1&pageSize=10&beginTime=2000-01-01 00:00:00&endTime=2999-12-01 23:59:59').then( res =>{
    			this.total = res.data.data.total;
	    		for(var i=0;i<res.data.data.list.length;i++){
	    			var aa = JSON.parse(res.data.data.list[i].data);
	    			res.data.data.list[i].data = aa;
	    		}
	    		this.tableData = res.data.data.list;
				console.log(this.tableData)
			});
    	},
    	handleCurrentChange(val){
    		console.log(val)
    		this.currentPage = val;
    		axios.get('/admin/statics/7?pageNum='+val+'&pageSize=10&beginTime=2000-01-01 00:00:00&endTime=2999-12-01 23:59:59').then( res =>{
    			this.total = res.data.data.total;
	    		for(var i=0;i<res.data.data.list.length;i++){
	    			var aa = JSON.parse(res.data.data.list[i].data);
	    			res.data.data.list[i].data = aa;
	    		}
	    		this.tableData = res.data.data.list;
			});
    	},
    	addProject(){
    		this.dialogFormVisible = true
    	},
    	submitFile(){
    		var This = this;
				$("#file").on("change", function(){
				  var formData = new FormData();
				  var aa = $("#file")[0].files[0];
				  formData.append("filename",aa);
//				  $.ajax({
//				      url: "http://52.80.81.221:12345/api/work/attachment",
//				      type: "POST",
//				      data: formData,
//				      processData: false,
//				      contentType: false,
//				      success: function(res){
//				            
//				            This.noticData.fujian = res.data.url;
//				            console.log(res)
//				      },
//				      error:function(res){
//				      	console.log(res)
//				      }
//				  });
				  axios({
				      url: "/api/work/attachment",
				      method: "POST",
				      data: formData
				  }).then(res=>{
				  	 This.noticData.fujian = res.data.data.url;
				            console.log(res)
				  })
				});
		},
		submit(){
			this.dialogFormVisible = false;
			let ms_userId = localStorage.getItem('ms_userId');
			
			let data = [{'key':'公告标题','value':this.noticData.noticTitle},{'key':'公告内容','value':this.noticData.noticContent}];
			if( this.noticData.fujian == '' ){
				data = JSON.stringify(data);
			}else{
				data.push( {'key':'附件','value':this.noticData.fujian} );
				data = JSON.stringify(data);
			}
			let formData = {
				userId:ms_userId,
				appId:7,
				data:data
			}
//			console.log(formData)
			axios({
     			method: 'POST',
     			url:'/api/work/appdata',
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
    			data:formData
    		}).then(res =>{
    			console.log(res)
    			console.log(formData)
    			this.noticData = {
			        noticTitle:'',
			        noticContent:'',
			        fujian:''
			    };
    			this.pubilcNoticRes();
    		})
		},
		cancel(){
			this.dialogFormVisible = false;
			this.noticData = {
			        noticTitle:'',
			        noticContent:'',
			        fujian:''
			   };
		},
    	handleEdit(index, row){
    		this.dialogVisible = true;
    		this.content = row.data[1].value;
    		this.title = row.data[0].value;
    		 console.log(index, row);
    	},
    	handleDelete(index, row){
    		console.log(index, row);
    		this.$confirm('此操作将永久删除该条公告, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          showClose:false,
		      closeOnClickModal:false,
	          type: 'warning'
	        }).then(() => {
	          axios.delete('/admin/work/appdata/'+row.appdataId).then(res=>{
    			console.log(res);
				
				axios.get('/admin/statics/7?pageNum='+this.currentPage+'&pageSize=10&beginTime=2000-01-01 00:00:00&endTime=2999-12-01 23:59:59').then( res =>{
		    		for(var i=0;i<res.data.data.list.length;i++){
		    			var aa = JSON.parse(res.data.data.list[i].data);
		    			res.data.data.list[i].data = aa;
		    		}
		    		this.total = res.data.data.total;
		    		this.tableData = res.data.data.list;
				});
				this.tableData.splice(index,1);
				this.$message.success('删除成功!');
    		  })
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });
    		
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
      }
    }
  }
</script>

<style>
	.tab_select{
		margin-bottom: 20px;
	}
	
</style>