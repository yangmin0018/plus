<template>
	<div>
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 统计汇总</el-breadcrumb-item>
				<el-breadcrumb-item>考勤统计</el-breadcrumb-item>
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
	      <!--type="selection"-->
	      width="55">
	    </el-table-column>
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
	      prop="later"
	      label="迟到次数"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	    	align='center'
	      prop="quit"
	      label="早退次数"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	    	align='center'
	      prop="miss"
	      label="缺卡次数"
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
	    				axios.get('/admin/statics/sign?pageNum=1&pageSize=10&beginTime='+this.value1+'&endTime='+this.value2).then( res =>{
	    					this.tableData = res.data.data.list;
	    					this.total = res.data.data.total;
	    					console.log(this.value2)
							console.log(res)
						});
	    		
	    	}
    	},
    	handleCurrentChange(val){
	        this.currentPage = val;
	        axios.get('/admin/statics/sign?pageNum='+val+'&pageSize='+this.pageSize+'&beginTime='+this.value1+'&endTime='+this.value2).then( res =>{
    					this.tableData = res.data.data.list;
    					this.total = res.data.data.total;
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