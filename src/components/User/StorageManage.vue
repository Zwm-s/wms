<template>
<div>
  <div>
  <el-row :gutter="20" style="width: 100%">
    <el-col :span="8">
      <el-card style="width: 100%;height: 250px;margin: 10px;" >
        <div slot="header" class="clearfix">
          <span  style="font-size: large;font-weight: bold;margin-top: 6px;color: #00b2ff">新增仓库</span>
        </div>
        <div class="text item" style="font-size: small;width: 100%;height: 100%;">
          <el-button style="float: right;width: 100%;height: 150px;background-color: #e4eff6;" @click="addWareHouse">
            <img
                src="../../assets/icon/add.png"
                style="width: 80%; height: 60%; object-fit: contain;"
                alt=""/>
          </el-button>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" v-for="(card, index) in cards" :key="index">
      <el-card style="width: 100%;height: 250px;margin: 10px;">
        <div slot="header" class="clearfix">
          <span style="font-size: large;font-weight: bold;">{{card.name}}</span>
          <!--编辑仓库按钮-->
          <el-button style="width: 5%;height: 35%;margin-left: 10px;padding: 0;"  size="small"  @click="changeWareHouse(card.id,card.name,card.description)">
            <img
                src="../../assets/icon/edit.png"
                style="width: 15px;height: 15px; object-fit: contain;"
                alt=""/>
          </el-button>
          <el-button  style="width: 5%;height: 35%;margin-left: 10px;padding: 0;"  size="small"  @click="deleteWareHouse(card.id)" >
            <img
                src="../../assets/icon/delete.png"
                style="width: 15px;height: 15px; object-fit: contain;"
                alt=""/>
          </el-button>
          <el-button style="float: right;width: 20%;height: 100%;" type="primary" size="medium" @click="manageWareHouse(card.id)">管理</el-button>
        </div>
        <div class="text item" style="font-size: small">
          {{card.description}}
        </div>
      </el-card>
    </el-col>
  </el-row>
  </div>
<!--  管理仓库-->
  <el-dialog
      title="配置仓库"
      :visible.sync="centerDialogVisible"
      width="30%" style="border-radius: 30px;"
      center>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="仓库名称" prop="name">
        <el-col :span="20">
          <el-input v-model="form.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="仓库说明" prop="description">
        <el-col :span="20">
          <el-input type="textarea"
                    :autosize="{ minRows: 4, maxRows: 5}"
                    placeholder="请输入仓库说明" v-model="form.description"></el-input>
        </el-col>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addConf">确 定</el-button>
      </span>
  </el-dialog>
  <!-- 删除验证-->
  <el-dialog
      title="确认删除"
      :visible.sync="confirmDialogVisible"
      width="30%"
  >
    <span>确定要删除这个仓库吗？</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="confirmDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmDelete">确定</el-button>
      </span>
  </el-dialog>
</div>
</template>

<script>
export default {
  name: "StorageManage",
  data() {
    return {
      checkName:'',
      whId:'0',
      userId:parseInt(sessionStorage.getItem('curId').replace(/"/g,''),10),
      userName:sessionStorage.getItem('curUser').replace(/"/g,''),
      // 从后端获取的卡片数据
      cards: [
      ],
      centerDialogVisible: false,
      form: {
        userId:'0',
        name: '',
        description: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入仓库名称', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入仓库介绍', trigger: 'blur' },
          { min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur' }
        ]
      },
      confirmDialogVisible:false,
    };
  },
  methods: {
    loadGetp() {
      this.$axios.get(this.$httpUrl + '/wh/listp', {
        params: {
          name: this.checkName,
          userId: this.userId
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
    manageWareHouse(id){
      //将仓库id放到sessionStorage存储
      sessionStorage.removeItem('whId');
      sessionStorage.setItem('whId',id);
      this.$router.push('/ItM');
    },
    changeWareHouse(id,name,description){
      this.form.name=name;
      this.form.id=id;
      this.form.description=description;
      this.centerDialogVisible = true;
    },
    addConf(){
      this.$refs.form.validate((valid) => {
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
      });
    },
    addWareHouse(){
      this.centerDialogVisible = true
      this.$nextTick(()=>{
        this.resetForm()
      })
    },
    resetForm(){
      this.$refs.form.resetFields();
    },
    save(){
      this.form.userId=this.userId;
      this.$axios.post(this.$httpUrl + '/wh/add', this.form).then(res => res.data).then(
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
      this.form.userId=this.userId;
      this.$axios.post(this.$httpUrl + '/wh/mod', this.form).then(res => res.data).then(
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
    deleteWareHouse(id){
      this.whId=id;
      this.confirmDialogVisible=true;
    },
    confirmDelete() {
      this.$axios.delete(this.$httpUrl + '/wh/delete?id=' + this.whId).then(res => res.data).then(
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
    }
  },
  beforeMount() {
    this.loadGetp();
  }
}
</script>

<style scoped>

</style>