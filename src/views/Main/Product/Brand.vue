<template>
  <div>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 新增按钮 -->
      <el-button type="primary" icon="el-icon-plus" size="medium" @click="addBrand">品牌分类</el-button>
      <!-- 品牌列表 -->
      <el-table :data="brandList" border style="width: 450px">
        <el-table-column prop="id" label="id" width="100" align="center"></el-table-column>
        <el-table-column prop="brand" label="品牌名称" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template v-slot="scope">
            <el-button type="danger" size="mini" @click="deleteBrand(scope.row.id)">删除</el-button>
            <el-button type="primary" size="mini" @click="editBrand(scope.row.id)">编辑</el-button>
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
    <!-- 添加对话框 -->
    <el-dialog
      title="新增品牌"
      :visible.sync="addDialogVisible"
      width="30%"
      @closed="resetAddBrandForm"
    >
      <el-form
        :model="addBrandForm"
        :rules="addBrandFormRules"
        ref="addBrandFormRef"
        label-width="90px"
      >
        <el-form-item label="分类名称:" prop="brand">
          <el-input v-model="addBrandForm.brand" placeholder="请输入" ref="addBrand"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddBrand">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog
      title="编辑品牌"
      :visible.sync="editDialogVisible"
      width="30%"
      @closed="resetEditBrandForm"
    >
      <el-form
        :model="editBrandForm"
        :rules="addBrandFormRules"
        ref="editBrandFormRef"
        label-width="90px"
      >
        <el-form-item label="id:">
          <el-input v-model="editBrandForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="分类名称:" prop="brand">
          <el-input v-model="editBrandForm.brand" placeholder="请输入" ref="editBrand"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditBrand">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      brandList0: [
        { id: 232123, brand: "品牌分类1" },
        { id: 232124, brand: "品牌分类2" },
        { id: 232125, brand: "品牌分类3456123围绕水岸东方" },
        { id: 232126, brand: "品牌分类4" },
        { id: 232127, brand: "品牌分类5" },
        { id: 232128, brand: "品牌分类6" },
        { id: 232129, brand: "品牌分类4756123围绕水岸东方" },
        { id: 232130, brand: "品牌分类8" },
        { id: 232131, brand: "品牌分类9" },
        { id: 232132, brand: "品牌分类10" },
        { id: 232133, brand: "品牌分类11456123围绕水岸东方" },
        { id: 232134, brand: "品牌分类12" },
        { id: 232135, brand: "品牌分类13" },
        { id: 232136, brand: "品牌分类14" },
        { id: 232137, brand: "品牌分类15456123围绕水岸东方" },
        { id: 232138, brand: "品牌分类16" },
        { id: 232139, brand: "品牌分类17" },
        { id: 232140, brand: "品牌分类18" },
        { id: 232141, brand: "品牌分类19456123围绕水岸东方" },
        { id: 232142, brand: "品牌分类20" }
      ],
      pageSize: 2,
      pageNum: 1,
      totalNum: 0,
      brandList: [],
      addDialogVisible: false,
      addBrandForm: {
        brand: ""
      },
      addBrandFormRules: {
        brand: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }
        ]
      },
      editDialogVisible: false,
      editBrandForm: {
        id: 0,
        brand: ''
      },
      
    };
  },
  methods: {
    // 获取品牌列表
    getBrandList() {
      this.totalNum = this.brandList0.length;
      let start,
        end,
        result = [];
      start = (this.pageNum - 1) * this.pageSize;
      end = start + this.pageSize;
      end = end > this.totalNum ? this.totalNum : end;
      for (let i = start; i < end; i++) {
        result.push(this.brandList0[i]);
      }
      this.brandList = result;
    },
    // 更改页大小
    handleSizeChange(val) {
      this.pageSize = val;
      this.getBrandList();
    },
    // 更改页码
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getBrandList();
    },
    // 新增按钮
    addBrand() {
      this.addDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.addBrand.$refs.input.focus();
      });
    },
    // 关闭添加对话框重置添加品牌表单
    resetAddBrandForm() {
      this.$refs.addBrandFormRef.resetFields();
    },
    // 提交新增分类
    submitAddBrand() {
      this.$refs.addBrandFormRef.validate(valid => {
        if (valid) {
          let max = 0,
            obj = {};
          this.brandList0.forEach(item => {
            if (item.id > max) max = item.id;
          });
          obj.id = ++max;
          obj.brand = this.addBrandForm.brand;
          this.brandList0.unshift(obj);
          this.getBrandList();
          this.$message.success("新增品牌成功");
          this.addDialogVisible = false;
        }
      });
    },
    // 删除按钮
    deleteBrand(id) {
      this.$confirm("确认删除此品牌", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.brandList0.forEach((item, i, arr) => {
            if (item.id === id) arr.splice(i, 1);
          });
          this.getBrandList();
          this.$message.success("删除成功");
        })
        .catch(err => {
          this.$message.info("已取消删除");
        });
    },
    // 编辑按钮
    editBrand(id) {
        this.brandList.forEach(item => {
            if(item.id === id){
                this.editBrandForm.id = item.id;
                this.editBrandForm.brand = item.brand;
            }
        })
        this.editDialogVisible = true;
        this.$nextTick(() => {
            this.$refs.editBrand.$refs.input.focus()
        })
    },
    // 关闭编辑对话框重置表单
    resetEditBrandForm(){
        this.$refs.editBrandFormRef.resetFields()
    },
    // 提交编辑分类
    submitEditBrand(){
        this.brandList0.forEach(item => {
            if(item.id === this.editBrandForm.id) item.brand = this.editBrandForm.brand
        })
        this.getBrandList()
        this.$message.success('编辑成功')
        this.editDialogVisible = false
    }
  },
  created() {
    this.getBrandList();
  }
};
</script>
<style lang="less" scoped>
</style>