<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside :width="aside_width" style="height: 100%;background-color: rgb(238, 241, 246);margin-left: -1px;margin-top: -1px;margin-bottom: -1px;">
      <Aside :isCollapse="isCollapse"></Aside>
    </el-aside>

    <el-container style="height: 100%;">
      <el-header style="height: 8%;text-align: right; font-size: 15px;border-bottom: #c7d0d5 1px solid">
        <HeaDer @doCollapse="doCollapse" :icon="icon"></HeaDer>
      </el-header>

      <el-main style="height: 92%;padding: 0px">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "@/components/Aside.vue";
import HeaDer from "@/components/Header.vue";
export default {
  name: "InDex",
  components: { HeaDer, Aside},
  data(){
    return{
      isCollapse:false,
      aside_width:'200px',
      icon:'el-icon-s-fold'
    }
  },
  methods:{
    doCollapse(){
      this.isCollapse=!this.isCollapse
      if(!this.isCollapse){//展开情况下
        this.aside_width='200px'
        this.icon='el-icon-s-fold'
      }else{
        this.aside_width='64px'
        this.icon='el-icon-s-unfold'
      }
    }
  },
  created() {
    this.$router.push("/Home")
  }
}
</script>
<style scoped>
  .el-header {
    /*background-color: #B3C0D1;*/
    color: #333;
    line-height: 60px;
  }
  .el-main {
    padding: 5px;
  }
  .el-aside {
    color: #333;
  }
</style>