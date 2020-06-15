<template>
  <div>
    <!-- 卡片内容 -->
    <el-card>
      <!-- 表单 -->
      <el-row :gutter="50">
        <el-col :span="8">
          <el-row>
            <el-col :span="6">
              <h4 class="vertical">供应商名称</h4>
            </el-col>
            <el-col :span="18">
              <el-input placeholder="请输入供应商名称" v-model="keyword"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="searchSupplier">搜索</el-button>
          <el-button type="primary" @click="resetKeyword">重置</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-plus" @click="goSupplier">新增供应商</el-button>
        </el-col>
      </el-row>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 列表 -->
      <el-table :data="supplierList" stripe border style="width: 100%" height="400">
        <el-table-column prop="supplier" label="供应商名称" align="center"></el-table-column>
        <el-table-column prop="accout" label="登录账号" align="center"></el-table-column>
        <el-table-column prop="password" label="登录密码" align="center">
          <template v-slot="scope">
            <span>{{scope.row.password.replace(/./g, '*')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="linkman" label="联系人" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系手机" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.status"
              active-text="激活"
              inactive-text="冻结"
              active-color="#13ce66"
              @change="changeStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="100" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="100" align="center"></el-table-column>
        <el-table-column label="操作" width="210" align="center">
          <template v-slot="spoce">
            <el-button type="primary" size="mini">详情</el-button>
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini" :disabled="!spoce.row.status">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页条 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pageSize"
        layout="prev, pager, next, jumper, ->, total, sizes"
        :total="totalNum"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>
<script>
import bus from '@/assets/js/bus'
export default {
  data() {
    return {
      // supplierList: [],
      keyword: "",
      pageSize: 2,
      pageNum: 1,
      totalNum: 6
    };
  },
  methods: {
    // 获取供应商列表
    getSupplierList(){
      this.$store.commit('getSupplierList', {keyword: this.keyword, pageSize: this.pageSize, pageNum: this.pageNum})
    },
    // 更改页大小
    handleSizeChange(val) {
      this.pageSize = val;
      this.getSupplierList();
    },
    // 更改页码
    handleCurrentChange(val) {
      this.pageNum = val
      this.getSupplierList()
    },
    // 监听供应商状态改变事件
    changeStatus(supplier){
      let {id, status} = supplier;
      let flag = false;
      // this.supplierList0().forEach(item => {
      //   if(item.id === id){
      //       item.status = status;
      //       flag = true;
      //       this.$message.success('修改成功');
      //   }
      // })
      if(!flag){
        supplier.status = !supplier.status
        this.$message.error('修改失败')
      }
    },
    // 搜索按钮
    searchSupplier(){
      this.getSupplierList()
    },
    // 重置按钮
    resetKeyword(){
        this.keyword = ''
        this.getSupplierList()
    },
    // 新增供应商按钮跳转路由
    goSupplier(){
        this.$emit('changeSubRoute', '新增供应商')
        this.$router.push('/addsupplier')
    },
    // 接受添加供应商组件传来的参数添加到供应商列表中
    // addSupplierFormHandler(data){
    //   this.$store.commit('addSupplierForm',data)
    // }
  },
  created(){
    this.getSupplierList()
    // bus.$on('addSupplierForm', this.addSupplierFormHandler)
  },
  computed: {
    supplierList(){
      return this.$store.state.supplierList
    }
  }
};
</script>
<style lang="less" scoped>
.vertical {
  height: 40px;
  line-height: 40px;
}
</style>