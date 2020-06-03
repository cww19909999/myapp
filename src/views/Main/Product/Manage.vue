<template>
  <div>
    <el-card>
      <!-- 搜索框 -->
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
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 商品列表 -->
      <el-table :data="productList" border style="width: 100%">
        <el-table-column prop="name" label="商品名称"  align="center"></el-table-column>
        <el-table-column prop="price" label="商品规格"  align="center"></el-table-column>
        <el-table-column prop="rentNum" label="租赁量"  align="center"></el-table-column>
        <el-table-column prop="purchases" label="购买量"  align="center"></el-table-column>
        <el-table-column prop="uvNum" label="UV浏览量"  align="center"></el-table-column>
        <el-table-column prop="tag" label="标签"  align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              active-text="上架"
              inactive-text="下架">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="创建时间" width="100" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="100" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.startTime }}</p>
            <!-- <p>{{ scope.row.startTime }}</p> -->
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template v-slot="scope">
            <el-button @click="proDetail(scope.row.id)" type="text" size="small">详情</el-button>
            <el-button @click="proEdit(scope.row.id)" type="text" size="small">编辑</el-button>
            <el-button @click="proDelete(scope.row.id)" type="text" size="small" class="delbtn">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页条 -->
       <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchProForm.pageNum"
        :page-sizes="[1, 2, 4, 8]"
        :page-size="searchProForm.pageSize"
        layout="prev, pager, next, jumper, -> , total, sizes"
        :total="total"
        background>
      </el-pagination>
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
        endTime: "",
        pageSize: 1,
        pageNum: 1,
      },
      total: 11,
      beginTime: {
        disabledDate: time => {
          if (this.searchProForm.endTime) {
            return (
              time.getTime() > new Date(this.searchProForm.endTime).getTime()
            );
          } else {
          }
        }
      },
      overTime: {
        disabledDate: time => {
          if (this.searchProForm.startTime) {
            return (
              time.getTime() < new Date(this.searchProForm.startTime).getTime()
            );
          }
        }
      },
      productList: [
        {id: 1, name: '苹果11', price: '6799', rentNum: '12', purchases: '12', uvNum: '9999', tag: ['discounts', 'highclass'], status: true, startTime: '2019-12-6 14:48:33', updateTime: '2019-12-16:10:00:00'},
        {id: 2, name: '苹果10', price: '1111', rentNum: '13', purchases: '6', uvNum: '2222', tag: ['recommend', 'highclass'], status: false, startTime: '2019-9-6 14:48:33', updateTime: '2019-10-16:10:00:00'},
        {id: 3, name: '苹果9', price: '2222', rentNum: '22', purchases: '3', uvNum: '9999', tag: ['discounts', 'hotsale'], status: true, startTime: '2019-12-6 14:48:33', updateTime: '2020-12-16:10:00:00'},
        {id: 4, name: '苹果8', price: '3333', rentNum: '33', purchases: '2', uvNum: '3333', tag: ['discounts', 'highclass', 'recommend', 'hotsale'], status: true, startTime: '2019-12-6 14:48:33', updateTime: '2019-12-16:10:00:00'},
        {id: 5, name: '苹果7', price: '4444', rentNum: '13', purchases: '12', uvNum: '9999', tag: ['discounts', 'highclass'], status: false, startTime: '2019-12-6 14:48:33', updateTime: '2019-12-16:10:00:00'},
        {id: 6, name: '苹果6', price: '5555', rentNum: '32', purchases: '19', uvNum: '2222', tag: ['discounts', 'highclass'], status: true, startTime: '2019-12-6 14:48:33', updateTime: '2019-12-16:10:00:00'},
        {id: 7, name: '苹果5', price: '6666', rentNum: '654', purchases: '192', uvNum: '9999', tag: ['discounts', 'highclass'], status: true, startTime: '2019-12-6 14:48:33', updateTime: '2019-12-16:10:00:00'},
        {id: 8, name: '苹果4', price: '7777', rentNum: '46', purchases: '12', uvNum: '1111', tag: ['discounts', 'highclass'], status: false, startTime: '2019-12-6 14:48:33', updateTime: '2019-12-16:10:00:00'},
        {id: 9, name: '苹果3', price: '88888', rentNum: '565', purchases: '126', uvNum: '9999', tag: ['discounts', 'highclass'], status: false, startTime: '2019-12-6 14:48:33', updateTime: '2019-12-16:10:00:00'},
        {id: 10, name: '苹果2', price: '9999', rentNum: '65', purchases: '125', uvNum: '123', tag: ['discounts', 'highclass'], status: false, startTime: '2019-12-6 14:48:33', updateTime: '2019-12-16:10:00:00'},
        {id: 11, name: '苹果1', price: '8765', rentNum: '56', purchases: '121', uvNum: '321', tag: ['discounts', 'highclass'], status: false, startTime: '2019-12-6 14:48:33', updateTime: '2019-12-16:10:00:00'},
        {id: 12, name: '苹果12', price: '4545', rentNum: '23', purchases: '102', uvNum: '333', tag: ['discounts', 'highclass'], status: true, startTime: '2019-12-6 14:48:33', updateTime: '2019-12-16:10:00:00'}
      ],
      
    };
  },

  methods: {
    searchProducts() {
      console.log("发送axios获取列表");
    },
    resetSearchForm() {
      this.$refs.searchProForm.resetFields();
    },
    proDetail(id){
      console.log(id,'详情')
    },
    proEdit(id){
      console.log(id,'编辑')
    },
    proDelete(id){
      console.log(id,'删除')
    },
    handleSizeChange(newSize){
      console.log(newSize, '发起数据请求')
    },
    handleCurrentChange(newNum){
      console.log(newNum, '发起数据请求')
    }
  }
};
</script>
<style lang="less" scoped>
.delbtn{
  color: red;
}
</style>