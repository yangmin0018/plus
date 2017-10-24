<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-date"></i> 应用管理</el-breadcrumb-item>
				<el-breadcrumb-item>控件管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div>
			<el-row>
				<el-col :span="24">
					<div class="grid-content ">
						<el-button type="primary" icon="edit" @click="createApp">创建新应用</el-button>
					</div>
				</el-col>
			</el-row>
			<div class="vv-appShow">
				<el-row :gutter="20">
					<el-col :xs="3" :sm="4" :md="6" :lg="8" v-for="item in appCont" :key="item.appId">
					  	<div class="grid-content bg-purple " @click="checkInfo( item.appId )">
							<div class="appIcon ">
								<img :src="item.resourceUrl " />
							</div>
							<p class="appDesc ">{{item.appName}}</p>
						</div>
					</el-col>
				</el-row>
			</div>
			<el-dialog title="应用信息" :visible.sync="dialogFormVisible" @close="close">
				  <el-form :model="form">
				  	<el-form-item label="应用logo:" :label-width="formLabelWidth">
				      <img :src="form.resourceUrl" class="sengleLogo" auto-complete="off"></img>
				      <img src="" class="hideImg" :class="{sengleLogoAdd:!singleShow}" @click="replaceIcon" />
				    </el-form-item>
				    <el-form-item label="应用名称:" :label-width="formLabelWidth">
				      <p v-if="singleShow">{{form.appName}}</p>
				      <el-input v-model="form.appName" v-else auto-complete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="应用描述:" :label-width="formLabelWidth">
				      <p v-if="singleShow">{{form.appDesc}}</p>
				      <el-input v-model="form.appDesc" v-else auto-complete="off"></el-input>
				    </el-form-item>
				    <el-form-item label="应用分类:" :label-width="formLabelWidth">
				    	<div v-show="singleShow">
				    		<p  v-if="form.appCate == 1">考勤</p>	
						      <p  v-else-if="form.appCate == 2">审批</p>
						      <p  v-else-if="form.appCate == 3">汇报</p>
						      <p  v-else-if="form.appCate == 4">工具</p>
						      <p  v-else="form.appCate == 5">其他</p>
				    	</div>
				      
				      <el-select v-show="!singleShow" v-model="form.appCate"  placeholder="请选择分类">
				        <el-option v-for="item in appCate" :key="item.catId" :label="item.catTitle" :value="item.catId"></el-option>
				      </el-select>
				    </el-form-item>
				    <el-form-item label="应用类型:" :label-width="formLabelWidth">
				    	<div v-show="singleShow">
				    		<p  v-if="form.appType == 0">本地UI</p>	
						    <p  v-else-if="form.appType == 1">动态UI</p>
						    <p  v-else="form.appType == 2">网络应用</p>
				    	</div>
					    <el-radio-group v-model="form.appType" v-show="!singleShow">
					      <el-radio label="0">本地UI</el-radio>
					      <el-radio label="1">动态UI</el-radio>
					      <el-radio label="2">网络应用</el-radio>
					    </el-radio-group>
					</el-form-item>
					<el-form-item label="网络应用地址:" :label-width="formLabelWidth" v-show="form.appType == 2">
						<el-radio-group >
							<el-input v-model="form.appUrl " placeholder="例如：www.baidu.com "></el-input>
						</el-radio-group>
					</el-form-item>	
					<el-form-item label="折叠应用消息:" :label-width="formLabelWidth">
						<div v-show="singleShow">
							<p v-if="form.appMsginfolder == 0">否</p>
							<p v-if="form.appMsginfolder == 1">是</p>
						</div>
					    <el-radio-group v-model="form.appMsginfolder" v-show="!singleShow">
					      <el-radio label="0">是</el-radio>
					      <el-radio label="1">否</el-radio>
					    </el-radio-group>
					</el-form-item>
					<el-form-item label="是否流程审批:" :label-width="formLabelWidth">
						<div v-show="singleShow">
							<p v-if="form.appIsreview == 0">否</p>
							<p v-if="form.appIsreview == 1">是</p>
						</div>
					    <el-radio-group v-model="form.appIsreview" v-show="!singleShow">
					      <el-radio label="1">是</el-radio>
					      <el-radio label="0">否</el-radio>
					    </el-radio-group>
					</el-form-item>
				  </el-form>
				  <div slot="footer" class="dialog-footer">
				  	<el-button type="primary" @click="deleteApp" > 删除应用</el-button>
				  	<el-button type="primary" @click="modify" > 修 改 </el-button>
				    <el-button type="primary" v-show="!singleShow" @click="dialogSubmit()">确 定</el-button>
				  </div>
			</el-dialog>
			<el-dialog
			  title="提示"
			  :visible.sync="dialogFormVisible2"
			  size="tiny">
			  <span>请选择图标</span>
			  <ul class="vv-replaceIcon">
			  	<li v-for="(item,index) in appIconList" @click="addClass(index) " :class="{ active: idx===item.iconId-1 } ">
			  		<img :src="item.iconUrl"/>
			  	</li>
			  </ul>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
			    <el-button type="primary" @click="replaceUrl(idx)">确 定</el-button>
			  </span>
			</el-dialog>
		</div>
		
	<div v-show=" isCreate " class="vv-zhe ">
		<div class="close " @click="isCreate=! isCreate ">
			<span>X</span>
		</div>
		<div>
			<ul class="vv-createApp " v-show="!iconShow ">
				<p>应用名称</p>
				<el-input v-model="appMessage[0].appName " placeholder="请输入应用名称 "></el-input>
				<p>应用描述</p>
				<el-input type="textarea " :rows="2 " placeholder="请输入内容 " v-model="appMessage[0].appDesc "></el-input>
				<div>
					<div>
						<p>选择应用类型</p>
						<el-radio class="radio " v-model="appMessage[0].appType " label="0 ">自定义</el-radio>
						<el-radio class="radio " v-model="appMessage[0].appType " label="1 ">第三方网页</el-radio>
					</div>
					<div v-show=" appMessage[0].appType==1 ">
						请输入第三方地址：
						<el-input v-model="appUrl " placeholder="例如：www.baidu.com "></el-input>
					</div>
				</div>
				<div>
					<p>折叠应用消息</p>
					<el-radio class="radio " v-model="appMessage[0].appMsginfolder " label="0 ">消息1</el-radio>
					<el-radio class="radio " v-model="appMessage[0].appMsginfolder " label="1 ">消息2</el-radio>
				</div>
				<div>
					<p>是否是流程审批</p>
					<el-radio class="radio " v-model="appMessage[0].appIsreview " label="1 ">是1</el-radio>
					<el-radio class="radio " v-model="appMessage[0].appIsreview " label="0 ">不是2</el-radio>
				</div>
				<div>
					<el-select v-model="appMessage[0].appCate " placeholder="请选择应用分类 ">
						<el-option v-for="item in appCate " :key="item.catId " :label="item.catTitle " :value="item.catId ">
						</el-option>
					</el-select>
				</div>
				<el-button type="primary " @click="saveCreateApp ">保存信息--></el-button>
			</ul>
		</div>
							<div v-show="iconShow ">
								<p class="plugins-tips ">为您的应用选择一个图标</p>
								<ul class="vv-createIcon ">
									<li v-for="(item,index) in appIconList " @click="addClass(index) " :class="{ active: idx===item.iconId-1 } ">
										<img :src="item.iconUrl " />
									</li>
								</ul>
								<div class="iconBtn ">
									<el-button type="primary " :plain="true " @click="iconShow=!iconShow "> <--返回 </el-button>
									<el-button type="primary " :plain="true " @click="submitApp( idx ) ">确定创建应用</el-button>
								</div>
							</div>
	</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data: function() {
			return {
				sengleAppInfo:'',   // 获取单个应用的信息
				appCont: '',
				dialogFormVisible: false,
				dialogFormVisible2: false,
				singleShow:true,
		        form: {                 //弹出框表单信息
			          	appName: '',
						appType: '',
						appDesc: '',
						appMsginfolder: '',
						appIsreview: '',
						appCate: '', 
						resourceUrl:'', 
						appUrl:''
		        },
		        formLabelWidth: '120px',
				appMessage: [ //存储 创建应用的数据
					{
						appName: '' //自定义
							,
						appType: '' //单选框 0  是自定义  1是网页 （需要url）
							,
						appDesc: '' //自定义
							,
						appMsginfolder: '' //单选框  折叠应用消息  0  和1
							,
						appIsreview: '' //是否是  流程审批，是=>流程页面
							,
						appCate: '' //分类，拉取分类

						//                          resourceUrl:''   //被选中的iconURL
						//                      ,
						//			                appUrl:'',   //选择2的填充 
					}
				],
				appCate: '', //拉取的分类信息
				appIconList: '', //获取服务器所有icon图标
				isCreate: false, //控制图标 显示隐藏
				idx: '', //控制active样式添加 ；提交当前icon图标的索引
				iconShow: false,
				appUrl: '' //保存第三方应用地址
			}
		},
		mounted() {

			axios.get('http://52.80.81.221:12345/admin/work/app').then(res => {
				this.appCont = res.data.data;
				console.log(res)
			})
		},
		methods: {
			close(){
				this.singleShow = true;
			},
			replaceIcon(){
				this.dialogFormVisible2=true;
				this.getAllIcon(); //获取所有icon图标
				
			},
			replaceUrl( idx ){
				if(idx !== null) {
					this.form.resourceUrl = this.appIconList[idx].iconUrl; // 将选择的图标地址 存起来
					this.dialogFormVisible2 = false;
				}else{
					this.$message.error('您还没有选择应用图标！');
				}
			},
			modify(){
				this.singleShow = false;
				axios.get(' http://52.80.81.221:12345/admin/work/category ').then( res => {
					this.appCate = res.data.data;
					console.log(this.appCate)
				})
			},
			checkInfo(appId) { //查看单个应用信息
				
				this.dialogFormVisible = true;
				axios.get('http://52.80.81.221:12345/admin/work/app/'+appId).then( res => {
					
					delete res.data.data.createTime; //删除掉createTime、state键值对
					delete res.data.data.state;
					
					var singleData = res.data.data;
					this.form = singleData;
					console.log(this.form)
				} )
			},
			dialogSubmit(){
				var appUId = this.form.appId;
				        this.$confirm('您确定保存修改的信息吗?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning',
				          showClose:false,
				          closeOnClickModal:false,
				        }).then(() => {
				        	axios({ // 发送post表单提交请求
								method: 'POST',
								url: 'http://52.80.81.221:12345/admin/work/app/'+appUId,
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
								data: this.form
								}).then( res => {
						          this.$message({
							            type: 'success',
							            message: '保存成功!'
							          });
							          this.dialogFormVisible = false;
							          
							           	if(this.form.appType == 1){
									        this.$confirm('内容类型为动态UI，是否需要修改应用UI界面？', '提示', {
									          confirmButtonText: '需要',
									          cancelButtonText: '不需要',
									          type: 'warning',
									          showClose:false,
									        }).then(() => {
									          this.$message({
									            type: 'success',
									            message: '去往UI修改界面...'
									          });
									          window.location.href = 'http://52.80.81.221:12345/wwkj/drag.html?'+'appID='+encodeURI(appUId);
									        }).catch(() => {
									          this.$message({
									            type: 'info',
									            message: '已取消'
									          }); 
									          
									        });
									    }  
							          
							       }).catch( res => {
										this.$message.error('修改失败！');
									});
				      
							}).catch(() => {
						          this.$message({
						            type: 'info',
						            message: '已取消保存'
						          });  
						           this.dialogFormVisible = false;
						        });
				
				
			},
			createApp() { //点击创建新应用
				this.isCreate = !this.isCreate;
				// 获取所有分类，展示出来以便用户选择
				axios.get(' http://52.80.81.221:12345/admin/work/category ').then( res => {

					this.appCate = res.data.data;
				})
			},
			saveCreateApp() { // 保存创建应用的 信息，除了图标以外
				if(this.appMessage[0].appType == 2) {
					this.appMessage[0].appUrl = this.appUrl;
				}

				for(let key in this.appMessage[0]) {
					// 每项必填
					if(this.appMessage[0][key] == '') {
						this.$message.error('应用信息不能为空！');
						return;
					}
				};
				this.getAllIcon(); //获取所有icon图标
				this.iconShow = !this.iconShow; //  展示图标 选择

			},
			getAllIcon() { //获取所有icon图标
				var This = this;
				axios.get('http://52.80.81.221:12345/admin/work/appicon').then(function(res) {
					This.appIconList = res.data.data;

				})
			},
			deleteApp(){
				console.log(this.form.appId)
				this.$confirm('此操作将永久删除该应用, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          showClose:false,
		          closeOnClickModal:false,
		          type: 'warning'
		        }).then(() => {
		        	axios.delete('http://52.80.81.221:12345/admin/work/app/'+this.form.appId).then(
		          		res=>{
		          			for(var i=0;i<this.appCont.length;i++){
		          				if(this.appCont[i].appId == this.form.appId){
		          					var index = this.appCont.indexOf(this.appCont[i]);
		          					this.appCont.splice(index,1)
		          					this.dialogFormVisible = false;
		          					console.log(res);
		          					this.$message.success('删除成功!');
		          					return false;
		          				}
		          			}
		          		}
		          );
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
				
			},
			addClass(index) {
				this.idx = index;
			},
			submitApp(idx) { //  提交新建应用所有信息
				let This = this;
				if(idx !== null) {
					this.appMessage[0].resourceUrl = this.appIconList[idx].iconUrl; // 将选择的图标地址 存起来
					this.idx = '';
					axios({ // 发送post表单提交请求
						method: 'POST',
						url: 'http://52.80.81.221:12345/admin/work/app',
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
						data: this.appMessage[0]

					}).then(function(xhr) {

						This.$message('恭喜您，应用创建成功！');
						This.isCreate = false;
						console.log(This.appMessage[0])
						axios.get('http://52.80.81.221:12345/admin/work/app').then(res => {
							This.appCont = res.data.data;
							console.log(res)
						})
						if(This.appMessage[0].appType == 1) { //  如果应用类型选择  自定义，则跳转自定义页面
							setTimeout(function() {
								window.location.href = 'http://52.80.81.221:12345/wwkj/drag.html';
							}, 2000)
						};
						
					}).catch(function(xhr) {
						console.log(xhr)
					});

				} else {
					this.$message.error('您还没有选择应用图标！');
				}
			}
		}
	}
</script>
<style>
	.el-row {
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}
	
	.el-col {
		border-radius: 4px;
	}
	
	.bg-purple {
		border: 1px solid #CCCCCC;
		padding: 6px;
		padding-left: 10px;
		overflow: hidden;
		cursor: pointer;
		margin: 15px 0;
	}
	
	.bg-purple:hover {
		border-color: #3097D1;
	}
	
	.grid-content {
		border-radius: 10px;
		min-height: 36px;
	}
	
	.grid-content .appIcon {
		float: left;
		width: 60px;
		height: 60px;
		border-radius: 10px;
		overflow: hidden;
	}
	
	.grid-content .appIcon img {
		width: 100%;
	}
	
	.grid-content .appDesc {
		margin-left: 10px;
		line-height: 60px;
		text-align: center;
		overflow: hidden;
		white-space: nowrap;
		color: #777;
	}
	
	.vv-appShow {
		width: 70%;
		margin: 30px auto;
	}
	.sengleLogo{
		width: 70px;
	}
	.hideImg{display: none;}
	.sengleLogoAdd{
		width: 68px;
		height: 68px;
		margin-left: 15px;
		border: 1px dashed #000;
		cursor: pointer;
		display: inline-block;
	}
</style>