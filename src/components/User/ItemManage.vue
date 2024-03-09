<template>
  <div>
    <div>
      <!--查询新增操作列表-->
      <div style="width:1305px;">
        <el-row :gutter="20" style="width: 100%;">
          <el-col span="8">
            <el-page-header @back="goBack"  v-bind:content=this.whName
                            style="height: 25px;margin-top: 15px;font-weight: bold;font-size: larger">
            </el-page-header>
          </el-col>
          <el-col span="8">
            <el-input v-model="name" placeholder="请输入物品名称...." style="width: 200px;margin-top: 10px;" suffix-icon="el-icon-search"
                      @keyup.enter.native="loadGetp"
            ></el-input>
            <el-button type="info" plain style="margin-left: 10px;height: 35px;" @click="loadGetp">查询</el-button>
          </el-col>
          <el-col span="6" style="float: right">
            <el-button type="primary" style="margin-top: 10px;height: 40px;margin-left: 200px;" icon="el-icon-plus" @click="addItem" >添加物品</el-button>
          </el-col>
        </el-row>
      </div>
      <!--物品列表-->
      <el-row :gutter="20" style="width: 100%;height: 100%;">
        <el-col :span="6" v-for="(card, index) in cards" :key="index">
          <el-card class="item-card" :body-style="{ padding: '0px' }" style="margin: 10px;height: 400px;">
            <div>
              <el-row style="flex-direction: row;height: 100%;width: 100%;margin-left: 0PX;" :gutter="20">
                <el-col span="24" style="width: 100%;padding: 0px;">
                <!--懒加载-->
                  <div class="demo-image__lazy">
                  <!-- 物品图片 -->
                  <el-image :src="card.image"  fit="cover" class="item-image" style="height: 250px;width: 100%;:">
                    <div slot="placeholder" class="image-slot">
                      <span class="dot" style="width: 100%;height: 250px;;" >
                        <i class="el-icon-loading" style="height: 250px;;width: 100%;"></i>
                      </span>
                    </div>
                  </el-image>
                  </div>
                </el-col>
                <el-col span="20" >
                <!-- 物品名称 -->
                  <div>
                    <el-row :gutter="20" style="width: 350px;">
                      <el-col span="10">
                        <h3 class="item-name" style="margin-top: 5px;font-size:25px;">{{ card.name }}</h3>
                      </el-col>
                      <el-col span="5" style="padding: 0">
                        <el-button style="width: 25px;height: 25px;margin: 5px;padding: 0;float: right"  size="medium"  @click="changeItem(card.id,card.name,card.instruction)">
                          <img
                              src="../../assets/icon/edit.png"
                              style="width: 15px;height: 15px; object-fit: contain;"
                              alt=""/>
                        </el-button>
                      </el-col>
                      <el-col span="4" style="padding: 0;">
                          <el-button style="width: 25px;height: 25px;margin: 5px;padding: 0;"  size="medium" @click="deleteItem(card.id)" >
                            <img
                                src="../../assets/icon/delete.png"
                                style="width: 15px;height: 15px; object-fit: contain;"
                                alt=""/>
                          </el-button>
                      </el-col>
                    </el-row>
                  </div>
                <!-- 物品说明 -->
                  <p class="item-description" style="margin-top: 10px;">&nbsp;&nbsp;&nbsp;&nbsp;{{ card.instruction }}</p>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div >
    <!--配置物品界面-->
    <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="35%" style="border-radius: 30px;"
        center>
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="物品图片" prop="name">
          <el-col :span="20">
            <el-upload
                action="#"
                :auto-upload="false"
                :on-change="handleChange"
                :on-remove="handleRemove"
                :limit="1"
                :file-list="fileList"
                list-type="picture-card"
            >
              <i  slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}" style="width: 300px;">
                <img
                    class="el-upload-list__item-thumbnail"
                    :src="file.url" alt=""
                >
                <span class="el-upload-list__item-actions">
                <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove()"
                >
          <i class="el-icon-delete"></i>
        </span>
              </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-col>
        </el-form-item>
        <el-form-item label="物品名称" prop="name">
          <el-col :span="20">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="物品说明" prop="instruction">
          <el-col :span="20">
            <el-input type="textarea"
                      :autosize="{ minRows: 4, maxRows: 5}"
                      placeholder="请输入物品说明" v-model="form.instruction"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button :loading="addLoading" type="primary" @click="addConf">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 确认对话框 -->
    <el-dialog
        title="确认删除"
        :visible.sync="confirmDialogVisible"
        width="30%"
    >
      <span>确定要删除这个物品吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmDelete">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "ItemManage",
  data() {
    return {
      addLoading:false,//上传加载
      fileList:[],//图片文件列表
      dialogImageUrl: '',//图片预览路径
      dialogVisible: false,//图片预览选项
      uploadFile: null,//要上传的图片
      selectFile: null,//已选择图片
      whId:sessionStorage.getItem('whId'),
      itemId:'0',
      whName:'',
      defaultImagePath: '@/assets/images/QCF.png',
      name:'',
      cards: [
      ],
      //配置提示框是否显现
      centerDialogVisible: false,
      //配置界面内容表单
      form: {
        whId:'0',
        name: '',
        instruction: '',
        itemImage:null
      },
      //配置界面内容规则
      rules: {
        name: [
          { required: true, message: '请输入物品名称', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        instruction: [
          { required: true, message: '请输入物品介绍', trigger: 'blur' },
          { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
        ]
      },
      confirmDialogVisible:false,
    };
  },
  methods: {
    //除去图片调用
    handleRemove(){
      this.fileList=[]
    },
    //上传图片后调用
    handleChange(file){
      this.selectFileFile=file
      console.log(this.selectFileFile)
    },
    //预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //改变Item
    changeItem(id,name,instruction){
      this.form.name=name;
      this.form.id=id;
      this.form.instruction=instruction;
      this.fileList=[]
      this.centerDialogVisible = true
    },
    deleteItem(id){
      this.itemId=id;
      this.confirmDialogVisible=true;
    },
    confirmDelete(){
      this.$axios.delete(this.$httpUrl + '/items/delete?id='+this.itemId).then(res => res.data).then(
          res => {
            if (res.code === 1) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.confirmDialogVisible = false
              this.loadGetp()
            } else {
              this.$message.error('操作失败');
            }
          }
      )
    },
    //返回仓库管理
    goBack(){
      this.$router.push('/STM')
    },
    //获取仓库名字
    getName(){
      this.$axios.get(this.$httpUrl + '/wh/getById'+'?whId='+this.whId).then(res => res.data).then(
          res => {
            if (res.code === 1) {
              this.whName=res.data.name;
              this.loadGetp();
            } else {
              this.$message.error('获取仓库信息失败');
            }
          }
      )
    },
    //加载物品列表
    loadGetp() {
      this.$axios.get(this.$httpUrl + '/items/listp', {
        params: {
          whId: this.whId,
          name:this.name
        }
      }).then(res => res.data).then(
          res => {
            console.log(res)
            if (res.code === 1) {
              this.cards = res.data.rows
            } else {
              alert("获取数据失败")
            }
          }
      )
    },
    //添加物品操作
    addItem(){
      this.centerDialogVisible = true
      this.$nextTick(()=>{
        this.resetForm()
      })
    },
    //重置配置表单内容
    resetForm(){
      this.$refs.form.resetFields();
      this.fileList=[]
    },
    //确认添加或配置物品
    addConf(){

      this.$refs.form.validate((valid) => {
        this.uploadFile=this.selectFileFile;
        if(this.uploadFile == null){
          this.$message.error("图片为空")
          this.addLoading=false;
          return false;
        }
        if (valid) {
          if(this.form.id){
            this.update()
          }else{
            this.save()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
        this.addLoading=false;
      });
    },
    //添加item
    save(){
      this.addLoading=true;
      this.form.whId=this.whId;
      this.form.itemImage=this.uploadFile;
      // 创建 FormData 对象
      const formData = new FormData();
      // 将文件对象转换为 FormData 对象的一部分
      formData.append("itemImage", this.form.itemImage.raw);
      formData.append("name",this.form.name);
      formData.append("whId",this.form.whId);
      formData.append("instruction",this.form.instruction);
      console.log(formData)
      this.$axios.post(this.$httpUrl + '/items/add',formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(res => res.data).then(
          res => {
            if (res.code === 1) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.centerDialogVisible = false
              this.loadGetp();
            } else {
              this.$message.error('操作失败');
            }
          }
      )
    },
    update(){
      this.addLoading=true;
      this.form.whId=this.whId;
      this.form.itemImage=this.uploadFile;
      // 创建 FormData 对象
      const formData = new FormData();
      // 将文件对象转换为 FormData 对象的一部分
      formData.append("itemImage", this.form.itemImage.raw);//注意上传部分一定是文件
      formData.append("name",this.form.name);
      formData.append("whId",this.form.whId);
      formData.append("instruction",this.form.instruction);
      formData.append("id",this.form.id);
      this.$axios.post(this.$httpUrl + '/items/mod', formData).then(res => res.data).then(
          res => {
            if (res.code === 1) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.centerDialogVisible = false
              this.loadGetp();
            } else {
              this.$message.error('操作失败');
            }
          }
      )
    },
  },
  beforeMount() {
    this.getName();
  }
}
</script>

<style scoped>

</style>