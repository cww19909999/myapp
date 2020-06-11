<template>
  <div>
    <!-- 卡片内容 -->
    <el-card>
      <!-- 新增按钮 -->
      <el-button type="primary" icon="el-icon-plus" size="medium" @click="addCategory">新增分类</el-button>
      <!-- 商品分类表格 -->
      <el-table :data="categoryList" border style="width: 450px">
        <el-table-column prop="id" label="id" width="100" align="center"></el-table-column>
        <el-table-column prop="category" label="分类名称" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template v-slot="scope">
            <el-button type="danger" size="mini" @click="deleteCategory(scope.row.id)">删除</el-button>
            <el-button type="primary" size="mini" @click="editCategory(scope.row.id)">编辑</el-button>
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
    <!-- 新增分类对话框 -->
    <el-dialog
      title="新增分类"
      :visible.sync="addDialogVisible"
      width="30%"
      @closed="resetAddCategoryForm">
      <el-form
        :model="addCategoryForm"
        :rules="addCategoryFormRules"
        ref="addCategoryFormRef"
        label-width="90px"
      >
        <el-form-item label="分类名称:" prop="category">
          <el-input v-model="addCategoryForm.category" placeholder="请输入" ref="addCategory"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddCategory">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑分类对话框 -->
    <el-dialog title="编辑分类" :visible.sync="editDialogVisible" width="30%" @closed="resetEditCategoryForm">
      <el-form :model="editCategoryForm" :rules="addCategoryFormRules" ref="editCategoryFormRef" label-width="90px">
        <el-form-item label="id:">
            <el-input v-model="editCategoryForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="分类名称:" prop="category">
            <el-input v-model="editCategoryForm.category" placeholder="请输入" ref="editCategory"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditCategory">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categoryList0: [
        { id: 232123, category: "商品分类1" },
        { id: 232124, category: "商品分类2" },
        { id: 232125, category: "商品分类3456123围绕水岸东方" },
        { id: 232126, category: "商品分类4" },
        { id: 232127, category: "商品分类5" },
        { id: 232128, category: "商品分类6" },
        { id: 232129, category: "商品分类4756123围绕水岸东方" },
        { id: 232130, category: "商品分类8" },
        { id: 232131, category: "商品分类9" },
        { id: 232132, category: "商品分类10" },
        { id: 232133, category: "商品分类11456123围绕水岸东方" },
        { id: 232134, category: "商品分类12" },
        { id: 232135, category: "商品分类13" },
        { id: 232136, category: "商品分类14" },
        { id: 232137, category: "商品分类15456123围绕水岸东方" },
        { id: 232138, category: "商品分类16" },
        { id: 232139, category: "商品分类17" },
        { id: 232140, category: "商品分类18" },
        { id: 232141, category: "商品分类19456123围绕水岸东方" },
        { id: 232142, category: "商品分类20" }
      ],
      categoryList: [],
      pageNum: 1,
      pageSize: 2,
      totalNum: 0,
      addDialogVisible: false,
      addCategoryForm: {
        category: ""
      },
      addCategoryFormRules: {
        category: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ]
      },
      editDialogVisible: false,
      editCategoryForm: {
          id: 0,
          category: ''
      },
      

    };
  },
  methods: {
    // 获取商品分类列表
    getCategoryList() {
      this.totalNum = this.categoryList0.length;
      let start,
        end,
        result = [];
      start = (this.pageNum - 1) * this.pageSize;
      end = start + this.pageSize;
      end = end > this.totalNum ? this.totalNum : end;
      for (let i = start; i < end; i++) {
        result.push(this.categoryList0[i]);
      }
      this.categoryList = result;
    },
    // 更改页大小
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getCategoryList();
    },
    // 更改页码
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.getCategoryList();
    },
    // 新增商品分类
    addCategory() {
      this.addDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.addCategory.$refs.input.focus();
      });
    },
    // 关闭新增对话框重置表单
    resetAddCategoryForm() {
      this.$refs.addCategoryFormRef.resetFields();
    },
    // 提交添加分类
    submitAddCategory() {
      this.$refs.addCategoryFormRef.validate(valid => {
        if (valid) {
          let max = 0;
          this.categoryList0.forEach(item => {
            if (item.id > max) max = item.id;
          });
          this.addCategoryForm.id = ++max;
          this.addCategoryForm.category = this.addCategoryForm.category.replace(/\s*/g, '')
          let obj = {};
          for (let k in this.addCategoryForm) {
            obj[k] = this.addCategoryForm[k];
          }
          this.categoryList0.unshift(obj);
          this.getCategoryList();
          this.addDialogVisible = false;
          this.$message.success("新增分类成功");
        }
      });
    },
    // 根据id删除对应的分类
    deleteCategory(id) {
      this.$confirm("确认删除此分类", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.categoryList0.forEach((item, index, arr) => {
            if (item.id === id) this.categoryList0.splice(index, 1);
          });
          this.getCategoryList();
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(err => {
          this.$message.info("已取消删除");
        });
    },
    // 编辑商品分类
    editCategory(id) {
        this.categoryList.forEach(item => {
          if(item.id === id){
            this.editCategoryForm.id = id
            this.editCategoryForm.category = item.category;
          }
        })
        this.editDialogVisible = true;
        this.$nextTick(() =>{
            this.$refs.editCategory.$refs.input.focus()
        })
    },
    // 关闭编辑对话框重置表单
    resetEditCategoryForm(){
        this.$refs.editCategoryFormRef.resetFields();
    },
    // 提交编辑分类
    submitEditCategory(){
        this.$refs.editCategoryFormRef.validate(valid => {
            if(valid){
                this.categoryList0.forEach(item => {
                    if(item.id === this.editCategoryForm.id) item.category = this.editCategoryForm.category.replace(/\s*/g, '')
                })
                this.$message.success('操作成功')
                this.editDialogVisible = false
                this.getCategoryList()
            }
        })
    }
  },
  created() {
    this.getCategoryList();
  }
};
</script>
<style lang="less" scoped>

</style>