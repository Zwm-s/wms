<template>
  <div class="personal-center" style="background-color: #eceff1;height: 100%">
    <el-row type="flex"   justify="center" align="middle" class="row-bg" style="height: 250px;flex-direction: column" >
      <el-col :span="8" style="width: 170px;height: 200px" >
        <el-avatar :size="200" :src="user.avatar" @error="errorHandler" ></el-avatar>
      </el-col>
      <el-col :span="8" style="margin-left: 35px;margin-top: 10px; width: 100px; ">
        <h1>{{ user.name }}</h1>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" align="middle" class="row-bg" style="min-height: 300px;flex-direction: column">
<!--      <el-col :span="18" style="margin-left: 35px;margin-top: 10px; width: 200px; ">
        <h1>{{'名字：'+ user.name }}</h1>
      </el-col>-->
      <el-col :span="18" style="margin-left: 50px;margin-top: 50px; width: 200px; ">
        <h1>{{'账号：'+ user.number }}</h1>
      </el-col>
      <el-col :span="18" style="margin-left: 50px;margin-top: 50px; width: 200px; ">
        <h1>{{'电话：'+ user.phone }}</h1>
      </el-col>
      <el-col :span="18" style="margin-left: 50px;margin-top: 50px; width: 200px; ">
        <h1>{{ this.user.role === 0 ? '权限：超级管理员' : (scope.row.roleId === 1 ? '权限：管理员' : '权限：用户') }}</h1>
      </el-col>
    </el-row>
    <el-col :span="24" style="background-color: #eceff1">
      <el-button @click="logout" type="danger" style="margin-left: 50px" >退出登录</el-button>
    </el-col>
  </div>
</template>
<script>
export default {
  name: "HoMe",
  data() {
    return {
      user: {
        name: sessionStorage.getItem('curUser').replace(/"/g,''), // 示例用户名
        avatar: require("@/assets/images/QCF.png") ,// 头像路径
        number: "a",
        phone:"这是电话",
        role:''
      }
    };
  },
  methods: {
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
    errorHandler() {
      return true
    },
    logout() {
      this.$confirm("您确定要退出登录吗？",'提示',{
        confirmButtonText:'确定',
        type: 'warning',
        center:true
      })
          .then(()=>{
            this.$message({
              type:'success',
              message:'您已经退出登录成功'
            })
            this.$router.push("/")
            sessionStorage.clear();
          }).catch(()=>{
        this.$message({
          type:'info',
          message:'已取消退出登录'
        })
      })
    },
  },
  beforeMount() {
    this.getuser();
  }
};
</script>

<style scoped>
.personal-center {
  text-align: center;
}

</style>
