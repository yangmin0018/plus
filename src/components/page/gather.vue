<template>
	<div>
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 统计汇总</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
		<div class="tab_select">
			<div class="search">
				<div class="input">
					<el-input  v-model="input" placeholder="姓名/手机"></el-input>
				</div>
				<el-button>查询</el-button>
			</div>
			
			<el-select  v-model="value" placeholder="请选择" style="width: auto;">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
		  </el-select>
		  	<el-button>导出</el-button>
			    <span class="demonstration">开始时间</span>
			    <el-date-picker
			      v-model="value1"
			      type="date"
			      placeholder="选择日期">
			    </el-date-picker>
			    <span class="demonstration">结束时间</span>
		  		<el-date-picker
			      v-model="value1"
			      type="date"
			      placeholder="选择日期">
			    </el-date-picker>
		</div>
	  <el-table
	    ref="multipleTable"
	    :data="tableData3"
	    tooltip-effect="dark"
	    style="width: 100%"
	    @selection-change="handleSelectionChange">
	    <el-table-column
	      type="selection"
	      width="55">
	    </el-table-column>
	    <el-table-column
	      label="序号"
	      min-width="120">
	      <template scope="scope">{{ scope.row.date }}</template>
	    </el-table-column>
	    <el-table-column
	      prop="tel"
	      label="部门"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	      prop="name"
	      label="姓名"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	      prop="state"
	      label="迟到次数"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	      prop="modifiTime"
	      label="早退次数"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	      prop="modifiTime"
	      label="出勤天数"
	      min-width="120">
	    </el-table-column>
	  </el-table>
	  
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
      	 
        value1: '',
        tableData3: [{
          tel: '1111111111',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          tel: '2222222222',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          tel: '3333333333333',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          tel: '4444444444',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          tel: '5555555555',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          tel: '6666666666',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          tel: '77777777777',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: [],
        options: [{
          value: '选项1',
          label: '考勤汇总'
        }],
        value:'',
        input:''
      }
    },
	mounted(){
    	axios.get('http://52.80.81.221:12345/admin/statics/sign?pageNum=1&pageSize=10&beginTime=2017-07-21 00:00:00&endTime=2017-09-30 23:59:59').then( res =>{
    		
			console.log(res)
		});
//		axios.get('http://52.80.81.221:12345/admin/statics/2?pageNum=1&pageSize=10').then( res =>{
//  		
//			console.log(res)
//		});
    },
    methods: {
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