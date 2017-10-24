<template>
	<div>
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
		<div class="tab_select">
			<div class="search">
				<div class="input">
					<el-input  v-model="queryVal" placeholder="姓名/手机"></el-input>
				</div>
				<el-button @click="stringQuerySearch">查询</el-button>
			</div>
			
			<el-select  v-model="value" @change="valChangeSearch" style="width: auto;">
			    <el-option
			      v-for="item in options"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
		  	</el-select>
		  	<router-link to="/newAdd"><el-button>新增</el-button></router-link>
		  	<el-button @click="modify">修改</el-button>
		  	<el-button @click="stop">停用</el-button>
		  	<el-button @click="activation">激活</el-button>
		  	<el-select  v-model="state" @change="stateChangeSearch" placeholder="可根据激活状态选择" style="width: auto;">
			    <el-option
			      v-for="item in states"
			      :key="item.id"
			      :label="item.name"
			      :value="item.id">
			    </el-option>
		  	</el-select>
		</div>
	  <el-table
	    ref="multipleTable"
	    :data="tableData"
	    tooltip-effect="dark"
	    style="width: 100%"
	    @selection-change="handleSelectionChange">
	    <el-table-column
	      type="selection"
	      width="55">
	    </el-table-column>
	    <el-table-column
	      prop="userId"
	      label="序号"
	      min-width="60">
	    </el-table-column>
	    <el-table-column
	      prop="name"
	      label="姓名"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	      prop="orgTitle"
	      label="职务"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	      prop="phone"
	      label="手机号码"
	      min-width="120">
	    </el-table-column>
	    <el-table-column
	      label="密码"
	      min-width="120">
	      <template scope="scope">
	      	<el-button
	          size="small"
	          @click="rest(scope.row)">密码重置
	        </el-button>
	      </template>
	    </el-table-column>
	    <el-table-column
	      prop="status"
	      label="状态"
	      min-width="120">
	      <template scope="scope">
		      	<span v-if="scope.row.status"  class="disStauts">禁用</span>
		      	<span v-else class="Status">激活</span>
		  </template>
	    </el-table-column>
		    
	    <el-table-column
	      prop="updatedTime"
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
    
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data:function() {
      return {
      	dialogVisible:false,
      	tableData:[],
      	rowIndex:'',
        multipleSelection:[],
        options: [{
          id: '0',
          name: '所有部门'
        }],
        value:'0',      //部门选择编号
        queryVal:'',    //query查询字符串
        currentPage:1,  //分页的 当前页
        pageSize:10 ,    //每页显示条数
        total:0,
        state:'',       //根据状态选择，默认3（所有状态）
        states:[{
		        	id:3,
		        	name:'所有状态'
        		},
        		{
		        	id:0,
		        	name:'已激活'
        		},
        		{
	        		id:2,
		        	name:'未激活'	
        		}
       		]
      }
    },
	mounted(){
		axios.get('http://52.80.81.221:12345/admin/user/?pageNum=1&pageSize=10&orgId=0&state=4'+'&query='+this.queryVal).then( res =>{
			this.total = res.data.data.total;
			this.tableData = res.data.data.list;
			console.log(res)
			
		})
    	axios.get('http://52.80.81.221:12345/admin/node').then( res =>{
    		console.log(res)
			this.options = res.data.data.slice(1) ;
			this.options.splice(0,0, {id:'0',name:'所有部门'} );
		})	
		
	},
    methods: {
    	//公共请求：分页数据，总页数，当前页展示
	    public(res){
	    	this.total = res.data.data.total;
	    	this.tableData = res.data.data.list;
	    	this.currentPage =1;
	    },
    //根据输入条件选择
    stringQuerySearch(){
    	axios.get('http://52.80.81.221:12345/admin/user/?pageNum=1&pageSize=10&orgId='+this.value+'&state='+this.state+'&query='+this.queryVal).then( res =>{
    		this.public(res);
    		})
    	
    },
    //根据激活状态选择
    stateChangeSearch(a){
    	axios.get('http://52.80.81.221:12345/admin/user/?pageNum=1&pageSize=10&orgId='+this.value+'&state='+this.state+'&query='+this.queryVal).then( res =>{
    		this.public(res);
    		console.log(res)
    	})
    },
    //根据部门选择
    valChangeSearch(a){
    	console.log(a)
    	axios.get('http://52.80.81.221:12345/admin/user/?pageNum=1&pageSize=10&orgId='+this.value+'&state='+this.state).then( res =>{
			console.log(this.state)
			this.public(res);
			console.log(res)
		})
    },
    modify(){
    	if(this.multipleSelection.length==0){
    		this.$message.error('请先选择您要修改的用户!');
    	}else if(this.multipleSelection.length > 1){
    		this.$message.error('一次只能选择修改一位用户!');
    	}else{
    		localStorage.setItem('personM',JSON.stringify(this.multipleSelection[0]));
    		this.$router.push('/modify');
    	}
    },
    //重置密码
    rest(row){
    	console.log(row.userId)
    	axios.post('http://52.80.81.221:12345/admin/user/resetPwd?uid='+row.userId).then( res =>{
    		this.$alert('您的默认密码为：888888', '密码重置成功！', {showClose:false,confirmButtonText: '确定'});
    	})
    },
      toggleSelection(rows){
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(selection) {
        this.multipleSelection = selection;
        if(this.multipleSelection.length==0){
        	this.multipleSelection = '';
        }
        console.log(this.multipleSelection)
        this.rowIndex = this.tableData.indexOf(selection[0])
      },
      //停用与激活 公用状态请求
      publicStatus(obj){
      	for( var i=0;i<this.multipleSelection.length;i++ ){
      		obj.uids += ','+this.multipleSelection[i].userId;
      	}
      	obj.uids = obj.uids.slice(1);
      	console.log(obj)
      	axios({
      		method:'POST',
      		url:'http://52.80.81.221:12345/admin/user/disable',
      		transformRequest: [function(data) {
				let ret = '';
				for(let it in data) {
					ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
					return ret;
				}],
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data:obj
      	}).then(res=>{
      		console.log(res)
      		axios.get('http://52.80.81.221:12345/admin/user/?pageNum='+this.currentPage+'&pageSize=10&orgId='+this.value+'&state='+this.state+'&query='+this.queryVal).then( res =>{
    			this.total = res.data.data.total;
		    	this.tableData = res.data.data.list;
		    	this.currentPage =this.currentPage;
		    	this.$message.success('操作成功!');
    		})	
      	})
      },
      
      //暂时用延时GET请求刷新数据
      stop(){
      	if(this.multipleSelection.length==0){
      		this.$message({
			    message: '请选择用户',
			    type: 'warning'
			});
			return false;
      	};
      	var obj = {uids:'',op:2};
      	this.publicStatus(obj);
      	this.$refs.multipleTable.clearSelection();
      	
		
      },
      activation(){
      	if(this.multipleSelection.length==0){
      		this.$message({
			    message: '请选择用户',
			    type: 'warning'
			});
			return false;
      	};
      	var obj = {uids:'',op:0};
      	this.publicStatus(obj);
      	this.$refs.multipleTable.clearSelection();
      },
      handleCurrentChange(val){
                this.cur_page = val;
                this.getData(val);
                this.currentPage = val;
                console.log(this.currentPage)
            },
            getData(val){
                let self = this;
                axios.get('http://52.80.81.221:12345/admin/user/?pageNum='+val+'&pageSize='+self.pageSize+'&orgId='+this.value+'&state='+this.state+'&query='+this.queryVal).then( res => {
                     this.tableData = res.data.data.list;
                     console.log(res)
                })
            },
            search(){
                this.is_search = true;
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
		width: 40%;
	}
	.search .input{
		float: left;
		width: 75%;
	}
	.search button{
		margin-left: 5px;
	}
	.cell{
		text-align: center;
	}
	.el-button+.el-button {
	    margin-left: 0;
	}
	.disStauts{color: gainsboro}
	.Status{color: #2ba245}
</style>