<template>
  <div>
    <el-table :data="tableData" style="height: 100%;"
      :header-cell-style="{background:'#f3f6fd',color:'#555'}"
              border
    >
      <el-table-column prop="id" label="ID" width="60">
      </el-table-column>
      <el-table-column prop="number" label="账号" width="180">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="120">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="120">
        <template v-slot:default="scope">
          <el-tag
              :type="scope.row.sex ===1 ? 'primary' : 'success'"
              disable-transitions>{{scope.row.sex== 1 ? '男' : '女'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="roleId" label="角色" width="120">
        <template v-slot:default="scope">
          <el-tag
              :type="scope.row.roleId ===0 ? 'danger' : (scope.row.sex ===1 ? 'primary' : 'success')"
              disable-transitions>{{scope.row.roleId=== 0 ? '超级管理员' : (scope.row.sex ===1 ? '管理员' : '用户')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话" width="200">
      </el-table-column>
      <el-table-column prop="" label="操作">
        <el-button size="small" type="primary">编辑</el-button>
        <el-button size="small" type="danger">删除</el-button>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "MaIn",
  data() {
    return {
      tableData:[],
      pageSize:2,
      pageNum:1,
      total:1
    }
  },
  methods:{
    loadGetp() {
      this.$axios.get(this.$httpUrl + '/users/listp',{params:{
          page:this.pageNum,
          pageSize:this.pageSize
        }}).then(res => res.data).then(
          res => {
            console.log(res)
            if (res.code == 1) {
              this.tableData = res.data.rows
              this.total=res.data.total
            } else {
              alert("获取数据失败")
            }
          }
      )
    },
    loadGetl(){
      this.$axios.get(this.$httpUrl+'/users/list').then(res=>res.data).then(
          res=>{
            console.log(res)
            if(res.code==1) {
              //this.tableData = res.data
            }else{
              alert("获取数据失败")
            }
          }
      )
    },
    loadPost(){
      this.$axios.post(this.$httpUrl+'/users/listn',{

      }).then(res=>res.data).then(
          res=>{
            if(res.code==1) {
              //this.tableData = res.data
            }else{
              alert("获取数据失败")
            }
          }
      )
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum=val;
      this.loadGetp()
    }
  },
  beforeMount() {
    this.loadGetl();
    this.loadPost();
    this.loadGetp();
  }
}
</script>

<style scoped>

</style>