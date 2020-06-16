<template>
  <el-card>
    <p>新增供应商</p>
    <el-form
      :model="addSupplierForm"
      :rules="addSupplierFormRules"
      ref="addSupplierFormRef"
      label-width="110px"
    >
      <el-form-item label="供应商名称：" prop="supplier">
        <el-input v-model="addSupplierForm.supplier" style="width:600px"></el-input>
      </el-form-item>
      <el-form-item label="登录账号：" prop="account">
        <el-input v-model="addSupplierForm.account" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="登录密码：" prop="password">
        <el-input v-model="addSupplierForm.password" show-password style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="地址：" prop="address">
        <el-input v-model="addSupplierForm.address" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="联系人：" prop="linkman">
        <el-input v-model="addSupplierForm.linkman" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="联系手机：" prop="phone">
        <el-input v-model="addSupplierForm.phone" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="addSupplierForm.remark" type="textarea" :rows="5" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-switch
          v-model="addSupplierForm.status"
          active-color="#13ce66"
          active-text="激活"
          inactive-text="冻结"
        ></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitAddSupplier">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import bus from '@/assets/js/bus'
export default {
  data() {
    // 账号验证
    let validateAccount = (rule, value, callback) => {
      let reg = /^[a-zA-Z\d]{1,10}$/;
      if (!reg.test(value)){
        return callback(new Error("必须由字母和数字组成，长度在 1 到 10 个字符"));
      }
      callback();
    };
    // 密码验证
    let validatePassword = (rule, value, callback) => {
      let reg = /^(?![a-zA-Z]+$)(?!\d+$)[a-zA-Z\d]{6,8}$/;
      if (!reg.test(value)){
        return callback(new Error("密码必须包含字母和数字，长度在 6 到 8 个字符"));
      }
      else callback();
    };
    // 手机验证
    let validetePhone = (rule, value, callback) => {
      let reg = /^1[3456789]\d{9}$/;
      if (!reg.test(value)){
        return callback(new Error("请输入正确手机号码"));
      } 
      callback();
    };
    return {
      addSupplierForm: {
        supplier: "",
        account: "",
        password: "",
        address: "",
        linkman: "",
        phone: "",
        remark: "",
        status: true
      },
      addSupplierFormRules: {
        supplier: [
          { required: true, message: "请输入供应商", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符之间",
            trigger: "blur"
          }
        ],
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { validator: validateAccount, trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { validator: validatePassword, trigger: "blur" }
        ],
        address: [{ required: true, message: "地址不能为空", trigger: "blur" }],
        linkman: [
          { required: true, message: "联系人不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机不能为空", trigger: "blur" },
          { validator: validetePhone, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitAddSupplier() {
      this.$refs.addSupplierFormRef.validate(valid => {
        if(valid){
          this.$store.commit('addSupplierForm', this.addSupplierForm)
          this.$message.success('添加成功')
          for(let key in this.addSupplierForm){
            if(key !== 'status'){
              this.addSupplierForm[key] = ''
            }else{
              this.addSupplierForm[key] = true
            }
          }
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.el-switch /deep/ .el-switch__label--right {
  right: -10px;
}
.el-switch /deep/ .el-switch__label--left {
  left: 20px;
}
</style>