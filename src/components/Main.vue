<template>
  <div>
    <div style="margin-bottom: 5px;">
      <el-input v-model="name" placeholder="请输入名字...." style="width: 200px;" suffix-icon="el-icon-search"
                @keyup.enter.native="loadGetp"
      ></el-input>
      <el-select v-model="sex" filterable placeholder="请输入性别...." style="margin-left: 5px;">
        <el-option
            v-for="item in sexs"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-button type="success" style="margin-left: 5px" @click="loadGetp">查询</el-button>
      <el-button type="info" style="margin-left: 5px" @click="resertParam">重置</el-button>
      <el-button type="primary" style="margin-left: 5px" @click="addUser">新增</el-button>
    </div>

    <el-table :data="tableData" style="height: 100%;"
              :header-cell-style="{background:'#f3f6fd',color:'#555'}"
              border>
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
              disable-transitions>{{ scope.row.sex == 1 ? '男' : '女' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="roleId" label="角色" width="120">
        <template v-slot:default="scope">
          <el-tag
              :type="scope.row.roleId ===0 ? 'danger' : (scope.row.roleId ===1 ? 'primary' : 'success')"
              disable-transitions>
            {{ scope.row.roleId === 0 ? '超级管理员' : (scope.row.roleId === 1 ? '管理员' : '用户') }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话" width="200">
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template v-slot:default="scope">
        <el-button size="small" type="primary" @click="mod(scope.row)">编辑</el-button>
          <el-popconfirm
              title="确定删除该用户吗？"
              @confirm="del(scope.row.id)"
          >
        <el-button slot='reference' size="small" type="danger" style="margin-left: 5px">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5,8,10,15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>

    <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="账号" prop="number">
          <el-col :span="20">
            <el-input v-model="form.number"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-col :span="20">
            <el-input v-model="form.password"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="名字" prop="name">
          <el-col :span="20">
            <el-input v-model="form.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-col :span="20">
            <el-input v-model="form.age"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="0">女</el-radio>
            <el-radio label="1">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-col :span="20">
            <el-input v-model="form.phone"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="conf">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "MaIn",
  data() {
    let checkAge=(rule,value,callback)=>{
      if(value>150){
        callback(new Error('年龄输入过大'))
      }else{
        callback()
      }
    };
    let checkNumber=(rule,value,callback)=>{
      if(this.form.id){
        return callback();
      }
      this.$axios.get(this.$httpUrl + '/users/findByN?number='+this.form.number).then(res=>res.data).then(
          res=>{
            if(res.code===1){
              callback();
            }else{
              callback(new Error('账号已存在'))
            }
          }
      )
    };
    return {
      tableData: [],
      pageSize: 5,
      pageNum: 1,
      total: 1,
      name: '',
      sex: '',
      sexs: [
        {
          value: '1',
          label: '男'
        }, {
          value: '0',
          label: '女'
        }
      ],
      centerDialogVisible: false,
      form: {
        number: '',
        name: '',
        password: '',
        age: '',
        sex: '0',
        phone: '',
        roleId: '2'
      },
      rules: {
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的电话号码', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { min: 1, max: 3, message: '长度在 1 到 3 个数字', trigger: 'blur' },
          { pattern: /^([1-9][0-9]*){1,3}$/, message: '请输入正确的年龄', trigger: 'blur' },
          { validator: checkAge,trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
          { validator: checkNumber,trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    update(){
      this.$axios.post(this.$httpUrl + '/users/mod', this.form).then(res => res.data).then(
          res => {
            if (res.code === 1) {
              this.loadGetp()
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.centerDialogVisible = false
            } else {
              this.$message.error('操作失败');
            }
          }
      )
    },
    save(){
      this.$axios.post(this.$httpUrl + '/users/add', this.form).then(res => res.data).then(
          res => {
            if (res.code === 1) {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.centerDialogVisible = false
            } else {
              this.$message.error('操作失败');
            }
          }
      )
    },
    mod(row){
      this.centerDialogVisible=true
      this.$nextTick(()=> {
        this.form.id = row.id
        this.form.number = row.number
        this.form.name = row.name
        this.form.age = row.age + ''
        this.form.sex = row.sex + ''
        this.form.phone = row.phone
        this.form.password = ''
        this.form.roleId = row.roleId
      })
    },
    del(id){
      this.$axios.delete(this.$httpUrl + '/users/delete?id='+id).then(res => res.data).then(
          res => {
            if (res.code === 1) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.centerDialogVisible = false
              this.loadGetp()
            } else {
              this.$message.error('操作失败');
            }
          }
      )
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
    conf() {
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
    addUser() {
      this.centerDialogVisible = true
      this.$nextTick(()=>{
        this.resetForm()
      })
    },
    resertParam() {
      this.name = ''
      this.sex = ''
    },
    loadGetp() {
      this.$axios.get(this.$httpUrl + '/users/listp', {
        params: {
          page: this.pageNum,
          pageSize: this.pageSize,
          name: this.name,
          sex: this.sex
        }
      }).then(res => res.data).then(
          res => {
            console.log(res)
            if (res.code == 1) {
              this.tableData = res.data.rows
              this.total = res.data.total
            } else {
              alert("获取数据失败")
            }
          }
      )
    },
    loadGetl() {
      this.$axios.get(this.$httpUrl + '/users/list').then(res => res.data).then(
          res => {
            console.log(res)
            if (res.code == 1) {
              //this.tableData = res.data
            } else {
              alert("获取数据失败")
            }
          }
      )
    },
    loadPost() {
      this.$axios.post(this.$httpUrl + '/users/listn', {}).then(res => res.data).then(
          res => {
            if (res.code == 1) {
              //this.tableData = res.data
            } else {
              alert("获取数据失败")
            }
          }
      )
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageNum = 1;
      this.pageSize = val;
      this.loadGetp()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
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