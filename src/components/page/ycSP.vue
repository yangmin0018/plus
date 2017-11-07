<template>
	<div>
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 统计汇总</el-breadcrumb-item>
				<el-breadcrumb-item>用车审批</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
		<div class="tab_select">
			    <span class="demonstration">开始时间</span>
			    <el-date-picker
			      v-model="value1"
			      type="date"
			      placeholder="选择日期">
			    </el-date-picker>
			    <span class="demonstration">结束时间</span>
		  		<el-date-picker
			      v-model="value2"
			      type="date"
			      placeholder="选择日期">
			    </el-date-picker>
			    <el-button @click="search">查询</el-button>
		</div>
	  <el-table
	    ref="multipleTable"
	    :data="tableData"
	    tooltip-effect="dark"
	    style="width: 100%"
	    @selection-change="handleSelectionChange">
	    <el-table-column
	    	align='center'
	      prop="userId"
	      label="序号"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	    	align='center'
	      prop="department"
	      label="部门"
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
	      label="详情"
	      min-width="120">
	      <template scope="scope">
	        <p ><span>{{ scope.row.data[0]['key'] }} : </span><span>{{ scope.row.data[0]['value'] }}</span></p>
	        <p ><span>{{ scope.row.data[1]['key'] }} : </span><span>{{ scope.row.data[1]['value'] }}</span></p>
	        <p ><span>{{ scope.row.data[2]['key'] }} : </span><span>{{ scope.row.data[2]['value'] }}</span></p>
	        <p ><span>{{ scope.row.data[3]['key'] }} : </span><span>{{ scope.row.data[3]['value'] }}</span></p>
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
        value1: '',
        value2:'',
        tableData: [],
        multipleSelection: [],
        pageSize:10,
        total:0,
        currentPage:1,   //分页的 当前页
        value:'',
        input:''
      }
    },
	mounted(){
//  	axios.get('/admin/statics/sign?pageNum=1&pageSize=10&beginTime=2017-07-21 00:00:00&endTime=2017-10-10 23:59:59').then( res =>{
//  		
//			console.log(res)
//		});
		
   },
    methods: {
    	
    	search(){
    		if(this.value1 == '' ||this.value2 == ''){
    			this.$message.error('请选择时间段');
    		}else{
	    		var mValue1 = (new Date(this.value1)).getTime();
				var mValue2 = (new Date(this.value2)).getTime();
				this.value1 = format1(mValue1);
				this.value2 = format2(mValue2);
				//时间格式转换函数
				function add0(m){return m<10?'0'+m:m };
				function format1(shijianchuo){
					//shijianchuo是整数，否则要parseInt转换
					var time = new Date(shijianchuo);
					var y = time.getFullYear();
					var m = time.getMonth()+1;
					var d = time.getDate();
					var h = time.getHours();
					var mm = time.getMinutes();
					var s = time.getSeconds();
					return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
				};
				function format2(shijianchuo){
					//shijianchuo是整数，否则要parseInt转换
					var time = new Date(shijianchuo);
					var y = time.getFullYear();
					var m = time.getMonth()+1;
					var d = time.getDate();
					return y+'-'+add0(m)+'-'+add0(d)+' 23:59:59';
				};
	    				axios.get('/admin/statics/13?pageNum=1&pageSize=10&beginTime='+this.value1+'&endTime='+this.value2).then( res =>{
	    					for(var i=0;i<res.data.data.list.length;i++){
	    						res.data.data.list[i]['data'] = JSON.parse(res.data.data.list[i]['data']);
	    					}
	    					this.tableData = res.data.data.list;
	    					this.total = res.data.data.total;
	    					this.currentPage =1;
	    					console.log(this.value2)
							console.log(this.tableData)
						});
	    		
	    	}
    	},
    	handleCurrentChange(val){
	        this.currentPage = val;
	        axios.get('/admin/statics/13?pageNum='+val+'&pageSize='+this.pageSize+'&beginTime='+this.value1+'&endTime='+this.value2).then( res =>{
    					for(var i=0;i<res.data.data.list.length;i++){
	    						res.data.data.list[i]['data'] = JSON.parse(res.data.data.list[i]['data']);
	    					}
    					this.tableData = res.data.data.list;
						console.log(res)
					});
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
		margin-bottom: 10px;
	}
	.search{
		float: right;
		width: 30%;
	}
	.search .input{
		float: left;
		width: 75%;
	}
</style>