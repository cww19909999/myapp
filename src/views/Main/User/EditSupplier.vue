<template>
  <el-card>
    <p>编辑供应商</p>
    <el-form
      :model="getEditSupplier"
      :rules="editSupplierFormRules"
      ref="editSupplierFormRef"
      label-width="110px"
    >
      <el-form-item label="供应商名称:" prop="supplier">
        <el-input v-model="getEditSupplier.supplier" style="width:600px"></el-input>
      </el-form-item>
      <el-form-item label="登录账号:" prop="account">
        <el-input v-model="getEditSupplier.account" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="登录密码:" prop="password">
        <el-input v-model="getEditSupplier.password" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="地址:" prop="address">
        <el-input v-model="getEditSupplier.address" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="联系人:" prop="linkman">
        <el-input v-model="getEditSupplier.linkman" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="联系手机:" prop="phone">
        <el-input v-model="getEditSupplier.phone" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="备注:" prop="remark">
        <el-input v-model="getEditSupplier.remark" type="textarea" :rows="3" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="状态:">
        <el-switch
          v-model="getEditSupplier.status"
          active-text="激活"
          inactive-text="冻结"
          active-color="#13ce66"
        ></el-switch>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data() {
    // 账号验证
    let validateAccount = (rule, value, callback) => {
      let reg = /^[a-zA-Z\d]{1,10}$/;
      if (!reg.test(value)) {
        return callback(
          new Error("必须由字母和数字组成，长度在 1 到 10 个字符")
        );
      }
      callback();
    };
    // 密码验证
    let validatePassword = (rule, value, callback) => {
      let reg = /^(?![a-zA-Z]+$)(?!\d+$)[a-zA-Z\d]{6,8}$/;
      if (!reg.test(value)) {
        return callback(
          new Error("密码必须包含字母和数字，长度在 6 到 8 个字符")
        );
      } else callback();
    };
    // 手机验证
    let validetePhone = (rule, value, callback) => {
      let reg = /^1[3456789]\d{9}$/;
      if (!reg.test(value)) {
        return callback(new Error("请输入正确手机号码"));
      }
      callback();
    };
    return {
      editSupplierFormRules: {
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
  props: ["id"],
  created() {
    this.$store.commit("getSupplierById", this.id);
  },
  computed: {
    getEditSupplier() {
      return this.$store.state.editSupplier;
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