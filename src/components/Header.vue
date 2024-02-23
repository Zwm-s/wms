<template>
  <div style="display: flex;line-height: 50px;font-family:'Microsoft YaHei',serif;margin-bottom: 0px">
    <div style="margin-top:8px;">
      <i :class="icon" style="font-size: 25px;cursor: pointer" @click="collapse"></i>
    </div>
    <div style="flex: 1;text-align: center;font-size: 30px;font-weight: bold;font-family:'Microsoft YaHei',serif;">
      <span>仓库管理系统</span>
    </div>
    <!--    显示用户名字，去掉"-->
    <el-col :span="8" style="width: 35px;height: 35px ;margin-right: 15px;margin-top: 10px;" >
      <el-avatar :size="35" :src='require("@/assets/images/QCF.png")'  ></el-avatar>
    </el-col>
    <span>{{userName.replace(/"/g,'')}}</span>
  <el-dropdown>
    <i class="el-icon-arrow-down" style="margin-left: 5px;width: 10px;"></i>
    <el-dropdown-menu slot="dropdown" >
      <el-dropdown-item @click.native="toUser">个人资料</el-dropdown-item>
      <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  </div>
</template>


<script>
export default {
  name: "HeaDer",
  data(){
    return {
      userName :sessionStorage.getItem('curUser')
    }
  },
  props:{
    icon:String
  },
  methods:{
    toUser(){
      console.log("to_user")
      this.$router.push("/Home")
    },
    logout(){
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
    collapse(){
      this.$emit('doCollapse')
    }
  }
}
</script>


<style scoped>

</style>