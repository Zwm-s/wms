<template>
  <div style="display: flex;line-height: 60px;font-family:'Microsoft YaHei',serif;">
    <div style="margin-top: 8px;">
      <i :class="icon" style="font-size: 25px;cursor: pointer" @click="collapse"></i>
    </div>
    <div style="flex: 1;text-align: center;font-size: 30px;font-weight: bold;font-family:'Microsoft YaHei',serif;">
      <span>欢迎来到仓库管理系统</span>
    </div>
    <span>王小虎</span>
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
  props:{
    icon:String
  },
  methods:{
    toUser(){
      console.log("to_user")
    },
    logout(){
      console.log("to_user")
    },
    collapse(){
      this.$emit('doCollapse')
    }
  }
}
</script>


<style scoped>

</style>