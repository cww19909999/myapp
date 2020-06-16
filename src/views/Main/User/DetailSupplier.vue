<template>
  <el-card>
    <div class="wrap">
      <el-row>
        <el-col :span="3">
          <span>供应商名称：</span>
        </el-col>
        <el-col :span="15">
          <p>{{getDetailSupplier.supplier}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <span>登录账号：</span>
        </el-col>
        <el-col :span="5">
          <p>{{getDetailSupplier.account}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <span>登录密码：</span>
        </el-col>
        <el-col :span="5">
          <p>{{getDetailSupplier.password}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <span>地址：</span>
        </el-col>
        <el-col :span="10">
          <p>{{getDetailSupplier.address}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <span>联系人：</span>
        </el-col>
        <el-col :span="5">
          <p>{{getDetailSupplier.linkman}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <span>联系手机：</span>
        </el-col>
        <el-col :span="5">
          <p>{{getDetailSupplier.phone}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <span>备注：</span>
        </el-col>
        <el-col :span="10">
          <el-input type="textarea" :rows="3" readonly v-model="getDetailSupplier.remark"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <span>状态：</span>
        </el-col>
        <el-col :span="5" class="col-switch">
          <el-switch v-model="getDetailSupplier.status" active-color="#13ce66" active-text="激活" inactive-text="冻结" disabled></el-switch>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
        
    };
  },
  props: ["id"],
  created() {
    this.$store.commit('getSupplierByIdDetail', this.id)
  },
  computed: {
    getDetailSupplier(){
        return this.$store.state.detailSupplier
    }
  }
};
</script>
<style lang="less" scoped>
.wrap {
  border: 2px solid #bbb9b9;
  border-radius: 15px;
  margin: 25px;
  padding: 25px;
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .el-col {
      span {
        height: 40px;
        line-height: 40px;
      }
      p {
        border: 1px solid #bbb9b9;
        border-radius: 6px;
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
      }
      .el-switch /deep/ .el-switch__label--right {
        right: -10px;
      }
      .el-switch /deep/ .el-switch__label--left {
        left: 20px;
      }
    }
    .col-switch {
      height: 40px;
      line-height: 40px;
    }
  }
}
</style>