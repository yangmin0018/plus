<template>
	<div style="position: relative;height: 100%;">
		<div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 审批流程</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       
		<div class="selectProcess">
				<el-select   v-model="value" @change="appValChangeSearch" placeholder="选择审批应用" class="select">
				    <el-option
				      v-for="item in tableData"
				      :key="item.appId"
				      :label="item.appName"
				      :value="item.appId">
				    </el-option>
				</el-select>
			<div class="processPerson">
				<ul>
					<li class="grade" :class="{active:ctrl==true}" @click="firstManager">
						<p >直接主管</p>
					</li>
					<li class="add" v-show="!manager"></li>
					<li class="grade" :class="{active:ctrl==false}" v-show="!manager" @click="secondManager">
						<p>第2级主管</p>
					</li>
					<li class="del" @click="delManager" v-show="!manager"></li>
					<li class="addMore" @click="addManager" v-show="manager"></li>
				</ul>
			</div>
		</div>
		<div class="approver" >
			<div class="title" >
				设置审批人
			</div>
			<div class="approverContent">
				<div class="approverClass">
					审批人类别
				</div>
				<div class="approverDetail">
					<div class="classify">
						<el-radio class="radio" v-model="radio" label="1">主管  - 指定一级</el-radio>
  						<el-radio class="radio" v-model="radio" label="2">指定成员</el-radio>
					</div>
					<div class="classify_1" v-show="radio==1">
						指定某一级主管：发起人的<br />
						 <el-radio class="radio" v-model="radio2" label="1">第一级主管</el-radio>
						  <el-radio class="radio" v-model="radio2" label="2">第二级主管</el-radio>
					</div>
					<div class="classify_btn" v-show="radio==1">
						<el-button type="primary" @click="savePerson">确定</el-button>
						<el-button @click="cancel">取消</el-button>
					</div>
					<el-dialog @open="open" :showClose="false" :close-on-click-modal=false  :visible.sync="dialogTableVisible">
						
						<div class="tab_select tab_config">
								<div class="search">
									<div class="input">
										<el-input v-model="queryVal" placeholder="姓名/手机"></el-input>
									</div>
									<el-button @click="stringQuerySearch">查询</el-button>
								</div>
								<el-select v-model="value1" @change="valChangeSearch" class="el-selectp" placeholder="请选择部门">
								    <el-option
								      v-for="item in org"
								      :key="item.id"
								      :label="item.name"
								      :value="item.id">
								    </el-option>
								</el-select>
						</div>
						<el-table
						    ref="multipleTable"
						    closeOnClickModal
						    :data="dialogTableData"
						    @selection-change="choiceRow"
						    tooltip-effect="dark"
						    style="width: 100%">
						    <el-table-column
						      type="selection"
						      width="55">
						    </el-table-column>
						    <el-table-column
						      prop="name"
						      label="姓名"
						      min-width="120">
						    </el-table-column>
						    <el-table-column
						      prop="orgName"
						      label="所属部门"
						      min-width="120">
						    </el-table-column>
						    <el-table-column
						      prop="orgTitle"
						      label="职务"
						      min-width="120">
						    </el-table-column>
						    <el-table-column 
						      prop="status"
						      label="状态"
						      min-width="120">
						      <template scope="scope">
							      	<span v-if="scope.row.status" style="color: gainsboro">禁用</span>
							      	<span v-else style="color: greenyellow;">激活</span>
							  </template>
						    </el-table-column>
						  </el-table>
						  <div class="pagination fr">
					            <el-pagination
					            		small
					                    @current-change ="handleCurrentChange"
					                    layout="prev, pager, next"
					                    :current-page="currentPage"
					                    :total="total">
					            </el-pagination>
					       </div>
					       <div class="">
					       		<el-button @click="savePerson2">确 定</el-button>
								<el-button @click="close">取 消</el-button>
					       </div>
					</el-dialog>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
