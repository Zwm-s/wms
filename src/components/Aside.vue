<template>
  <el-menu
      style="height: 100%;"
      background-color="#c7d0d5"
      default-active="/Home"
      :collapse="isCollapse"
      :collapse-transition="false"
      router
  >
    <el-menu-item index="/Home" >
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/Admin">
      <i class="el-icon-star-on"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="/STM">
      <i class="el-icon-star-on"></i>
      <span slot="title">仓库管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "AsiDe",
  data(){
    return{
      //isCollapse:false
    }
  },
  props:{
    isCollapse:Boolean
  }
}
</script>

<style scoped>

</style>