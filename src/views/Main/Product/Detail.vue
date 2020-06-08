<template>
  <el-card>
    <div class="detail-wrapper">
      <el-row>
        <el-col :span="2">商品编号：</el-col>
        <el-col :span="15">
          <p>{{getProduct.id}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">商品名称：</el-col>
        <el-col :span="15">
          <p>{{getProduct.name}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">商品价格：</el-col>
        <el-col :span="15">
          <p>{{'￥' + Number(getProduct.price).toFixed(2) + '元'}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">商品规格：</el-col>
        <el-col :span="15">
          <p>{{getProduct.spec}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">租赁量：</el-col>
        <el-col :span="15">
          <p>{{getProduct.rentNum}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">购买量：</el-col>
        <el-col :span="15">
          <p>{{getProduct.purchases}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">UV浏览量：</el-col>
        <el-col :span="15">
          <p>{{getProduct.uvNum}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">标签：</el-col>
        <el-col :span="15">
            <el-checkbox-group v-model="getProduct.tag">
                <el-checkbox v-for="item in this.$store.state.tagList" :key="item.value" :label="item.value" onclick="return false">{{item.label}}</el-checkbox>
            </el-checkbox-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">状态：</el-col>
        <el-col :span="15">
            <el-radio-group v-model="getProduct.status">
                <el-radio :label="false">下架</el-radio>
                <el-radio :label="true">上架</el-radio>
            </el-radio-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">创建时间：</el-col>
        <el-col :span="15">
          <p>{{getProduct.startTime}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">更新时间：</el-col>
        <el-col :span="15">
          <p>{{getProduct.updateTime}}</p>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["id"],
  methods: {
      
  },
  computed: {
    getProduct() {
      return this.$store.state.product;
    }
  },
  created() {
    this.$store.commit("getProductById", this.id);
  }
};
</script>
<style lang="less" scoped>
.detail-wrapper {
  border: 2px solid #bbb9b9;
  border-radius: 15px;
  margin: 25px;
  padding: 25px;
  .el-row {
    margin-bottom: 30px;
    &:last-child{
      margin-bottom: 0;
    }
    .el-col {
      height: 40px;
      line-height: 40px;
      p{
        border: 1px solid #bbb9b9;
        border-radius: 6px;
        padding: 0 20px;
      }
    }
  }
}
</style>