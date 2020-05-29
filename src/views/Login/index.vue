<template>
  <div class="login-container">
    <!-- 登录表单 -->
    <div class="login-wrapper">
      <div class="login-header">
        <h1>XX租赁</h1>
        <p>后台管理系统</p>
      </div>
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm">
        <el-form-item prop="uname">
          <el-input placeholder="用户名" prefix-icon="el-icon-user" v-model="loginForm.uname"></el-input>
        </el-form-item>
        <el-form-item prop="upwd">
          <el-input
            type="password"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            v-model="loginForm.upwd"
          ></el-input>
        </el-form-item>
        <el-form-item prop="ucode">
          <el-row :gutter="15">
            <el-col :span="14">
              <el-input placeholder="图形验证码" prefix-icon="el-icon-key" v-model="loginForm.ucode"></el-input>
            </el-col>
            <el-col :span="10">
              <el-image :src="url" class="ucode-image"></el-image>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="isChecked">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item class="login-btns">
          <el-button type="success" @click="login">登录</el-button>
          <el-button type="primary" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 底部版权 -->
    <div class="login-footer">
      <span>copyright&copy;2018 广州XXXX有限公司出品</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        uname: "",
        upwd: "",
        ucode: "1234"
      },
      loginFormRules: {
        uname: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        upwd: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        ucode: [{ required: true, message: "验证码不能为空", trigger: "blur" }]
      },
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      isChecked: true
    };
  },
  created() {
    // 判断有没有cookie
    this.getCookie()
  },
  methods: {
    login() {
      this.$refs.loginForm.validate().then(valid => {
        if (valid) {
          if (this.loginForm.ucode === "1234") {
            // this.axios.post('login',{username:this.uname, password: this.upwd}).then(res=>{
            //   console.log(res.data)
            // }).catch((err)=>{
            //   console.log(err)
            // })
            if (
              this.loginForm.uname === "admin" &&
              this.loginForm.upwd === "123456"
            ) {
              this.$message.success("登录成功");
              if (this.isChecked) {
                let dates = new Date();
                dates.setTime(dates.getTime() + 7 * 1000 * 60 * 60 * 24);
                document.cookie = `uname=${
                  this.loginForm.uname
                };expires=${dates.toUTCString()}`;
                document.cookie = `upwd=${
                  this.loginForm.upwd
                };expires=${dates.toUTCString()}`;
              } else {
                let cookieList = document.cookie.split(";");
                cookieList.forEach(item => {
                  item.indexOf("uname") !== -1 &&
                    (document.cookie =
                      "uname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
                  item.indexOf("upwd") !== -1 &&
                    (document.cookie =
                      "upwd=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
                });
              }
              sessionStorage.setItem("uname", this.loginForm.uname);
              this.$router.push("/main");
            } else {
              this.$message.error("用户名或密码有误，请检查！");
            }
          } else {
            this.$message.error("验证码有误，请重新输入！");
          }
          // 检查验证码；
          //   通过就验证用户密码；
          //   如果通过
          //     检查记住密码
          //     如果记住就重新设置cookie
          //     没有就清除cookie
          //   否则提示错误
          // 否则就提示验证码错误
        }
      });
    },
    resetLoginForm() {
      this.$refs.loginForm.resetFields();
    },
    getCookie(){
      let cookieList = document.cookie.split(";");
      cookieList.forEach(item => {
        item.indexOf("uname") !== -1 &&
          (this.loginForm.uname = item.split("=")[1]);
        item.indexOf("upwd") !== -1 && (this.loginForm.upwd = item.split("=")[1]);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 95vh;
  position: relative;

  .login-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    padding: 0 50px 50px;
    background: #e0e0e0;

    .login-header {
      text-align: center;
      h1 {
        font-weight: 400;
      }
    }
    .ucode-image {
      width: 100%;
      height: 40px;
      border-radius: 3px;
      vertical-align: middle;
    }
    .login-btns {
      text-align: right;
    }
  }
  .login-footer {
    width: 100%;
    position: absolute;
    bottom: 10px;
    text-align: center;
  }
}
</style>