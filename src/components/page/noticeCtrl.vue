<template>
	<div class="">
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 应用管理</el-breadcrumb-item>
                <el-breadcrumb-item>公告管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
		<div class="tab_select">
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
	      prop="createTime"
	      label="创建时间"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	      prop="noticeTitle"
	      label="公告标题"
	      min-width="120">
	    </el-table-column>
	    <el-table-column 
	      prop="publishState"
	      label="发布状态"
	      min-width="120">
	    </el-table-column>
	    <el-table-column 
	      prop="handle"
	      label="操作"
	      min-width="120">
	    </el-table-column>
	  </el-table>
	</div>
</template>

<script>
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
        tableData3: [{
          tel: '1111111111',
          name: '王小虎',
          createTime: '2017-8-8',
          noticeTitle:'城投执行力plus',
          publishState:'已发布',
          handle:'查看'
        }, {
          tel: '2222222222',
          name: '王小虎',
          createTime: '2017-8-8',
          noticeTitle:'城投执行力plus',
          publishState:'已发布',
          handle:'查看'
        }, {
          tel: '3333333333333',
          name: '王小虎',
          createTime: '2017-8-8',
          noticeTitle:'城投执行力plus',
          publishState:'已发布',
          handle:'查看'
        }, {
          tel: '4444444444',
          name: '王小虎',
          createTime: '2017-8-8',
          noticeTitle:'城投执行力plus',
          publishState:'已发布',
          handle:'查看'
        }, {
          tel: '5555555555',
          name: '王小虎',
          createTime: '2017-8-8',
          noticeTitle:'城投执行力plus',
          publishState:'已发布',
          handle:'查看'
        }, {
          tel: '6666666666',
          name: '王小虎',
          createTime: '2017-8-8',
          noticeTitle:'城投执行力plus',
          publishState:'已发布',
          handle:'查看'
        }, {
          tel: '77777777777',
          name: '王小虎',
          createTime: '2017-8-8',
          noticeTitle:'城投执行力plus',
          publishState:'已发布',
          handle:'查看'
        }],
        multipleSelection: []
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