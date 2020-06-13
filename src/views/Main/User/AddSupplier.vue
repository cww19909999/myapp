<template>
  <el-card>
    <p>新增供应商</p>
    <el-form
      :model="addSupplierForm"
      :rules="addSupplierFormRules"
      ref="addSupplierFormRef"
      label-width="100px"
      hide-required-asterisk
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
        <el-button type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data() {
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
      addSupplierFormRules: {},
    
    }
  },

  

}
</script>

<style lang="less" scoped>
.el-switch /deep/ .el-switch__label--right {
  right: -10px;
}
.el-switch /deep/ .el-switch__label--left {
  left: 20px;
}
.el-form /deep/ .el-form-item{
    margin-bottom: 6px;
}
</style>