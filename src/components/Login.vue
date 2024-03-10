<template>
  <div class="loginBody" style="
    position:absolute;
    width: 100%;
    height: 100%;
    background-color: #B3C0D1">
    <div class="loginDiv" style="
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -200px;
      margin-Left: -250px;
      width: 450px;
      height: 330px;
      background: #fff;
      border-radius: 5%;
      ">
      <div class="login-content" style="
        width: 400px;
        height: 250px;
        position: absolute;
        top: 25px;
        left: 25px;
        ">
        <h1 class="login-title" style="margin: 20px 0;text-align: center;">用户登录</h1>
        <el-form :model="loginForm" label-width="100px"
                 :rules="ruLes" ref="loginForm">
          <el-form-item label="账号" prop="number">
            <el-input style="width: 200px" type="text" v-model="loginForm.number"
                      autocomplete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input style="width: 200px" type="password" v-model="loginForm.password"
                      show-password autocomplete="off" size="small" @keyup.enter.native="login"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login" :disabled="confirm_disabled">登 录</el-button>
            <el-button type="info" @click="register" :disabled="confirm_disabled" style="margin-left: 55px;">注 册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-dialog
          title="注 册"
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
  </div>
</template>

<script>

export default {
    name: "LogIn",
    data() {
      let checkAge=(rule,value,callback)=>{
        if(value>150){
          callback(new Error('年龄输入过大'))
        }else{
          callback()
        }
      };
      return {
        //注册表显示
        centerDialogVisible:false,
        //注册表单
        form:{
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
          ],
          name: [
            { required: true, message: '请输入名字', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        },
        userImage:'',
        confirm_disabled: false,
        loginForm: {
          number: '',
          password: ''
        },
        ruLes: {
          no: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      conf(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$axios.post(this.$httpUrl+'/register',this.form).then(res=>res.data).then(async res =>{
              if(res.code ===1){
                this.$message({
                  message: '注册成功',
                  type: 'success'
                });
                this.centerDialogVisible=false;
                this.confirm_disabled = false;
              }else{
                this.$message({
                  message: '注册失败，账号已存在',
                  type: 'error'
                });
              }
            })
          } else {
            console.log('error submit!!');
          }
        });
      },
      register(){
        this.confirm_disabled = true;
        this.centerDialogVisible=true;
      },
      login() {
        this.confirm_disabled = true;
        this.$refs.loginForm.validate((valid) => {
          if (valid) { //valid成功为true, 失败为false//去后台验证用户名密码
            this.$axios.post(this.$httpUrl+'/login', this.loginForm).then(res => res.data).then(async res => {
              console.log(res)
              if (res.code === 1) {
                //存储token和user
                sessionStorage.setItem("curUser", JSON.stringify(res.data.name))
                //JSON.stringify(res.data.key)
                sessionStorage.setItem("token", JSON.stringify(res.data.token))
                //存储id
                sessionStorage.setItem("curId",JSON.stringify(res.data.id))
                //存储Image
                this.getImage(res.data.id)
                //路由跳转
                await this.$router.replace('/index');
              } else {
                this.confirm_disabled = false;
                alert('校验失败，用户名或密码错误!');
                return false;
              }
            });
          } else {
            this.confirm_disabled = false;
            console.log("校验失败")
            return false;
          }
        });
      },
      getImage(userId){
        this.$axios.get(this.$httpUrl + '/users/findImageById?id='+userId).then(res => res.data).then(
            res => {
              if (res.code === 1) {
                switch (res.data){
                  case '泉此方':
                    this.userImage='QCF.png'
                    break
                  case '柊镜':
                    this.userImage='ZJ.png'
                    break
                  case '柊司':
                    this.userImage='ZS.png'
                    break
                  case '高良美幸':
                    this.userImage='GLMX.png'
                    break
                  default:
                    this.userImage='YH.png';
                    break
                }
                sessionStorage.setItem('userImage',this.userImage);
                console.log(this.userImage)
              } else {
                alert("获取数据失败")
              }
            })
      },
    }
  }
</script>

<styLe scoped>
  .loginBody {
    position:absolute;
    width: 100%;
    height: 100%;
    background-coLor:#B3C0D1;
  }
  .loginDiv{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-Left: -250px;
    width: 450px;
    height: 330px;
    background: #fff;
    border-radius: 5%;
  }
  .login-title{
    margin: 20px 0;
    text-align: center;
  }
  .login-content {
    width: 400px;
    height: 250px;
    position: absolute;
    top: 25px;
    left: 25px;
  }
</styLe>