import axios from 'axios';
export default {
    data:function() {
      return {
      	tableData:'',        //审批应用信息
      	dialogTableData:[],  //指定成员弹出框信息
      	selectedRow:'',     //被选中的成员
      	total:0,
      	value:'',        //appId
      	currentPage:1,  //分页的 当前页
        pageSize:10,     //每页显示条数
        queryVal:'',    //query查询字符串
        value1: '',  //选择部门
        reviewsLen:0,    //被选择的审批应用下的reviews的长度
        reviewId1:'',    //第一级的reviewId
        reviewId2:'',    //第二级的reviewId
        org: [],     
        radio:'',
        radio2:'',
        inputTxt:'',    //指定一级 审批人
        manager:true,
        dialogTableVisible: false,
        ctrl:true,       //审批人设定控制器
        reviewObj:{},      //修改流程审批 提交信息
        numCtrl:1           //控制流程（第一级设置后才能设置第二级）
      }
    },
    watch:{
    	radio:function(){
    		if(this.radio==2)this.dialogTableVisible=true;
    	},
    	selectedRow:function(){
    		if(this.selectedRow.length == 0)this.selectedRow='';
    	}
    },
    mounted(){
		axios.get('http://52.80.81.221:12345/admin/review/apps').then( res =>{
			
			this.tableData = res.data.data;
			console.log(this.tableData)
		});
		axios.get('http://52.80.81.221:12345/admin/node').then( res =>{
			this.org = res.data.data;
		});
		axios.get('http://52.80.81.221:12345/admin/review?pageNum=1&pageSize=12').then( res =>{
			console.log(res)
			console.log(this.reviewsLen)
		})
		
	},
    methods:{
    	//公共请求：分页数据，总页数，当前页展示
	    public(res){
	    	this.dialogTableData = res.data.data.list;
	    	this.total = res.data.data.total;
	    	this.currentPage =1;
	    },
    	stringQuerySearch(){
		    	axios.get('http://52.80.81.221:12345/admin/user/?pageNum=1&pageSize=10&query='+this.queryVal).then( res =>{
		    		this.public(res);
		    	})
		},
		open(){
			axios.get('http://52.80.81.221:12345/admin/user/?pageNum=1&pageSize=10&orgId=0'+'&query='+this.queryVal).then( res =>{
				this.public(res);
			})
		},
    	close(){
    		this.radio = '';
    		this.dialogTableVisible = false;
    	},
    	handleCurrentChange(val){
    		this.currentPage = val;
            this.getData(val);
        },
        getData(val){
        	let self = this;
	        if(!this.queryVal){
	        	axios.get('http://52.80.81.221:12345/admin/user/?pageNum='+val+'&pageSize=10&orgId=0').then( res => {
	            	this.dialogTableData = res.data.data.list;
	            	this.total = res.data.data.total;
	            	
	        	})
	        	return false;
	        };
	        axios.get('http://52.80.81.221:12345/admin/user/?pageNum='+val+'&pageSize='+self.pageSize+'&query='+this.queryVal).then( res => {
	            this.dialogTableData = res.data.data.list;
	            this.total = res.data.data.total;
	          
	        })
        },
        //审批选择
    	appValChangeSearch(a){
    		//为了动态获取审批设置，每次选择都请求新数据
    		axios.get('http://52.80.81.221:12345/admin/review/apps').then( res =>{
			
				this.tableData = res.data.data;
				console.log(this.tableData)
				//找到对应appId的数据
				for(var i=0;i<this.tableData.length;i++){
	    			if(this.tableData[i].appId == a){
	    				this.reviewsLen = this.tableData[i]['reviews'].length;console.log(this.reviewsLen)
	    				this.reviewObj.appId = this.tableData[i].appId;
	    				//根据reviews长度，决定请求ID值有几个，分别拿到
	    				if(this.reviewsLen == 1){
	    					this.reviewId1 = this.tableData[i]['reviews'][0].reviewId;
	    				}else if(this.reviewsLen==2){
	    					this.reviewId1 = this.tableData[i]['reviews'][0].reviewId;
	    					this.reviewId2 = this.tableData[i]['reviews'][1].reviewId;
	    				}
				console.log(this.reviewsLen)
	    				return false;
	    			}
	    		}
			});
    		
    	},
      	//如果被选应用已有审批流程，请求API
      	reviewsPublicPost(){
        		axios({ // 发送post表单提交请求
					method: 'POST',
					url: 'http://52.80.81.221:12345/admin/review/'+ this.reviewObj.reviewId,
					transformRequest: [function(data) {
						let ret = ''
						for(let it in data) {
							ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
						}
							return ret
					}],
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: this.reviewObj
				}).then( res =>{
					this.$message.success('审批设置成功！');
    				console.log(res)
    				})
       	},
       	//如果被选应用没有审批流程，请求API
       	reviewsPublicPost_2(){
        		axios({ // 发送post表单提交请求
					method: 'POST',
					url: 'http://52.80.81.221:12345/admin/review/',
					transformRequest: [function(data) {
						let ret = ''
						for(let it in data) {
							ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
						}
							return ret
					}],
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: this.reviewObj
				}).then( res =>{
					this.$message.success('审批设置成功！');
    				console.log(res)
    				})
       	},
        savePerson(){
        	if(!this.radio2){
        		return false;
        	}else if(!this.value){
        		this.$message({
		          message: '请选择审批应用',
		          type: 'warning'
		        });
        	}else if(this.ctrl){
        		var p = document.getElementsByClassName('grade')[0].getElementsByTagName('p')[0];
        		p.innerHTML = this.radio2 == 1 ? '第一级主管':'第二级主管';
        		this.reviewObj.stepNo = 1;
        		this.reviewObj.isVirtual = true;
        		this.reviewObj.userId = parseInt(this.radio2);
        		console.log(this.reviewsLen)
        		//进入第一级审批后，如果reviews长度大于0，请求ID值
        		if(this.reviewsLen > 0){
        			this.reviewObj.reviewId = this.reviewId1;
        			this.reviewsPublicPost();
        		}else if(this.reviewsLen == 0){
        			this.reviewObj.reviewId = '';
        			this.reviewsPublicPost_2();
        		}
        		this.numCtrl = 2;
			}else{
        		var p = document.getElementsByClassName('grade')[1].getElementsByTagName('p')[0];
        		p.innerHTML = this.radio2 == 1 ? '第一级主管':'第二级主管';
        		this.reviewObj.stepNo = 2;
        		this.reviewObj.isVirtual = true;
        		this.reviewObj.userId = parseInt(this.radio2);
        		console.log(this.reviewsLen)
        		//进入第二级审批后，如果reviews长度等于2，请求ID值
        		if(this.reviewsLen == 2){
        			this.reviewObj.reviewId = this.reviewId2;
        			this.reviewsPublicPost();
        		}else if(this.reviewsLen < 2){
        			this.reviewObj.reviewId = '';
        			this.reviewsPublicPost_2();
        		}
        	}
        	this.radio = '';
        },
        cancel(){
	        	this.inputTxt = '';
        },
        savePerson2(){
        	if(!this.selectedRow){
        		return false;
        	}else if(!this.value){
        		this.$message({
		          message: '请选择审批应用',
		          type: 'warning'
		        });
        		return false;
        	}else if(this.ctrl){
        		var p = document.getElementsByClassName('grade')[0].getElementsByTagName('p')[0];
        		var txt = '';
        		for(var i=0;i<this.selectedRow.length;i++){
        			txt += this.selectedRow[i].name + ' ';
        		}
        		p.innerHTML = txt;
        		this.reviewObj.userId = this.selectedRow[0].userId;
        		this.reviewObj.stepNo = 1;
        		this.reviewObj.isVirtual = false;
        		console.log(this.reviewsLen)
        		//进入第一级审批后，如果reviews长度大于0，请求ID值
        		if(this.reviewsLen > 0){
        			this.reviewObj.reviewId = this.reviewId1;
        			this.reviewsPublicPost();
        		}else if(this.reviewsLen == 0){
        			this.reviewObj.reviewId = '';
        			this.reviewsPublicPost_2();
        		}
        		this.dialogTableVisible = false;
        		this.numCtrl = 2;
        	}else{
        		var p = document.getElementsByClassName('grade')[1].getElementsByTagName('p')[0];
        		var txt = '';
        		for(var i=0;i<this.selectedRow.length;i++){
        			txt += this.selectedRow[i].name + ' ';
        		}
        		p.innerHTML = txt;
        		this.reviewObj.userId = this.selectedRow[0].userId;
        		this.reviewObj.stepNo = 2;
        		this.reviewObj.isVirtual = false;
        		console.log(this.reviewsLen)
        		//进入第二级审批后，如果reviews长度等于2，请求ID值
        		if(this.reviewsLen == 2){
        			this.reviewObj.reviewId = this.reviewId2;
        			this.reviewsPublicPost();
        		}else if(this.reviewsLen < 2){
        			this.reviewObj.reviewId = '';
        			this.reviewsPublicPost_2();
        		}
        		this.dialogTableVisible = false;
        	};
        	this.radio = '';
        },
    	firstManager(){
    		if(!this.ctrl){
    			this.ctrl = true;
    		}
    	},
    	secondManager(){
    		if( this.numCtrl == 2 ){
    			this.ctrl=!this.ctrl
    		}else{
    			this.$message({
		          message: '请先设置第一级审批人，再设置第二级审批人！',
		          type: 'warning'
		        });
    		}
    		
    	},
    	addManager(){
    		this.manager = !this.manager;
    	},
    	delManager(){
    		this.manager = !this.manager;
    	},
    	choiceRow(selection){
     		this.selectedRow = selection;
     		console.log(selection)
     		
     	},
     	//部门选择
	    valChangeSearch(){
	    	axios.get('http://52.80.81.221:12345/admin/node/'+this.value1+'/users?pageNum=1&pageSize=10').then( res =>{
				this.dialogTableData = res.data.data.list;
				this.total = res.data.data.total;
				this.currentPage =1;
			})
	    }
    }
}
</script>

