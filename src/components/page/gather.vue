<template>
	<div>
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>统计汇总</el-breadcrumb-item>
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
			    <span class="demonstration">统计时间</span>
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
	      prop="name"
	      label="姓名"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	      prop="tel"
	      label="手机号码"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	      prop="password"
	      label="密码"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	      prop="state"
	      label="状态"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	      prop="modifiTime"
	      label="修改时间"
	      min-width="120">
	    </el-table-column>
	  </el-table>
	  <div style="margin-top: 20px">
	    <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
	    <el-button @click="toggleSelection()">取消选择</el-button>
	  </div>
  </div>
</template>

<script>
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
	.search button{
		float: right;
	}
</style>