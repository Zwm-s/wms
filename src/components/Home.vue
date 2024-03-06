<template>
  <div style="height: 100%">
  <div class="personal-center" style="background-color: #eceff1;height: 100%">
    <el-row type="flex"   justify="center" align="middle" class="row-bg" style="height: 250px;flex-direction: row;margin-left: 50px;" >
      <el-col :span="8" style="width: 170px;height: 200px" >
        <el-avatar :size="200" :src="getAvatar()" ></el-avatar>
      </el-col>
      <el-button  type="info" icon="el-icon-edit" style="width: 2%;height: 10%;margin-left: 10px;padding: 0;margin-top: 180px;"  size="small"  @click="changeUserImage()">
      </el-button>
    </el-row>
    <el-row type="flex" justify="center" align="middle" class="row-bg" style="min-height: 300px;flex-direction: column">
      <el-col :span="8" style="margin-left: 35px;margin-top: 10px; width: 100px;font-size: 30px; ">
        <h1>{{ user.name }}</h1>
      </el-col>
      <el-col :span="18" style="margin-left: 50px;margin-top: 50px; width: 200px; ">
        <h1>{{'账号：'+ user.number }}</h1>
      </el-col>
      <el-col :span="18" style="margin-left: 50px;margin-top: 50px; width: 200px; ">
        <h1>{{'电话：'+ user.phone }}</h1>
      </el-col>
      <el-col :span="18" style="margin-left: 50px;margin-top: 50px; width: 200px; ">
        <h1>{{ this.user.role === 0 ? '权限：超级管理员' :  '权限：用户' }}</h1>
      </el-col>
    </el-row>
    <el-col :span="24" style="background-color: #eceff1;margin-top: 10px;">
      <el-button @click="logout" type="danger" style="margin-left: 50px" >退出登录</el-button>
    </el-col>
  </div>
  <el-dialog
      title="更改头像"
      :visible.sync="imagedialogVisible"
      width="30%">
    <el-radio-group v-model="radio" >
      <el-radio :label="1">
        <el-avatar :size="50" :src="require(`@/assets/images/QCF.png`)" ></el-avatar>
      </el-radio>
      <el-radio :label="2">
        <el-avatar :size="50" :src="require(`@/assets/images/ZJ.png`)" ></el-avatar>
      </el-radio>
      <el-radio :label="3">
        <el-avatar :size="50" :src="require(`@/assets/images/ZS.png`)" ></el-avatar>
      </el-radio>
      <el-radio :label="4">
        <el-avatar :size="50" :src="require(`@/assets/images/GLMX.png`)" ></el-avatar>
      </el-radio>
    </el-radio-group>
    <span slot="footer" class="dialog-footer">
    <el-button @click="imagedialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="changeImageHandle">确 定</el-button>
  </span>
  </el-dialog>
  </div>
</template>
<script>
export default {
  name: "HoMe",
  data() {
    return {
      radio: 1,//单选选中选项
      imagedialogVisible:false,//单选框显示
      tempImage:'',
      userId:'',//用户id
      userImage:'',//头像文件
      user: {
        name: sessionStorage.getItem('curUser').replace(/"/g,''), // 示例用户名
        number: "a",
        phone:"这是电话",
        role:''
      }
    };
  },
  methods: {
    changeUserImage(){
      this.imagedialogVisible=true;
    },
    changeImageHandle(){
      switch (this.radio) {
        case 1:
          this.tempImage = 'QCF'
          break
        case 2:
          this.tempImage = 'ZJ'
          break
        case 3:
          this.tempImage = 'ZS'
          break
        case 4:
          this.tempImage = 'GLMX'
          break
        default:
          this.tempImage = 'YH';
          break
      }
      this.$axios.get(this.$httpUrl + '/users/saveImage',{
        params: {
          id: this.userId,
          image:this.tempImage
        }}).then(res => res.data).then(
          res => {
            if (res.code === 1) {
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              console.log(res.data)
            } else {
              alert("更改失败")
            }
          }
      )
      this.imagedialogVisible=false;
    },
    getImage(){
      this.userId= sessionStorage.getItem('curId').replace(/"/g,'')
      this.$axios.get(this.$httpUrl + '/users/findImageById?id='+this.userId).then(res => res.data).then(
          res => {
            if (res.code === 1) {
              this.userImage=res.data+'.png';
              sessionStorage.setItem('userImage',this.userImage);
              console.log(this.userImage)
            } else {
              alert("获取数据失败")
            }
          })
    },
    getuser(){
      this.$axios.get(this.$httpUrl + '/users/findByName',{
        params: {
          name: this.user.name
        }}).then(res => res.data).then(
          res => {
            if (res.code === 1) {
              this.user.number=res.data.number;
              this.user.phone=res.data.phone;
              this.user.role=res.data.roleId;
              console.log(res.data)
            } else {
              alert("获取数据失败")
            }
          }
      )
    },
    getAvatar(){
      return require(`@/assets/images/${this.userImage}`);
    },
    logout() {
      this.$confirm("您确定要退出登录吗？",'提示',{
        confirmButtonText:'确定',
        type: 'warning',
        center:true
      })
          .then(()=>{
            this.$axios.get(this.$httpUrl + '/logout?id='+this.userId).then(res => res.data).then(
                res => {
                  if (res.code === 1) {
                    this.$message({
                      type: 'success',
                      message: '您已经退出登录'
                    })
                    sessionStorage.clear();
                    this.$router.push("/")
                  } else {
                    this.$message({
                      type: 'danger',
                      message: '退出登录失败，请稍后再试'
                    })
                  }
                }
            )
          }).catch(()=>{
        this.$message({
          type:'info',
          message:'已取消退出登录'
        })
      })
    },
  },
  //组件实例创建后调用，否则接收不到函数
  beforeMount() {
    this.getuser();
    this.getImage();
  }
};
</script>

<style scoped>
.personal-center {
  text-align: center;
}

</style>
