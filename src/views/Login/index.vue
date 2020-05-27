<template>
  <div class="login-container">
    <div class="login-wrapper">
      <el-row>
        <el-col>
          <h1>XX租赁</h1>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span>后台管理系统</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-input
            placeholder="用户名"
            prefix-icon="el-icon-user"
            v-model.lazy="uname">
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-input
            type="password"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            v-model="upwd">
          </el-input>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="14">
          <el-input
            placeholder="图形验证码"
            prefix-icon="el-icon-key"
            v-model="ucode">
          </el-input>
        </el-col>
        <el-col :span="10">
          <el-image
            style="width: 100%; height:40px"
            :src="url"
            >
          </el-image>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-checkbox v-model="isChecked">记住密码</el-checkbox>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-button type="success" class="login-btn" @click="login">登录</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="login-footer">
      <span>copyright&copy;2018 广州XXXX有限公司出品</span>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      uname: '',
      upwd: '',
      ucode: '',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      isChecked: true,
    }
  },
  mounted(){
    // 判断有没有cookie
    let cookieList = document.cookie.split(';');
    cookieList.forEach(item => {
      item.indexOf('uname') !== -1 && (this.uname = item.split('=')[1]);
      item.indexOf('upwd') !== -1 && (this.upwd = item.split('=')[1]);
    })
  },
  methods:{
    login(){
      if(this.ucode === '1234'){
        if(this.uname === 'admin' && this.upwd === '123456'){
          if(this.isChecked){
            let dates = new Date();
            dates.setTime(dates.getTime() + (7*1000*60*60*24));
            document.cookie = `uname=${this.uname};expires=${dates.toUTCString()}`;
            document.cookie = `upwd=${this.upwd};expires=${dates.toUTCString()}`;
          }else{
            let  cookieList = document.cookie.split(';');
            cookieList.forEach(item=>{
              item.indexOf('uname') !== -1 && (document.cookie = "uname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
              item.indexOf('upwd') !== -1 && (document.cookie = "upwd=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");
            })
          }
          sessionStorage.setItem('uname', this.uname);
          this.$router.push('/main');
        }else{
          this.$message.error('用户名或密码有误，请检查！')
        }
      }else{
        this.$message.error('验证码有误，请重新输入！');
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
  }
}
</script>
<style scoped>
.login-container{
  width: 100%;
  height: 95vh;
  position: relative;
  text-align: center;
}
.login-wrapper{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 450px;
  padding: 0 50px 50px;
  text-align: center;
  background: #E0E0E0;
}
.login-wrapper .el-row {
  margin-bottom: 20px;
}
.login-wrapper .el-row:last-child {
  margin-bottom: 0;
}
.login-wrapper .el-col {
  border-radius: 4px;
}
.login-wrapper .login-btn{
  width: 100%;
}
.login-wrapper h1{
  font-weight: 400;
}
.login-footer{
  width: 100%;
  position: absolute;
  bottom: 10px;
}
 
</style>