<style>
	.fr{float: right;}
	.tab_config .search{
		float: right;
		width: 60%;
	}
	.search .input{
		float: left;
		width: 75%;
		margin-right: 10px;
	}
	.tab_select{
		margin-bottom: 10px;
		overflow: hidden;
	}
	.selectProcess{
		overflow: hidden;
	}
	.select{
		width: 217px;
		float: left;
	}
	.processPerson{
		float: left;
		margin-left: 20px;
	}
	.grade{
		min-width: 140px;
		height: 40px;
		background: url(../../assets/bg.png)repeat-x;
		float: left;
		cursor: pointer;
	}
	.grade p{
		width: 100%;
		overflow: hidden;
		font-size: 12px;
		color: #333333;
		line-height: 40px;
		margin-left: 45px;
	}
	.add{
		float: left;
		width: 40px;
		height: 40px;
		background: url(../../assets/22.png)no-repeat center;
	}
	.addMore{
		float: left;
		width: 40px;
		height: 40px;
		background: url(../../assets/add.png)no-repeat center;
		cursor: pointer;
	}
	.del{
		float: left;
		width: 40px;
		height: 40px;
		background: url(../../assets/del.png)no-repeat center;
		cursor: pointer;
	}
	.fade-enter-active,.fade-leave-active{
  		transition: all .5s ease;
  	} 
  	.fade-enter-active{
  		opacity: 1;
  	} 
  	.fade-leave-active{
  		opacity: 0;
  	} 
	.fade-enter{
  		opacity: 0;
  	} 
  	.fade-leave{
  		opacity: 1;
  	} 
  	.approver{
  		width: 40%;
  		height: 100%;
  		border-left: 1px solid #E6E6E6;
  		padding-left: 15px;
  		position: absolute;
  		right: 0;
  		top: 0;
  		box-shadow: -10px 0px 35px -7px #E6E6E6;
  	}
  	.approver .title{
  		padding-left: 30px;
  		line-height: 70px;
  		border-bottom: 1px solid #E6E6E6;
  	}
  	.approverContent{
  		display: flex;
  	}
  	.approverClass{
  		line-height: 68px;
  		padding-left: 30px;
  		font-size: 12px;
  		color: #8C939D;
  		width: 130px;
  	}
  	.approverDetail{
  		line-height: 64px;
  		font-size: 12px;
  		flex: 1;
  	}
  	.classify{
  		border-bottom: 1px solid #E6E6E6;
  	}
  	.active{
  		border: 1px dashed #0073c3;
  	}
  	.el-selectp{width: 35%;}
</style>