<template>
  <div>
    <el-card>
      <el-form ref="searchProForm" :model="searchProForm" label-width="80px">
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="16">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="商品名称:" prop="pname">
                  <el-input v-model="searchProForm.pname" placeholder="商品名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品规格:" prop="pspec">
                  <el-input v-model="searchProForm.pspec" placeholder="商品规格"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标签:" prop="plabel">
              <el-select v-model="searchProForm.plabel" placeholder="请选择">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in tagList"
                  :key="item.value"
                ></el-option>
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
                    <el-form-item prop="startTime">
                      <el-date-picker
                        type="datetime"
                        format="yyyy-MM-dd HH:mm"
                        placeholder="请选择"
                        v-model="searchProForm.startTime"
                        prefix-icon="el-icon-date"
                        :picker-options="beginTime"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item prop="endTime">
                      <el-date-picker
                        type="datetime"
                        format="yyyy-MM-dd HH:mm"
                        placeholder="请选择"
                        v-model="searchProForm.endTime"
                        prefix-icon="el-icon-date"
                        :picker-options="overTime"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-button type="primary" @click="searchProducts">搜索</el-button>
                    <el-button type="primary" @click="resetSearchForm">重置</el-button>
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
      tagList: [
        { label: "优惠", value: "discounts" },
        { label: "高档", value: "highclass" },
        { label: "推荐", value: "recommend" },
        { label: "热卖", value: "hotsale" }
      ],
      searchProForm: {
        pname: "",
        pspec: "",
        plabel: "",
        startTime: "",
        endTime: ""
      },
      beginTime: {
        disabledDate: time => {
            if(this.searchProForm.endTime){
                return  time.getTime() > new Date(this.searchProForm.endTime).getTime()
            }else{

            }
        }
      },
      overTime: {
          disabledDate: time => {
              if(this.searchProForm.startTime){
                return  time.getTime() < new Date(this.searchProForm.startTime).getTime()
              }
          }
      }
    };
  },

  methods: {
    searchProducts() {
      console.log("发送axios获取列表");
    },
    resetSearchForm() {
      this.$refs.searchProForm.resetFields();
    }
  }
};
</script>
<style lang="less" scoped>

</style>