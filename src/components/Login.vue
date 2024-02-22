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
                      show-password autocomplete="off" size="small" @keyup.enter.native="confirm"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="confirm" :disabled="confirm_disabled">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "LogIn",
    data() {
      return {
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
      confirm() {
        this.confirm_disabled = true;
        this.$refs.loginForm.validate((valid) => {
          if (valid) { //valid成功为true, 失败为false//去后台验证用户名密码
            this.$axios.post(this.$httpUrl+'/login', this.loginForm).then(res => res.data).then(res => {
              console.log(res)
              if (res.code === 1) {//存储
                sessionStorage.setItem("CurUser", JSON.stringify(res.data))//跳转到主页
                this.$router.replace('/index');
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
      }
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