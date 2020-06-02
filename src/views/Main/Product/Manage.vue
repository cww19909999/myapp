<template>
  <div>
    <el-card>
      <el-form ref="form" :model="searchProForm" label-width="80px">
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="16">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="商品名称:">
                  <el-input v-model="searchProForm.pname" placeholder="商品名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品规格:">
                  <el-input v-model="searchProForm.pspec" placeholder="商品规格"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标签:">
              <el-select v-model="searchProForm.plebel" placeholder="请选择">
                <el-option label="区域一" value="p1"></el-option>
                <el-option label="区域二" value="p2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="16">
            <el-row>
              <el-col>
                <el-form-item label="创建时间:">
                  <el-col :span="9">
                    <el-date-picker
                      type="datetime"
                      format="yyyy-MM-dd HH:mm"
                      placeholder="请选择"
                      v-model="searchProForm.startTime"
                    ></el-date-picker>
                  </el-col>
                  <el-col :span="9">
                    <el-date-picker
                      type="datetime"
                      format="yyyy-MM-dd HH:mm"
                      placeholder="请选择"
                      v-model="searchProForm.endTime"
                    ></el-date-picker>
                  </el-col>
                  <el-col :span="6">
                    <el-button type="primary">搜索</el-button>
                    <el-button type="primary">重置</el-button>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-plus">新增商品</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchProForm: {
        pname: "",
        pspec: "",
        plebel: "",
        startTime: "",
        endTime: ""
      }
    };
  }
};
</script>
<style lang="less" scoped>
.card{
    .el-form-item{
        // margin-bottom: 15px;
    }
}

</style>